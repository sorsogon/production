<template>
  <v-sheet class="pa-1 transparent">
    <v-row 
      no-gutters
      >
      <v-col cols="12">
        <h4 class="mb-1 font-weight-medium main--text main--text d-flex align-center primary--text">
          <v-icon class="mr-1 main--text primary--text">mdi-history</v-icon> View Payment History
        </h4>
        <p class="text-caption font-weight-light ma-0">
          Mollit adipisicing qui ipsum tempor magna ad est pariatur minim labore sunt excepteur.
        </p>
      </v-col>
      <v-col cols="12" class="my-2">
        <v-btn 
          depressed
          large
          width="100%"
          color="primary"
          class="font-weight-medium float-right"
          @click="$emit('goBack')">
          Go Back
        </v-btn>
      </v-col>
      <v-col cols="12" class="mt-2">
        <v-list 
          class="pa-0 rounded-lg" 
          dense 
          elevation="2">
          <span
            v-for="(item, i) in $recentPaymentData"
            :key="item.id">
            <v-list-item 
              class="d-flex px-4 py-2">
              <v-row no-gutters>
                <v-col cols="auto">
                  <v-img 
                    max-width="40"
                    max-height="40"
                    :title="item.issued_by.name"
                    class="rounded-circle"
                    :src="item.issued_by.avatar"></v-img>
                </v-col>
                <v-col>
                  <v-row no-gutters class="mx-3">
                    <v-col cols="12" class="text-caption text-sm-subtitle-2 d-flex mb-2">
                      <span class="font-weight-light">Verified by</span>
                      <v-spacer></v-spacer>
                      <strong class="pa-0">{{ item.issued_by.email }}</strong>
                    </v-col>
                    <v-col cols="12">
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12" class="text-caption text-sm-subtitle-2 mt-1 d-flex">
                      <span class="font-weight-light">Payment Date</span>
                      <v-spacer></v-spacer>
                      <strong class="pa-0">
                        <v-chip color="success" small>{{ new Date(item.paid_at) | formatDateString }}</v-chip>
                      </strong>
                    </v-col>
                    <v-col cols="12" class="text-caption text-sm-subtitle-2 d-flex">
                      <span class="font-weight-light">Total Amount</span>
                      <v-spacer></v-spacer>
                      <strong class="pa-0 text-subtitle-1 font-weight-medium" v-html="$root.formatCurrency(item.amount)"></strong>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="auto" class="d-flex flex-column">
                  <PaymentInfo :item="item" />
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider v-if="i != $recentPaymentData.length-1"></v-divider>
          </span>
        </v-list>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import TaxpayerServiceMixin from '@/services/payer.service.ts';

import PaymentInfo from './PaymentInfo.vue';

@Component({
  components: { PaymentInfo }
})
export default class PaymentHistoryTabContent extends Mixins(TaxpayerServiceMixin) {

  public async created() {
    await this.getPaymentHistory();

    console.log(this.$recentPaymentData);
  }

  get $recentPaymentData() {
    return this.$payer.recentPaymentData ?? [];
  }
}
</script>
