<template>
  <v-sheet
    elevation="2"
    class="pa-0 pt-3 rounded-lg">
    <v-row no-gutters>
      <v-col cols="12" class="px-3">
        <h4 class="font-weight-medium main--text primary--text text-body-1">👷 Manage your Profession</h4>

        <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditate 
          delectus doloribus mollitia! Officia exercitationem.
          <router-link class="font-weight-medium text-decoration-none" to="/d/profile/edit">Add a new profession in your profile.</router-link>
        </p>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers">

        </v-data-table>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class ManagePayerProfessions extends Mixins(TaxpayerServiceMixin) {

  public headers = [
    { text: 'Profession', align: 'start', sortable: true, value: 'title' },
    { text: 'Description', align: 'start', sortable: true, value: 'desc' },
    { text: 'Rate', align: 'start', sortable: true, value: 'rate' },
    { text: 'Total', align: 'start', sortable: true, value: 'total' }
  ];
  
  public created() {
    this.getAllPayerProfessions();

    console.log(this.$payer.payerProfessions);
  }

  get $professions(): any {
    return this.$payer.payerProfessions ?? {};
  }


  @Watch('$route', { immediate: true })
  public async updatePayerProfession() {
    this.getAllPayerProfessions();
  } 

}
</script>
