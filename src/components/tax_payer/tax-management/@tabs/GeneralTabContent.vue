<template>
  <v-sheet 
    width="100%"
    class="pa-0 transparent">
    <v-row no-gutters>
      <v-col cols="12" class="my-2 mb-0 px-1">
        <v-btn 
          depressed
          large
          width="100%"
          color="primary"
          class="font-weight-medium float-right"
          @click="$emit('paymentHistory')">
          <v-img 
            max-width="24"
            class="mr-2"
            src="@/assets/images/png/iconpack/recurring-payment.png"></v-img>
          View Payment History
        </v-btn>
      </v-col>

      <!-- <v-col cols="12" class="pa-0 mb-3">
        <ManagePendingTaxes />
      </v-col> -->

      <!-- Form for adding a new document to be verified -->
      <v-col 
        class="mt-2 px-1"
        cols="12">
        <h4 class="mb-1 mt-0 font-weight-medium main--text main--text primary--text">📌 Submit Document(s) for Validation</h4>
        <p class="text-caption font-weight-light ma-0">
          Deserunt laboris eu sit sunt esse cupidatat mollit id qui.
        </p>
        <AddNewTaxDocument />
      </v-col>

      <!-- Statistics and tables -->
      <v-col cols="12" class=" px-1 mt-3">
        <h4 class="mb-1 mt-0 font-weight-medium main--text main--text primary--text">🧾 Ready to Pay</h4>
        <p class="text-caption font-weight-light ma-0">
          Mollit adipisicing qui ipsum tempor magna ad est pariatur minim labore sunt excepteur. 
          Eu proident sunt occaecat eu elit dolore duis elit eu sint.
        </p>
      </v-col>

      <v-col cols="12" class="payable pa-0">
        <ManagePayableSets />
      </v-col>

      <v-col class="mt-2 px-1 my-1" cols="12">
        <TaxRecentPayment />
      </v-coL>

      <v-col
        class="mt-2 px-1 my-1 d-block d-sm-none d-md-none d-lg-none"
        cols="12">
        <PendingPaymentWidget />
      </v-coL>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import ManagePayableSets from '../manage/ManagePayableSets.vue';
import ManagePaymentHistory from '../manage/ManagePaymentHistory.vue';
import PendingPaymentWidget from '@/components/tax_payer/widgets/PendingPaymentWidget.vue';
import TaxRecentPayment from '../../statistics/TaxRecentPayment.vue';

/** Actions */
import AddNewTaxDocument from '../actions/docs/AddNewTaxDocument.vue';


@Component({
  components: { 
    ManagePayableSets,
    ManagePaymentHistory,
    AddNewTaxDocument,
    PendingPaymentWidget,
    TaxRecentPayment
  }
})
export default class GeneralTabContent extends Vue {
  
}
</script>

<style scoped>
.payable {
  overflow: auto;
}
</style>
