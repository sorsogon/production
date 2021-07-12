<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-form
        ref="form"
        @submit.prevent="onAddNewItem">
        <v-row no-gutters class="align-center justify-center">
          <v-col
            cols="12"
            sm="6"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              :rules="titleRules"
              required
              name="profession"
              label="Profession"></v-text-field>
          </v-col>
          <v-col 
            cols="12"
            sm="6"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              prefix="₱"
              :rules="rateRules"
              required
              name="rate"
              label="Rate"></v-text-field>
          </v-col>
          <v-col cols="12" class="mt-1 mb-2">
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
        
        <template v-slot:item.rate="{ item }">
          <span class="font-weight-medium" v-html="$root.formatCurrency(item.rate)"></span>
        </template>

        <template v-slot:item.action="{ item }">
          <EditProfessionItem :item="item" v-on:deleteItem="onDeleteRate(item)" />
        </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';
import EditProfessionItem from './edit/EditProfessionItem.vue';

@Component({
  components: {
    EditProfessionItem
  }
})
export default class ProfessionalTaxForm extends Mixins(AdminServiceMixin) {
  @Prop() public ruleset!: _object;

  public rateRules = [ (v: number) => !!v || 'Rate is required' ];
  public titleRules = [
    (v: string) => !!v || 'Title is required',
    (v: string) => (v && v.length <= 24) || 'Title must be less than 24 characters.'
  ];

  public headers = [
    { text: 'Profession', align: 'start', sortable: true, value: 'title' },
    { text: '(₱) Rate', align: 'start', sortable: true, value: 'rate' },
    { text: 'Action', align: 'start', sortable: false, value: 'action' }
  ];

  public onAddNewItem(e: Event) {
    if (!(this.$refs.form as any).validate()) return;

    const data = new FormData(e.target as HTMLFormElement);

    if (this.$ruleset.rates.rates.find((el: _object) => el.title == data.get('profession'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('profession') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.$ruleset.rates.rates.unshift({
      rate: parseFloat(data.get('rate') as string),
      title: data.get('profession')
    });

    (this.$refs.form as any).reset();
  }

  public onDeleteRate(item: _object) {
    this.$ruleset.rates.rates = this.$ruleset.rates.rates.filter((el: _object) => el.title !== item.title);
  }

}
</script>
