<template>
  <v-dialog
    max-width="400"
    v-bind="dialogState">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="primary"
        icon>
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    <PreviewPaymentItem :item="item" />
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import PreviewPaymentItem from '@/components/tax_payer/PreviewPaymentItem.vue';

@Component({
  components: {
    PreviewPaymentItem
  }
})
export default class PaymentInfo extends Vue {
  @Prop() public readonly item!: _object;

  public dialogState = false;
}
</script>
