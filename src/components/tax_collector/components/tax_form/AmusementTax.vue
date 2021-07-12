<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-sheet width="100%">
        <v-col class="pa-0 pt-1" cols="12">
          <v-select
            outlined
            dense
            hide-selected
            :items="amusement_names"
            :error-messages="errors.amusement"
            :menu-props="{ bottom: true, offsetY: true }"
            prepend-inner-icon="mdi-city-variant"
            label="Amusement"
            name="amusement"
            v-model="selected_amusement"
            hide-details="auto"
            class="ma-0"
            @change="onSelectAmusement"
          ></v-select>
        </v-col>
      </v-sheet>
      <v-row class="pt-3 px-3">
        <v-col class="pa-0" cols="7">
          <v-text-field
            label="Amusement Tax Return"
            prepend-inner-icon="mdi-cash-multiple"
            dense
            outlined
            hide-details="auto"
            v-model="fields.tax_return"
            class="text-right pt-2 pr-1"
            @input="onSelectAmusement"
          ></v-text-field>
        </v-col>
        <v-col cols="5" class="pa-0">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            :nudge-left="100"
            :nudge-bottom="8"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fields.paid_at"
                label="Payment Date"
                prepend-inner-icon="mdi-calendar-today"
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
              v-model="fields.paid_at"
              @input="selectDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="py-0 pr-1">
          <v-select
            prepend-inner-icon="mdi-calendar-month"
            outlined
            dense
            label="Due Month"
            :items="months"
            v-model="fields.due_month"
            name="year"
            hide-details="auto"
            @change="selectDate"
            class="py-2"
          ></v-select>
        </v-col>
        <v-col cols="6" class="py-0 pl-1">
          <v-select
            prepend-inner-icon="mdi-calendar"
            outlined
            dense
            label="Due Year"
            :items="years"
            v-model="fields.due_year"
            name="year"
            hide-details="auto"
            @change="selectDate"
            class="py-2"
          ></v-select>
        </v-col>
      </v-row>
    </v-row>
    <v-row v-if="manual_calc == true" class="pb-3 pt-2 px-3">
      <v-sheet width="100%">
        <v-simple-table fixed-header dense height="265px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  Particular
                </th>
                <th class="text-center">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="pa-0 px-4">Municipality (% / 100)</td>
                <td class="pa-0 px-4">
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        hide-details
                        dense
                        v-model="rates.municipality"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td class="pa-0 px-4">Province (% / 100)</td>
                <td class="pa-0 px-4">
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        hide-details
                        dense
                        v-model="rates.province"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr v-for="item in fees" :key="item.desc">
                <td class="pa-0 px-4">
                  {{ item.desc }}
                </td>
                <td class="pa-0 px-4">
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        hide-details
                        dense
                        class="text-right"
                        v-model="item.amount"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>Surcharge (% / 100)</td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="penalty.surcharge"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>Interest (% / 100)</td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="penalty.interest"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>Maximum Interest (% / 100)</td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="penalty.max_interest"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-sheet>
      <v-row dense justify="end" class="my-2 mr-2">
        <v-btn
          color="error"
          type="button"
          small
          class="mx-1"
          @click="cancelManualCalc"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          type="button"
          small
          class="mx-1"
          @click="acceptManualCalc"
        >
          Accept
        </v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as Calculation from "@/services/calculation.service.ts";

@Component
export default class AmusementTaxForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public months = [
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
  ];
  public menu = false;
  public manual_calc = false;
  public data: _object = {};
  public errors: _object = {};
  public selected_amusement = "";
  public collections: _object[] = [];
  public payments: _object[] = [];
  public fields = {
    due_year: new Date().getFullYear(),
    due_month: this.months[new Date().getMonth()],
    paid_at: new Date().toISOString().substr(0, 10),
    tax_return: 0,
  };
  public penalty: _object = {};
  public amusements: _object[] = [];
  public rates: _object = {};
  public account_code = "";
  public fees: _object[] = [
    {
      account_code: "605A",
      desc: "Governor's Permit",
      amount: 1500,
    },
    {
      account_code: "613",
      desc: "Tax Clearance",
      amount: 100,
    },
  ];

  private selectDate() {
    this.menu = false;
    this.onSelectAmusement();
  }

  private get years() {
    const S = [];
    const current = new Date().getFullYear();
    for (let i = current - 1e2; i <= current; ++i) S[S.length] = i;
    return S.reverse();
  }

  private onSelectAmusement() {
    if (this.selected_amusement == "") {
      this.errors.amusement = "This field is required.";
    } else {
      this.errors = {};
      this.collections = [];
      const sel_amusement = this.amusements.filter(
        (f: _object) => f.id == this.selected_amusement
      )[0];
      const { due_year, paid_at, tax_return } = this.fields;
      const due_month = this.months.indexOf(this.fields.due_month) + 1;
      const paid_year = new Date(paid_at).getFullYear();
      const paid_month = new Date(paid_at).getMonth() + 1;

      const collection: _object = Calculation.amusementTax(
        sel_amusement,
        tax_return,
        due_year,
        due_month,
        paid_at,
        this.penalty,
        this.rates
      );

      this.fees = this.fees.map((f: _object) => {
        return {
          account_code: f.account_code,
          desc: f.desc,
          amount: f.amount * 1,
        };
      });

      if (paid_month == 1) {
        this.collections.push({
          id: 0,
          items: this.fees,
        });
      }

      this.collections.push(collection);

      this.$emit("selectAmusement", this.collections);
    }
  }

  private async getAmusementCategories() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/amusement-tax"
      );
      const penalty = await this.$axios.get(
        "/api/app/collector/penalties/amusement-tax"
      );
      const businesses = await this.$axios.get(
        "/api/app/collector/businesses/amusement-tax"
      );
      this.penalty = penalty.data[0];
      this.amusements = businesses.data;
      this.rates = data[0].rates.rates;
      this.account_code = data[0].rates.account_code;
    } catch (error) {
      console.log(error);
    }
  }

  private created() {
    this.getAmusementCategories();
  }

  private get amusement_names() {
    return this.amusements
      .map((f) => {
        return {
          text: f.name,
          value: f.id,
        };
      })
      .sort((a, b) => {
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
  }

  public cancelManualCalc() {
    this.manual_calc = false;
    this.getAmusementCategories();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    const penalty = {
      interest: this.penalty.interest * 1,
      surcharge: this.penalty.surcharge * 1,
      max_interest: this.penalty.max_interest * 1,
    };

    const rates = {
      municipality: this.rates.municipality * 1,
      province: this.rates.province * 1,
    };

    this.errors = {};
    this.collections = [];
    const sel_amusement = this.amusements.filter(
      (f: _object) => f.id == this.selected_amusement
    )[0];
    const { due_year, paid_at, tax_return } = this.fields;
    const due_month = this.months.indexOf(this.fields.due_month) + 1;
    const paid_year = new Date(paid_at).getFullYear();
    const paid_month = new Date(paid_at).getMonth() + 1;

    const collection: _object = Calculation.amusementTax(
      sel_amusement,
      tax_return,
      due_year,
      due_month,
      paid_at,
      penalty,
      rates
    );

    this.fees = this.fees.map((f: _object) => {
      return {
        account_code: f.account_code,
        desc: f.desc,
        amount: f.amount * 1,
      };
    });

    if (paid_month == 1) {
      this.collections.push({
        id: 0,
        items: this.fees,
      });
    }

    this.collections.push(collection);

    this.cancelManualCalc();
    this.$emit("selectAmusement", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "amusement_taxes") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "amusement_taxes") {
      const { paid_at } = this.fields;

      if (this.collections.length > 0) {
        let totals = [];
        let penalties: _object = {};
        let fees: _object = {};
        let fees_total = 0;

        const business = this.collections.filter(
          (c) => c.id == this.selected_amusement
        )[0];

        const other_fees = this.collections.filter((f) => f.id == 0)[0];

        if (other_fees != undefined) {
          fees_total = other_fees.items.reduce(
            (total: number, curr: _object) => {
              return total + curr.amount;
            },
            0
          );
          fees = {
            fees: other_fees.items,
            amount: fees_total,
          };
        } else {
          fees = {
            fees: [],
            amount: 0,
          };
        }

        if (business.items.length >= 1) {
          for (let k = 0; k <= business.items.length - 1; k++) {
            const total = business.items[k].amount;

            totals.push(total);
          }

          penalties = {
            account_code: "599A",
            penalties: [
              {
                desc: "Surcharge",
                amount: totals[1],
              },
              {
                desc: "Interest",
                amount: totals[2],
              },
            ],
            amount: totals[1] + totals[2],
          };
        } else {
          penalties = {
            penalties: [],
            amount: 0,
          };
        }

        const data = {
          account_code: this.account_code,
          tax_due: [
            {
              category: business.category,
              business: business.business,
              ga_receipt_value: this.fields.tax_return,
              amount: totals[0],
            },
          ],
          penalties: penalties,
          fees: fees,
        };

        const amount_total =
          fees_total +
          totals.reduce((total, curr) => {
            return total + curr;
          }, 0);

        const expired_at = Date.parse(paid_at) + 86399000;
        const eat = new Date(expired_at).toISOString();

        const payment_data: _object = {
          id: this.taxPayer.id,
          type: "tax",
          for: "amusement-tax",
          data: JSON.stringify(data),
          amount: amount_total,
          status: this.payment_mode,
          issued_by: this.$root.$user.id,
          issued_to: this.taxPayer.user_id,
          month: new Date(eat).getUTCMonth() + 1,
          day: new Date(eat).getUTCDate(),
          year: new Date(eat).getFullYear(),
          hour: new Date(eat).getUTCHours(),
          minute: new Date(eat).getUTCMinutes(),
          second: new Date(eat).getUTCSeconds(),
          note: "",
        };

        const credentials = new FormData();

        for (const name of Object.keys(payment_data))
          credentials.append(name, payment_data[name]);

        try {
          const { data } = await this.$axios.post(
            `/api/app/collector/payment/amusement-tax`,
            credentials
          );
          // console.log(data);
          this.$store.commit("snackBar/toggle", {
            message: `Payment is in progress.`,
            color: "success",
            toggle: true,
          });
          this.$emit("taxPayment", data);
        } catch (error) {
          console.log(error);
        }

        this.$emit("closeModal");
        this.payments = [];
        this.collections = [];
      }
    }
  }
}
</script>

<style scoped>
tbody tr td {
  font-size: 0.8rem !important;
  font-weight: 500 !important;
}
tbody tr td .v-input {
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  margin-bottom: 6px !important;
}
</style>
