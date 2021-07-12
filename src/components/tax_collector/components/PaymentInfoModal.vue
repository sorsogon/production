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
                      {{ paymentInfo.or_number || "000000" }}
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex justify-space-between pa-1 px-8"
                  >
                    <span class="font-weight-bold">Date:</span>
                    <span class="font-weight-medium">
                      {{ paymentInfo.paid_at || "" }}
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
                  {{ paymentInfo.name || "" }}
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
                        v-for="(item, index) in paymentInfo.data.tax_due"
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
                        v-for="penalty in paymentInfo.data.penalties.penalties"
                        :key="penalty.desc"
                      >
                        <td>{{ penalty.desc }}</td>
                        <td class="text-right">
                          {{ number_format.format(penalty.amount) }}
                        </td>
                      </tr>
                      <tr
                        v-for="fee in paymentInfo.data.fees.fees"
                        :key="fee.desc"
                      >
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
                {{ currency_format.format(paymentInfo.amount) }}
              </h3>
            </v-row>
          </v-sheet>
          <v-sheet width="100%" class="mt-6 px-6">
            <v-row align="center">
              <v-col cols="4" class="font-weight-bold">Amount in Words</v-col>
              <v-col
                cols="8"
                class="text-right font-italic font-weight-medium blue--text text-caption text-uppercase"
              >
                {{ `"${cur_convert(paymentInfo.amount)}"` }}
              </v-col>
            </v-row>
          </v-sheet>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="error"
          text
          type="button"
          @click.prevent="$emit('closeModal')"
        >
          Close
        </v-btn>
        <v-btn
          color="success"
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

  public currency_format = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  public number_format = new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
  });

  public to_words(amount: any) {
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
      let n_array: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
      let value: any = "";
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
  }

  public cur_convert(n: any) {
    let op;
    let nums: any[] = n.toString().split(".");
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
        op = "Error : Amount in number appears to be incorrect. Please Check.";
      }
    }
    return op;
  }
}
</script>

<style></style>
