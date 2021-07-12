<template>
  <v-container class="pa-0" fluid>
    <v-row class="px-4 pb-3">
      <v-col class="px-0 pb-0" cols="7">
        <h1>Liquidator Reports</h1>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-1">
        <v-card>
          <v-card-title>
            <v-row class="py-3">
              <v-col cols="7" class="pa-0 px-3 d-flex align-center"> </v-col>
              <v-col cols="5" class="d-flex pa-0 px-3">
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
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            id="report_table"
            :headers="headers"
            :items="reports"
            :search="search"
            :loading="status"
            :items-per-page="13"
            :height="table_height"
            loading-text="Loading... Please wait"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-row justify="center">
                <v-btn small elevation="1" @click="viewPdf(item)">
                  View
                  <v-icon right dark>
                    mdi-file-eye
                  </v-icon>
                </v-btn>
              </v-row>
            </template>
            <template v-slot:[`item.amount`]="{ item }">
              <v-sheet width="100%" class="transparent">
                <span class="font-weight-medium ">{{
                  currency_format.format(item.amount)
                }}</span>
              </v-sheet>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <PdfViewer
      v-if="showPdf"
      :showPdf="showPdf"
      :document="document"
      v-on:hidePdf="hidePdf"
    />
    <CashierReport
      v-if="showPdfGen"
      :showPdfGen="showPdfGen"
      :reported_payments="reported_payments"
      :report_date="report_date"
      v-on:hidePdf="showPdfGen = false"
    />
    <v-dialog
      v-if="sortModal"
      v-model="sortModal"
      persistent
      scrollable
      max-width="450"
    >
      <v-card>
        <v-card-title>
          <span class="heading">Generate Daily Summary Report</span>
        </v-card-title>
        <v-card-text>
          <v-sheet width="100%">
            <v-row class="pt-2 px-3">
              <v-col cols="12" class="pa-0">
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
                      v-model="report_date"
                      label="Report Date"
                      prepend-inner-icon="mdi-calendar"
                      outlined
                      dense
                      readonly
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      class="pt-2"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="report_date"></v-date-picker>
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
import { Vue, Component, Watch } from "vue-property-decorator";

import PdfViewer from "../tax_collector/widgets/PdfViewer.vue";
import CashierReport from "../cashier/reports/CashierReport.vue";

@Component({
  components: {
    PdfViewer,
    CashierReport,
  },
})
export default class TaxLiquidatorReports extends Vue {
  public showPdf = false;
  public document: _object = {};
  public search = "";
  public status = false;
  public collector_reports: _object[] = [];
  public reports_data: _object[] = [];
  public showPdfGen = false;
  public sortModal = false;
  public menu1 = false;
  public menu2 = false;
  public report_date = new Date().toISOString().substr(0, 10);
  public payments: _object[] = [];

  public headers = [
    {
      text: "Control No.",
      value: "ctrl_number",
    },
    {
      text: "File Name",
      value: "filename",
    },
    {
      text: "Liquidating Officer",
      value: "liquidation_officer",
    },
    {
      text: "Report Type",
      value: "report_type",
    },
    {
      text: "Report Date",
      value: "created_at",
    },
    {
      text: "Amount",
      value: "amount",
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
      align: "center",
    },
  ];

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

  public get table_height() {
    const w_height = window.innerHeight;
    const t_height = w_height - 275;
    return t_height;
  }

  public currency_format = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  private hidePdf() {
    this.document = {};
    this.showPdf = false;
  }

  private viewPdf(item: _object) {
    this.document = {
      filename: item.filename,
      url: `data:application/pdf;base64,${item.document}`,
    };
    this.showPdf = true;
  }

  private async getReports() {
    this.status = true;

    try {
      const { data } = await this.$axios.get(`/api/app/collector/report`);
      const payments = await this.$axios.get(`/api/app/cashier/payment`);
      this.reports_data = data;
      this.payments = payments.data;
      this.status = false;
    } catch (error) {
      console.log(error);
    }
  }

  private get reports() {
    let reports = [];
    for (let i = 0; i < this.reports_data.length; i++) {
      const u = this.reports_data[i];

      for (let j = 0; j < u.application_reports.length; j++) {
        const r = u.application_reports[j];

        if (r.type == "liquidator") {
          const type = r.type;
          let report_type = "";
          if (type == "collector") {
            report_type = "Collector Report";
          } else if (type == "liquidator") {
            report_type = "Liquidator Report";
          }
          const report = {
            liquidation_officer: u.name,
            ctrl_number: r.ctrl_number,
            filename: r.filename,
            type: r.type,
            report_type: report_type,
            created_at: r.created_at.substr(0, 10),
            desc: r.desc,
            serial_number: r.serial_number,
            amount: r.amount,
            document: r.document,
          };

          reports.push(report);
        }
      }
    }
    return reports;
  }

  private get reported_payments() {
    let reported_payments: _object[] = [];
    for (let i = 0; i < this.payments.length; i++) {
      const p = this.payments[i];
      const reported_at = p.reported_at.substr(0, 10);

      if (reported_at == this.report_date) {
        const type = this.payment_types.filter(
          (t) => t.value == p.for || t.value == p._for
        )[0];
        const data = JSON.parse(p.data);
        const payment = {
          id: p.id,
          or_number: p.or_number,
          type: type.text,
          amount: p.amount,
          data: data,
        };
        reported_payments.push(payment);
        reported_payments.sort((a: _object, b: _object) => {
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
    return reported_payments;
  }

  private generatePdf() {
    if (this.reported_payments.length > 0) {
      this.showPdfGen = true;
    } else {
      this.$store.commit("snackBar/toggle", {
        message: `No reported payment for ${this.report_date}`,
        color: "error",
        toggle: true,
      });
    }
  }

  private created() {
    this.getReports();
  }
}
</script>

<style></style>
