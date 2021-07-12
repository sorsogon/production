<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        dense
        hide-details="auto"
        outlined
        required
        hint="Taxes, fees and charges to be paid, % of the Gross Annual Receipt as declared in the sworn Gross Annual Receipt."
        placeholder="(e.g. 0.1)"
        v-model="$ruleset.rates.rate"
        label="(%) Franchise Tax Rate"></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';

@Component
export default class FranchiseTaxForm extends Mixins(AdminServiceMixin) {
  
}
</script>
