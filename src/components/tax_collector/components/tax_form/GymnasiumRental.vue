<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-row align-content="center">
        <v-col cols="9" class="pt-4 pb-0 pl-3 pr-1">
          <v-select
            dense
            hide-selected
            outlined
            :items="activity_names"
            :error-messages="errors.activity"
            :menu-props="{ bottom: true, offsetY: true }"
            prepend-inner-icon="mdi-basketball-hoop"
            label="Select Activity"
            name="activities"
            v-model="selected_activity"
            hide-details="auto"
            class="ma-0"
            @change="onSelectActivity"
          ></v-select>
        </v-col>
        <v-col cols="3" class="pt-5 pb-0 pl-1 pr-3">
          <v-checkbox
            class="ma-0"
            hide-details
            v-model="with_ac"
            label="With A/C"
            @change="onSelectActivity"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="pb-0 pr-1 pt-0">
          <v-text-field
            outlined
            dense
            prepend-inner-icon="mdi-clock"
            label="Duration (hours)"
            name="hours"
            v-model="duration"
            @input="onSelectActivity"
            class="py-2"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="px-3 pl-1 pb-0 pt-0">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-top="20"
            transition="scale-transition"
            offset-y
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
                <td>
                  {{
                    `Gymnasium Rental Fee for ${sel_activity.activity} with A/C`
                  }}
                </td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="sel_activity.rates.with_ac"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>
                  {{
                    `Gymnasium Rental Fee for ${sel_activity.activity} without A/C`
                  }}
                </td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="sel_activity.rates.wout_ac"
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
export default class GymnasiumRental extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public menu = false;
  public manual_calc = false;
  public data: _object = {};
  public errors: _object = {};
  public selected_activity = "";
  public sel_activity: _object = {};
  public with_ac = true;
  public duration = 0;
  public collections: _object[] = [];
  public payments: _object[] = [];
  public fields = {
    due_at: new Date().getFullYear(),
    paid_at: new Date().toISOString().substr(0, 10),
  };

  private selectDate() {
    this.menu = false;
    // this.onSelectProfession();
  }

  public activities: _object[] = [];

  private async getRentalCategories() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/gymnasium-rental"
      );
      this.activities = data[0].rates.rates.map((a: _object, i: number) => {
        return {
          activity: a.activity,
          id: i + 1,
          rates: a.rates,
        };
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  private onSelectActivity() {
    if (this.selected_activity != "") {
      this.errors = {};
      this.collections = [];

      const activity = this.activities.filter(
        (a) => a.id == parseInt(this.selected_activity)
      )[0];

      const collection: _object = Calculation.spaceRentalTax(
        activity,
        this.duration,
        this.with_ac
      );

      this.sel_activity = activity;
      this.collections.push(collection);

      this.$emit("selectActivity", this.collections);
    } else {
      this.errors.activity = "This field is required.";
    }
  }

  private get activity_names() {
    return this.activities
      .map((a) => {
        return {
          text: a.activity,
          value: a.id,
        };
      })
      .sort();
  }

  private created() {
    this.getRentalCategories();
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
    this.getRentalCategories();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    this.errors = {};
    this.collections = [];
    const activity = {
      activity: this.sel_activity.activity,
      id: this.sel_activity.id,
      rates: {
        with_ac: this.sel_activity.rates.with_ac * 1,
        wout_ac: this.sel_activity.rates.wout_ac * 1,
      },
    };

    const collection: _object = Calculation.spaceRentalTax(
      activity,
      this.duration,
      this.with_ac
    );

    this.collections.push(collection);

    this.cancelManualCalc();
    this.$emit("selectActivity", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "gymnasium_rentals") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "gymnasium_rentals") {
      console.log(this.collections);
      const { paid_at, due_at } = this.fields;
      if (this.collections.length > 0) {
        const activities = this.collections.map((a) => {
          return {
            category: a.category,
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
          account_code: "642A",
          tax_due: activities,
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
          for: "gymnasium-rental",
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
            `/api/app/collector/payment/gymnasium-rental`,
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
