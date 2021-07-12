<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-sheet width="100%">
        <v-row class="pa-3">
          <v-col cols="8" class="pa-0 py-1 pr-1">
            <v-select
              v-model="business"
              :items="business_names"
              :error-messages="errors.business"
              :menu-props="{ bottom: true, offsetY: true }"
              prepend-inner-icon="mdi-store"
              label="Business Name"
              name="business"
              outlined
              dense
              hide-details
              hide-selected
              class="ma-0"
            >
            </v-select>
          </v-col>
          <v-col cols="4" class="pa-0 py-1 pl-1">
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
                ></v-text-field>
              </template>
              <v-date-picker v-model="fields.paid_at"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet width="100%">
        <v-row class="pa-3 pb-7" align="center">
          <v-col cols="3" class="pa-0 py-1 pr-1">
            <v-text-field
              label="Volume"
              hide-details
              outlined
              dense
              :error-messages="errors.volume"
              prepend-inner-icon="mdi-shovel"
              v-model="selected.volume"
            ></v-text-field>
          </v-col>
          <v-col cols="8" class="pa-0 py-1 px-1">
            <v-select
              v-model="selected.aggregate"
              :items="aggregates"
              :error-messages="errors.aggregate"
              :menu-props="{ bottom: true, offsetY: true }"
              prepend-inner-icon="mdi-earth-box"
              label="Aggregates"
              outlined
              dense
              hide-details
              hide-selected
              class="ma-0"
            >
            </v-select>
          </v-col>
          <v-col cols="1" class="d-flex justify-center pa-0 py-1">
            <v-btn
              @click="selectAggregate"
              color="success"
              icon
              tile
              :height="40"
              :width="40"
            >
              <v-icon x-large>
                mdi-plus-box
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
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
              <tr v-for="(item, index) in sel_aggregates" :key="index">
                <td class="pa-0 px-4">
                  {{ `Fair Market Value of ${item.material}` }}
                </td>
                <td class="pa-0 px-4">
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        hide-details
                        dense
                        v-model="item.rate"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>Sand and Gravel Tax Rate (% / 100)</td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="rates"
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
export default class SandGravelTax extends Vue {
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
  public errors: _object = {};
  public data: _object = {};
  public fields = {
    paid_at: new Date().toISOString().substr(0, 10),
  };
  public collections: _object[] = [];
  public payments: _object[] = [];
  public selected = {
    volume: 0,
    aggregate: "",
  };
  public business = "";
  public aggregate_business: _object[] = [];
  public selected_aggregates: _object[] = [];
  public sel_aggregates: _object[] = [];
  public penalty: _object = {};
  public market_values = [];
  public rates = 0;
  public account_code = "";
  public volume = 100;

  public aggregates = [
    {
      text: "Sand",
      value: "sand",
    },
    {
      text: "Gravel",
      value: "gravel",
    },
    {
      text: "Boulder",
      value: "boulder",
    },
    {
      text: "Earth Fill",
      value: "earth_fill",
    },
    {
      text: "Armour Rocks",
      value: "armour_rocks",
    },
    {
      text: "Pumice",
      value: "pumice",
    },
    {
      text: "Clay",
      value: "clay",
    },
    {
      text: "Perlite",
      value: "perlite",
    },
    {
      text: "Coal",
      value: "coal",
    },
    {
      text: "Limestone",
      value: "limestone",
    },
  ];

  private async getAggregateBusiness() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/sand-gravel-tax"
      );
      const penalty = await this.$axios.get(
        "/api/app/collector/penalties/sand-gravel-tax"
      );
      const businesses = await this.$axios.get(
        "/api/app/collector/businesses/sand-gravel-tax"
      );

      this.aggregate_business = businesses.data;
      this.penalty = penalty.data[0];
      this.market_values = data[0].rates.fair_market_value;
      this.rates = data[0].rates.rate;
      this.account_code = data[0].rates.account_code;
    } catch (error) {
      console.log(error);
    }
  }

  public selectAggregate() {
    if (
      this.selected.volume != 0 &&
      this.selected.aggregate != "" &&
      this.business != ""
    ) {
      this.errors = {};
      this.collections = [];
      this.sel_aggregates = [];
      this.selected_aggregates = this.selected_aggregates.filter(
        (sa) => sa.aggregate != this.selected.aggregate
      );
      this.selected_aggregates.push(this.selected);
      for (let i = 0; i < this.selected_aggregates.length; i++) {
        const sel_agg = this.selected_aggregates[i];
        let aggregate: _object = this.market_values.filter(
          (mv: _object) => mv.type == sel_agg.aggregate
        )[0];
        aggregate.volume = sel_agg.volume * 1;
        aggregate.id = i + 1;

        const collection: _object = Calculation.sandGravelTax(
          aggregate,
          aggregate.volume,
          this.rates
        );

        this.sel_aggregates.push(aggregate);
        this.collections.push(collection);
      }

      this.selected = {
        volume: 0,
        aggregate: "",
      };

      this.$emit("selectAggregate", this.collections);
    } else {
      this.errors = {
        volume: "Input volume.",
        aggregate: "This field is required.",
        business: "This field is required.",
      };
    }
  }

  private get business_names() {
    return this.aggregate_business.map((b) => {
      return {
        text: b.name,
        value: b.id,
      };
    });
  }

  private created() {
    this.getAggregateBusiness();
  }

  public cancelManualCalc() {
    this.manual_calc = false;
    this.getAggregateBusiness();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    this.sel_aggregates = this.sel_aggregates.map((a) => {
      return {
        id: a.id,
        material: a.material,
        type: a.type,
        rate: a.rate * 1,
        volume: a.volume,
      };
    });

    const rate = this.rates * 1;
    this.errors = {};
    this.collections = [];
    for (let i = 0; i < this.sel_aggregates.length; i++) {
      const aggregate = this.sel_aggregates[i];
      const collection: _object = Calculation.sandGravelTax(
        aggregate,
        aggregate.volume,
        rate
      );
      this.collections.push(collection);
    }
    this.cancelManualCalc();
    this.$emit("selectAggregate", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "sand_gravel_taxes") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "sand_gravel_taxes") {
      const { paid_at } = this.fields;
      if (this.collections.length > 0) {
        // let totals = [];
        const aggregates = this.collections.map((a) => {
          return {
            category: a.category,
            volume: a.volume,
            amount: a.items[0].amount,
          };
        });
        const total = this.collections
          .map((item) => {
            return item.items[0];
          })
          .reduce((total, curr) => {
            return total + curr.amount;
          }, 0);

        const data = {
          account_code: this.account_code,
          tax_due: aggregates,
          penalties: {
            account_code: "599A",
            penalties: [],
            amount: 0,
          },
          fees: {
            fees: [],
            amount: 0,
          },
        };

        const expired_at = Date.parse(paid_at) + 86399000;
        const eat = new Date(expired_at).toISOString();

        const payment_data: _object = {
          id: this.taxPayer.id,
          type: "tax",
          for: "sand-gravel-tax",
          data: JSON.stringify(data),
          amount: total,
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
            `/api/app/collector/payment/sand-gravel-tax`,
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
