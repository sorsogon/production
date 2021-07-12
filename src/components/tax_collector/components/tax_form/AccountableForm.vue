<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" class="pt-4 pb-0 pr-sm-1">
        <v-select
          dense
          hide-selected
          outlined
          :items="form_names"
          :error-messages="errors.accountable"
          :menu-props="{ bottom: true, offsetY: true }"
          label="Select Form"
          name="activities"
          v-model="selected_form"
          hide-details="auto"
          class="ma-0"
          @change="selectForm"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="5" class="pt-4 pb-0 pl-sm-1">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-bottom="8"
          :nudge-left="65"
          origin="top right"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fields.paid_at"
              label="Payment Date"
              outlined
              dense
              readonly
              hide-details
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fields.paid_at"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="px-3 pt-2 pb-3">
      <v-col cols="12" sm="6" class="pa-0 pr-sm-1">
        <v-text-field
          label="Serial No. (Start)"
          hide-details
          outlined
          dense
          :error-messages="errors.start"
          v-model="form_data.start"
          @input="selectForm"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pa-0 pt-2 pt-sm-0 pl-sm-1">
        <v-text-field
          label="Serial No. (End)"
          hide-details
          outlined
          dense
          :error-messages="errors.end"
          :value="serial_end"
        ></v-text-field>
      </v-col>
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
                <td>{{ `AF ${sel_form.type} Price` }}</td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="sel_form.price"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>Mark Up</td>
                <td>
                  <v-row dense justify="end">
                    <v-col cols="4" class="pa-0">
                      <v-text-field
                        dense
                        hide-details
                        v-model="mark_up"
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
export default class AccountableForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
  @Prop() public manualCalcType!: string;
  @Prop() public payment_mode!: string;

  public menu = false;
  public manual_calc = false;
  public data: _object = {};
  public errors: _object = {};
  public selected_form = "";
  public sel_form: _object = {};
  public collections: _object[] = [];
  public payments: _object[] = [];
  public accountable_category: _object[] = [];
  public fields = {
    paid_at: new Date().toISOString().substr(0, 10),
  };
  public mark_up = 0;
  public form_data: _object = {};

  private async getAccountableCategory() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/categories/accountable-forms"
      );
      this.accountable_category = data[0].rates.forms;
      this.mark_up = data[0].rates.mark_up_rate;
      this.form_data = this.taxPayer.data[0];
      this.selected_form = this.taxPayer.data[0].category.form.type;
    } catch (error) {
      console.log(error);
    }
  }

  private get form_names() {
    return this.accountable_category.map((ac) => {
      return {
        text: `AF ${ac.type}`,
        value: ac.type,
      };
    });
  }

  private get serial_end(): number {
    let end = 0;
    if (this.form_data.start != 0) {
      this.form_data.end =
        this.form_data.start - 1 + this.form_data.quantity * 1;
      end = this.form_data.end;
    } else {
      end = 0;
    }

    return end;
  }

  private selectForm() {
    if (
      this.form_data.start != 0 &&
      this.form_data.end != 0 &&
      this.selected_form != ""
    ) {
      this.collections = [];
      const ac_form = this.accountable_category.filter(
        (ac) => ac.type == this.selected_form
      )[0];

      this.form_data.start = this.form_data.start * 1;

      const serial_number = {
        start: this.form_data.start,
        end: this.serial_end,
      };

      const collection: _object = Calculation.accountableForm(
        ac_form,
        this.form_data,
        this.mark_up
      );

      this.sel_form = ac_form;
      this.collections.push(collection);
      this.$emit("selectForm", this.collections);
    }
  }

  private created() {
    this.getAccountableCategory();
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
    this.getAccountableCategory();
    this.$emit("cancelManualCalc");
  }

  public acceptManualCalc() {
    this.sel_form.price = this.sel_form.price * 1;
    this.mark_up = this.mark_up * 1;
    this.form_data.category = {
      form: this.sel_form,
      mark_up_rate: this.mark_up,
    };

    this.errors = {};
    this.collections = [];

    const collection: _object = Calculation.accountableForm(
      this.sel_form,
      this.form_data,
      this.mark_up
    );

    this.collections.push(collection);

    this.cancelManualCalc();
    this.$emit("selectForm", this.collections);
  }

  @Watch("manualCalcType")
  private onManualCalculation() {
    if (this.manualCalcType == "accountable_forms") {
      this.manual_calc = true;
    }
  }

  @Watch("savePaymentRoute")
  private async onSavePayment() {
    if (this.savePaymentRoute == "accountable_forms") {
      const { paid_at } = this.fields;
      if (this.collections.length > 0) {
        const total: number = this.collections[0].items.reduce(
          (total: _object, curr: _object) => {
            return total + curr.amount;
          },
          0
        );
        const penalties = {
          penalties: [],
          amount: 0,
        };
        const fees = {
          fees: [],
          amount: 0,
        };
        const data = {
          tax_due: [
            {
              category: this.form_data,
            },
          ],
          penalties: penalties,
          fees: fees,
        };

        const m = new Date(paid_at).getMonth();
        const payment_data: _object = {
          id: this.taxPayer.id,
          type: "document",
          for: "misc",
          _for: "accountable-forms",
          data: JSON.stringify(data),
          amount: total,
          status: this.payment_mode,
          issued_by: this.$root.$user.id,
          issued_to: this.taxPayer.user_id,
          note: "none",
        };

        const credentials = new FormData();

        for (const name of Object.keys(payment_data))
          credentials.append(name, payment_data[name]);

        try {
          const { data } = await this.$axios.post(
            `/api/app/collector/payment/accountable-forms`,
            credentials
          );
          // console.log(data);
          this.$store.commit("snackBar/toggle", {
            message: `Paid OR_${data.or_number}`,
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
