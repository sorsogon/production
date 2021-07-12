<template>
  <v-sheet
    min-height="100%"
    class="pa-4 rounded-lg elevation-2">
    <h4 class="mb-1 font-weight-medium main--text primary--text text-body-1">
      Pending Payment
    </h4>
    <p class="mb-4 text-caption font-weight-regular">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam soluta repellat sint quo ipsa sunt officia veniam quis itaque nisi. </p>
    <v-card 
      rounded="lg"
      elevation="0"
      class="mx-auto">
      <v-simple-table v-if="$recentPaymentData.length != 0" class="transparent">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="main--text">Payment#</th>
              <th class="main--text" v-if="$route.params.category == 'annual-fixed-tax'">Plate Number</th>
              <th class="main--text" v-if="$route.params.category == 'amusement-tax'">Name</th>
              <th class="main--text">Amount</th>
              <th class="main--text">Surcharge</th>
              <th class="main--text">Interest</th>
              <th class="main--text">Subtotal</th>
              <th class="main--text">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in $recentPaymentData" 
              :key="item.id">
              <td class="font-weight-medium">{{ item.id }}</td>
              <td class="text-caption" v-if="$route.params.category == 'annual-fixed-tax'">{{ item.plate_number }}</td>
              <td class="text-caption" v-if="$route.params.category == 'amusement-tax' && item.amusement">{{ item.amusement.name }}</td>
              <td class="text-caption">₱ {{ item.amount }}</td>
              <td class="text-caption">₱ {{ item.surcharge }}</td>
              <td class="text-caption">₱ {{ item.interest }}</td>
              <td class="text-caption">₱ {{ item.amount+item.surcharge+item.interest }}</td>
              <td class="text-caption">
                <v-chip color="success" small>{{ item.paid_at ? new Date(item.paid_at).toDateString() : '' }}</v-chip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-sheet
        v-else
        class="pa-lg-4 pa-md-4 pa-sm-4 transparent">
        <v-row no-gutters class="mx-lg-8 mx-md-8 mx-sm-8 mx-1">
          <v-col 
            cols="12" lg="auto" md="auto" sm="auto"
            class="flex-grow-0 d-flex justify-center">
            <v-img max-width="144" class="my-2" src="@/assets/images/png/iconpack/recurring-payment.png"></v-img>
          </v-col>
          <v-col class="ml-lg-6 ml-md-5 ml-sm-4 d-flex align-center">
            <p class="text-subtitle-2 pa-0">
              You currently don't have any recent payment(s) made in our online tax portal.
              <span class="text-caption font-weight-thin">(Note: Once you made a payment it'll be shown here)</span>
            </p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class TaxRecentPayment extends Mixins(TaxpayerServiceMixin) {
  
  get $recentPaymentData() {
    return this.$payer.recentPaymentData;
  }


  public async mounted() {
    await this.getRecentPaymentData();
  }

  @Watch('$route')
  async updateRecentPaymentData() {
    await this.getRecentPaymentData();
  }
}
</script>

<style lang="postcss" scoped>

</style>
