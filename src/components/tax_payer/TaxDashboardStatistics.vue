<template>
  <v-sheet
    class="pa-0 transparent">
    <h4 class="mb-1 font-weight-medium main--text main--text primary--text">
      💰 
      <span v-if="$route.params.category ? $route.params.category.includes('tax') : true">Taxes</span>
      <span v-else>Rentals</span>
      Summary
    </h4>
    <p class="text-caption font-weight-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo.</p>
    <v-sheet
      width="100%"
      class="py-2 d-inline-flex status-scroller transparent">
      <v-card
        v-for="(item, key) in $stats"
        :key="key"
        width="200"
        min-width="200"
        min-height="120"
        rounded="md"
        @click="onSelectionChanged"
        :class="{
          'blue darken-2 theme--dark': $route.params.category === key.replaceAll('_', '-').replaceAll('taxes', 'tax'),
        }"
        :to="`/d/taxpayer/stats/${ key.replaceAll('_', '-').replaceAll('taxes', 'tax').replaceAll('rentals', 'rental') }`"
        class="pa-0 px-4 py-0 ml-1 mr-1 d-flex align-center justify-center">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-end">
            <strong class="font-weight-medium text-caption text-capitalize">
              {{ key.replace('taxes', 'tax').replace('rentals', 'rental').replaceAll('_', ' ') }}
            </strong>
          </v-col>
          <v-col cols="auto" class="d-flex align-center text-left">
            <v-img 
              v-if="key == 'professional_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/engineer-2737.png"></v-img>
            <v-img 
              v-else-if="key == 'annual_fixed_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/delivery-truck-4437.png"></v-img>
            <v-img 
              v-else-if="key == 'sand_gravel_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/sand-bucket.png"></v-img>
            <v-img 
              v-else-if="key == 'amusement_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/location-59.png"></v-img>
            <v-img 
              v-else-if="key == 'franchise_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/store-773.png"></v-img>
            <v-img 
              v-else-if="key == 'transfer_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/file-transfer.png"></v-img>
            <v-img 
              v-else-if="key == 'property_taxes'"
              max-width="55" 
              src="@/assets/images/png/iconpack/tuscany.png"></v-img>
            <v-img
              v-else-if="key == 'printing_publication_taxes'"
              max-width="55"
              src="@/assets/images/png/iconpack/printer.png"></v-img>
              
            <v-img
              v-else-if="key == 'heavy_equipment_rentals'"
              max-width="55"
              src="@/assets/images/png/iconpack/demolishing.png"></v-img>
            <v-img
              v-else-if="key == 'space_lot_rentals'"
              max-width="55"
              src="@/assets/images/png/iconpack/parking.png"></v-img>
            <v-img
              v-else-if="key == 'gymnasium_rentals'"
              max-width="55"
              src="@/assets/images/png/iconpack/house.png"></v-img>

            <v-img
              v-else-if="key == 'accountable_forms'"
              max-width="55"
              src="@/assets/images/png/iconpack/folder-1486.png"></v-img>
          </v-col>

          <v-col class="d-flex flex-column text-right">
            <p class="d-inline text-body-1 font-weight-medium main--text" v-html="$root.formatCurrency(item)"></p>
            <strong class="d-inline text-caption font-weight-light">
              <v-icon>mdi-archive</v-icon>
            </strong>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class TaxDashboardStatistics extends Mixins(TaxpayerServiceMixin) {

  public async created() {
    await this.getReadyToPaySumFromServer();
  }

  public async onSelectionChanged() {
    

    try {
      await this.getReadyToPaySumFromServer();
    } catch(error) {
      console.log(error);
    }

    
  }

  @Watch('$route')
  async onRouteChanged() {
    try {
      await this.getReadyToPaySumFromServer();
    } catch(error) {
      console.log(error);
    }
  }

  get $stats() {
    const sorted: _object = {};

    for (const [key, value] of Object.entries(this.$payer.readyToPayStats ?? {}).sort((a, b) => {
      const a_2: number = (a as Array<any>)[1];
      const b_2: number = (b as Array<any>)[1];
      
      return a_2 < b_2 ? 1 : a_2 > b_2 ? -1 : 0;
    }))
      sorted[key] = value;

    return sorted;
  }

}
</script>

<style lang="postcss" scoped>
.status-scroller {
  overflow: auto;
  /* scrollbar-width: none;
  -ms-overflow-style: none; */
}

/* .status-scroller::-webkit-scrollbar {
  width: 0;
  height: 0;
} */
</style>
