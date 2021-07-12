<template>
  <v-dialog
    max-width="300"
    v-model="dialogState">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
        depressed
        small>
        <v-icon class="mr-1">mdi-pencil</v-icon> Edit Item
      </v-btn>
    </template>
    <v-card>
      <v-form
        ref="form"
        @submit.prevent="onDoneEditing">
        <v-row no-gutters>
          <v-col cols="12" class="pa-3">
            <h4 class="font-weight-medium main--text primary--text text-body-1 mb-1 d-flex align-center">
              <v-icon class="mr-1 text-h5 main--text primary--text">mdi-table-edit</v-icon>
              Edit Serial Number
            </h4>
            <p class="text-caption font-weight-light mb-0">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
              harum nesciunt.
            </p>
          </v-col>

          <v-col cols="12" class="px-3 my-1">
            <v-select
              v-model="item.issued_to"
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

          <v-col cols="12" class="px-3">
            <h4 class="font-weight-medium text-caption main--text primary--text">Inclusive Serial No.</h4>
          </v-col>

          <v-col cols="8" class="mb-1 pl-3 pb-1 pb-sm-0">
            <v-text-field
              dense
              outlined
              hide-details
              required
              v-model="item.start"
              :rules="serialRules"
              label="Start No."
              name="start"></v-text-field>
          </v-col>

          <v-col cols="4" class="mb-1 pl-1 pr-3 pb-1 pb-sm-0">
            <v-text-field
              v-model="quantity"
              dense
              outlined
              hide-details
              required
              label="Quantity"
              name="quantity"
              :rules="quantityRules"
              :value="parseInt(item.end)-parseInt(item.start)"
              type="number"
              :min="0"></v-text-field>
          </v-col>

          <v-col cols="12" class="px-3">
            <v-text-field
              dense
              outlined
              hide-details
              required
              :rules="serialRules"
              readonly
              v-model="item.end"
              label="End No."
              name="end"></v-text-field>
          </v-col>

          <v-col cols="12" class="pa-2 pt-3">
            <DeleteAFStockDialog :item="item" v-on:deleteItem="onDeleteItem" />
            <v-btn
              text
              color="success"
              class="float-right"
              type="submit">
              Done
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';

import DeleteAFStockDialog from '../delete/DeleteAFStockDialog.vue';

import AdminServiceMixin from '@/services/admin.service.ts';

@Component({
  components: {
    DeleteAFStockDialog
  }
})
export default class EditAFSerialORNumber extends Mixins(AdminServiceMixin) {
  @Prop({ required: true }) public readonly item!: _object;
  public quantity: any = 0;
  public dialogState = false;

  @Watch('item.start')
  onStartNumberChanged() {
    this.item.start = parseInt(this.item.start);
    this.item.end = parseInt(this.item.start) + (isNaN(this.quantity) || this.quantity < 1 ? 0 : this.quantity - 1);
  }

  @Watch('dialogState', { immediate: true })
  onDialogStateChanged() {
    this.quantity = parseInt(this.item.end)-parseInt(this.item.start) + 1;
  }

  public collectorRules = [ (v: string) => !!v || 'Collection Officer is required.' ];
  public serialRules = [ (v: string) => !!v || 'Serial No. is required.' ];
  public quantityRules = [ (v: string) => !!v || 'Quantity is required.' ];

  public onDeleteItem() {
    this.$emit('deleteItem');
    this.dialogState = false;
  }

  get $collectionOfficer() {
    return this.$admin.users ?? [];
  }

  public onDoneEditing() {
    if ((this.$refs.form as any).validate())
      this.dialogState = false;
  }

  @Watch('quantity')
  onQuantityChanged() {
    this.quantity = parseInt(this.quantity);
    this.item.end = parseInt(this.item.start) + (isNaN(this.quantity) || this.quantity < 1 ? 0 : this.quantity - 1);
  }
}
</script>

