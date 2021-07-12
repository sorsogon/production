<template>
  <v-sheet
    elevation="2"
    rounded="lg">
    <v-row no-gutters>
      <v-col cols="12" class="pa-3 pb-0">
        <h4 class="text-body-1 font-weight-medium mb-2 main--text primary--text">
          <v-icon class="main--text primary--text">mdi-math-compass</v-icon> Manage Rulesets
        </h4>
        <p class="text-caption font-weight-light float-left mb-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
          harum nesciunt nam reprehenderit temporibus tenetur cupiditate.
        </p>
        <AddRuleset class="float-right" />
      </v-col>
      <v-col cols="12">
        <v-data-table
          :items="$rulesets"
          :headers="headers">

          <template v-slot:item.added_by="{ item }">
            <v-menu 
              v-if="item.added_by"
              open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-chip 
                  v-bind="attrs"
                  v-on="on"
                  color="success">{{ item.added_by.name + (item.added_by.name === $root.$user.name ? ' (You)' : '') }}</v-chip>
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
            <EditRuleset :ruleset="item" v-on:deleteItem="onDeleteRuleset(item)" />
          </template>
          
        </v-data-table>
      </v-col>

      <v-col cols="12" v-if="$route.params.category === 'accountable-forms'">
        <ManageAccountables />
      </v-col>

      <v-col cols="12" v-if="$route.params.category.search(/tax/g) > 0 && !($route.params.category.search(/sand-gravel-tax/g) > 0)">
        <ManagePenaltyRate />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import TooltipUserProfile from '../TooltipUserProfile.vue';

import AddRuleset from './AddRuleset.vue';
import EditRuleset from './EditRuleset.vue';

import ManagePenaltyRate from './ManagePenaltyRate.vue';
import ManageAccountables from './ManageAccountables.vue';

import AdminServiceMixin from '@/services/admin.service';

@Component({
  components: { 
    TooltipUserProfile,
    ManagePenaltyRate,
    ManageAccountables,
    EditRuleset,
    AddRuleset
  }
})
export default class RuleFormulationTab extends Mixins(AdminServiceMixin) {
  public deleteDialog = false;
  public headers = [
    { text: 'Rule Description', align: 'start', sortable: true, value: 'desc' },
    { text: 'Added by', align: 'start', sortable: true, value: 'added_by' },
    { text: 'Status', align: 'start', sortable: true, value: 'status' },
    { text: 'Action', align: 'start', sortable: false, value: 'actions' }
  ];

  get $rulesets() {
    return this.$admin.rulesets ?? [];
  }

  @Watch('$route.params.category', { immediate: true })
  async updateRulesets() {
    try {
      await this.getAllRulesets();
    } catch(error) {
      console.log(error);
    }
  }

  public async onDeleteRuleset(item: _object) {
    
    try {
      await this.deleteRuleset(item.id);

      this.$store.commit('snackBar/toggle', {
        message: `Deleted ${ item.desc }!`,
        color: 'success',
        toggle: true
      });
    } catch(error) {
      console.log(error);
    }
    
    this.deleteDialog = false;
  }
}
</script>
