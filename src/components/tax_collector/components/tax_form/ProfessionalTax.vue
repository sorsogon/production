<template>
  <v-container>
    <v-row class="pa-3 pb-0">
      <v-sheet width="100%">
        <v-col class="pa-0 pt-1">
          <v-combobox
            dense
            hide-selected
            outlined
            multiple
            small-chips
            deletable-chips
            :items="professional_title"
            :error-messages="errors.profession"
            prepend-inner-icon="mdi-account-tie"
            label="Profession"
            name="profession"
            v-model="selected_prof"
            hide-details="auto"
            class="ma-0"
            @change="onSelectProfession"
          ></v-combobox>
        </v-col>
      </v-sheet>
      <v-row>
        <v-col cols="12" sm="6" class="pb-0 pr-sm-1">
          <v-select
            outlined
            dense
            label="Due Year"
            :items="years"
            v-model="fields.due_at"
            prepend-inner-icon="mdi-calendar"
            name="year"
            hide-details="auto"
            @change="selectDate"
            class="py-sm-2 pt-2"
            :menu-props="{ bottom: true, offsetY: true }"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" class="px-3 pl-sm-1 pt-2 pb-0">
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
                prepend-inner-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
                class="pt-sm-3"
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
              <tr v-for="(item, index) in sel_professions" :key="index">
                <td class="pa-0 px-4">{{ item.title }}</td>
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
export default class ProfessionalTaxForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public menu = false;
  public manual_calc = false;
  public data: _object = {};
  public errors: _object = {};
  public selected_prof = [];
  public sel_professions: _object[] = [];
  public collections: _object[] = [];
  public payments: _object[] = [];
  public fields = {
    due_at: new Date().getFullYear(),
    paid_at: new Date().toISOString().substr(0, 10),
  };
  public penalty: _object = {};
  public professional_category: _object[] = [];
  public account_code = "";

  private selectDate() {
    this.menu = false;
    this.onSelectProfession();
  }

  private onSelectProfession() {
    if (this.selected_prof.length == 0) {
      this.errors.profession = "This field is required.";
    } else {
      this.errors = {};
      this.collections = [];
      this.sel_professions = [];
      for (let i = 0; i < this.selected_prof.length; i++) {
        const s = this.selected_prof[i];

        const sel_prof = this.professional_category.filter(
          (prof: _object) => prof.title == s
        )[0];

        const collection: _object = Calculation.professionalTax(
          sel_prof,
          this.fields.due_at,
          this.fields.paid_at,
          this.penalty
        );

        this.sel_professions.push(sel_prof);
        this.collections.push(collection);
      }

      this.$emit("selectProfession", this.collections);
    }
  }

  private async getProfessionCategory() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/professional-tax"
      );
      const penalty = await this.$axios.get(
        "/api/app/collector/penalties/professional-tax"
      );
      this.penalty = penalty.data[0];
      const rates = data.filter((d: _object) => d.for == "professional-tax")[0]
        .rates;
      this.professional_category = rates.rates;
      this.account_code = rates.account_code;
    } catch (error) {
      console.log(error);
    }
  }

  private created() {
    this.getProfessionCategory();
  }

  private get professional_title() {
    return this.professional_category.map((p) => p.title).sort();
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
    this.getProfessionCategory();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    this.sel_professions = this.sel_professions.map((p) => {
      return {
        rate: p.rate * 1,
        title: p.title,
      };
    });
    const penalty = {
      interest: this.penalty.interest * 1,
      surcharge: this.penalty.surcharge * 1,
      max_interest: this.penalty.max_interest * 1,
    };

    this.errors = {};
    this.collections = [];
    for (let i = 0; i < this.sel_professions.length; i++) {
      const s = this.sel_professions[i];

      const collection: _object = Calculation.professionalTax(
        s,
        this.fields.due_at,
        this.fields.paid_at,
        penalty
      );

      this.collections.push(collection);
    }

    this.cancelManualCalc();
    this.$emit("selectProfession", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "professional_taxes") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "professional_taxes") {
      const { paid_at, due_at } = this.fields;

      if (this.collections.length > 0) {
        let totals = [];
        const professions = this.collections.map((v) => {
          return {
            category: v.category,
            amount: v.items[0].amount,
          };
        });
        for (let k = 0; k <= 2; k++) {
          const total = this.collections
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
          tax_due: professions,
          penalties: {
            account_code: "599B",
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
            fees: [],
            amount: 0,
          },
        };

        const amount_total = totals.reduce((total, curr) => {
          return total + curr;
        }, 0);

        const expired_at = Date.parse(paid_at) + 86399000;
        const eat = new Date(expired_at).toISOString();

        const payment_data: _object = {
          id: this.taxPayer.id,
          type: "tax",
          for: "professional-tax",
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
            `/api/app/collector/payment/professional-tax`,
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
