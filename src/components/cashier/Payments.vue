<template>
  <v-container class="pa-0">
    <v-row class="px-4 pb-3">
      <v-col class="px-0 pb-0" cols="7">
        <h1>Walk In Payments</h1>
      </v-col>
      <v-col class="px-0 pb-0 d-flex align-center" cols="5">
        <v-combobox
          dense
          hide-selected
          outlined
          :items="types"
          label="Payment Type"
          name="payment_type"
          v-model="tax_type"
          hide-details="auto"
          class="ma-0"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-1">
        <v-card>
          <v-card-title>
            <v-row class="py-3">
              <v-col cols="7" class="pa-0 px-3 d-flex align-center">
                {{ tax_type.text }}
              </v-col>
              <v-col cols="5" class="d-flex pa-0 px-3 align-center">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  class="pt-0"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            id="payment_table"
            :headers="headers"
            :items="tax_payments"
            :search="search"
            :loading="status"
            :items-per-page="13"
            :height="table_height"
            fixed-header
            loading-text="Loading... Please wait"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-row justify="center">
                <v-btn small elevation="1" @click="showPaymentModal(item)">
                  Pay
                  <v-icon right dark>
                    mdi-cash-register
                  </v-icon>
                </v-btn>
              </v-row>
            </template>
            <template v-slot:[`item.amount`]="{ item }">
              <v-sheet width="100%" class="transparent text-right">
                <span class="font-weight-medium ">{{
                  currency_format.format(item.amount)
                }}</span>
              </v-sheet>
            </template>
            <template v-slot:[`item.fees`]="{ item }">
              <v-sheet width="100%" class="transparent text-right">
                <span class="font-weight-medium ">{{
                  currency_format.format(item.fees)
                }}</span>
              </v-sheet>
            </template>
            <template v-slot:[`item.penalties`]="{ item }">
              <v-sheet width="100%" class="transparent text-right">
                <span class="font-weight-medium ">{{
                  currency_format.format(item.penalties)
                }}</span>
              </v-sheet>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-chip
                v-if="item.status == 'walk_in'"
                color="success"
                class="ma-0"
                small
              >
                <span class="font-weight-medium">Walk In</span>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <PaymentInfoModal
      v-if="paymentInfoModal"
      :paymentInfoModal="paymentInfoModal"
      :paymentInfo="payment"
      v-on:closeModal="paymentInfoModal = false"
      v-on:payOnsite="onPayOnsite"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import PaymentInfoModal from "./components/PaymentInfoModal.vue";

@Component({
  components: {
    PaymentInfoModal,
  },
})
export default class WalkInPayments extends Vue {
  public headers = [
    {
      text: "#",
      value: "id",
    },
    {
      text: "Full Name",
      value: "name",
    },
    {
      text: "Contact No.",
      value: "mobile",
    },
    {
      text: "Payment Type",
      value: "type",
    },
    {
      text: "Status",
      value: "status",
    },
    {
      text: "Amount",
      value: "amount",
      align: "center",
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
      align: "center",
    },
  ];
  public paymentInfoModal = false;
  public payment = {};
  public payment_type = "";
  public tax_data: _object[] = [];
  public tax_type: _object = {};
  public search = "";
  public status = false;
  public showPdfGen = false;
  public sortModal = false;
  public menu1 = false;
  public menu2 = false;

  public report_type = {
    text: "All Payments",
    value: "all_payment",
  };

  public report_payments: _object[] = [];
  public af_detail: _object = {};

  public payment_range = {
    from: new Date().toISOString().substr(0, 10),
    to: new Date().toISOString().substr(0, 10),
  };

  public currency_format = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  public payment_types = [
    {
      text: "Professional Tax",
      value: "professional-tax",
    },
    {
      text: "Annual Fixed Tax",
      value: "annual-fixed-tax",
    },
    {
      text: "Franchise Tax",
      value: "franchise-tax",
    },
    {
      text: "Amusement Tax",
      value: "amusement-tax",
    },
    {
      text: "Transfer Tax",
      value: "transfer-tax",
    },
    {
      text: "Printing & Publication Tax",
      value: "printing-publication-tax",
    },
    {
      text: "Property Tax",
      value: "property-tax",
    },
    {
      text: "Sand and Gravel",
      value: "sand-gravel-tax",
    },
    {
      text: "Gymnasium Rental",
      value: "gymnasium-rental",
    },
    {
      text: "Space Lot Rental",
      value: "space-lot-rental",
    },
    {
      text: "Heavy Equipment Rental",
      value: "heavy-equipment-rental",
    },
    {
      text: "Accountable Forms",
      value: "accountable-forms",
    },
  ];

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

  private get report_types() {
    let report_types = this.types.concat([
      {
        text: "All Payments",
        value: "all_payment",
      },
    ]);
    report_types.sort((a, b) => {
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

    return report_types;
  }

  public get table_height() {
    const w_height = window.innerHeight;
    const t_height = w_height - 275;
    return t_height;
  }

  private get tax_payments() {
    let payments = [];
    if (this.tax_type.value == "all_payment") {
      for (let i = 0; i < this.tax_data.length; i++) {
        const u = this.tax_data[i];

        for (let k = 0; k < this.report_types.length; k++) {
          const t = this.report_types[k];
          if (t.value != "all_payment") {
            for (let j = 0; j < u[t.value].length; j++) {
              const p = u[t.value][j];
              if (p.status == "walk_in") {
                const type = this.payment_types.filter(
                  (t) => t.value == p.for || t.value == p._for
                )[0];
                const data = p.data;
                const payment = {
                  id: p.id,
                  name: u.name,
                  mobile: `${u.mobile}`,
                  paid_at: new Date(p.paid_at).toISOString().substr(0, 10),
                  category: p.for,
                  type: type.text,
                  amount: p.amount,
                  fees: data.fees.amount,
                  penalties: data.penalties.amount,
                  tax_due: p.amount - data.penalties.amount - data.fees.amount,
                  status: p.status,
                  data: data,
                };
                payments.push(payment);
              }
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.tax_data.length; i++) {
        const u = this.tax_data[i];

        for (let j = 0; j < u[this.tax_type.value].length; j++) {
          const p = u[this.tax_type.value][j];
          if (p.status == "walk_in") {
            const data = p.data;
            const payment = {
              id: p.id,
              name: u.name,
              mobile: `${u.mobile}`,
              paid_at: new Date(p.paid_at).toISOString().substr(0, 10),
              category: p.for,
              type: this.tax_type.text,
              amount: p.amount,
              fees: data.fees.amount,
              penalties: data.penalties.amount,
              tax_due: p.amount - data.penalties.amount - data.fees.amount,
              status: p.status,
              data: data,
            };

            payments.push(payment);
          }
        }
      }
    }
    return payments;
  }

  private showPaymentModal(payment: _object) {
    this.payment = payment;
    this.paymentInfoModal = true;
  }

  private async getPayments() {
    this.status = true;
    try {
      const { data } = await this.$axios.get("/api/app/collector/payment");
      this.status = false;
      this.tax_data = data.payments;
    } catch (error) {
      console.log(error);
    }
  }

  private onPayOnsite() {
    this.getPayments();
  }

  private created() {
    this.tax_type = {
      text: "All Payments",
      value: "all_payment",
    };
    this.getPayments();
  }
}
</script>

<style lang="postcss" scoped></style>
