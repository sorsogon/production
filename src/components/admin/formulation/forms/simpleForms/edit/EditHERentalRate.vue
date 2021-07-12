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
        <v-icon class="mr-1">mdi-pencil</v-icon> Edit Rate
      </v-btn>
    </template>
    <v-card>
      <v-row no-gutters>
        <v-col cols="12" class="pa-3">
          <h4 class="font-weight-medium main--text primary--text text-body-1 mb-1 d-flex align-center">
            <v-icon class="mr-1 text-h5 main--text primary--text">mdi-table-edit</v-icon>
            Edit Rate
          </h4>
          <p class="text-caption font-weight-light mb-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
            harum nesciunt.
          </p>
        </v-col>

        <v-col cols="12" class="px-3 pb-1">
          <v-text-field
            dense
            hide-details
            outlined
            v-model="item.desc"
            label="Description"></v-text-field>
        </v-col>

        <v-col cols="12" class="px-3">
          <v-text-field
            dense
            hide-details
            outlined
            prefix="₱"
            v-model="item.rate"
            label="Rate"></v-text-field>
        </v-col>

        <v-col cols="12" class="pa-2 pt-3">
          <DeleteHERentalRateDialog :item="item" v-on:deleteItem="onDeleteItem" />
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
import { Vue, Component, Prop } from 'vue-property-decorator';

import DeleteHERentalRateDialog from '../delete/DeleteHERentalRateDialog.vue';

@Component({
  components: {
    DeleteHERentalRateDialog
  }
})
export default class EditHERentalRate extends Vue {
  @Prop({ required: true }) public readonly item!: _object;
  public dialogState = false;

  public onDeleteItem() {
    this.$emit('deleteItem');
    this.dialogState = false;
  }
}
</script>

