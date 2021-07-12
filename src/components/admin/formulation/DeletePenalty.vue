<template>
  <v-dialog
    max-width="400"
    v-model="deleteDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        v-bind="attrs"
        v-on="on"
        icon
        color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="font-weight-medium text-body-1 mb-2">Delete {{ $penalty.desc }}?</h4>
          <p class="font-weight-light text-caption my-0">
            Commodo officia proident exercitation pariatur duis 
            ex nisi labore commodo velit commodo adipisicing.
          </p>
        </v-col>
        <v-col cols="12" class="d-flex align-center justify-end">
          <v-btn 
            text 
            small
            color="primary" 
            @click="deleteDialog = false"
            class="float-right">
            Cancel
          </v-btn>
          <v-btn 
            color="error"
            class="float-right" 
            @click="onDeletePenalty"
            text>
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';

@Component
export default class DeletePenalty extends Mixins(AdminServiceMixin) {
  public deleteDialog = false;

  public onDeletePenalty() {
    this.deleteDialog = false;
    this.$emit('deleteItem');
  }
}
</script>

