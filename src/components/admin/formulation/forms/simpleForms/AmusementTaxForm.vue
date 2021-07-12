<template>
  <v-row no-gutters>
    <v-col class="pr-1">
      <v-text-field
        dense
        hide-details="auto"
        outlined
        hint="Municipality where the amusement is situated."
        v-model="$ruleset.rates.rates.municipality"
        placeholder="(e.g. 0.05)"
        label="(%) Municipality Rate"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        dense
        hide-details="auto"
        outlined
        hint="Province where the amusement is situated."
        v-model="$ruleset.rates.rates.province"
        placeholder="(e.g. 0.05)"
        label="(%) Province Rate"></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';

@Component
export default class AmusementTaxForm extends Mixins(AdminServiceMixin) {

}
</script>
