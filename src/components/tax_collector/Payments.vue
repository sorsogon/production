<template>
  <v-container class="pa-0">
    <v-row class="px-4 pb-3">
      <v-col class="px-0 pb-0" cols="7">
        <h1>Payments</h1>
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
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="sortModal = true"
                      class="ml-3"
                      color="primary"
                      large
                      fab
                      plain
                      v-bind="attrs"
                      v-on="on"
                      :height="36"
                      :width="36"
                    >
                      <v-icon>
                        mdi-file-document
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Generate Report</span>
                </v-tooltip>

                <!-- <v-btn
                  small
                  color="success"
                  class="white--text"
                  @click="sortModal = true"
                >
                  Generate
                  <v-icon right dark>
                    mdi-file-document
                  </v-icon>
                </v-btn> -->
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
            @click:row="showPaymentModal"
          >
            <!-- <template v-slot:[`item.actions`]="{ item }">
              <div class="text-center transparent">
                <v-icon size="20" @click="showPaymentModal(item)">
                  mdi-folder
                </v-icon>
              </div>
            </template> -->
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
                  number_format.format(item.fees)
                }}</span>
              </v-sheet>
            </template>
            <template v-slot:[`item.penalties`]="{ item }">
              <v-sheet width="100%" class="transparent text-right">
                <span class="font-weight-medium ">{{
                  number_format.format(item.penalties)
                }}</span>
              </v-sheet>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-chip
                v-if="item.status == 'paid_online'"
                color="primary"
                class="ma-0"
                small
              >
                <span class="font-weight-medium">Online</span>
              </v-chip>
              <v-chip
                v-if="item.status == 'paid_onsite'"
                color="secondary"
                class="ma-0"
                small
              >
                <span class="font-weight-medium">Onsite</span>
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
    />
    <CollectorReport
      v-if="showPdfGen"
      :showPdfGen="showPdfGen"
      :tax_payments="report_payments"
      :payment_type="report_type.text"
      :payment_range="payment_range"
      :af_detail="af_detail"
      v-on:hidePdf="showPdfGen = false"
      v-on:reportUploaded="onReportUpload"
    />
    <v-dialog v-if="sortModal" v-model="sortModal" persistent max-width="600">
      <v-card>
        <v-card-title>
          <span class="heading">Generate Report</span>
        </v-card-title>
        <v-card-text>
          <v-sheet width="100%">
            <v-col class="px-0 pb-0 d-flex align-center" cols="12">
              <v-combobox
                dense
                hide-selected
                outlined
                :items="report_types"
                label="Payment Type"
                name="payment_type"
                v-model="report_type"
                hide-details="auto"
                class="ma-0"
                @change="selectReportPayment"
              ></v-combobox>
            </v-col>
          </v-sheet>
          <v-sheet width="100%">
            <label class="text-caption font-weight-light primary--text"
              >Payment Date</label
            >
            <v-row class="pt-2 px-3">
              <v-col cols="12" sm="6" class="pa-0">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  :nudge-bottom="8"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="payment_range.from"
                      label="From"
                      prepend-inner-icon="mdi-calendar"
                      outlined
                      dense
                      readonly
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      class="pt-2 pr-1"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="payment_range.from"
                    @input="selectReportPayment"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="pa-0">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  :nudge-bottom="8"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="payment_range.to"
                      label="To"
                      prepend-inner-icon="mdi-calendar"
                      outlined
                      dense
                      readonly
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      class="pt-2 pl-1"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="payment_range.to"
                    @input="selectReportPayment"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            color="primary"
            text
            type="button"
            @click.prevent="sortModal = false"
          >
            Close
          </v-btn>
          <v-btn
            color="success"
            text
            type="button"
            @click.prevent="generatePdf"
          >
            Generate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import PaymentInfoModal from "./components/PaymentInfoModal.vue";
import CollectorReport from "./components/reports/CollectorReport.vue";

@Component({
  components: {
    PaymentInfoModal,
    CollectorReport,
  },
})
export default class TaxCollectorPayments extends Vue {
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
      text: "OR No.",
      value: "or_number",
    },
    {
      text: "Payment Date",
      value: "paid_at",
    },
    {
      text: "Payment Type",
      value: "type",
    },
    {
      text: "Mode of Payment",
      value: "status",
      align: "center",
    },
    {
      text: "Fees",
      value: "fees",
      align: "center",
    },
    {
      text: "Penalties",
      value: "penalties",
      align: "center",
    },
    {
      text: "Amount",
      value: "amount",
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

  public number_format = new Intl.NumberFormat("en-PH", {
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

  private get or_range() {
    let data: _object = {};
    if (this.report_payments.length > 0) {
      const end = this.report_payments.length - 1;
      const from = this.report_payments[0].or_number;
      const to = this.report_payments[end].or_number;
      const qty = to - from + 1;
      data = {
        from,
        to,
        qty,
      };
    } else {
      data = {
        from: 0,
        to: 0,
        qty: 0,
      };
    }
    return data;
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
              if (p.status == "paid_online" || p.status == "paid_onsite") {
                const type = this.payment_types.filter(
                  (t) => t.value == p.for || t.value == p._for
                )[0];
                const data = p.data;
                const payment = {
                  id: p.id,
                  name: u.name,
                  mobile: `${u.mobile}`,
                  paid_at: new Date(p.paid_at).toISOString().substr(0, 10),
                  or_number: p.or_number,
                  type: type.text,
                  amount: p.amount,
                  fees: data.fees.amount,
                  penalties: data.penalties.amount,
                  tax_due: p.amount,
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
          if (p.paid_at != null) {
            let parse_date = Date.parse(p.paid_at);

            if (p.status == "paid_online" || p.status == "paid_onsite") {
              const data = p.data;
              const payment = {
                id: p.id,
                name: u.name,
                mobile: `${u.mobile}`,
                paid_at: new Date(p.paid_at).toISOString().substr(0, 10),
                or_number: p.or_number,
                type: this.tax_type.text,
                amount: p.amount,
                fees: data.fees.amount,
                penalties: data.penalties.amount,
                tax_due: p.amount,
                status: p.status,
                data: data,
              };

              payments.push(payment);
            }
          }
        }
      }
    }
    payments.sort((a, b) => {
      let fa = a.or_number,
        fb = b.or_number;

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });
    return payments;
  }

  private showPaymentModal(data: _object) {
    this.payment = this.tax_payments.filter((tax) => tax.id == data.id)[0];
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

  private async getAccountableForm() {
    const { data } = await this.$axios.get("/api/app/cashier/accountables/51");
    if (data.length > 0) {
      const af_51 = data[0];
      const sn_start = this.or_range.from;
      const sn_end = af_51.serial_number.end;
      const sn_qty = sn_end - sn_start + 1;
      this.af_detail = {
        name: `AF ${af_51.type}`,
        beginning_bal: {
          from: sn_start,
          to: sn_end,
          qty: sn_qty,
        },
        issued: this.or_range,
        receipt: {
          from: 0,
          to: 0,
          qty: 0,
        },
        ending_bal: {
          from: this.or_range.to + 1,
          to: sn_end,
          qty: sn_end - af_51.current + 1,
        },
      };
    }
  }

  private selectReportPayment() {
    if (this.report_type.value == "all_payment") {
      this.report_payments = [];
      for (let i = 0; i < this.tax_data.length; i++) {
        const u = this.tax_data[i];

        for (let k = 0; k < this.report_types.length; k++) {
          const t = this.report_types[k];
          if (t.value != "all_payment") {
            for (let j = 0; j < u[t.value].length; j++) {
              const p = u[t.value][j];
              let parse_date = Date.parse(p.paid_at);
              if (
                (p.status == "paid_online" || p.status == "paid_onsite") &&
                p.issued_by == this.$root.$user.id &&
                parse_date >= Date.parse(this.payment_range.from) &&
                parse_date < Date.parse(this.payment_range.to) + 86400000
              ) {
                const type = this.payment_types.filter(
                  (t) => t.value == p.for || t.value == p._for
                )[0];
                const data = p.data;
                const fees = data.fees.amount;
                const penalties = data.penalties.amount;
                const payment = {
                  name: u.name,
                  or_number: p.or_number,
                  type: type.text,
                  amount: p.amount,
                  tax_due: p.amount,
                  id: p.id,
                  category: p.for || p._for,
                };
                this.report_payments.push(payment);
                this.report_payments.sort((a, b) => {
                  let fa = a.or_number,
                    fb = b.or_number;

                  if (fa < fb) {
                    return -1;
                  }
                  if (fa > fb) {
                    return 1;
                  }
                  return 0;
                });
              }
            }
          }
        }
      }
    } else {
      this.report_payments = [];
      for (let i = 0; i < this.tax_data.length; i++) {
        const u = this.tax_data[i];

        for (let j = 0; j < u[this.report_type.value].length; j++) {
          const p = u[this.report_type.value][j];
          if (p.paid_at != null) {
            let parse_date = Date.parse(p.paid_at);

            if (
              (p.status == "paid_online" || p.status == "paid_onsite") &&
              p.issued_by == this.$root.$user.id &&
              parse_date >= Date.parse(this.payment_range.from) &&
              parse_date < Date.parse(this.payment_range.to) + 86400000
            ) {
              const data = p.data;
              const fees = data.fees.amount;
              const penalties = data.penalties.amount;
              const payment = {
                name: u.name,
                or_number: p.or_number,
                type: this.report_type.text,
                amount: p.amount + fees + penalties,
                tax_due: p.amount,
                id: p.id,
                category: p.for || p._for,
              };

              this.report_payments.push(payment);
              this.report_payments.sort((a, b) => {
                let fa = a.or_number,
                  fb = b.or_number;

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              });
            }
          }
        }
      }
    }
  }

  private async generatePdf() {
    this.selectReportPayment();
    await this.getAccountableForm();
    if (this.report_payments.length > 0) {
      this.showPdfGen = true;
      this.payment_type = this.tax_type.text;
    } else {
      this.$store.commit("snackBar/toggle", {
        message: `No payment from ${this.payment_range.from} to ${this.payment_range.to} for ${this.report_type.text}`,
        color: "error",
        toggle: true,
      });
    }
  }

  private onReportUpload() {
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
