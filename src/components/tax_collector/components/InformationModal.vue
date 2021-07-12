<template>
  <v-container class="pa-0">
    <v-dialog
      v-if="showImages == false"
      v-model="infoModal"
      persistent
      scrollable
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ headline }}</span>
        </v-card-title>
        <v-card-text
          ><UserInfo
            v-if="showInfo"
            :taxPayer="taxPayer"
            v-on:enlargeImages="enlargeImages"
            v-on:viewPdf="viewPdf"
          />
          <TaxForm
            v-on:closeInfoModal="$emit('closeInfoModal')"
            v-on:manualCalculation="onManualCalculation"
            v-on:taxPayment="onTaxPayment"
            v-on:discardPayment="onDiscardPayment"
            :payment_mode="payment_mode"
            :taxPayer="taxPayer"
            v-else
          />
        </v-card-text>
        <v-card-actions v-if="taxPayer.status == 'pending'">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            type="button"
            @click.prevent="$emit('closeInfoModal')"
          >
            Close
          </v-btn>
          <v-btn color="error" text type="button" @click="onDeny(taxPayer)">
            Deny
          </v-btn>
          <v-btn
            color="success"
            text
            type="button"
            @click="onApprove(taxPayer)"
          >
            Approve
          </v-btn>
        </v-card-actions>
        <v-card-actions
          class="justify-end"
          v-else-if="
            taxPayer.status == 'granted' &&
              showTax == false &&
              payment_mode == 'in_progress'
          "
        >
          <v-btn
            color="primary"
            text
            type="button"
            @click.prevent="$emit('closeInfoModal')"
          >
            Close
          </v-btn>
          <v-btn
            color="success"
            text
            type="button"
            @click.prevent="onAddPayment()"
          >
            Compute Payment
          </v-btn>
        </v-card-actions>
        <v-card-actions
          class="justify-end"
          v-else-if="payment_mode == 'walk_in' && showTax == false"
        >
          <v-btn
            color="primary"
            text
            type="button"
            @click.prevent="onDiscardPayment"
          >
            Discard
          </v-btn>
          <v-btn
            color="success"
            text
            type="button"
            @click.prevent="onAddPayment()"
          >
            Compute Payment
          </v-btn>
        </v-card-actions>
        <v-card-actions
          class="justify-end"
          v-else-if="
            (taxPayer.status == 'denied' || taxPayer.status == null) &&
              showTax == false
          "
        >
          <v-btn
            color="primary"
            text
            type="button"
            @click.prevent="$emit('closeInfoModal')"
          >
            Close
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="showTax" class="justify-end">
          <portal-target name="actionBtn"> </portal-target>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <PdfViewer
      v-if="showPdf"
      :showPdf="showPdf"
      :document="document"
      v-on:hidePdf="hidePdf"
    />
    <ImageViewer
      v-if="showImages"
      :showImages="showImages"
      :images="images"
      v-on:collapseImages="collapseImages"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import UserInfo from "./UserInfo.vue";
import TaxForm from "./TaxForm.vue";
import ImageViewer from "../widgets/ImageViewer.vue";
import PdfViewer from "../widgets/PdfViewer.vue";

@Component({
  components: {
    UserInfo,
    TaxForm,
    ImageViewer,
    PdfViewer,
  },
})
export default class TaxPayerInfoModal extends Vue {
  @Prop() public infoModal!: boolean;
  @Prop() public readonly taxPayer!: _object;
  @Prop() public readonly payment_mode!: string;

  public headline = `${this.taxPayer.name || "Tax Payer"}'s Data`;
  public showInfo = true;
  public showTax = false;
  public showImages = false;
  public showPdf = false;
  public document: _object = {};
  public images: _object[] = [];

  private enlargeImages(images: _object[]) {
    this.showImages = true;
    this.images = images;
  }

  private collapseImages() {
    this.showImages = false;
    this.images = [];
  }

  private viewPdf(document: _object) {
    this.document = document;
    this.showPdf = true;
  }

  private hidePdf() {
    this.document = {};
    this.showPdf = false;
  }

  private async onApprove(taxPayer: _object) {
    const category = taxPayer.category;
    const credentials = new FormData();

    for (const name of Object.keys(taxPayer))
      credentials.append(name, taxPayer[name]);

    try {
      const { data } = await this.$axios.post(
        `/api/app/collector/${category}/approve`,
        credentials
      );
      this.taxPayer.status = data.status;
      this.$emit("onApproval", data);
    } catch (error) {
      console.error(error);
    }
  }

  private async onDeny(taxPayer: _object) {
    const category = taxPayer.category;
    const credentials = new FormData();

    for (const name of Object.keys(taxPayer))
      credentials.append(name, taxPayer[name]);

    try {
      const { data } = await this.$axios.post(
        `/api/app/collector/${category}/deny`,
        credentials
      );
      console.log(data);
      this.taxPayer.status = data.status;
      this.$emit("onDeny", data);
    } catch (error) {
      console.error(error);
    }
  }

  private onAddPayment() {
    this.showInfo = false;
    this.showTax = true;
    this.headline = `Add Payment`;
  }

  private async onDiscardPayment() {
    console.log(this.taxPayer);
    try {
      const { data } = await this.$axios.delete(
        `/api/app/cashier/discard/${this.taxPayer.id}`
      );
      console.log(data);
      this.$emit("closeInfoModal");
    } catch (error) {
      console.log(error);
    }
  }

  private onManualCalculation(collections: _object[]) {
    console.log(collections);
  }

  private onTaxPayment(payment: _object) {
    this.$emit("taxPayment", payment);
  }
}
</script>

<style scoped></style>
