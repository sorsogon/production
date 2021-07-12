<template>
  <v-row no-gutters class="align-center">
    <v-col cols="12">
      <v-form
        ref="form"
        @submit.prevent="onAddNewItem">
        <v-row 
          no-gutters>
          <v-col cols="6" class="pr-md-1">
            <v-text-field
              dense
              hide-details
              outlined
              required
              :rules="descRules"
              name="desc"
              label="Description"></v-text-field>
          </v-col>
          <v-col cols="3" class="pr-md-1">
            <v-text-field
              dense
              hide-details
              outlined
              required
              :rules="rateRules"
              prefix="₱"
              name="rate"
              label="Provincial Rate"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
              color="main primary"
              type="submit">
              <v-icon class="mr-1">mdi-plus</v-icon>
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

        <template v-slot:item.rate="{ item }">
          <span class="font-weight-medium" v-html="$root.formatCurrency(item.rate)"></span>
        </template>

        <template v-slot:item.action="{ item }">
          <EditSpaceLotRental :item="item" v-on:deleteItem="onDeleteItem(item)" />
        </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';
import EditSpaceLotRental from './edit/EditSpaceLotRental.vue';

@Component({
  components: {
    EditSpaceLotRental
  }
})
export default class AmusementTaxForm extends Mixins(AdminServiceMixin) {
  public rates: _object = [];

  public rateRules = [ (v: any) => !!v || 'Rate is required.' ];
  public descRules = [ (v: any) => !!v || 'Description is required.' ];

  public headers = [
    { text: 'Description', align: 'start', sortable: true, value: 'desc' },
    { text: '(₱) Rate/sq.m', align: 'start', sortable: true, value: 'rate' },
    { text: 'Action', align: 'start', value: 'action' }
  ];

  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    if (this.$ruleset.rates.rates.find((el: _object) => el.type === data.get('desc'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('desc') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.$ruleset.rates.rates.unshift({
      desc: data.get('desc'),
      rate: parseFloat(data.get('rate') as string)
    } as _object);
    
    (this.$refs.form as any).reset();
  }

  public onDeleteItem(item: _object) {
    this.$ruleset.rates.rates = this.$ruleset.rates.rates.filter((el: _object) => el.desc !== item.desc);
  }
}
</script>
