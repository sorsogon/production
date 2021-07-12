<template>
  <v-row no-gutters>
    <v-col cols="12">
      <h4 class="font-weight-medium text-body-1 text-capitalize d-flex align-center">
        <v-img 
          class="mr-1"
          max-width="32" 
          src="@/assets/images/png/iconpack/engineer-2737.png"></v-img> 
          {{ $route.params.category.replaceAll('-', ' ') }} Management
      </h4>
      <v-divider class="mt-2"></v-divider>
    </v-col>
    
    <v-col cols="12" sm="7" md="7" lg="8">
      <v-tabs
        class="d-none ma-0"
        v-model="apparentViewIndicator"
        background-color="transparent">
        <v-tab class="text-capitalize"></v-tab>
        <v-tab class="text-capitalize"></v-tab>
        <v-tab class="text-capitalize d-none"></v-tab>
      </v-tabs>
      <v-tabs-items
        touchless
        class="transparent"
        v-model="apparentViewIndicator">
        <v-tab-item class="pa-0">
          <GeneralTabContent v-on:paymentHistory="apparentViewIndicator = 2" />
        </v-tab-item>
        <v-tab-item class="pa-0">

        </v-tab-item>
        <v-tab-item class="pa-0">
          <PaymentHistoryTabContent v-on:goBack="apparentViewIndicator = 0" />
        </v-tab-item>
      </v-tabs-items>
    </v-col>


    <v-col 
      cols="12" 
      sm="5"
      md="5"
      lg="4"
      class="pl-4 d-none d-sm-block d-md-block d-lg-block">
      <ApplicationWidgetArea />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import GeneralTabContent from './@tabs/GeneralTabContent.vue';
import PaymentHistoryTabContent from './@tabs/PaymentHistoryTabContent.vue';
import ApplicationWidgetArea from '@/components/tax_payer/ApplicationWidgetArea.vue';

@Component({
  components: {
    GeneralTabContent,
    PaymentHistoryTabContent,
    ApplicationWidgetArea
  }
})
export default class TaxManagement extends Vue {
  public apparentViewIndicator = null;
}
</script>
