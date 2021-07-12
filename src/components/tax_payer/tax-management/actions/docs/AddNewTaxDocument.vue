<template>
  <v-sheet elevation="2" class="rounded-lg pa-2 my-1">
    <v-form class="pa-1" ref="form" @submit.prevent="onUploadPayerDocuments">
      <v-row no-gutters>
        <v-col cols="12" class="text-truncate">
          <v-alert
            v-if="$route.params.category == 'professional-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <span
              ><strong>PRC ID</strong>/<strong>IBP ID</strong>/<strong
                >Company ID</strong
              >
              for <strong>Insurance Agent</strong>.</span
            >
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'annual-fixed-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <span
              ><strong>OR/CR</strong> of vehicles used by the taxpayer in doing
              business in the province.</span
            >
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'franchise-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info">
            Required:
            <span v-if="$allPayments.length > 0">Duly notarized <strong>Annual Gross Receipt</strong></span>
            <v-tooltip 
              v-else
              bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <span>Submit duly approved
                    <strong>Articles of Incorporation</strong>,
                    <strong>Capitalization</strong>,
                    <strong>Mayors Permit</strong></span>.
                </span>
              </template>
              <span>Submit duly approved Articles of Incorporation, Capitalization,
                Mayors Permit.</span>
            </v-tooltip>
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'printing-publication-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <span>Duly notarized <strong>Annual Gross Receipt</strong>.</span>
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'transfer-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <v-tooltip max-width="500" bottom>
              <template v-slot:activator="{ on, attrs }">
                <strong v-bind="attrs" v-on="on">
                  Order of Payment; Document/s used in transferring the
                  ownership of the property of the decedent; Current Tax
                  declaration; Official Receipt of updated Land Tax payment.
                </strong>
              </template>
              <span>
                Order of Payment; Document/s used in transferring the ownership
                of the property of the decedent; Current Tax declaration;
                Official Receipt of updated Land Tax payment.
              </span>
            </v-tooltip>
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'amusement-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <span v-if="$allPayments.length > 0"
              >Duly signed <strong>Amusement Tax return</strong>.</span
            >
            <v-tooltip v-else max-width="500" bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <strong>Mayor's Permit; </strong>
                  <strong>SB Resolution/Ordinance granting Franchise to
                  the proprietor</strong>
                  <strong>Letter of Intent Admission Tickets</strong> for
                  registration/recording.
                </span>
              </template>
              <span>
                Mayor's Permit; SB Resolution/Ordinance granting Franchise to the
                proprietor Letter of Intent Admission Tickets for
                registration/recording.
              </span>
            </v-tooltip>
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'property-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <span>Index of payment for previous payments.</span>
          </v-alert>

          <v-alert
            v-if="$route.params.category == 'sand-gravel-tax'"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <strong>Order of Payment; Duly signed detailed estimate</strong>.
          </v-alert>

          <v-alert
            v-if="$route.params.category.search(/rental/g) > 0"
            outlined
            dense
            class="ma-0 mb-2"
            border="left"
            type="info"
          >
            Required:
            <strong>Request Letter; Order of Payment</strong>.
          </v-alert>
        </v-col>

        <v-col cols="12">
          <UploadDocumentField
            :errors="errors"
            v-on:removeFileError="errors.docs = undefined"
          />
          <p class="text-caption font-weight-light mb-0">
            Minim deserunt sunt ad laboris officia non exercitation cillum.
          </p>
        </v-col>

        <v-col cols="12" class="mt-2">
          <v-btn depressed dark color="main primary" type="submit" width="100%"
            >Submit</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";

import TaxpayerServiceMixin from "@/services/payer.service.ts";
import UploadDocumentField from "./UploadDocument.vue";

@Component({
  components: { UploadDocumentField },
})
export default class AddNewTaxDocument extends Mixins(TaxpayerServiceMixin) {
  public errors: _object = {};

  public async onUploadPayerDocuments(e: Event) {
    const docs = new FormData(e.target as HTMLFormElement);

    try {
      await this.uploadPayerDocuments(docs);

      (this.$refs["form"] as HTMLFormElement).reset();
    } catch (error) {
      this.errors = error.errors;
    }
  }

  get $allPayments() {
    return (
      this.$payer.readyToPay?.concat(this.$payer.pendingPayments ?? []) ?? []
    );
  }
}
</script>

<style lang="postcss" scoped></style>
