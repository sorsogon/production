<template>
  <v-row no-gutters>
    <v-col v-if="$route.params.category == 'professional-tax'" cols="12">
      <ProfessionalTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'annual-fixed-tax'" cols="12">
      <AnnualFixedTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'printing-publication-tax'" cols="12">
      <PrintingPublicationTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'sand-gravel-tax'" cols="12">
      <SandGravelTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'franchise-tax'" cols="12">
      <FranchiseTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'amusement-tax'" cols="12">
      <AmusementTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'transfer-tax'" cols="12">
      <TransferTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'property-tax'" cols="12">
      <PropertyTaxForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>

    <v-col v-else-if="$route.params.category == 'heavy-equipment-rental'" cols="12">
      <HeavyEquipmentRentalForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'gymnasium-rental'" cols="12">
      <GymnasiumRentalForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
    <v-col v-else-if="$route.params.category == 'space-lot-rental'" cols="12">
      <SpaceLotRentalForm 
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>

    <v-col v-else-if="$route.params.category == 'accountable-forms'" cols="12">
      <AccountableForms
        :ruleset="ruleset" 
        :errors="errors" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import AdminServiceMixin from '@/services/admin.service';

import ProfessionalTaxForm from './simpleForms/ProfessionalTaxForm.vue';
import AnnualFixedTaxForm from './simpleForms/AnnualFixedTaxForm.vue';
import FranchiseTaxForm from './simpleForms/FranchiseTaxForm.vue';
import PrintingPublicationTaxForm from './simpleForms/PrintingPublicationTaxForm.vue';
import SandGravelTaxForm from './simpleForms/SandGravelTaxForm.vue';
import AmusementTaxForm from './simpleForms/AmusementTaxForm.vue';
import TransferTaxForm from './simpleForms/TransferTaxForm.vue';
import PropertyTaxForm from './simpleForms/PropertyTaxForm.vue';

import GymnasiumRentalForm from './simpleForms/GymnasiumRentalForm.vue';
import HeavyEquipmentRentalForm from './simpleForms/HeavyEquipmentRentalForm.vue';
import SpaceLotRentalForm from './simpleForms/SpaceLotRentalForm.vue';

import AccountableForms from './simpleForms/AccountableForms.vue';

@Component({
  components: {
    ProfessionalTaxForm,
    AnnualFixedTaxForm,
    FranchiseTaxForm,
    PrintingPublicationTaxForm,
    SandGravelTaxForm,
    AmusementTaxForm,
    TransferTaxForm,
    PropertyTaxForm,

    GymnasiumRentalForm,
    HeavyEquipmentRentalForm,
    SpaceLotRentalForm,

    AccountableForms
  }
})
export default class SimpleRulesetForm extends Mixins(AdminServiceMixin) {
  @Prop() public readonly errors!: _object;
  @Prop() public readonly ruleset!: _object;
}
</script>


