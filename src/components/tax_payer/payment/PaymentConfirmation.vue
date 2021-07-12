<template>
  <v-sheet
    class="pa-0 transparent d-flex justify-center">
    <v-row no-gutters class="d-inline-flex mt-11">
      <v-col cols="12" sm="5" class="d-flex mb-2 mb-sm-0 d-flex align-center justify-center justify-sm-end"> 
        <v-responsive
          class="mr-9"
          max-width="250">
          <v-img
            src="@/assets/images/png/iconpack/payment_completed.png"></v-img>
        </v-responsive>
      </v-col>
      <v-col cols="12" sm="6" class="px-3 px-sm-0 pb-3">
        <h4 class="text-h6 font-weight-medium">Payment Succesfully Completed!</h4>
        <p class="font-weight-light text-subtitle-2 pa-0 ma-0 mb-1 mt-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditate 
          delectus doloribus mollitia! Officia exercitationem.
        </p>
        
        <PreviewPaymentItem :item="$payment" />

        <v-btn
          width="100%"
          color="main primary"
          depressed
          large
          @click="onCompletePayment"
          class="float-right mt-4">Complete Payment 👍</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

import PreviewPaymentItem from '@/components/tax_payer/PreviewPaymentItem.vue';

@Component({
  components: {
    PreviewPaymentItem
  }
})
export default class PaymentConfirmation extends Mixins(TaxpayerServiceMixin) {

  public async onCompletePayment() {
    this.$store.commit('snackBar/toggle', {
      message: `The payment for OR#${ this.$payment?.or_number } was successful!`,
      color: 'success',
      toggle: true
    });

    this.$root.updateUserNotification();
    this.$router.back();
  }
}
</script>
