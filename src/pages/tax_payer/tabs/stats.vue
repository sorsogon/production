<template>
  <v-sheet class="pa-0 transparent">
    <v-row 
      v-if="$route.params.category"
      no-gutters>
      <v-col cols="12" class="my-1">
        <v-divider></v-divider>
      </v-col>
      <v-col 
        v-if="$root.hideCategoryControl([ 'accountable-forms' ])"
        cols="12">
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn 
              large 
              depressed
              color="primary"
              dark
              :to="`/d/taxpayer/manage/${ $route.params.category }`"
              width="100%">
              <v-img 
                class="mr-2"
                max-width="32"
                src="@/assets/images/png/iconpack/wallet.png"></v-img>
              Manage {{ $route.params.category.replaceAll('-', ' ') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <TaxpayerStatusBoard />
      </v-col>
      <v-col cols="12" class="mt-2">
        <TaxRecentPayment />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import TaxRecentPayment from '@/components/tax_payer/statistics/TaxRecentPayment.vue';

// Subboard
import TaxpayerStatusBoard from '@/components/tax_payer/tax-management/TaxpayerStatusBoard.vue';

@Component({
  components: { 
    TaxpayerStatusBoard,
    TaxRecentPayment
  }
})
export default class TaxStatisticsCategoryTabContent extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
