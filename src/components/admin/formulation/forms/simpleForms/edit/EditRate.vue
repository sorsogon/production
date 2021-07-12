<template>
  <v-dialog
    v-model="dialogState"
    persistent
    max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        small
        depressed
        color="primary py-1">
        <v-icon>mdi-pencil</v-icon>  
        Edit Rate
      </v-btn>
    </template>
    <v-card class="pa-2">
      <v-row no-gutters>
        <v-col cols="12" class="pa-1">
          <h4 class="font-weight-medium main--text primary--text text-body-1 mb-1 d-flex align-center">
            <v-icon class="mr-1 text-h5 main--text primary--text">mdi-table-edit</v-icon>
            Edit Rate
          </h4>
          <p class="text-caption font-weight-light mb-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
            harum nesciunt.
          </p>
        </v-col>

        <v-col cols="12" class="pa-3">
          <v-form
            ref="form"
            @submit.prevent="onAddNewItem">
            <v-row no-gutters>
              <v-col cols="12" md="6" class="pb-1 pr-md-1">
                <v-text-field
                  dense
                  outlined
                  hide-details
                  :rules="descRules"
                  required
                  name="desc"
                  label="Description"></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pb-2">
                <v-text-field
                  dense
                  outlined
                  hide-details
                  :rules="rateRules"
                  required
                  name="rate"
                  prefix="₱"
                  label="Rate"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  width="100%"
                  color="primary"
                  type="submit">
                  <v-icon class="mr-1">mdi-plus</v-icon> 
                  Add Rate
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :items="type.rates"
            :headers="headers"
            hide-default-footer>

            <template v-slot:item.rate="{ item }">
              <span class="font-weight-medium" v-html="$root.formatCurrency(item.rate)"></span>
            </template>
            
            <template v-slot:item.action="{ item }">
              <EditHERentalRate :item="item" v-on:deleteItem="onDeleteRate(item)" />
            </template>
            
          </v-data-table>
        </v-col>

        <v-col cols="12" class="pa-2">
          <v-btn
            text
            color="success"
            class="float-right"
            @click="dialogState = false">
            Done
          </v-btn>
        </v-col>

      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';
import EditHERentalRate from './EditHERentalRate.vue';

@Component({
  components: { EditHERentalRate }
})
export default class EditRate extends Mixins(AdminServiceMixin) {
  @Prop() public type!: _object;

  public dialogState = false;

  public rateRules = [ (v: string) => !!v || 'Rate is required.' ];
  public descRules = [ (v: string) => !!v || 'Description is required.' ];

  public headers = [
    { text: 'Description', align: 'start', sortable: true, value: 'desc' },
    { text: '(₱) Rate', align: 'start', sortable: true, value: 'rate' },
    { text: 'Action', align: 'start', value: 'action' }
  ];

  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    if (this.type.rates.find((el: _object) => el.desc === data.get('desc'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('desc') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.type.rates.unshift({
      desc: data.get('desc'),
      rate: parseFloat(data.get('rate') as string)
    } as _object);
    
    (this.$refs.form as any).reset();
  }

  public onDeleteRate(item: _object) {
    this.type.rates = this.type.rates.filter((el: _object) => el.desc !== item.desc);
  }
}
</script>
