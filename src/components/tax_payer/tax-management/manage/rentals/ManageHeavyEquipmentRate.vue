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
          :items="$payer.heavyEquipmentCategories"
          item-text="desc"
          item-value="desc"
          label="Categories"></v-select>
      </v-col>
    </v-row>

    <v-data-table
      :items="$selectedCategory.rates.rates"
      :headers="headers">

      <template v-slot:item.action="{ item }">
        <v-dialog
          max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              small>
              <v-icon class="mr-1">mdi-eye</v-icon> View Data
            </v-btn>
          </template>
          <v-sheet>
            <v-row no-gutters>
              <v-col cols="12" class="px-3 pt-2">
                <h4 class="font-weight-medium main--text primary--text text-body-1">
                  (%)
                  View Capacity Rates
                </h4>
                <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditat.
                </p>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-tabs
                  v-model="selectedTab">
                  <v-tab
                    :key="i"
                    v-for="(category, i) in item.category">
                    {{ category.capacity }}  
                  </v-tab>
                </v-tabs>
                <v-tabs-items
                  v-model="selectedTab">
                  <v-tab-item
                    :key="i"
                    v-for="(category, i) in item.category">
                    <v-data-table
                      :items="category.rates"
                      :headers="subHeaders">

                      <template v-slot:item.rate="{ item }">
                        <span class="font-weight-bold" v-html="$root.formatCurrency(item.rate)"></span>
                      </template>

                    </v-data-table>
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-sheet>
        </v-dialog>
      </template>

    </v-data-table>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class ManageHeavyEquipmentRate extends Mixins(TaxpayerServiceMixin) {
  public selectedTab = null;
  public selectedCategory = null;

  public headers = [
    { text: 'Equipment Type', align: 'start', sortable: true, value: 'type' },
    { text: 'Action', align: 'start', sortable: false, value: 'action' }
  ];

  public subHeaders = [
    { text: 'Short Description', align: 'start', sortable: true, value: 'desc' },
    { text: '(₱) Rate', align: 'start', sortable: true, value: 'rate' }
  ];

  public async created() {
    await this.getAllHeavyEquipmentCategory();

    if (this.$heavyEquipmentCategories.length > 0)
      this.selectedCategory = this.$heavyEquipmentCategories[0].desc;
  }

  get $heavyEquipmentCategories(): _object[] {
    return this.$payer.heavyEquipmentCategories ?? [];
  }

  get $selectedCategory() {
    return this.$heavyEquipmentCategories.find((el: _object) => el.desc === this.selectedCategory) ?? {
      rates: {
        
      }
    };
  }


  
}
</script>
