<template>
  <v-row no-gutters>
    <v-col class="pr-md-1">
      <v-text-field
        dense
        hide-details="auto"
        outlined
        v-model="$ruleset.rates.rates.basic"
        hint="% Basic tax based on the assessed value of the property."
        label="Basic Tax Rate"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        dense
        hide-details="auto"
        outlined
        v-model="$ruleset.rates.rates.sef"
        hint="Additional % Special Educational Fund."
        label="Special Educational Fund"></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';

@Component
export default class PropertyTaxRate extends Mixins(AdminServiceMixin) {

}
</script>
