<template>
  <v-sheet
    class="pa-0 transparent">
    <h4 class="mb-1 font-weight-medium main--text main--text primary--text">
      📈 Provincial Fair Market Value
    </h4>
    <p class="text-caption font-weight-light mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo.</p>
    <v-combobox
      v-model="selectedMarketValue"
      dense
      outlined
      hide-details
      :items="$desc"
      label="Fair Market Value Rate"
      placeholder="Description"
      class="px-1 mb-2"></v-combobox>
    <v-sheet
      width="100%"
      class="pa-0 pb-2 d-inline-flex scroller transparent">
      <v-card
        :key="i"
        v-for="(item, i) in $fairMarketValues"
        width="140"
        min-width="140"
        min-height="110"
        rounded="md"
        class="pa-0 px-3 py-0 ml-1 mr-1 d-flex align-center justify-center">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-end">
            <strong class="font-weight-medium text-caption text-capitalize">
              {{ item.material }}
            </strong>
          </v-col>

          <v-col class="d-flex flex-column text-right">
            <p class="d-inline text-body-1 font-weight-medium main--text" v-html="$root.formatCurrency(item.rate)"></p>
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
export default class ManageSandGravelRate extends Mixins(TaxpayerServiceMixin) {
  public selectedMarketValue = null;

  public async created() {
    await this.getAllSandGravelMarketValues();

    this.selectedMarketValue = this.$desc[0] ?? null;
  }

  get $marketValues() {
    return this.$payer.sandGravelMarketValues ?? [];
  }

  get $desc() {
    return this.$marketValues.map(el => el.desc) ?? [];
  }

  get $fairMarketValues() {
    const $marketValue = this.$marketValues.find(el => el.desc === this.selectedMarketValue) ?? {};
    return $marketValue.rates?.fair_market_value ?? [];
  }

}
</script>

<style lang="postcss">
.scroller {
  overflow-x: auto;
}
</style>