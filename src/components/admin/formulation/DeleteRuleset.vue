<template>
  <v-dialog
    max-width="400"
    v-model="deleteDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        v-bind="attrs"
        v-on="on"
        text
        color="error">
        <v-icon class="mr-1">mdi-delete</v-icon> Delete
      </v-btn>
    </template>
    <v-card class="pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="font-weight-medium text-body-1 mb-2">Delete {{ ruleset.desc }}?</h4>
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
            @click="onDeleteRuleset"
            text>
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';

@Component
export default class DeleteRuleset extends Mixins(AdminServiceMixin) {
  @Prop({ required: true }) public readonly ruleset!: _object;
  public deleteDialog = false;

  public onDeleteRuleset() {
    this.$emit('deleteItem');
    this.deleteDialog = false;
  }
}
</script>

