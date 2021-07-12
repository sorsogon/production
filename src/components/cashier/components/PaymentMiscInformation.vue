<template>
  <v-dialog max-width="400" v-model="dialogState">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        v-bind="attrs"
        v-on="on"
        depressed 
        color="primary" 
        small>
        <v-icon class="mr-1">mdi-information</v-icon> More Info
      </v-btn>
    </template>
    <v-row no-gutters="">
      <v-col cols="12">
        <PreviewPaymentItem :item="payment" />
      </v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import PreviewPaymentItem from '@/components/tax_payer/PreviewPaymentItem.vue';

@Component({
  components: { PreviewPaymentItem }
})
export default class PaymentMiscInformation extends Vue {
  @Prop() public readonly payment!: _object;
  public dialogState = false;
}
</script>

<style lang="postcss" scoped>

</style>
