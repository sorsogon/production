<template>
  <v-sheet
    min-height="100%"
    class="pa-3 pt-2 rounded-lg elevation-2">
    <h4 class="mb-1 font-weight-medium main--text primary--text text-body-1">
      📅 Recent Payment
    </h4>
    <p class="mb-4 text-caption font-weight-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam soluta repellat sint quo ipsa sunt officia veniam quis itaque nisi. </p>
    <v-card 
      elevation="0"
      class="mx-auto">
      <v-data-table
        v-if="$recentPaymentData.length > 0"
        :items="$recentPaymentData"
        hide-default-footer
        :headers="headers">

        <template v-slot:item.issued_by="{ item }">
          <span class="font-weight-medium">{{ item.issued_by.name }}</span>
        </template>

        <template v-slot:item.amount="{ item }">
          <span class="font-weight-medium" v-html="$root.formatCurrency(item.amount)"></span>
        </template>
        
        <template v-slot:item.paid_at="{ item }">
          <v-chip small color="success">{{ new Date(item.paid_at) | formatDateString }}</v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <TaxRecentPaymentInfo :item="item" />
        </template>

      </v-data-table>
      <v-sheet
        v-else
        class="pa-lg-4 pa-md-4 pa-sm-4 transparent">
        <v-row no-gutters class="mx-lg-8 mx-md-8 mx-sm-8 mx-1">
          <v-col 
            cols="12" lg="auto" md="auto" sm="auto"
            class="flex-grow-0 d-flex justify-center">
            <v-img max-width="144" class="my-2" src="@/assets/images/png/iconpack/recurring-payment.png"></v-img>
          </v-col>
          <v-col 
            :class="{ 'justify-center': $vuetify.breakpoint.smAndDown }"
            class="ml-lg-6 ml-md-5 ml-sm-4 d-flex align-center">
            <p class="text-subtitle-2 pa-0 font-weight-light">
              There are currently no recent payment data.
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

import TaxRecentPaymentInfo from './TaxRecentPaymentInfo.vue';

@Component({
  components: {
    TaxRecentPaymentInfo
  }
})
export default class TaxRecentPayment extends Mixins(TaxpayerServiceMixin) {
  public async mounted() {
    await this.updateRecentPaymentData();
  }

  public headers = [
    { text: 'OR #', align: 'start', sortable: true, value: 'or_number' },
    { text: 'Collection Officer', align: 'start', sortable: true, value: 'issued_by' },
    { text: '(₱) Amount', align: 'start', sortable: true, value: 'amount' },
    { text: 'Payment Date', align: 'start', sortable: true, value: 'paid_at' },
    { text: 'Action', align: 'start', value: 'action' }
  ]

  @Watch('$route.params.category')
  async updateRecentPaymentData() {
    await this.getRecentPaymentData();
  }

  get $recentPaymentData() {
    return this.$payer.recentPaymentData;
  }
}
</script>
