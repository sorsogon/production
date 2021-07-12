<template>
  <v-dialog v-model="paymentInfoModal" persistent max-width="450px">
    <v-card>
      <v-card-text class="py-6">
        <v-row>
          <v-sheet width="100%">
            <v-row>
              <v-col cols="4" class="d-flex justify-center align-center pt-6">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Coat_of_arms_of_the_Philippines.svg/1200px-Coat_of_arms_of_the_Philippines.svg.png"
                  alt="philippine_republic_logo"
                  width="100px"
                  height="100px"
                />
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="12" class="text-center pt-6"
                    ><span class="font-weight-bold">
                      Official Receipt of the Republic of the Philippines
                    </span></v-col
                  >
                  <v-col
                    cols="12"
                    class="d-flex justify-space-between pa-1 px-8"
                  >
                    <span class="font-weight-bold text-h6">No.</span>
                    <span class="text-h6">
                      {{ payment.or_number || "000000" }}
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex justify-space-between pa-1 px-8"
                  >
                    <span class="font-weight-bold">Date:</span>
                    <span class="font-weight-medium">
                      {{ payment.paid_at || date_now }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet width="100%" class="mt-6">
            <v-row>
              <v-col cols="12" class="d-flex justify-space-between pa-1 px-8">
                <span class="font-weight-bold">Agency:</span>
                <span class="font-weight-medium">
                  Provincial Government of Sorsogon
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-space-between pa-1 px-8">
                <span class="font-weight-bold">Payor:</span>
                <span class="font-weight-medium">
                  {{ payment.name || "" }}
                </span>
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet width="100%" class="mt-6">
            <v-row class="px-6">
              <v-sheet width="100%">
                <v-simple-table
                  dense
                  fixed-header
                  height="260px"
                  class="font-weight-medium"
                >
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">
                          Nature of Collection
                        </th>
                        <th class="text-center">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in payment.data.tax_due"
                        :key="index"
                      >
                        <td>{{ item.category.desc }}</td>
                        <td v-if="index == 0" class="text-right">
                          {{ currency_format.format(item.amount) }}
                        </td>
                        <td v-else class="text-right">
                          {{ number_format.format(item.amount) }}
                        </td>
                      </tr>
                      <tr
                        v-for="penalty in payment.data.penalties.penalties"
                        :key="penalty.desc"
                      >
                        <td>{{ penalty.desc }}</td>
                        <td class="text-right">
                          {{ number_format.format(penalty.amount) }}
                        </td>
                      </tr>
                      <tr v-for="fee in payment.data.fees.fees" :key="fee.desc">
                        <td>{{ fee.desc }}</td>
                        <td class="text-right">
                          {{ number_format.format(fee.amount) }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-sheet>
            </v-row>
          </v-sheet>
          <v-sheet width="100%" class="mt-8 px-8">
            <v-row>
              <h3>Total:</h3>
              <v-spacer></v-spacer>
              <h3 class="pr-2">
                {{ currency_format.format(payment.amount) }}
              </h3>
            </v-row>
          </v-sheet>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          v-if="toPrint"
          color="error"
          text
          type="button"
          @click.prevent="$emit('closeModal')"
        >
          Close
        </v-btn>
        <v-btn
          v-if="toPay"
          color="success"
          text
          type="button"
          @click.prevent="payTax"
        >
          Pay
        </v-btn>
        <v-btn
          v-else
          color="primary"
          text
          type="button"
          @click.prevent="$emit('closeModal')"
        >
          Print
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

interface Payment {
  id: number;
  name: string;
  mobile: string;
  paid_at: string;
  or_number: string;
  type: string;
  amount: number;
  surcharge: number;
  interest: number;
  tax_due: number;
}

@Component
export default class PaymentInfoModal extends Vue {
  @Prop() public paymentInfoModal!: boolean;
  @Prop() public readonly paymentInfo!: _object;

  public date_now = new Date().toISOString().substr(0, 10);
  public toPay = true;
  public toPrint = false;
  public payment_data: _object = {};

  public currency_format = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  public number_format = new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
  });

  private get payment() {
    let payment = {};
    if (this.toPay == true) {
      payment = this.paymentInfo;
    } else {
      payment = {
        amount: this.payment_data.amount,
        category: this.payment_data.for,
        data: this.payment_data.data,
        fees: this.payment_data.data.fees.amount,
        id: this.payment_data.id,
        mobile: this.payment_data.issued_to.mobile,
        name: this.payment_data.issued_to.name,
        paid_at: new Date(this.payment_data.paid_at)
          .toISOString()
          .substr(0, 10),
        penalties: this.payment_data.data.penalties.amount,
        status: this.payment_data.status,
        or_number: this.payment_data.or_number,
        tax_due:
          this.payment_data.amount -
          this.payment_data.data.penalties.amount -
          this.payment_data.data.fees.amount,
        type: this.paymentInfo.type,
      };
    }
    return payment;
  }

  public async payTax() {
    console.log(this.paymentInfo);
    let category = "";

    const payment_data: _object = {
      id: this.paymentInfo.id,
    };

    if (this.paymentInfo.category == "misc") {
      category = "accountable-forms";
    } else {
      category = this.paymentInfo.category;
    }

    const credentials = new FormData();

    for (const name of Object.keys(payment_data))
      credentials.append(name, payment_data[name]);

    try {
      const { data } = await this.$axios.post(
        `/api/app/cashier/payment/${category}`,
        credentials
      );
      console.log(data);
      this.toPay = false;
      this.toPrint = true;
      this.payment_data = data;
      this.$emit("payOnsite");
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style></style>
