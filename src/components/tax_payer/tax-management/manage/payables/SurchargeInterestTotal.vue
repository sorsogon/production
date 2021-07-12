<template>
  <v-row 
    v-if="$penaltyRate.penalties.length > 0 && $penaltyRate.amount"
    class="px-3"
    no-gutters>
    <v-col cols="12">
      <span class="font-weight-medium text-caption secondary--text">Penalties:</span>
    </v-col>

    <v-col 
      class="pa-2 pt-0 px-2"
      cols="12">
      <v-row no-gutters>
        <v-col 
          v-for="(penalty, i) in $penaltyRate.penalties"
          :key="i"
          cols="12" 
          class="d-flex align-center">
          <strong class="font-weight-regular error--text text-subtitle-2 float-left pa-0">
            ({{ Math.round((penalty.amount/$computedTotalDue)*100).toFixed(1) + '%' }}) {{ penalty.desc }}
          </strong>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-on="on" v-bind="attrs">
                <p class="ma-0 float-right pa-0 font-weight-regular">
                  <span v-html="$root.formatCurrency(penalty.amount)"></span>
                </p>
              </span>
            </template>
            <span>
              An additional ({{ Math.round((penalty.amount/$computedTotalDue)*100).toFixed(1) + '%' }}) {{ penalty.desc.toLowerCase() }} 
              value will be added to the total due.
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

  get $penaltyRate() {
    return this.item.data.penalties ?? {};
  }

  get $computedTotalDue() {
    let y = 0;

    this.item.data.tax_due.forEach((el: _object) => y += el.amount);

    return y;
  }
}
</script>
