<template>
  <v-row 
    v-if="$fees.fees.length > 0"
    class="px-3"
    no-gutters>
    <v-col cols="12">
      <span class="font-weight-medium text-caption secondary--text">Additional Charges:</span>
    </v-col>

    <v-col 
      class="pa-2 pt-0 px-2"
      cols="12">
      <v-row no-gutters>
        <v-col 
          v-for="(fee, i) in $fees.fees"
          :key="i"
          cols="12" 
          class="d-flex align-center">
          <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
            {{ fee.desc }}
          </strong>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-on="on" v-bind="attrs">
                <p class="ma-0 float-right pa-0 font-weight-regular text-subtitle-2">
                  <span v-html="$root.formatCurrency(fee.amount)"></span>
                </p>
              </span>
            </template>
            <span>
              An additional fee of ₱ {{ fee.amount.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} 
              for the {{ fee.desc.toLowerCase() }} will be added to the total due.
            </span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SurchargeInterestTotal extends Vue {
  @Prop({ required: true }) public readonly item!: _object;

  get $fees() {
    return this.item.data.fees ?? {};
  }
}
</script>
