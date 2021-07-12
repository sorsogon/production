<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="text-body-1 font-weight-medium mb-2 main--text primary--text">
            <v-icon class="main--text primary--text mr-1">mdi-alert-circle</v-icon>
            <span class="text-capitalize">{{ $route.params.category.replaceAll('-', ' ') }}</span> Penalty Rate
          </h4>
          <p class="text-caption font-weight-light mb-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
            harum nesciunt nam reprehenderit temporibus tenetur cupiditate.
          </p>
        </v-col>
      </v-row>
      <AddPenaltyRate class="float-right" />
    </v-col>

    <v-col cols="12">
      <v-data-table
        :items="$penalties"
        :headers="headers">

        <template v-slot:item.added_by="{ item }">
          <v-menu 
            v-if="item.added_by"
            open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-chip 
                v-bind="attrs"
                v-on="on"
                color="success">{{ item.added_by.name }}</v-chip>
            </template>
            <TooltipUserProfile :user="item.added_by" />
          </v-menu>
          <v-chip v-else color="success">System</v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-tooltip 
            v-if="item.verified_at"
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                v-on="on"
                color="success">Verified</v-chip>
            </template>
            <span>{{ new Date() | formatDateString }}</span>
          </v-tooltip>
          <v-chip v-else color="error">Unverified</v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <EditPenaltyRate :penalty="item" />
        </template>
        
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import TooltipUserProfile from '../TooltipUserProfile.vue';
import EditPenaltyRate from './EditPenaltyRate.vue';
import AddPenaltyRate from './AddPenaltyRate.vue';


import AdminServiceMixin from '@/services/admin.service';

@Component({
  components: {
    EditPenaltyRate,
    AddPenaltyRate,
    TooltipUserProfile
  }
})
export default class EditPenaltyTable extends Mixins(AdminServiceMixin) {
  public headers = [
    { text: 'Description', align: 'start', sortable: true, value: 'desc' },
    { text: 'Added by', align: 'start', sortable: true, value: 'added_by' },
    { text: 'Status', align: 'start', sortable: true, value: 'status' },
    { text: 'Action', align: 'start', sortable: false, value: 'actions' }
  ];

  get $penalties() {
    return this.$admin.penalties ?? [];
  }

  @Watch('$route.params.category', { immediate: true })
  async updatePenalties() {
    await this.getAllPenalties();
  }
}
</script>
