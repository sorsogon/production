<template>
  <v-dialog
    v-model="dialogState"
    persistent
    max-width="360">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        small
        depressed
        color="primary py-1">
        <v-icon class="mr-1">mdi-pencil</v-icon>  
        Edit Capacity
      </v-btn>
    </template>
    <v-card>
      <v-row no-gutters>
        <v-col cols="12" class="pa-3">
          <h4 class="font-weight-medium main--text primary--text text-body-1 mb-1 d-flex align-center">
            <v-icon class="mr-1 text-h5 main--text primary--text">mdi-table-edit</v-icon>
            Edit Capacity
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
              <v-col cols="12">
                <v-form ref="innerForm">
                  <v-text-field
                    dense
                    hide-details
                    outlined
                    :rules="typeRules"
                    required
                    label="Equipment Type"
                    v-model="item.type"
                    name="type"></v-text-field>
                </v-form>
              </v-col>

              <v-col cols="12" class="my-2">
                <h4 class="font-weight-medium text-caption main--text primary--text">Capacity Management</h4>
                <v-divider></v-divider>
              </v-col>

              <v-col cols="12" class="pb-2">
                <v-text-field
                  dense
                  hide-details
                  outlined
                  required
                  :rules="capacityRules"
                  label="Equipment Capacity"
                  name="capacity"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn
                  width="100%"
                  color="primary"
                  type="submit">
                  <v-icon class="mr-1">mdi-plus</v-icon> 
                  Add Capacity
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col cols="12" class="mb-1">
          <v-data-table
            :items="item.category"
            :headers="headers"
            hide-default-footer>

            <template v-slot:item.capacity="{ item }">
              <span>{{ item.capacity }}</span>
            </template>

            <template v-slot:item.action="{ item }">
              <EditRate :type="item" />
            </template>

          </v-data-table>
        </v-col>
        
        <v-col cols="12" class="pa-2">
          <DeleteHERentalDialog :item="item" v-on:deleteItem="onDeleteItem(item)" />
          <v-btn
            text
            class="float-right"
            color="primary"
            @click="onDialogClose">
            Back
          </v-btn>
        </v-col>

      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import AdminServiceMixin from '@/services/admin.service';

import DeleteHERentalDialog from '../delete/DeleteHERentalDialog.vue';
import EditRate from './EditRate.vue';

@Component({
  components: {
    DeleteHERentalDialog,
    EditRate
  }
})
export default class EditCapacity extends Mixins(AdminServiceMixin) {
  @Prop() public readonly item!: _object;

  public dialogState = false;
  public capacityRules = [ (v: string) => !!v || 'Capacity is required.' ];
  public typeRules = [ (v: string) => !!v || 'Equipment Type field is required.' ];

  public headers = [
    { text: 'Capacity', align: 'start', sortable: true, value: 'capacity' },
    { text: 'Action', align: 'start', value: 'action' }
  ];

  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    if (this.item.category.find((el: _object) => el.type === data.get('capacity'))) {
      this.$store.commit('snackBar/toggle', {
        message: `${ data.get('capacity') } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    this.item.category.unshift({
      capacity: data.get('capacity'),
      rates: []
    } as _object);
    
    (this.$refs.form as any).reset();
  }

  public onDialogClose() {
    if ((this.$refs.innerForm as any).validate()) {
      this.dialogState = false;
    }
  }

  public onDeleteItem(item: _object) {
    this.$ruleset.rates.rates = this.$ruleset.rates.rates.filter((el: _object) => el.type !== item.type);
    this.dialogState = false;
  }

}
</script>
