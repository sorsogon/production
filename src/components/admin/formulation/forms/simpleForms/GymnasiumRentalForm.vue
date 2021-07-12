<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-form
        ref="form"
        @submit.prevent="onAddNewItem">
        <v-row no-gutters class="align-center justify-center">
          <v-col
            cols="12"
            sm="8"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              required
              :rules="activityRules"
              name="activity"
              label="Activity"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn
              width="100%"
              color="main primary"
              class="float-right"
              type="submit">
              <v-icon>mdi-plus</v-icon>
              Add Item
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-col cols="12" class="mb-1">
      <v-data-table
        :items="$ruleset.rates.rates"
        :headers="headers">
        <template v-slot:item.rates="{ item }">
          <EditGymnasiumRate :rules="item" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import EditGymnasiumRate from './edit/EditGymnasiumRate.vue';

import AdminServiceMixin from '@/services/admin.service.ts';

@Component({
  components: { 
    EditGymnasiumRate
  }
})
export default class GymnasiumRentalForm extends Mixins(AdminServiceMixin) {
  @Prop() public readonly ruleset!: _object;

  public activityRules = [ (v: string) => !!v || 'Activity is required.' ];

  public headers = [
    { text: 'Activity', align: 'start', sortable: true, value: 'activity' },
    { text: '(₱) Rates', align: 'start', value: 'rates' }
  ];

  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    if (this.$ruleset.rates.rates.find((el: _object) => el.type === data.get('activity'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('activity') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.$ruleset.rates.rates.unshift({
      activity: data.get('activity'),
      rates: {
        with_ac: 0,
        wout_ac: 0
      }
    } as _object);
    
    (this.$refs.form as any).reset();
  }

  public onDeleteItem(item: _object) {
    this.$ruleset.rates.rates = this.$ruleset.rates.rates.filter((el: _object) => el.activity !== item.activity);
  }
}
</script>
