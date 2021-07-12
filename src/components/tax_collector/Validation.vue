<template>
  <v-container class="pa-0">
    <v-row class="px-4">
      <v-col class="px-0 pb-0" cols="7">
        <h1>Validation</h1>
      </v-col>
      <v-col class="px-0 pb-0 d-flex align-center" cols="5">
        <v-combobox
          dense
          hide-selected
          outlined
          :items="types"
          v-model="tax_type"
          label="Payment Type"
          name="payment_type"
          hide-details="auto"
          class="ma-0"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters class="mt-1 mb-2 px-4">
      <RegisterTaxPayerModal
        :dialog="registerModal"
        v-on:closeRegisterModal="registerModal = false"
        v-on:newTaxPayer="onNewTaxPayer"
      />
      <TaxPayerInfoModal
        v-if="infoModal"
        :infoModal="infoModal"
        :taxPayer="taxPayer"
        :payment_mode="payment_mode"
        v-on:taxPayment="onTaxPayment"
        v-on:closeInfoModal="closeModal"
        v-on:onApproval="onApproval"
        v-on:onDeny="onDeny"
      />
      <NewTransactionModal
        v-if="transactionModal"
        :transactionModal="transactionModal"
        v-on:closeTransactionModal="transactionModal = false"
        v-on:newTransaction="showModal"
      />
      <AddInfoModal
        v-if="addInfoModal"
        :addInfoModal="addInfoModal"
        :taxPayer="newUser"
        v-on:skip="infoModalSkip"
      />
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-1">
        <TaxPayerStatusTable
          v-on:showRegisterModal="showRegisterModal"
          :newTaxPayer="newTaxPayer"
          :approvalUpdate="approvalUpdate"
          :tax_type="tax_type"
          :new_tax_payment="new_tax_payment"
          v-on:showInfoModal="showModal"
          v-on:newTransaction="newTransaction"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import TaxPayerStatusTable from "@/components/tax_collector/components/TaxPayerStatusTable.vue";
import RegisterTaxPayerModal from "@/components/tax_collector/components/RegisterModal.vue";
import TaxPayerInfoModal from "@/components/tax_collector/components/InformationModal.vue";
import NewTransactionModal from "@/components/tax_collector/components/NewTransactionModal.vue";
import AddInfoModal from "@/components/tax_collector/components/AddInfoModal.vue";

@Component({
  components: {
    TaxPayerStatusTable,
    RegisterTaxPayerModal,
    TaxPayerInfoModal,
    NewTransactionModal,
    AddInfoModal,
  },
})
export default class TaxCollectorValidationPage extends Vue {
  public registerModal = false;
  public infoModal = false;
  public transactionModal = false;
  public addInfoModal = false;
  public newTaxPayer = false;
  public new_tax_payment: _object = {};
  public taxPayer = {};
  public newUser = {};
  public approvalUpdate = {};
  public payment_mode = "";

  public types = [
    {
      text: "Professional Tax",
      value: "professional_taxes",
    },
    {
      text: "Annual Fixed Tax",
      value: "annual_fixed_taxes",
    },
    {
      text: "Franchise Tax",
      value: "franchise_taxes",
    },
    {
      text: "Amusement Tax",
      value: "amusement_taxes",
    },
    {
      text: "Transfer Tax",
      value: "transfer_taxes",
    },
    {
      text: "Printing & Publication Tax",
      value: "printing_publication_taxes",
    },
    {
      text: "Property Tax",
      value: "property_taxes",
    },
    {
      text: "Sand and Gravel",
      value: "sand_gravel_taxes",
    },
    {
      text: "Gymnasium Rental",
      value: "gymnasium_rentals",
    },
    {
      text: "Space Lot Rental",
      value: "space_lot_rentals",
    },
    {
      text: "Heavy Equipment Rental",
      value: "heavy_equipment_rentals",
    },
    {
      text: "Accountable Forms",
      value: "accountable_forms",
    },
    {
      text: "All Payments",
      value: "all_payment",
    },
  ].sort((a, b) => {
    let fa = a.text.toLowerCase(),
      fb = b.text.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  public tax_type: _object = {};

  public closeModal() {
    this.infoModal = false;
  }

  public showModal(taxPayer: _object) {
    this.infoModal = true;
    this.taxPayer = taxPayer;
    if (taxPayer.payment_mode == undefined) {
      this.payment_mode = "in_progress";
    } else if (taxPayer.payment_mode == "pay_onsite") {
      this.payment_mode = "walk_in";
    }
  }

  public showRegisterModal() {
    this.registerModal = true;
  }

  public onApproval(data: _object) {
    this.infoModal = false;
    this.approvalUpdate = data;
  }

  public onDeny(data: _object) {
    this.infoModal = false;
    this.approvalUpdate = data;
  }

  public onNewTaxPayer(user: _object) {
    this.newTaxPayer = true;
    this.registerModal = false;
    this.addInfoModal = true;
    // this.taxPayer = user;
    this.newUser = this.$root.$user;
  }

  public onTaxPayment(payment: _object) {
    this.new_tax_payment = payment;
  }

  public newTransaction() {
    this.transactionModal = true;
  }

  public infoModalSkip() {
    this.transactionModal = true;
    this.addInfoModal = false;
  }

  private created() {
    this.tax_type = {
      text: "All Payments",
      value: "all_payment",
    };
  }
}
</script>

<style lang="postcss" scoped></style>
