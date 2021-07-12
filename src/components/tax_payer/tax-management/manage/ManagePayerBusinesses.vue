<template>
  <v-sheet
    elevation="2"
    class="pa-0 pt-3 rounded-lg">
    <v-row no-gutters>
      <v-col cols="12" class="pb-0 px-3">
        <h4 
          v-if="$route.params.category == 'franchise-tax'"
          class="font-weight-medium main--text primary--text text-body-1">🏭 Manage Franchise</h4>
        <h4 
          v-else-if="$route.params.category == 'amusement-tax'"
          class="font-weight-medium main--text primary--text text-body-1">🏭 Manage Amusement</h4>
        <h4 
          v-else-if="$route.params.category == 'sand-gravel-tax'"
          class="font-weight-medium main--text primary--text text-body-1">🏭 Manage Sand & Gravel Business</h4>
        <h4 
          v-else-if="$route.params.category == 'printing-publication-tax'"
          class="font-weight-medium main--text primary--text text-body-1">🏭 Manage Printing & Publishing Business</h4>

        <p class="font-weight-light float-left text-caption pa-0 ma-0 mt-1 mb-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ratione natue.
        </p>
      </v-col>

      <!--
        Form for adding a new entry to ptms
      -->
      <v-col cols="12" class="px-3">
        <PayerCreateNewBusiness />
      </v-col>

      <v-col cols="12">
        <v-data-table
          :items="$payerData"
          :headers="headers">

          <template v-slot:item.name="{ item }">
            <span class="font-weight-medium">{{ item.name }}</span>
          </template>
          
          <template v-slot:item.address="{ item }">
            {{ item.address | formatAddress }}
          </template>

          <template v-slot:item.added_at="{ item }">
            <v-chip color="success" small>
              {{ new Date(item.created_at) | formatDateString }}
            </v-chip>
          </template>

          <template v-slot:item.action>
            <v-btn
              color="primary"
              depressed
              small>
              <v-icon class="mr-1">mdi-pencil</v-icon> Edit
            </v-btn>
          </template>
          
        </v-data-table>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import TaxpayerServiceMixin from '@/services/payer.service.ts';

import PayerCreateNewBusiness from '../actions/modal/PayerCreateNewBusiness.vue';

@Component({
  components: { PayerCreateNewBusiness }
})
export default class ManagePayerBusinesses extends Mixins(TaxpayerServiceMixin) {

  public headers = [
    { text: 'Name', align: 'start', sortable: true, value: 'name' },
    { text: 'Address', align: 'start', sortable: true, value: 'address' },
    { text: 'Added At', align: 'start', sortable: true, value: 'added_at' },
    { text: 'Action', align: 'start', sortable: true, value: 'action' }
  ];

  public async created() {
    await this.resetCustomValue();
  }

  get $payerData() {
    let data: _object[] = [];

    switch (this.$route.params.category) {
    case 'sand-gravel-tax':
      data = this.$payer.payerSandGravelBusinesses as _object[];
      break;
    case 'amusement-tax':
      data = this.$payer.payerAmusements as _object[];
      break;
    case 'franchise-tax':
      data = this.$payer.payerFranchises as _object[];
      break;
    case 'printing-publication-tax':
      data = this.$payer.payerPrintingPublishingBusiness as _object[];
      break;
    }

    return data;
  }

  @Watch('$route.params.category')
  private async resetCustomValue() { 
    switch (this.$route.params.category) {
    case 'sand-gravel-tax':
      await this.getAllPayerSandGravelBusiness();
      break;
    case 'amusement-tax':
      await this.getAllPayerAmusements();
      break;
    case 'franchise-tax':
      await this.getAllPayerFranchises();
      break;
    case 'printing-publication-tax':
      await this.getAllPayerPrintingPublishingBusiness();
      break;
    }
  }
}
</script>
