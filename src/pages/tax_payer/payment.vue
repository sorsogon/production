<template>
  <v-container>
    <v-stepper 
      class="pa-0 transparent elevation-0"
      v-model="paymentStep">
      <v-stepper-items>
        <v-stepper-content class="pa-0 transparent" step="1">
          <SelectPaymentMethod v-on:proceed="onSelectedPaymentMethod" />
        </v-stepper-content>
        <v-stepper-content class="pa-0 transparent" step="2">
          <PaymentConfirmation />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    
    <v-overlay v-model="inProgressOverlay">
      <v-img max-width="200" src="@/assets/images/png/sorsogon-logo.png"></v-img>
      <div class="text-center mt-3">
        <span class="font-weight-medium text-body-1 mr-2">In progress...</span>             
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

import SelectPaymentMethod from '@/components/tax_payer/payment/SelectPaymentMethod.vue';
import PaymentConfirmation from '@/components/tax_payer/payment/PaymentConfirmation.vue';

@Component({
  components: {
    SelectPaymentMethod,
    PaymentConfirmation
  }
})
export default class PaymentPage extends Mixins(TaxpayerServiceMixin) {
  public inProgressOverlay = false;
  public result = null;
  public paymentStep = 1;
  public selectedPaymentMethod = null;

  public async onSelectedPaymentMethod(payment: _object) {
    switch(payment.method) {
    case 'paymaya':
      await this.onPayerTransactionSuccess();
      this.paymentStep++;
      break;
    case 'gcash':
      await this.onPayerTransactionSuccess();
      this.paymentStep++;
      break;
    case 'paypal':
      {
        window.removeEventListener('message', this.onMessageHandler, true);

        try {
          const { result } = payment.orders;
          const approve = result.links.find((el: _object) => el.rel === 'approve');
          this.result = result;

          console.log(this.result);

          window.open(approve.href, 'PaypalApprovePage');
          window.addEventListener('message', this.onMessageHandler, { once: true });
          this.inProgressOverlay = true;
        } catch(error) {
          console.log(error);
        }
      }
      break;
    }
  }

  private async onMessageHandler(e: MessageEvent) {
    e.stopPropagation();

    if (e.origin !== process.env.VUE_APP_AXIOS_API_BASE_URL) return;

    try {
      const { data: status } = e;
      if (e.data.message) throw e.data;

      if (status.abort) {
        this.$router.back();
        this.$store.commit('snackBar/toggle', {
          toggle: true,
          message: 'You have cancelled the payment process.',
          color: 'error'
        });
      } else {
        const formdata = new FormData();

        await this.onPayerTransactionSuccess();
        this.paymentStep++;
      }

      this.inProgressOverlay = false;
    } catch(error) {
      console.log(error);
    }
  }
}
</script>
