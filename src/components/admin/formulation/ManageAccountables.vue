<template>
  <v-row no-gutters>
    <v-col cols="12" class="px-4">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="text-body-1 font-weight-medium mb-2 main--text primary--text">
            <v-img
              class="float-left mr-1"
              max-width="24"
              src="@/assets/images/png/iconpack/folder-1486.png"></v-img>
            Manage Accountables
          </h4>
          <p class="text-caption font-weight-light float-left mb-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
            harum nesciunt nam reprehenderit temporibus tenetur cupiditate.
          </p>
        </v-col>
        <v-col cols="12" md="7"></v-col>
        <v-col cols="12" md="5" class="">
          <v-select
            v-model="rate_id"
            dense
            outlined
            hide-details
            label="Categories"
            :items="$rulesets"
            item-text="desc"
            item-value="id"></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-data-table
        :items="$accountables"
        :headers="headers">

        <template v-slot:item.type="{ item }">
          <span class="font-weight-medium">{{ item.type }}</span>
        </template>

        <template v-slot:item.officer="{ item }">
          <v-menu
            open-on-hover
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip 
                v-bind="attrs"
                v-on="on"
                color="success">{{ item.issued_to.name }}</v-chip>
            </template>
            <TooltipUserProfile :user="item.issued_to" />
          </v-menu>
        </template>

        <template v-slot:item.serial="{ item }">
          <v-chip color="success">
            <span>{{ item.serial_number.start }} — {{ item.serial_number.end }}</span>
          </v-chip>
        </template>

        <template v-slot:item.available="{ item }">
          <span class="text-capit
          alize">
            {{ item.serial_number.end-item.current + 1 }}/{{ item.serial_number.end-item.serial_number.start + 1 }}
          </span>
        </template>

        <template v-slot:item.action>
          <v-btn
            color="primary"
            small
            depressed>
            <v-icon small class="mr-1">mdi-information-outline</v-icon> Info
          </v-btn>
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
  public rate_id: _object | null = null;

  public headers = [
    { text: 'Type', align: 'start', sortable: true, value: 'type' },
    { text: 'Collection Officer', align: 'start', sortable: true, value: 'officer' },
    { text: 'OR/Serial No.', align: 'start', sortable: false, value: 'serial' },
    { text: 'Available', align: 'start', sortable: false, value: 'available' },
    { text: 'Action', align: 'start', sortable: false, value: 'action' }
  ];

  @Watch('$rulesets', { immediate: true })
  async onRulesesUpdate() {
    await this.getAllAccountables();

    this.rate_id = this.$rulesets[0].id;
  }

  get $rulesets() {
    return this.$admin.rulesets ?? [];
  }

  get $accountables() {
    return (this.$admin.accountables ?? []).filter((el: _object) => {
      const role = this.$root.$user.role?.name as string;
      return el.rate_id === this.rate_id
        && (el.issued_by == this.$root.$user.id || [ 'admin/verifier', 'developer' ].findIndex((el: string) => role === el) != -1);
    });
  }

}
</script>
