<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-sheet width="100%">
        <v-col class="pa-0 pt-1">
          <v-select
            v-model="selectedVehicles"
            :items="vehicle_plate"
            :error-messages="errors.vehicle"
            :menu-props="{ bottom: true, offsetY: true }"
            label="Vehicles"
            prepend-inner-icon="mdi-truck-outline"
            outlined
            dense
            small-chips
            deletable-chips
            multiple
            hide-details="auto"
            class="ma-0"
            @change="onSelectVehicle"
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggle">
                <v-list-item-action>
                  <v-icon
                    :color="
                      selectedVehicles.length > 0 ? 'indigo darken-4' : ''
                    "
                  >
                    {{ icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Select All
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
      </v-sheet>
      <v-row>
        <v-col cols="6" class="pb-0 pr-1">
          <v-select
            outlined
            dense
            label="Due Year"
            prepend-inner-icon="mdi-calendar"
            :menu-props="{ bottom: true, offsetY: true }"
            :items="years"
            v-model="fields.due_at"
            name="year"
            hide-details="auto"
            @change="selectDate"
            class="py-2"
          ></v-select>
        </v-col>
        <v-col cols="6" class="px-3 pl-1 pb-0">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            :nudge-top="20"
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
              <tr v-for="(item, index) in sel_vehicles" :key="index">
                <td class="pa-0 px-4">
                  {{ `${item.plate_number} (${item.category.type})` }}
                </td>
                <td class="pa-0 px-4">
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        hide-details
                        dense
                        class="text-right"
                        v-model="item.category.rate"
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
                        class="text-right"
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
                        class="text-right"
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
                        class="text-right"
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
export default class AnnualTaxForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public menu = false;
  public manual_calc = false;
  public errors: _object = {};
  public data: _object = {};
  public fields = {
    due_at: new Date().getFullYear(),
    paid_at: new Date().toISOString().substr(0, 10),
  };
  public collections: _object[] = [];
  public payments: _object[] = [];
  public penalty: _object = {};
  public account_code = "";

  public selectedVehicles: string[] = [];
  public selected: _object[] = [];
  public sel_vehicles: _object[] = [];
  public vehicle_category: _object[] = [];
  public user_vehicles: _object[] = [];
  public fees: _object[] = [
    {
      account_code: "605A",
      desc: "Governor's Permit",
      amount: 1500,
    },
    {
      account_code: "605B",
      desc: "Sticker Fee",
      amount: 250,
    },
    {
      account_code: "613",
      desc: "Tax Clearance",
      amount: 100,
    },
  ];

  private selectDate() {
    this.menu = false;
    this.onSelectVehicle();
    if (this.selected.length == 0) {
      this.errors.vehicle = "This field is required.";
    }
  }

  private async getVehicles() {
    try {
      const { data } = await this.$axios.get(`/api/app/collector/vehicles`);
      const rates = await this.$axios.get(
        "api/app/collector/categories/annual-fixed-tax"
      );
      const penalty = await this.$axios.get(
        "/api/app/collector/penalties/annual-fixed-tax"
      );
      this.account_code = rates.data[0].rates.account_code;
      console.log(this.account_code);
      this.penalty = penalty.data[0];
      let user_vehicles = [];
      user_vehicles = data.vehicles;
      this.user_vehicles = user_vehicles.filter(
        (v: _object) => v.owned_by == this.taxPayer.user_id
      );
    } catch (error) {
      console.log(error);
    }
  }

  private onSelectVehicle() {
    this.selected = [];
    for (let i = 0; i < this.selectedVehicles.length; i++) {
      const v = this.selectedVehicles[i];
      const vehicle = this.user_vehicles.filter(
        (sv) => sv.plate_number == v
      )[0];
      this.selected.push(vehicle);
    }

    if (
      this.selected.length > 0 &&
      this.selected.length <= this.selectedVehicles.length
    ) {
      this.errors = {};
      this.collections = [];
      this.sel_vehicles = [];
      const { due_at, paid_at } = this.fields;
      let fees = [];

      for (let i = 0; i < this.fees.length; i++) {
        const f = this.fees[i];
        let fee = {
          account_code: "",
          desc: "",
          amount: 0,
        };
        if (f.desc == "Sticker Fee") {
          fee = {
            account_code: f.account_code,
            desc: f.desc,
            amount: f.amount * this.selected.length,
          };
        } else {
          fee = {
            account_code: f.account_code,
            desc: f.desc,
            amount: f.amount * 1,
          };
        }
        fees.push(fee);
      }

      this.collections.push({
        id: 0,
        items: fees,
      });

      for (let j = 0; j < this.selected.length; j++) {
        const s = this.selected[j];

        const collection: _object = Calculation.annualFixedTax(
          s,
          due_at,
          paid_at,
          this.penalty
        );

        this.sel_vehicles.push(s);
        this.collections.push(collection);
      }

      this.$emit("selectVehicle", this.collections);
    } else {
      this.$emit("clearCollection");
    }
  }

  private toggle() {
    this.$nextTick(() => {
      if (this.selectedAll) {
        this.selectedVehicles = [];
        this.onSelectVehicle();
      } else {
        this.selectedVehicles = this.vehicle_plate.slice();
        this.onSelectVehicle();
      }
    });
  }

  private get vehicle_plate() {
    return this.user_vehicles.map((v) => v.plate_number);
  }

  private get selectedAll() {
    return this.selectedVehicles.length === this.vehicle_plate.length;
  }

  private get selectedSome() {
    return this.selectedVehicles.length > 0 && !this.selectedAll;
  }

  private get icon() {
    if (this.selectedAll) return "mdi-close-box";
    if (this.selectedSome) return "mdi-minus-box";
    return "mdi-checkbox-blank-outline";
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
    this.getVehicles();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    this.sel_vehicles = this.sel_vehicles.map((v) => {
      return {
        category: {
          rate: v.category.rate * 1,
          type: v.category.type,
        },
        id: v.id,
        model: v.model,
        plate_number: v.plate_number,
      };
    });
    const penalty = {
      interest: this.penalty.interest * 1,
      surcharge: this.penalty.surcharge * 1,
      max_interest: this.penalty.max_interest * 1,
    };

    this.errors = {};
    this.collections = [];
    let fees = [];

    for (let i = 0; i < this.fees.length; i++) {
      const f = this.fees[i];
      let fee = {
        account_code: "",
        desc: "",
        amount: 0,
      };
      if (f.desc == "Sticker Fee") {
        fee = {
          account_code: f.account_code,
          desc: f.desc,
          amount: f.amount * this.selected.length,
        };
      } else {
        fee = {
          account_code: f.account_code,
          desc: f.desc,
          amount: f.amount * 1,
        };
      }
      fees.push(fee);
    }

    this.collections.push({
      id: 0,
      items: fees,
    });

    for (let i = 0; i < this.sel_vehicles.length; i++) {
      const s = this.sel_vehicles[i];

      const collection: _object = Calculation.annualFixedTax(
        s,
        this.fields.due_at,
        this.fields.paid_at,
        penalty
      );

      this.collections.push(collection);
    }

    this.cancelManualCalc();
    this.$emit("selectVehicle", this.collections);
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "annual_fixed_taxes") {
      // this.collections = [];
      const sel_veh = this.selected;
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

        const vehicles = this.collections
          .filter((v, i) => {
            return i != 0;
          })
          .map((v) => {
            return {
              category: v.category,
              vehicle: v.vehicle,
              amount: v.items[0].amount,
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
          tax_due: vehicles,
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
          for: "annual-fixed-tax",
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
            `/api/app/collector/payment/annual-fixed-tax`,
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

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "annual_fixed_taxes") {
      this.manual_calc = true;
    }
  }

  private created() {
    this.getVehicles();
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
