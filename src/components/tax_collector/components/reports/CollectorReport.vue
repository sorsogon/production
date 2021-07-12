<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="showPdfGen"
  >
    <v-sheet height="100%" class="grey darken-4 d-flex justify-center">
      <v-toolbar absolute width="100%" color="grey darken-4" dense>
        <h4 class="white--text">{{ document_name }}</h4>
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
        ref="collectorReport"
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
  name: "CollectorReport",
  props: {
    tax_payments: Array,
    showPdfGen: Boolean,
    payment_type: String,
    payment_range: Object,
    af_detail: Object,
  },
  data() {
    return {
      data_uri: "",
      src: "",
      type: this.payment_type,
      range: this.payment_range,
      collection_officers: [],
      accountable_forms: this.af_detail,
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
    total: function() {
      return this.tax_payments.reduce((total, curr) => {
        return total + curr.amount;
      }, 0);
    },
    total_dep: function() {
      return this.collection_officers.reduce((total, curr) => {
        return total + curr.amount;
      }, 0);
    },
    document_name: function() {
      let year = new Date().getFullYear();
      let m = new Date().getMonth() + 1;
      let day = new Date().getDate();

      return `Collection_Report(${m}/${day}/${year})`;
    },
    control_number: function() {
      let year = new Date().getFullYear();
      let m = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      let sec = new Date().getSeconds();

      if (m < 10) m = `0${m}`;
      if (day < 10) day = `0${day}`;
      if (hour < 10) hour = `0${hour}`;
      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;

      return `${m}${day}${year}-${hour}${min}${sec}-CO${this.$root.$user.id}`;
    },
    report_date: function() {
      const f_month = new Date(this.range.from).getMonth();
      const f_year = new Date(this.range.from).getFullYear();
      const f_day = new Date(this.range.from).getDate();
      const t_month = new Date(this.range.to).getMonth();
      const t_year = new Date(this.range.to).getFullYear();
      const t_day = new Date(this.range.to).getDate();

      let m1, m2, day, year;
      let report_date = "";
      if (this.range.from == this.range.to) {
        m1 = this.months[f_month];
        report_date = `${m1} ${f_day},${f_year}`;
      } else if (t_year == f_year && t_month == f_month) {
        m1 = this.months[f_month];
        report_date = `${m1} ${f_day}-${t_day},${t_year}`;
      } else {
        m1 = this.months[f_month];
        m2 = this.months[t_month];
        report_date = `${m1} ${f_day},${f_year} - ${m2} ${t_day},${t_year}`;
      }

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
    to_words: function(amount) {
      let words = [];
      words[0] = "zero";
      words[1] = "One";
      words[2] = "Two";
      words[3] = "Three";
      words[4] = "Four";
      words[5] = "Five";
      words[6] = "Six";
      words[7] = "Seven";
      words[8] = "Eight";
      words[9] = "Nine";
      words[10] = "Ten";
      words[11] = "Eleven";
      words[12] = "Twelve";
      words[13] = "Thirteen";
      words[14] = "Fourteen";
      words[15] = "Fifteen";
      words[16] = "Sixteen";
      words[17] = "Seventeen";
      words[18] = "Eighteen";
      words[19] = "Nineteen";
      words[20] = "Twenty";
      words[30] = "Thirty";
      words[40] = "Forty";
      words[50] = "Fifty";
      words[60] = "Sixty";
      words[70] = "Seventy";
      words[80] = "Eighty";
      words[90] = "Ninety";
      words[100] = "One Hundred";
      words[200] = "Two Hundred";
      words[300] = "Three Hundred";
      words[400] = "Four Hundred";
      words[500] = "Five Hundred";
      words[600] = "Six Hundred";
      words[700] = "Seven Hundred";
      words[800] = "Eight Hundred";
      words[900] = "Nine Hundred";
      let op;
      amount = amount.toString();
      let atemp = amount.split(".");
      let number = atemp[0].split(",").join("");
      let n_length = number.length;
      let words_string = "";
      if (n_length <= 11) {
        let n_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let received_n_array = [];
        for (let i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
        }
        for (let i = 11 - n_length, j = 0; i < 11; i++, j++) {
          n_array[i] = received_n_array[j];
        }
        for (let i = 0, j = 1; i < 11; i++, j++) {
          if (i == 0 || i == 3 || i == 6 || i == 9) {
            if (n_array[i] == 1) {
              n_array[j] = 10 + parseInt(n_array[j]);
              n_array[i] = 0;
            }
          }
        }
        let value = "";
        for (let i = 0; i < 11; i++) {
          if (i == 0 || i == 3 || i == 6 || i == 9) {
            value = n_array[i] * 10;
          } else if (i == 2 || i == 5 || i == 8) {
            value = n_array[i] * 100;
          } else {
            value = n_array[i];
          }

          if (value != 0) {
            words_string += words[value] + " ";
          }
          if (i == 1 && value != 0 && n_array[i - 1] > 0) {
            words_string += "Billion ";
          } else if (i == 1 && value != 0) {
            words_string += "Biillion ";
          }
          if (
            i == 4 &&
            value == 0 &&
            (n_array[i - 1] > 0 || n_array[i - 2] > 0)
          ) {
            words_string += "Million ";
          } else if (i == 4 && value != 0) {
            words_string += "Million ";
          }
          if (
            i == 7 &&
            value == 0 &&
            (n_array[i - 1] > 0 || n_array[i - 2] > 0)
          ) {
            words_string += "Thousand ";
          } else if (i == 7 && value != 0) {
            words_string += "Thousand ";
          }
        }
        words_string = words_string.split(" ").join(" ");
      }
      return words_string;
    },
    cur_convert: function(n) {
      let op;
      let nums = n.toString().split(".");
      let whole = this.to_words(nums[0]);
      if (nums[1] == null) nums[1] = 0;
      if (nums[1].length == 1) nums[1] = nums[1] + "0";
      if (nums[1].length > 2) {
        nums[1] = nums[1].substring(2, length - 1);
      }
      if (nums.length == 2) {
        if (nums[0] <= 12) {
          nums[0] = nums[0] * 10;
        } else {
          let w = nums[0];
          nums[0] = w;
        }
        let fraction = this.to_words(nums[1]);
        if (whole == "" && fraction == "") {
          op = "Zero only";
        }
        if (whole == "" && fraction != "") {
          op = fraction + "centavos only";
        }
        if (whole != "" && fraction == "") {
          op = whole + "pesos only";
        }
        if (whole != "" && fraction != "") {
          op = whole + "pesos and " + fraction + "centavos only";
        }
        if (n > 99999999999.99) {
          op = "Oops!!! The amount is too big to convert";
        }
        if (isNaN(n) == true) {
          op =
            "Error : Amount in number appears to be incorrect. Please Check.";
        }
      }
      return op;
    },
    generatePdf: function() {
      const document = {
        info: {
          title: `Collection Report (${this.range.from}) to (${this.range.to})`,
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
              `REPORT OF COLLECTIONS AND DEPOSITS`,
              {
                text: `PROVINCIAL GOVERNMENT OF SORSOGON`,
                style: "subheader",
                decoration: "underline",
              },
              {
                text: `${this.report_date}`,
                fontSize: 10,
                alignment: "center",
              },
              {
                text: `Control No.: ${this.control_number}`,
                fontSize: 9,
                margin: [0, 5],
                alignment: "right",
                italics: true,
              },
            ],
            style: "header",
          },
          {
            style: "table",
            table: {
              headerRows: 1,
              widths: [100, "*", "*", 120],
              body: [
                [
                  {
                    text: "Official Receipt Ticket Serial Number (From - To)",
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {
                    text: "Payor",
                    style: "tableHeader",
                    alignment: "center",
                    margin: [0, 12],
                  },
                  {
                    text: "Particular",
                    style: "tableHeader",
                    alignment: "center",
                    margin: [0, 12],
                  },
                  {
                    text: "Amount",
                    style: "tableHeader",
                    alignment: "center",
                    margin: [0, 12],
                  },
                ],
              ],
            },
            layout: "lightHorizontalLines",
          },
          {
            columns: [
              {
                text: "Total",
                style: "footer",
                width: "*",
                alignment: "right",
                margin: [0, 0, 50, 0],
              },
              {
                text: this.cur_formatter(this.total),
                style: "footer",
                alignment: "right",
                width: 120,
              },
            ],
          },
          {
            table: {
              headerRows: 2,
              widths: [150, "*", 150],
              heights: 11,
              body: [
                [
                  {
                    text: "B. REMITTANCES/DEPOSITS",
                    style: "tableHeader2",
                    alignment: "left",
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: "Accountable Office / Bank",
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {
                    text: "Reference",
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {
                    text: "Amount",
                    style: "tableHeader",
                    alignment: "center",
                  },
                ],
              ],
            },
            pageBreak: "before",
          },
          {
            table: {
              headerRows: 4,
              heights: 11,
              widths: [
                30,
                20,
                "*",
                "*",
                20,
                "*",
                "*",
                20,
                "*",
                "*",
                20,
                "*",
                "*",
              ],
              body: [
                [
                  {
                    text: "C. ACCOUNTABILITY FOR ACCOUNTABLE FORMS",
                    style: "tableHeader2",
                    alignment: "left",
                    colSpan: 13,
                  },
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                ],
                [
                  {
                    text: "Name of Form",
                    style: "tableHeader",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "Beginning Balance",
                    style: "tableHeader",
                    alignment: "center",
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    text: "Receipt",
                    style: "tableHeader",
                    alignment: "center",
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    text: "Issued",
                    style: "tableHeader",
                    alignment: "center",
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    text: "Ending Balance",
                    style: "tableHeader",
                    alignment: "center",
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  "",
                  {
                    text: "Qty.",
                    style: "tableBody",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "Inclusive Serial No.",
                    style: "tableBody",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    text: "Qty.",
                    style: "tableBody",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "Inclusive Serial No.",
                    style: "tableBody",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    text: "Qty.",
                    style: "tableBody",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "Inclusive Serial No.",
                    style: "tableBody",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    text: "Qty.",
                    style: "tableBody",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "Inclusive Serial No.",
                    style: "tableBody",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                ],
                [
                  "",
                  "",
                  {
                    text: "From",
                    style: "tableBody",
                    alignment: "center",
                  },
                  {
                    text: "To",
                    style: "tableBody",
                    alignment: "center",
                  },
                  "",
                  {
                    text: "From",
                    style: "tableBody",
                    alignment: "center",
                  },
                  {
                    text: "To",
                    style: "tableBody",
                    alignment: "center",
                  },
                  "",
                  {
                    text: "From",
                    style: "tableBody",
                    alignment: "center",
                  },
                  {
                    text: "To",
                    style: "tableBody",
                    alignment: "center",
                  },
                  "",
                  {
                    text: "From",
                    style: "tableBody",
                    alignment: "center",
                  },
                  {
                    text: "To",
                    style: "tableBody",
                    alignment: "center",
                  },
                ],
              ],
            },
          },
          {
            table: {
              headerRows: 2,
              widths: ["*", 30, 150],
              heights: 11,
              body: [
                [
                  {
                    text: "D. SUMMARY OF COLLECTIONS AND REMITTANCES/DEPOSITS",
                    style: "tableHeader2",
                    alignment: "left",
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: "Beginning Balance",
                    style: "tableHeader",
                    alignment: "left",
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: "ADD: Collections",
                    style: "tableHeader",
                    alignment: "left",
                    margin: [0, 10, 0, 5],
                    border: [true, true, false, false],
                  },
                  {
                    text: "Php",
                    style: "tableHeader",
                    alignment: "center",
                    margin: [0, 10, 0, 5],
                    border: [false, true, false, false],
                  },
                  {
                    text: this.formatter(this.total),
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 10, 0, 5],
                    border: [false, true, true, false],
                  },
                ],
                [
                  {
                    text:
                      "LESS: Remittance/Deposit to Cashier/Treasurer/Depository Bank",
                    style: "tableHeader",
                    alignment: "left",
                    margin: [0, 5, 0, 10],
                    border: [true, false, false, false],
                  },
                  {
                    text: "",
                    margin: [0, 5, 0, 10],
                    border: [false, false, false, false],
                  },
                  {
                    text: this.formatter(this.total),
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 5, 0, 10],
                    border: [false, false, true, false],
                  },
                ],
                [
                  {
                    text: "Balance",
                    style: "tableHeader",
                    alignment: "left",
                    margin: [0, 0, 0, 10],
                    border: [true, false, false, true],
                  },
                  {
                    text: "Php",
                    style: "tableHeader",
                    alignment: "center",
                    margin: [0, 0, 0, 10],
                    border: [false, false, false, true],
                  },
                  {
                    text: this.formatter(this.total - this.total),
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 0, 0, 10],
                    border: [false, false, true, true],
                  },
                ],
              ],
            },
          },
          {
            columns: [
              {
                stack: [
                  {
                    text: "Certification:",
                    alignment: "left",
                    fontSize: 11,
                    bold: true,
                    italics: true,
                  },
                  {
                    text:
                      "I hereby certify the foregoing report of collections and deposits and accountability for accountable form is true and correct.",
                    alignment: "center",
                    fontSize: 10,
                    margin: [5, 20],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: "Verification and Acknowledgement:",
                    alignment: "left",
                    fontSize: 11,
                    bold: true,
                    italics: true,
                  },
                  {
                    text:
                      "I hereby certify that the foregoing report of collections has been verified and acknowledged receipt of",
                    alignment: "center",
                    fontSize: 10,
                    margin: [5, 20, 5, 10],
                  },
                  {
                    text: `" ${this.cur_convert(this.total).toUpperCase()} "`,
                    alignment: "center",
                    fontSize: 9,
                    italics: true,
                    bold: true,
                    margin: [5, 0],
                    color: "#3a69ea",
                  },
                ],
              },
            ],
            margin: [0, 20, 0, 0],
          },
          {
            columns: [
              {
                columns: [
                  {
                    width: "*",
                    stack: [
                      {
                        text: "Name of Accountable Officer",
                        alignment: "center",
                        fontSize: 11,
                        bold: true,
                        decoration: "underline",
                      },
                      {
                        text: "Name and Signature",
                        alignment: "center",
                        bold: true,
                        fontSize: 10,
                      },
                      {
                        text: "Accountable Officer",
                        alignment: "center",
                        fontSize: 10,
                      },
                    ],
                  },
                  {
                    width: 80,
                    stack: [
                      {
                        text: new Date().toISOString().substr(0, 10),
                        alignment: "center",
                        fontSize: 11,
                        decoration: "underline",
                      },
                      {
                        text: "Date",
                        alignment: "center",
                        bold: true,
                        fontSize: 10,
                      },
                    ],
                  },
                ],
              },
              {
                columns: [
                  {
                    width: "*",
                    stack: [
                      {
                        text: "Name of Liquidating Officer",
                        alignment: "center",
                        fontSize: 11,
                        bold: true,
                        decoration: "underline",
                      },
                      {
                        text: "Name and Signature",
                        alignment: "center",
                        bold: true,
                        fontSize: 10,
                      },
                      {
                        text: "Liquidating Officer",
                        alignment: "center",
                        fontSize: 10,
                      },
                    ],
                  },
                  {
                    width: 80,
                    stack: [
                      {
                        text: new Date().toISOString().substr(0, 10),
                        alignment: "center",
                        fontSize: 11,
                        decoration: "underline",
                      },
                      {
                        text: "Date",
                        alignment: "center",
                        bold: true,
                        fontSize: 10,
                      },
                    ],
                  },
                ],
              },
            ],
            margin: [0, 20],
          },
        ],
        pageOrientation: "portrait",
        pageSize: "LETTER",
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
            fontSize: 11,
            margin: [0, 5],
          },
          tableHeader: {
            bold: true,
            fontSize: 11,
            color: "black",
          },
          tableHeader2: {
            bold: true,
            fontSize: 10,
            color: "black",
          },
          tableBody: {
            bold: true,
            fontSize: 10,
            color: "black",
          },
          footer: {
            bold: true,
            fontSize: 14,
            color: "black",
          },
        },
      };

      this.tax_payments.forEach((payment) => {
        document.content[1].table?.body.push([
          { text: payment.or_number, alignment: "right" },
          { text: payment.name },
          { text: payment.type, alignment: "center" },
          { text: this.formatter(payment.amount), alignment: "right" },
        ]);
      });
      this.collection_officers.push({
        name: this.$root.$user.name,
        reference: "Remittance - General Fund",
        amount: this.total,
      });
      this.collection_officers.forEach((officer) => {
        document.content[3].table.body.push([
          {
            text: officer.name,
            alignment: "center",
            fontSize: 11,
          },
          {
            text: officer.reference,
            alignment: "center",
            fontSize: 11,
          },
          {
            text: this.formatter(officer.amount),
            alignment: "right",
            fontSize: 11,
          },
        ]);
      });
      for (let i = 0; i < 3; i++) {
        document.content[3].table.body.push([{}, {}, {}]);
      }
      document.content[3].table.body.push([
        {
          text: "TOTAL DEPOSIT",
          alignment: "center",
          bold: true,
          fontSize: 11,
          colSpan: 2,
        },
        {},
        {
          text: this.cur_formatter(this.total_dep),
          alignment: "right",
          bold: true,
          fontSize: 11,
        },
      ]);

      document.content[4].table.body.push([
        {
          text: this.accountable_forms.name,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.beginning_bal.qty,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.beginning_bal.from,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.beginning_bal.to,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.receipt.qty,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.receipt.from,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.receipt.to,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.issued.qty,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.issued.from,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.issued.to,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.ending_bal.qty,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.ending_bal.from,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: this.accountable_forms.ending_bal.to,
          alignment: "center",
          fontSize: 10,
        },
      ]);

      for (let i = 0; i < 3; i++) {
        document.content[4].table.body.push([
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]);
      }

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
          message: `Generated Report ${this.control_number}`,
          color: "success",
          toggle: true,
        });
      }, 1000);
    },
    printPdf: function() {
      const c_report = this.$refs.collectorReport;
      let doc = c_report.contentWindow;
      if (doc != null) {
        doc.focus();
        doc.print();
      }
    },
    uploadPdf: async function() {
      // console.log(this.data_uri);
      let year = new Date().getFullYear();
      let m = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      let sec = new Date().getSeconds();

      if (m < 10) m = `0${m}`;

      const payments_id = this.tax_payments.map((p) => {
        return {
          id: p.id,
          category: p.category,
        };
      });

      const report_data = {
        ctrl_number: this.control_number,
        filename: `Collection_Report(${this.report_date})`,
        type: "collector",
        desc: `Collection`,
        note: "none",
        document: this.data_uri,
        serial_number: `${this.accountable_forms.issued.from}-${this.accountable_forms.issued.to}`,
        amount: this.total,
        added_by: this.$root.$user.id,
        payments_id: JSON.stringify(payments_id),
      };

      const credentials = new FormData();

      for (const name of Object.keys(report_data))
        credentials.append(name, report_data[name]);

      try {
        const { data } = await this.$axios.post(
          `/api/app/collector/report/upload`,
          credentials
        );

        this.$store.commit("snackBar/toggle", {
          message: `Uploaded ${data.ctrl_number}`,
          color: "success",
          toggle: true,
        });

        this.$emit("reportUploaded");

        setTimeout(() => {
          this.$emit("hidePdf");
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.generatePdf();
  },
};
</script>
