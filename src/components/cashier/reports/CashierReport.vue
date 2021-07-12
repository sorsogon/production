<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="showPdfGen"
  >
    <v-sheet height="100%" class="grey darken-4 d-flex justify-center">
      <v-toolbar absolute width="100%" color="grey darken-4" dense>
        <h4 class="white--text">Daily Summary Report</h4>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="primary"
          class="white--text mx-1"
          @click="uploadPdf"
        >
          Upload
          <v-icon right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
        <v-btn
          small
          color="secondary"
          class="white--text mx-1"
          @click="printPdf"
        >
          Print
          <v-icon right dark>
            mdi-printer
          </v-icon>
        </v-btn>
        <v-btn
          small
          color="error"
          class="white--text ml-1"
          @click="$emit('hidePdf')"
        >
          Close
          <v-icon right dark>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="primary"
        class="mt-12"
      ></v-progress-linear>
      <iframe
        v-if="!loading"
        ref="cashierReport"
        class="mt-12"
        :src="src"
        frameborder="0"
        width="100%"
        height="calc(100vh - 48px)"
      ></iframe>
    </v-sheet>
  </v-dialog>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: "CashierReport",
  props: {
    reported_payments: Array,
    showPdfGen: Boolean,
    report_date: String,
  },
  data() {
    return {
      data_uri: "",
      src: "",
      pdf: {},
      loading: true,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    reported_date: function() {
      const f_month = new Date(this.report_date).getMonth();
      const f_year = new Date(this.report_date).getFullYear();
      const f_day = new Date(this.report_date).getDate();

      let m1, m2, day, year;
      let report_date = "";
      m1 = this.months[f_month];
      report_date = `${m1} ${f_day},${f_year}`;

      return report_date;
    },
  },
  methods: {
    formatter: function(number) {
      const currency_format = new Intl.NumberFormat("en-PH", {
        minimumFractionDigits: 2,
      });
      return currency_format.format(number);
    },
    cur_formatter: function(number) {
      const currency_format = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "Php",
        minimumFractionDigits: 2,
      });
      return currency_format.format(number);
    },
    generatePdf: function() {
      const document = {
        info: {
          title: `Daily Summary Report`,
        },
        header: function(currentPage, pageCount) {
          return [
            {
              text: `Page ${currentPage.toString()} of ${pageCount}`,
              fontSize: 9,
              bold: true,
              margin: [30, 10],
              alignment: "right",
            },
          ];
        },
        content: [
          {
            stack: [
              `DAILY SUMMARY REPORT`,
              {
                text: `PROVINCIAL GOVERNMENT OF SORSOGON`,
                style: "subheader",
                decoration: "underline",
              },
              {
                text: `${this.reported_date}`,
                fontSize: 10,
                alignment: "center",
              },
            ],
            style: "header",
          },
          {
            style: "table",
            table: {
              headerRows: 2,
              widths: [],
              body: [],
            },
            layout: "lightHorizontalLines",
          },
        ],
        pageOrientation: "landscape",
        pageSize: "A3",
        pageMargins: [30, 30],
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 0],
            alignment: "center",
          },
          subheader: {
            fontSize: 10,
          },
          table: {
            fontSize: 10,
            margin: [0, 5],
            alignment: "center",
          },
          tableHeader: {
            bold: true,
            fontSize: 11,
            color: "black",
          },
        },
      };

      const headers = this.getTableRows(this.reported_payments).headers;
      const rows = this.getTableRows(this.reported_payments).rows;
      const footers = this.getTableRows(this.reported_payments).footers;

      for (let j = 0; j < headers[0].length; j++) {
        document.content[1].table.widths.push("*");
      }
      for (let i = 0; i < headers.length; i++) {
        const h = headers[i];
        document.content[1].table.body.push(h);
      }

      for (let k = 0; k < rows.length; k++) {
        const r = rows[k];
        document.content[1].table.body.push(r);
      }

      document.content[1].table.body.push(footers);

      this.pdf = pdfMake.createPdf(document);

      this.pdf.getBase64((data) => {
        this.data_uri = data;
      });
      setTimeout(async () => {
        const pdfData = await fetch(
          `data:application/pdf;base64,${this.data_uri}`
        );
        const blob = await pdfData.blob();
        const src = await URL.createObjectURL(blob);
        this.src = `${src}#toolbar=0`;
        this.loading = false;
        this.$store.commit("snackBar/toggle", {
          message: `Generated Daily Summary Report for ${this.reported_date}`,
          color: "success",
          toggle: true,
        });
      }, 1000);
    },
    printPdf: function() {
      const c_report = this.$refs.cashierReport;
      let doc = c_report.contentWindow;
      if (doc != null) {
        doc.focus();
        doc.print();
      }
    },
    uploadPdf: async function() {
      console.log(this.reported_payments);
    },
    getTableRows: function(payments) {
      let account_codes = [];
      let tax_codes = [];
      let pen_codes = [];
      let fee_codes = [];
      let headers = [];
      let tax_headers = [];
      let pen_headers = [];
      let fee_headers = [];
      let table_headers = [];
      let table_footers = [];
      let rows = [];
      let value_rows = [];

      for (let i = 0; i < payments.length; i++) {
        const p = payments[i];
        const tax_code = p.data.account_code;
        const pen_code = p.data.penalties.account_code;
        const fees = p.data.fees.fees;

        tax_codes.push(tax_code);
        pen_codes.push(pen_code);
        tax_headers.push({
          type: p.type,
          account_code: p.data.account_code,
        });

        tax_headers = [...new Set(tax_headers)];

        tax_codes = [...new Set(tax_codes)].sort((a, b) => {
          let fa = a.toLowerCase(),
            fb = b.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        pen_codes = [...new Set(pen_codes)].sort((a, b) => {
          let fa = a.toLowerCase(),
            fb = b.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        for (let j = 0; j < fees.length; j++) {
          const f = fees[j];

          fee_headers.push({
            desc: f.desc,
            account_code: f.account_code,
          });

          fee_codes.push(f.account_code);
        }

        fee_codes = [...new Set(fee_codes)].sort((a, b) => {
          let fa = a.toLowerCase(),
            fb = b.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }

      tax_headers = tax_headers
        .sort((a, b) => {
          let fa = a.account_code.toLowerCase(),
            fb = b.account_code.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        })
        .map((h) => {
          return h.type;
        });

      fee_headers = fee_headers
        .sort((a, b) => {
          let fa = a.account_code.toLowerCase(),
            fb = b.account_code.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        })
        .map((h) => {
          return h.desc;
        });

      tax_headers.unshift({});

      pen_headers = pen_codes.map((p) => `Penalties (${p})`);

      account_codes = [...new Set([...tax_codes, ...pen_codes, ...fee_codes])];

      headers = [
        ...new Set([
          ...tax_headers,
          ...pen_headers,
          ...fee_headers,
          "Grand Total",
        ]),
      ];
      account_codes.unshift("OR Number");
      account_codes.push({});
      table_headers.unshift(account_codes);
      table_headers.unshift(headers);

      for (let j = 0; j < payments.length; j++) {
        const p = payments[j];
        const tax_code = p.data.account_code;
        const pen_code = p.data.penalties.account_code;
        const fees = p.data.fees.fees;
        const or_number = p.or_number;
        let payment_array = [];
        let penalty_array = [];
        let fees_array = [];
        let tax_array = [];
        let pen_array = [];
        let fee_array = [];
        const tax_due = p.data.tax_due.reduce((total, curr) => {
          return total + curr.amount;
        }, 0);
        const pen_due = p.data.penalties.amount;

        const tax_index = tax_codes.indexOf(tax_code);
        const pen_index = pen_codes.indexOf(pen_code);

        for (let x = 0; x < tax_codes.length - 1; x++) {
          tax_array.push(0);
          payment_array.push({});
        }

        for (let y = 0; y < pen_codes.length - 1; y++) {
          pen_array.push(0);
          penalty_array.push({});
        }

        for (let z = 0; z < fee_codes.length - fees.length; z++) {
          fee_array.push(0);
          fees_array.push({});
        }

        if (tax_index > -1) {
          let item = {};
          if (tax_due == 0) {
            item = {};
          } else {
            item = {
              text: this.formatter(tax_due),
              alignment: "right",
            };
          }
          tax_array.splice(tax_index, 0, tax_due);
          payment_array.splice(tax_index, 0, item);
        }

        if (pen_index > -1) {
          let item = {};
          if (pen_due == 0) {
            item = {};
          } else {
            item = {
              text: this.formatter(pen_due),
              alignment: "right",
            };
          }
          pen_array.splice(pen_index, 0, pen_due);
          penalty_array.splice(pen_index, 0, item);
        }

        for (let l = 0; l < fees.length; l++) {
          const f = fees[l];
          const fee_index = fee_codes.indexOf(f.account_code);
          if (fee_index > -1) {
            let item = {};
            if (f.amount == 0) {
              item = {};
            } else {
              item = {
                text: this.formatter(f.amount),
                alignment: "right",
              };
            }
            fee_array.splice(fee_index, 0, f.amount);
            fees_array.splice(fee_index, 0, item);
          }
        }

        const row = [
          ...payment_array,
          ...penalty_array,
          ...fees_array,
          { text: this.formatter(p.amount), alignment: "right" },
        ];

        let value_row = [...tax_array, ...pen_array, ...fee_array, p.amount];
        value_rows.push(value_row);

        row.unshift(`${or_number}`);
        rows.push(row);
      }

      let value_result = value_rows.reduce(function(array1, array2) {
        return array2.map(function(value, index) {
          return value + (array1[index] || 0);
        }, 0);
      }, []);

      value_result = value_result.map((v) => {
        return {
          text: this.cur_formatter(v),
          alignment: "right",
          bold: true,
        };
      });

      table_footers = [{ text: "Total", bold: true }, ...value_result];

      return {
        headers: table_headers,
        rows: rows,
        footers: table_footers,
      };
    },
  },
  created() {
    this.generatePdf();
  },
};
</script>
