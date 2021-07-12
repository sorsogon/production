<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-form
        ref="form"
        @submit.prevent="onAddNewItem">
        <v-row no-gutters class="align-center justify-center">
          <v-col 
            cols="12"
            class="mb-1">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              v-model="$ruleset.rates.rate"
              name="fair_market_value"
              hint="% of the Fair Market Value as determined by the Provincial Quarry Technical Working Committee."
              label="Fair Market Value Rate"></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-2 mb-1">
            <h4 class="font-weight-medium text-caption main--text primary--text">Material Management</h4>
            <v-divider></v-divider>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              :rules="nameRules"
              required
              name="material"
              label="Material Name"></v-text-field>
          </v-col>
          <v-col 
            cols="12"
            sm="6"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              :rules="rateRules"
              required
              prefix="₱"
              name="rate"
              hint="Material (₱) rate per cubicmeter."
              label="Rate"></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-1">
            <v-btn
              width="100%"
              color="main primary"
              type="submit"
              class="float-right">
              <v-icon>mdi-plus</v-icon>
              Add Item
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-col cols="12" class="mb-1">
      <v-data-table
        :items="$ruleset.rates.fair_market_value"
        :headers="headers">

        <template v-slot:item.action="{ item }">
          <EditSandGravelMaterial :item="item" v-on:deleteItem="onDeleteMaterial(item)" />
        </template>

        <template v-slot:item.rate="{ item }">
          <span class="font-weight-medium" v-html="$root.formatCurrency(item.rate)"></span>
        </template>
        
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';
import EditSandGravelMaterial from './edit/EditSandGravelMaterial.vue';

@Component({
  components: {
    EditSandGravelMaterial
  }
})
export default class SandGravelTax extends Mixins(AdminServiceMixin) {
  public nameRules = [ (v: string) => !!v || 'Name field is required' ];
  public rateRules = [ (v: string) => !!v || 'Rate field is required' ];

  public headers = [
    { text: 'Material', align: 'start', sortable: true, value: 'material' },
    { text: '(₱) Rate/cu.m', align: 'start', sortable: true, value: 'rate' },
    { text: 'Action', align: 'start', value: 'action' }
  ];

  public onAddNewItem(e: Event) {
    if (!(this.$refs.form as any).validate()) return;

    const data = new FormData(e.target as HTMLFormElement);

    if (this.$ruleset.rates.fair_market_value.find((el: _object) => el.title == data.get('material'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('profession') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.$ruleset.rates.fair_market_value.unshift({
      rate: parseFloat(data.get('rate') as string),
      material: data.get('material')
    });

    (this.$refs.form as any).reset();
  }

  public onDeleteMaterial(item: _object) {
    this.$ruleset.rates.fair_market_value = this.$ruleset.rates.fair_market_value.filter((el: _object) => {
      return el.material != item.material;
    });
  }
}
</script>
