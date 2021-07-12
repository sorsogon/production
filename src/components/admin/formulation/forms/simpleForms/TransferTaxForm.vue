<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        dense
        hide-details="auto"
        outlined
        required
        v-model="$ruleset.rates.rate"
        hint="% of the current Fair Market Value or total consideration, whichever is higher."
        label="Transfer Tax Rate"></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';

@Component
export default class TransferTaxForm extends Mixins(AdminServiceMixin) {

}
</script>
