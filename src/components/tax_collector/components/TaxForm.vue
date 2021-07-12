<template>
  <v-container>
    <v-form>
      <v-row>
        <v-sheet width="100%">
          <v-row class="pt-2">
            <v-col cols="12" sm="8" class="pr-sm-1 px-3 pt-2 pb-0">
              <v-text-field
                outlined
                dense
                label="Full Name"
                name="name"
                v-model="fields.name"
                hide-details="auto"
                disabled
              >
              </v-text-field
            ></v-col>
            <v-col cols="12" sm="4" class="pl-sm-1 px-3 pb-3 pt-2">
              <v-text-field
                outlined
                dense
                label="Mobile Number"
                name="mobile"
                v-model="fields.mobile"
                type="tel"
                placeholder="(+63) xxx-xxxxxxx"
                hide-details="auto"
                disabled
              >
              </v-text-field
            ></v-col>
          </v-row>
        </v-sheet>
      </v-row>

      <v-row class="pt-1 pb-2">
        <v-sheet width="100%">
          <v-col class="py-1 px-0">
            <v-select
              outlined
              dense
              :items="forms"
              label="Tax Category"
              name="category"
              v-model="tax_form"
              hide-details="auto"
              class="ma-0"
              disabled
            ></v-select>
          </v-col>
          <v-row>
            <ProfessionalTaxForm
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectProfession="onSelectProfession"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-if="tax_form == 'professional_taxes'"
            />
            <AnnualTaxForm
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectVehicle="onSelectVehicle"
              v-on:clearCollection="clearCollection"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'annual_fixed_taxes'"
            />
            <FranchiseTaxForm
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectFranchise="onSelectFranchise"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'franchise_taxes'"
            />
            <AmusementTaxForm
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectAmusement="onSelectAmusement"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'amusement_taxes'"
            />
            <SandGravelTax
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectAggregate="onSelectAggregate"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'sand_gravel_taxes'"
            />
            <GymnasiumRental
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectActivity="onSelectActivity"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'gymnasium_rentals'"
            />
            <HeavyEquipmentRental
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectEquipment="onSelectEquipment"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'heavy_equipment_rentals'"
            />
            <AccountableForm
              :taxPayer="taxPayer"
              :savePaymentRoute="savePaymentRoute"
              :manualCalcType="manualCalcType"
              :payment_mode="payment_mode"
              v-on:selectForm="onSelectForm"
              v-on:closeModal="$emit('closeInfoModal')"
              v-on:taxPayment="onPayment"
              v-on:cancelManualCalc="onCancelManualCalc"
              v-else-if="tax_form == 'accountable_forms'"
            />
          </v-row>
        </v-sheet>
      </v-row>
      <v-row v-if="!manual_calc" class="py-3">
        <v-sheet width="100%">
          <v-simple-table fixed-header dense height="250px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Nature of Collection
                  </th>
                  <th class="text-center">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.desc }}</td>
                  <td v-if="index == 0" class="text-right">
                    {{ currency_format.format(item.amount) }}
                  </td>
                  <td v-else class="text-right">
                    {{ number_format.format(item.amount) }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-sheet>
      </v-row>
      <v-row v-if="!manual_calc" class="justify-end">
        <h2>Total: {{ currency_format.format(amount_total) }}</h2>
      </v-row>
      <portal v-if="!manual_calc" to="actionBtn">
        <v-btn
          v-if="payment_mode != 'walk_in'"
          color="error"
          text
          type="button"
          @click.prevent="$emit('closeInfoModal')"
        >
          Cancel
        </v-btn>
        <v-btn
          v-else
          color="error"
          text
          type="button"
          @click.prevent="$emit('discardPayment')"
        >
          Discard
        </v-btn>
        <v-btn
          color="primary"
          text
          type="button"
          @click="save"
          :disabled="tax_form == ''"
        >
          Save
        </v-btn>
      </portal>
      <v-btn
        v-if="collections.length > 0"
        color="success"
        type="button"
        absolute
        bottom
        left
        small
        class="mb-n1"
        @click="onManualCalculation"
      >
        Manual
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ProfessionalTaxForm from "./tax_form/ProfessionalTax.vue";
import AnnualTaxForm from "./tax_form/AnnualFixedTax.vue";
import FranchiseTaxForm from "./tax_form/FranchiseTax.vue";
import AmusementTaxForm from "./tax_form/AmusementTax.vue";
import SandGravelTax from "./tax_form/SandGravelTax.vue";
import AccountableForm from "./tax_form/AccountableForm.vue";
import GymnasiumRental from "./tax_form/GymnasiumRental.vue";
import HeavyEquipmentRental from "./tax_form/HeavyEquipmentRental.vue";

import * as Calculation from "@/services/calculation.service.ts";

@Component({
  components: {
    ProfessionalTaxForm,
    AnnualTaxForm,
    FranchiseTaxForm,
    AmusementTaxForm,
    SandGravelTax,
    AccountableForm,
    GymnasiumRental,
    HeavyEquipmentRental,
  },
})
export default class TaxForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public readonly payment_mode!: string;

  public savePaymentRoute = "";
  public manualCalcType = "";
  public manual_calc = false;
  public forms = [
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
  ];

  public currency_format = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  public number_format = new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
  });

  public fields = {
    name: this.taxPayer.name,
    mobile: this.taxPayer.mobile,
  };

  public collections: _object[] = [];

  private get tax_form() {
    return this.taxPayer.category;
  }

  private get collection_items() {
    let collection_items = [];
    for (let i = 0; i < this.collections.length; i++) {
      const c = this.collections[i];

      for (let j = 0; j < c.items.length; j++) {
        const i = c.items[j];
        collection_items.push(i);
      }
    }
    return collection_items;
  }

  private get amount_total() {
    const total = this.collection_items.reduce((total, curr) => {
      return total + curr.amount;
    }, 0);

    return total;
  }

  private get items() {
    const surcharge_total: number = this.collection_items
      .filter((c) => c.desc == "Surcharge")
      .reduce((a, b) => {
        return a + b.amount;
      }, 0);
    const interest_total: number = this.collection_items
      .filter((c) => c.desc == "Interest")
      .reduce((a, b) => {
        return a + b.amount;
      }, 0);
    const tax = this.collection_items
      .filter((c) => c.desc != "Surcharge")
      .filter((c) => c.desc != "Interest");
    const surcharges = {
      desc: "Surcharge",
      amount: surcharge_total,
    };
    const interests = {
      desc: "Interest",
      amount: interest_total,
    };
    let items: _object[] = [];
    if (items.length == 0) {
      items = tax;
      if (surcharge_total > 0 && interest_total > 0) {
        items.push(surcharges);
        items.push(interests);
      }
    } else {
      items = [];
    }
    return items;
  }

  private onManualCalculation() {
    this.manual_calc = true;
    this.manualCalcType = this.tax_form;
  }

  private onCancelManualCalc() {
    this.manual_calc = false;
    this.manualCalcType = "";
  }

  private clearCollection() {
    this.collections = [];
  }

  private onSelectProfession(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectVehicle(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectFranchise(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectAmusement(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectAggregate(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectActivity(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectForm(collections: _object[]) {
    this.collections = collections;
  }

  private onSelectEquipment(collections: _object[]) {
    this.collections = collections;
  }

  private save() {
    this.savePaymentRoute = this.tax_form;
  }

  private onPayment(payment: _object) {
    this.$emit("taxPayment", payment);
  }
}
</script>

<style scoped>
tbody tr td {
  font-size: 0.8rem !important;
  font-weight: 500 !important;
}
</style>
