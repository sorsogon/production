<template>
  <v-dialog
    max-width="600"
    v-model="dialogState"
    bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        small
        depressed
        v-bind="attrs"
        v-on="on">
        <v-icon class="mr-1">mdi-pencil</v-icon> Edit Form
      </v-btn>
    </template>
    <v-sheet class="pa-3 rounded-lg">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="text-body-1 font-weight-medium mb-1 main--text primary--text">
            <v-icon class="mr-1 main--text primary--text">mdi-table-edit</v-icon> Edit Form
          </h4>
          <p class="text-caption font-weight-light mb-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
            harum nesciunt.
          </p>
        </v-col>
        <v-col cols="12" class="mt-2 px-2">
          <v-row no-gutters>
            <v-col
              cols="6"
              class="pr-sm-1 pb-1 pb-sm-0">
              <v-text-field
                dense
                hide-details
                outlined
                required
                :rules="typeRules"
                v-model="form.type"
                placeholder="ex. 51-C"
                name="type"
                label="Type"></v-text-field>
            </v-col>
            <v-col 
              cols="6"
              class="pb-1">
              <v-text-field
                dense
                hide-details
                outlined
                required
                :rules="priceRules"
                v-model="form.price"
                prefix="₱"
                label="Price"
                name="price"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                dense
                hide-details
                outlined
                required
                :rules="descRules"
                v-model="form.desc"
                label="Description"
                name="desc"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class=" px-2">
          <v-form
            ref="form"
            @submit.prevent="onAddNewItem">
            <v-row no-gutters>
              <v-col cols="12" class="mt-2">
                <h4 class="font-weight-medium text-caption main--text primary--text">Stock Management</h4>
                <v-divider></v-divider>
              </v-col>

              <v-col cols="12" class="my-1">
                <v-select
                  dense
                  outlined
                  hide-details
                  label="Collection Officer"
                  :rules="collectorRules"
                  :items="$collectionOfficer"
                  item-text="name"
                  item-value="id"
                  name="collector"></v-select>
              </v-col>

              <v-col cols="12">
                <h4 class="font-weight-medium text-caption main--text primary--text">Inclusive Serial No.</h4>
              </v-col>

              <v-col cols="12" sm="4" class="pr-sm-1 pb-1 pb-sm-0">
                <v-text-field
                  v-model="start"
                  dense
                  outlined
                  hide-details
                  required
                  :rules="serialRules"
                  label="Start No."
                  name="start"></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" class="pr-sm-1 pb-1 pb-sm-0">
                <v-text-field
                  v-model="quantity"
                  dense
                  outlined
                  hide-details
                  required
                  type="number"
                  :rules="quantityRules"
                  label="Quantity"
                  :min="0"
                  name="quantity"></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="end"
                  dense
                  outlined
                  hide-details
                  required
                  readonly
                  :rules="serialRules"
                  label="End No."
                  name="end"></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-1">
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

        <v-col cols="12">
          <v-data-table
            :items="$filteredStorage"
            :headers="headers">

            <template v-slot:item.collector="{ item }">
              <span class="font-weight-medium">{{ getCollectionOfficer(item.issued_to).name }}</span>
            </template>
            
            <template v-slot:item.serial="{ item }">
              <v-chip 
                small
                color="success">
                {{ item.start }} — {{ item.end }}
              </v-chip>
            </template>

            <template v-slot:item.action="{ item }">
              <EditAFSerialORNumber :item="item" v-on:deleteItem="onDeleteStock(item)" />
            </template>
            
          </v-data-table>
        </v-col>

        <v-col cols="12" class="mt-2 px-2">
          <v-btn
            color="success"
            text
            depressed
            class="float-right"
            @click="dialogState = false">
            Done
          </v-btn>
          <DeleteAccountableFormDialog :form="form" v-on:deleteItem="onDeleteForm" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';

import EditAFSerialORNumber from './EditAFSerialORNumber.vue';
import DeleteAccountableFormDialog from '../delete/DeleteAccountableFormDialog.vue';

import AdminServiceMixin from '@/services/admin.service';

@Component({
  components: {
    EditAFSerialORNumber,
    DeleteAccountableFormDialog
  }
})
export default class EditAccountableFormType extends Mixins(AdminServiceMixin) {
  @Prop() public readonly form!: _object;
  public start: any = null;
  public end: any = null;
  public quantity: any = 0;

  public dialogState = false;

  @Watch('dialogState')
  onDialogStateChange() {
    this.start = null;
    this.end = null;
    this.quantity = 0;
  }

  @Watch('quantity')
  @Watch('start')
  onQuantityChanged() {
    this.quantity = parseInt(this.quantity);
    this.end = parseInt(this.start as string) + (isNaN(this.quantity) || this.quantity < 1 ? 0 : this.quantity - 1);

    if (isNaN(parseInt(this.end as string))) this.end = null;
  }

  public collectorRules = [ (v: string) => !!v || 'Collection Officer is required.' ];
  public descRules = [ (v: string) => !!v || 'Description is required.' ];
  public typeRules = [ (v: string) => !!v || 'Rate is required.' ];
  public priceRules = [ (v: string) => !!v || 'Price is required.' ];
  public serialRules = [ (v: string) => !!v || 'Serial No. is required.' ];
  public quantityRules = [ (v: string) => !!v || 'Quantity is required.' ];

  public headers = [
    { text: 'Collection Officer', align: 'start', sortable: true, value: 'collector' },
    { text: 'OR/Serial No.', align: 'start', sortable: true, value: 'serial' },
    { text: 'Action', align: 'start', sortable: false, value: 'action' }
  ];

  get $collectionOfficer() {
    return this.$admin.users ?? [];
  }

  get $filteredStorage() {
    return (this.form.storage as _object[]).filter((el: _object) => {
      const role = this.$root.$user.role?.name as string;

      return el.issued_by === this.$root.$user.id || [ 'admin/verifier', 'developer' ].findIndex((el: string) => role === el) != -1;
    });
  }

  public onAddNewItem(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    if (!(this.$refs.form as any).validate()) return;

    const start = parseInt(data.get('start') as string);
    const end = parseInt(data.get('end') as string);

    if (this.form.storage.find((el: _object) => el.start === start && el.end === end)) {
      this.$store.commit('snackBar/toggle', {
        message: `${ start } — ${ end } has already been added!`,
        color: 'error lighten-1',
        toggle: true
      });

      return;
    }

    if (start > end) {
      this.$store.commit('snackBar/toggle', {
        message: `Invalid starting and ending serial number`,
        color: 'error lighten-1',
        toggle: true
      });
      
      return;
    }

    this.form.storage.unshift({
      id: this.form.increment++,
      start: parseInt(data.get('start') as string),
      end: parseInt(data.get('end') as string),
      issued_to: parseInt(data.get('collector') as string),
      issued_by: this.$root.$user.id
    });

    (this.$refs.form as any).reset();
    this.start = null;
    this.end = null;
    this.quantity = 0;
  }

  public onDeleteForm() {
    const data = this.$ruleset.rates.forms.filter((el: _object) => el.desc !== this.form.desc);

    this.$ruleset.rates.forms = data;
    this.dialogState = false;
  }
  
  public onDeleteStock(item: _object) {
    this.form.storage = this.form.storage.filter((el: _object) => {
      return `${ el.start }${ el.end }` != `${ item.start }${ item.end }`;
    });
  }

  public getCollectionOfficer(id: number) {
    return this.$collectionOfficer.find((el: _object) => el.id === id) ?? {};
  }

}
</script>
