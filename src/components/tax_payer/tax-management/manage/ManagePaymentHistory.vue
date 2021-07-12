<template>
  <v-sheet class="pa-0">

  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class ManagePaymentHistory extends Mixins(TaxpayerServiceMixin) {

}
</script>

<style lang="postcss" scoped>

</style>
