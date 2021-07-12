<template>
  <v-row no-gutters>
    <v-col cols="12" class="pb-1">
      <v-text-field
        dense
        hide-details="auto"
        outlined
        v-model="$ruleset.rates.mark_up_rate"
        :error="errors['rates.mark_up_rate'] ? true : false"
        required
        :rules="markUpRules"
        hint="A % Mark-up rate shall be added to the original acquisition cost."
        label="(%) Mark Up Rate"></v-text-field>
    </v-col>

    <v-col cols="12" class="my-2">
      <h4 class="font-weight-medium text-caption main--text primary--text">Accountable Form</h4>
      <v-divider></v-divider>
    </v-col>

    <v-col cols="12">
      <v-form
        ref="form"
        @submit.prevent="onAddNewItem">
        <v-row no-gutters class="align-center justify-center">
          <v-col
            cols="12"
            sm="2"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              required
              :rules="typeRules"
              placeholder="ex. 51-C"
              name="type"
              label="Type"></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              required
              :rules="descRules"
              label="Description"
              name="desc"></v-text-field>
          </v-col>
          <v-col 
            cols="12"
            sm="2"
            class="pr-sm-1 pb-1 pb-sm-0">
            <v-text-field
              dense
              hide-details
              outlined
              required
              :rules="priceRules"
              prefix="₱"
              label="Price"
              name="price"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
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
        :items="$ruleset.rates.forms"
        :headers="headers">

        <template v-slot:item.type="{ item }">
          <span class="font-weight-medium">{{ item.type }}</span>
        </template>

        <template v-slot:item.price="{ item }">
          <span class="font-weight-medium" v-html="$root.formatCurrency(item.price)"></span>
        </template>

        <template v-slot:item.action="{ item }">
          <EditAccountableFormType :form="item" />
        </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import AdminServiceMixin from '@/services/admin.service.ts';

import EditAccountableFormType from './edit/EditAccountableFormType.vue';

@Component({
  components: {
    EditAccountableFormType
  }
})
export default class AccountableForms extends Mixins(AdminServiceMixin) {
  @Prop() public readonly errors!: _object;
  public markUpRules = [ (v: string) => !!v || '' ];
  public descRules = [ (v: string) => !!v || 'Description is required.' ];
  public typeRules = [ (v: string) => !!v || 'Rate is required.' ];
  public priceRules = [ (v: string) => !!v || 'Price is required.' ];

  public async created() {
    await this.getAllCollectionOfficer();
  }

  public headers = [
    { text: 'Type', align: 'start', sortable: true, value: 'type' },
    { text: 'Description', align: 'start', sortable: true, value: 'desc' },
    { text: '(₱) Price', align: 'start', sortable: true, value: 'price' },
    { text: 'Action', align: 'start', value: 'action' }
  ];

  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    if (this.$ruleset.rates.forms.find((el: _object) => el.type === data.get('desc'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('desc') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.$ruleset.rates.forms.unshift({
      desc: data.get('desc') as string,
      type: data.get('type') as string,
      price: parseFloat(data.get('price') as string),
      increment: 0,
      storage: []
    });

    (this.$refs.form as any).reset();
  }
}
</script>
