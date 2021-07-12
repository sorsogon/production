<template>
  <v-container>
    <MainTaxManagement />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import MainTaxManagement from '@/components/tax_payer/tax-management/Main.vue';

@Component({
  components: { MainTaxManagement }
})
export default class TaxpayerRootManagement extends Vue {
  get $category() {
    return this.$route.params.category;
  }
}
</script>