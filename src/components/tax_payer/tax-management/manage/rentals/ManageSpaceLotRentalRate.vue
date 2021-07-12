<template>
  <v-sheet
    height="100%"
    elevation="2"
    class="pa-0 rounded-lg pb-3">
    <div class="mx-3 pt-2">
      <h4 class="font-weight-medium main--text primary--text text-body-1">
        <v-img
          class="mr-2 float-left"
          max-width="24"
          src="@/assets/images/png/iconpack/folder-1486.png"></v-img>
        {{ $selectedCategory.desc ? $selectedCategory.desc : 'Official Provincial Rates' }}
      </h4>
      <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditat.
      </p>
    </div>

    <v-row no-gutters class="px-3 mt-4">
      <v-col cols="12">
        <v-select
          dense
          outlined
          hide-details
          v-model="selectedCategory"
          :items="$payer.spaceLotCategories"
          item-text="desc"
          item-value="desc"
          label="Categories"></v-select>
      </v-col>
    </v-row>

    <v-data-table
      :items="$selectedCategory.rates.rates"
      :headers="headers">
      
      <template v-slot:item.rate="{ item }">
        <span class="font-weight-medium" v-html="$root.formatCurrency(item.rate)"></span>
      </template>

    </v-data-table>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class ManageSpaceLotRentalRate extends Mixins(TaxpayerServiceMixin) {
  public selectedTab = null;
  public selectedCategory = null;

  public headers = [
    { text: 'Lot Description', align: 'start', sortable: true, value: 'desc' },
    { text: '(₱) Rate', align: 'start', sortable: true, value: 'rate' }
  ];

  public async created() {
    await this.getAllSpaceLotCategory();

    if (this.$spaceLotCategories.length > 0)
      this.selectedCategory = this.$spaceLotCategories[0].desc;
  }

  get $spaceLotCategories(): _object[] {
    return this.$payer.spaceLotCategories ?? [];
  }

  get $selectedCategory() {
    return this.$spaceLotCategories.find((el: _object) => el.desc === this.selectedCategory) ?? {
      rates: {
        
      }
    };
  }
  
}
</script>
