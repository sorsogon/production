<template>
  <v-container class="pa-3">
    <h4 class="text-h6 font-weight-regular mb-2">
      <v-img
        class="float-left mr-1"
        max-width="32"
        src="@/assets/images/png/iconpack/pc-1919.png"></v-img>
      Rates Formulation
    </h4>
    <p class="text-subtitle-2 font-weight-light">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
      harum nesciunt nam reprehenderit temporibus tenetur cupiditate, nemo, saepe blanditiis 
      unde facere maxime rem pariatur nostrum reiciendis dignissimos? Iste.
    </p>
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <v-select
          dense
          outlined
          prepend-inner-icon="mdi-format-list-bulleted"
          v-model="category"
          label="Select a Category"
          :items="categories"
          item-text="name"
          item-value="category"
          hide-details
          class="mb-2">
        </v-select>
        <RateFormulationSidebar 
          v-on:selectedItemUpdated="onItemUpdated"
          :category="category" />
      </v-col>
      <v-col cols="12" md="9" class="px-0 px-md-4 pt-2 pt-md-0">
        <RateFormulationTab v-if="$route.params.category" />
        <RateFormulationStats v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import RateFormulationTab from '@/components/admin/formulation/RuleFormulationTab.vue';
import RateFormulationSidebar from '@/components/admin/formulation/RateFormulationSidebar.vue';
import RateFormulationStats from '@/components/admin/formulation/RateFormulationStats.vue';

@Component({
  components: {
    RateFormulationTab,
    RateFormulationSidebar,
    RateFormulationStats
  }
})
export default class SettingsACLPage extends Vue {
  public selectedTab = null;
  public $selectedCategoryItem = {};

  public category = 'taxes';
  public categories = [
    { category: 'taxes', name: 'Taxes' },
    { category: 'rentals', name: 'Rentals' },
    { category: 'misc', name: 'Miscellaneous' }
  ];

  @Watch('$route.params.category', { immediate: true })
  onRouteUpdate() {
    switch (this.$route.params.category) {
    case 'professional-tax':
    case 'annual-fixed-tax':
    case 'franchise-tax':
    case 'amusement-tax':
    case 'printing-publication-tax':
    case 'sand-gravel-tax':
    case 'transfer-tax':
    case 'property-tax':
      this.category = 'taxes';
      break;
    case 'heavy-equipment-rental':
    case 'gymnasium-rental':
    case 'space-lot-rental':
      this.category = 'rentals';
      break;
    case 'accountable-forms':
    default:
      this.category = 'misc';
    }
  }

  public onItemUpdated(selected: _object) {
    this.$data.$selectedCategoryItem = selected;
  }
}
</script>


