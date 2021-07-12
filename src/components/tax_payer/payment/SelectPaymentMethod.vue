<template>
  <v-sheet
    v-if="$payment"
    class="pa-1 transparent">
    <v-form
      ref="form"
      @submit.prevent="">
      <h4 class="font-weight-medium text-body-1 text-capitalize d-flex align-center">
        <v-img 
          class="mr-2"
          max-width="32" 
          src="@/assets/images/png/iconpack/wallet.png"></v-img> 
          <span class="mt-1">Select <span class="text-lowercase">a</span> Payment Method</span>
      </h4>

      <v-divider class="mt-3"></v-divider>

      <v-row no-gutters class="mt-2">
        <v-col cols="12">
          <h4 class="font-weight-medium text-body-1 main--text primary--text text-capitalize d-flex align-center">
            Available Payment Method
          </h4>
          <p class="font-weight-light text-caption pa-0 ma-0 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditate 
            delectus doloribus mollitia! Officia exercitationem.
          </p>
        </v-col>
        <v-col cols="12" class="d-inline-flex payment-scroller py-2">
          <v-card
            @click="onTogglePaymentType('paymaya')"
            width="180"
            min-width="180"
            min-height="120"
            rounded
            color="green darken-2"
            class="pa-0 px-4 py-0 ml-1 mr-1 d-flex align-center">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-img 
                  max-width="130" 
                  src="@/assets/images/png/paymaya-logo.webp"></v-img>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            @click="onTogglePaymentType('gcash')"
            width="180"
            min-width="180"
            min-height="120"
            rounded
            color="light-blue lighten-1"
            class="pa-0 px-4 py-0 ml-1 mr-1">
            <v-row no-gutters class="mt-6">
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-img 
                  max-width="120" 
                  src="@/assets/images/png/gcash-logo.png"></v-img>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            @click="onTogglePaymentType('paypal')"
            width="64"
            min-width="180"
            min-height="120"
            rounded
            color="white"
            class="pa-0 px-4 py-0 ml-1 mr-1">
            <v-row no-gutters class="mt-6">
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-img 
                  max-width="64" 
                  src="@/assets/images/png/paypal-logo.png"></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-alert 
            v-if="selectedPaymentMethod"
            dense
            type="info" 
            color="success" 
            class="my-1 text-subtitle-2"
            outlined>
            You have selected 
            <span class="font-weight-medium" v-if="selectedPaymentMethod === 'paymaya'">PayMaya</span>
            <span class="font-weight-medium" v-if="selectedPaymentMethod === 'gcash'">GCash</span>
            <span class="font-weight-medium" v-if="selectedPaymentMethod === 'paypal'">PayPal</span>
            as your payment method!
          </v-alert>
        </v-col>

        <v-col cols="12" class="mt-3">
          <h4 class="font-weight-medium text-body-1 main--text primary--text text-capitalize d-flex align-center">
            Payment Summary
          </h4>
          <p class="font-weight-light text-caption pa-0 ma-0 mb-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditate 
            delectus doloribus mollitia! Officia exercitationem.
          </p>
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="6"><PreviewPaymentItem :item="$preview" /></v-col>
            <v-col cols="12" sm="6" md="6"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-btn
            large
            depressed
            :disabled="!selectedPaymentMethod"
            color="main primary"
            class="float-right mt-4"
            @click="onConfirmedPayment">
            <v-img
              max-width="24"
              class="mr-2"
              :style="{
                'filter': !selectedPaymentMethod ? 'grayscale(100%)' : ''
              }"
              src="@/assets/images/png/iconpack/check-symbol-4794.png"></v-img>
            Proceed to Checkout
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';
import PreviewPaymentItem from '@/components/tax_payer/PreviewPaymentItem.vue';

@Component({
  components: { PreviewPaymentItem }
})
export default class SelectPaymentMethod extends Mixins(TaxpayerServiceMixin) {
  public paymentMethod = new Set([ 'paymaya', 'gcash', 'paypal' ]);
  public selectedPaymentMethod: string | null = null;

  public async created() {
    if (!this.$payment) {
      this.getPaymentTransactionInfo(parseInt(this.$route.params.item));
    }
  }

  public async onTogglePaymentType(payment: string) {
    if (this.paymentMethod.has(payment)) this.selectedPaymentMethod = payment;
  }

  public async onConfirmedPayment() {
    const fdata = new FormData();

    switch (this.selectedPaymentMethod) {
    case 'paymaya':
      this.$emit('proceed', { method: 'paymaya' });
      break;
    case 'gcash':
      this.$emit('proceed', { method: 'gcash' });
      break;
    case 'paypal':
      try {
        const { data: paypal } = await this.onPayerMakeTransaction(this.selectedPaymentMethod as string);
        this.$emit('proceed', {
          method: 'paypal',
          orders: paypal
        });
      } catch(error) {
        console.log(error);
      }
      break;
    }

  }

  get $preview() {
    return this.$payment ?? { issued_by: {} };
  }

}
</script>

<style lang="postcss">
.payment-scroller {
  overflow: auto;
}
</style>

