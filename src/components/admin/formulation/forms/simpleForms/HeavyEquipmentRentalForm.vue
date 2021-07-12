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
              :rules="typeRules"
              required
              name="type"
              label="Equipment Type"></v-text-field>
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
    <v-col cols="12" class="mt-1">
      <v-data-table 
        :items="$ruleset.rates.rates"
        :headers="headers">

        
        <template v-slot:item.action="{ item }">
          <EditCapacity :item="item" />
        </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import EditCapacity from './edit/EditCapacity.vue';
import AdminServiceMixin from '@/services/admin.service.ts';

@Component({
  components: { 
    EditCapacity
  }
})
export default class HeavyEquipmentRentalForm extends Mixins(AdminServiceMixin) {
  public typeRules = [ (v: string) => !!v || 'Equipment Type field is required.' ];

  public headers = [
    { text: 'Equipment Type', align: 'start', sortable: true, value: 'type' },
    { text: 'Action', align: 'start', value: 'action' },
  ];


  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    if (this.$ruleset.rates.rates.find((el: _object) => el.type === data.get('type'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('type') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.$ruleset.rates.rates.unshift({
      type: data.get('type'),
      category: []
    } as _object);
    
    (this.$refs.form as any).reset();
  }
}
</script>
