<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        dense
        hide-details
        outlined
        required
        v-model="$ruleset.rates.rate"
        hint="Taxes, fees and charges to be paid, % of the Gross Annual Receipt as declared in the sworn Gross Annual Receipt."
        label="(%) Printing & Publication Tax Rate"></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import AdminServiceMixin from '@/services/admin.service.ts';

@Component
export default class PrintingPublicationTaxForm extends Mixins(AdminServiceMixin) {

}
</script>
