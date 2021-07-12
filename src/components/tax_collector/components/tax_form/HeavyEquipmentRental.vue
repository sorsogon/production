<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-sheet width="100%">
        <v-col class="pa-0 py-1" cols="12">
          <v-select
            outlined
            dense
            hide-selected
            :items="equipment_names"
            :error-messages="errors.equipment"
            :menu-props="{ bottom: true, offsetY: true }"
            prepend-inner-icon="mdi-tow-truck"
            label="Heavy Equipment"
            name="equipment"
            v-model="selected_equipment"
            hide-details="auto"
            class="ma-0"
            @change="selectEquipment"
          ></v-select>
        </v-col>
      </v-sheet>
      <v-row class="pa-3">
        <v-col class="pa-0 py-1 pr-sm-1" cols="4">
          <v-text-field
            v-if="!showTrip"
            label="Duration"
            name="duration"
            hide-details
            outlined
            dense
            type="number"
            :error-messages="errors.trip"
            prepend-inner-icon="mdi-clock"
            v-model="selected1.trip"
            @input="selectEquipment"
          ></v-text-field>
          <v-select
            v-if="showTrip"
            outlined
            dense
            hide-selected
            :items="trips"
            :error-messages="errors.unit"
            :menu-props="{ bottom: true, offsetY: true }"
            label="Trip"
            name="trip"
            v-model="selected2.trip"
            hide-details="auto"
            class="ma-0"
            @change="selectEquipment"
          ></v-select>
        </v-col>
        <v-col class="pa-0 py-1 px-sm-1" cols="3">
          <v-select
            v-if="!showTrip"
            outlined
            dense
            hide-selected
            :items="dur_units"
            :error-messages="errors.unit"
            :menu-props="{ bottom: true, offsetY: true }"
            label="Unit"
            name="unit"
            v-model="selected1.unit"
            hide-details="auto"
            class="ma-0"
            @change="selectEquipment"
          ></v-select>
          <v-select
            v-if="showTrip"
            outlined
            dense
            hide-selected
            :items="trip_units"
            :error-messages="errors.unit"
            :menu-props="{ bottom: true, offsetY: true }"
            label="Unit"
            name="unit"
            v-model="selected2.unit"
            hide-details="auto"
            class="ma-0"
            @change="selectEquipment"
          ></v-select>
        </v-col>
        <v-col cols="5" class="pa-0 py-1 pl-sm-1">
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
                <td>
                  {{
                    `Hourly Rental Fee for ${sel_equipment.type}(${sel_equipment.capacity})`
                  }}
                </td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="sel_equipment.rates.hourly"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>
                  {{
                    `Daily Rental Fee for ${sel_equipment.type}(${sel_equipment.capacity})`
                  }}
                </td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="sel_equipment.rates.daily"
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
export default class HeavyEquipmentRental extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public menu = false;
  public manual_calc = false;
  public errors: _object = {};
  public data: _object = {};
  public selected_equipment = "";
  public sel_equipment: _object = {};
  public selected1 = {
    trip: 0,
    unit: "",
  };
  public selected2 = {
    trip: "",
    unit: "",
  };
  public showTrip = false;
  public collections: _object[] = [];
  public payments: _object[] = [];
  public fields = {
    due_at: new Date().getFullYear(),
    paid_at: new Date().toISOString().substr(0, 10),
  };

  public heavy_equipments = [
    {
      id: 1,
      type: "Stake Truck",
      capacity: "3-5 cu.m",
      rates: {
        hourly: 450,
        daily: 3500,
      },
    },
    {
      id: 2,
      type: "Stake Truck",
      capacity: "6-8 cu.m",
      rates: {
        hourly: 700,
        daily: 6500,
      },
    },
    {
      id: 3,
      type: "Dump Truck",
      capacity: "6W",
      rates: {
        hourly: 1100,
        daily: 8500,
      },
    },
    {
      id: 4,
      type: "Dump Truck",
      capacity: "10W",
      rates: {
        hourly: 2000,
        daily: 15500,
      },
    },
    {
      id: 5,
      type: "Road Grader",
      capacity: "135 hp",
      rates: {
        hourly: 1900,
        daily: 14500,
      },
    },
    {
      id: 6,
      type: "Tractor Head w/ Lowbed Trailer",
      capacity: "10W",
      rates: {
        below_30: {
          per_trip: 15500,
          round_trip: 20500,
        },
        sor_bulan: {
          per_trip: 25500,
          round_trip: 35500,
        },
        bcl_mnl: {
          per_trip: 121000,
          round_trip: 242000,
        },
      },
    },
  ];

  public dur_units = [
    {
      text: "hour",
      value: "hourly",
    },
    {
      text: "day",
      value: "daily",
    },
  ];

  public trip_units = [
    {
      text: "trip",
      value: "per_trip",
    },
    {
      text: "round trip",
      value: "round_trip",
    },
  ];

  public trips = [
    {
      text: "Below 30km",
      value: "below_30",
    },
    {
      text: "Sorsogon City - Bulan",
      value: "sor_bulan",
    },
    {
      text: "Bicol - Manila",
      value: "bcl_mnl",
    },
  ];

  private async getHeavyEquipmentCategories() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/heavy-equipment-rental"
      );
      // this.heavy_equipments = data[0].rates.map((e: _object, i: number) => {
      //   return {
      //     id: i + 1,
      //     capacity: e.capacity,
      //     rates: e.rates,
      //     type: e.type,
      //   };
      // });
    } catch (error) {
      console.log(error);
    }
  }

  private get equipment_names() {
    return this.heavy_equipments.map((e: _object) => {
      return {
        text: `${e.type} (${e.capacity})`,
        value: e.id,
      };
    });
  }

  private selectEquipment() {
    if (this.selected_equipment == "") {
      this.errors.equipment = "This field is required.";
    } else {
      this.errors = {};
      this.collections = [];
      let rate = 0;
      let trip: string | number = "";
      let unit = "";
      let is_per_trip = false;

      const sel_eqp: _object = this.heavy_equipments.filter(
        (eq: _object) => eq.id == this.selected_equipment
      )[0];

      if (
        sel_eqp.type == "Tractor Head w/ Lowbed Trailer" &&
        sel_eqp.capacity == "10W"
      ) {
        this.showTrip = true;
        if (this.selected2.trip != "" && this.selected2.unit != "") {
          rate = sel_eqp.rates[this.selected2.trip][this.selected2.unit];
          is_per_trip = true;
          if (this.selected2.trip == "below_30") {
            trip = "Below 30km";
          } else if (this.selected2.trip == "sor_bulan") {
            trip = "Sorsogon City - Bulan";
          } else if (this.selected2.trip == "bcl_mnl") {
            trip = "Bicol - Manila";
          }

          if (this.selected2.unit == "per_trip") {
            unit = "Trip(s)";
          } else if (this.selected2.unit == "round_trip") {
            unit = "Round Trip(s)";
          }
        }
      } else {
        this.showTrip = false;
        if (this.selected1.trip > 0 && this.selected1.unit != "") {
          rate = sel_eqp.rates[this.selected1.unit];
          trip = this.selected1.trip * 1;
          is_per_trip = false;
          if (this.selected1.unit == "hourly") {
            unit = "Hour(s)";
          } else if (this.selected1.unit == "daily") {
            unit = "Day(s)";
          }
        }
      }

      const collection: _object = Calculation.heavyEquipmentRental(
        sel_eqp,
        rate,
        trip,
        unit,
        is_per_trip
      );

      this.sel_equipment = sel_eqp;
      this.collections.push(collection);

      this.$emit("selectEquipment", this.collections);
    }
  }

  private created() {
    this.getHeavyEquipmentCategories();
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
    this.getHeavyEquipmentCategories();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    this.errors = {};
    this.collections = [];
    let rate = 0;
    let trip: string | number = "";
    let unit = "";
    let is_per_trip = false;

    const sel_eqp: _object = {
      capacity: this.sel_equipment.capacity,
      id: this.sel_equipment.id,
      rates: {
        hourly: this.sel_equipment.rates.hourly * 1,
        daily: this.sel_equipment.rates.daily * 1,
      },
      type: this.sel_equipment.type,
    };

    if (
      sel_eqp.type == "Tractor Head w/ Lowbed Trailer" &&
      sel_eqp.capacity == "10W"
    ) {
      this.showTrip = true;
      if (this.selected2.trip != "" && this.selected2.unit != "") {
        rate = sel_eqp.rates[this.selected2.trip][this.selected2.unit];
        is_per_trip = true;
        if (this.selected2.trip == "below_30") {
          trip = "Below 30km";
        } else if (this.selected2.trip == "sor_bulan") {
          trip = "Sorsogon City - Bulan";
        } else if (this.selected2.trip == "bcl_mnl") {
          trip = "Bicol - Manila";
        }

        if (this.selected2.unit == "per_trip") {
          unit = "Trip(s)";
        } else if (this.selected2.unit == "round_trip") {
          unit = "Round Trip(s)";
        }
      }
    } else {
      this.showTrip = false;
      if (this.selected1.trip > 0 && this.selected1.unit != "") {
        rate = sel_eqp.rates[this.selected1.unit];
        trip = this.selected1.trip * 1;
        is_per_trip = false;
        if (this.selected1.unit == "hourly") {
          unit = "Hour(s)";
        } else if (this.selected1.unit == "daily") {
          unit = "Day(s)";
        }
      }
    }

    const collection: _object = Calculation.heavyEquipmentRental(
      sel_eqp,
      rate,
      trip,
      unit,
      is_per_trip
    );

    this.collections.push(collection);

    this.cancelManualCalc();
    this.$emit("selectEquipment", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "heavy_equipment_rentals") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "heavy_equipment_rentals") {
      const { paid_at, due_at } = this.fields;

      if (this.collections.length > 0) {
        const equipments = this.collections.map((e) => {
          return {
            category: e.category,
            trip: e.trip,
            amount: e.items[0].amount,
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
          account_code: "642C",
          tax_due: equipments,
          penalties: {
            account_code: "599C",
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
          type: "rental",
          for: "heavy-equipment-rental",
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
            `/api/app/collector/payment/heavy-equipment-rental`,
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
