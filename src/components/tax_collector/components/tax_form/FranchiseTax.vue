<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-sheet width="100%">
        <v-col class="pa-0 pt-1" cols="12">
          <v-select
            outlined
            dense
            hide-selected
            :items="franchise_names"
            :error-messages="errors.franchise"
            :menu-props="{ bottom: true, offsetY: true }"
            prepend-inner-icon="mdi-storefront"
            label="Franchises"
            name="franchise"
            v-model="selected_franchise"
            hide-details="auto"
            class="ma-0"
            @change="onSelectFranchise"
          ></v-select>
        </v-col>
      </v-sheet>
      <v-sheet width="100%">
        <v-col class="pa-0 pt-2 pb-3" cols="12">
          <v-text-field
            label="Gross Annual Receipt"
            prepend-inner-icon="mdi-cash-multiple"
            dense
            outlined
            hide-details="auto"
            v-model="fields.gross_annual"
            class="text-right"
            @input="onSelectFranchise"
          ></v-text-field>
        </v-col>
      </v-sheet>
      <v-row>
        <v-col cols="6" class="py-0 pr-1">
          <v-select
            prepend-inner-icon="mdi-calendar"
            outlined
            dense
            label="Due Year"
            :items="years"
            v-model="fields.due_at"
            name="year"
            hide-details="auto"
            @change="selectDate"
            class="py-2"
          ></v-select>
        </v-col>
        <v-col cols="6" class="px-3 pl-1 py-0">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fields.paid_at"
                label="Payment Date"
                prepend-inner-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
                class="pt-2"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fields.paid_at"
              @input="selectDate"
            ></v-date-picker>
          </v-menu>
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
                <td class="pa-0 px-4">Franchise Tax Rate (% / 100)</td>
                <td class="pa-0 px-4">
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        hide-details
                        dense
                        v-model="rates.rate"
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
export default class FranchiseTaxForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public menu = false;
  public manual_calc = false;
  public errors: _object = {};
  public data: _object = {};
  public selected_franchise = "";
  public fields = {
    due_at: new Date().getFullYear(),
    paid_at: new Date().toISOString().substr(0, 10),
    gross_annual: 0,
  };
  public collections: _object[] = [];
  public payments: _object[] = [];
  public franchises: _object[] = [];
  public penalty: _object = {};
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
    this.onSelectFranchise();
  }

  private onSelectFranchise() {
    if (this.selected_franchise == "") {
      this.errors.franchise = "This field is required.";
    } else {
      this.errors = {};
      this.collections = [];
      const sel_franchise = this.franchises.filter(
        (f: _object) => f.id == this.selected_franchise
      )[0];
      const { due_at, paid_at, gross_annual } = this.fields;

      const collection: _object = Calculation.franchiseTax(
        sel_franchise,
        gross_annual,
        due_at,
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

      this.collections.push({
        id: 0,
        items: this.fees,
      });

      this.collections.push(collection);

      this.$emit("selectFranchise", this.collections);
    }
  }

  private async getFranchiseCategories() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/franchise-tax"
      );
      const penalty = await this.$axios.get(
        "/api/app/collector/penalties/franchise-tax"
      );
      const businesses = await this.$axios.get(
        "/api/app/collector/businesses/franchise-tax"
      );
      this.penalty = penalty.data[0];
      this.franchises = businesses.data;
      this.rates = data[0].rates;
      this.account_code = this.rates.account_code;
    } catch (error) {
      console.log(error);
    }
  }

  private created() {
    this.getFranchiseCategories();
  }

  private get franchise_names() {
    return this.franchises
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

  private get years() {
    const S = [];
    const current = new Date().getFullYear();
    for (let i = current - 1e2; i <= current; ++i) S[S.length] = i;
    return S.reverse();
  }

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

  public cancelManualCalc() {
    this.manual_calc = false;
    this.getFranchiseCategories();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    const penalty = {
      interest: this.penalty.interest * 1,
      surcharge: this.penalty.surcharge * 1,
      max_interest: this.penalty.max_interest * 1,
    };

    const rates = {
      rate: this.rates.rate * 1,
    };

    this.errors = {};
    this.collections = [];
    const sel_franchise = this.franchises.filter(
      (f: _object) => f.id == this.selected_franchise
    )[0];
    const { due_at, paid_at, gross_annual } = this.fields;

    const collection: _object = Calculation.franchiseTax(
      sel_franchise,
      gross_annual,
      due_at,
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

    this.collections.push({
      id: 0,
      items: this.fees,
    });

    this.collections.push(collection);

    this.cancelManualCalc();
    this.$emit("selectFranchise", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "franchise_taxes") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "franchise_taxes") {
      const { due_at, paid_at } = this.fields;
      if (this.collections.length > 0) {
        let totals = [];
        const other_fees = this.collections.filter((c) => c.id == 0)[0];
        const fees_total = other_fees.items.reduce(
          (total: number, curr: _object) => {
            return total + curr.amount;
          },
          0
        );
        const franchises = this.collections
          .filter((c) => c.id != 0)
          .map((f) => {
            return {
              category: f.category,
              business: f.business,
              amount: f.items[0].amount,
            };
          });

        for (let k = 0; k <= 2; k++) {
          const total = this.collections
            .filter((v, i) => {
              return i != 0;
            })
            .map((item) => {
              return item.items[k];
            })
            .reduce((total, curr) => {
              return total + curr.amount;
            }, 0);

          totals.push(total);
        }

        const data = {
          account_code: this.account_code,
          tax_due: franchises,
          penalties: {
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
          },
          fees: {
            fees: other_fees.items,
            amount: fees_total,
          },
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
          for: "franchise-tax",
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
          note: "none",
        };

        const credentials = new FormData();

        for (const name of Object.keys(payment_data))
          credentials.append(name, payment_data[name]);

        try {
          const { data } = await this.$axios.post(
            `/api/app/collector/payment/franchise-tax`,
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

<style></style>
