<template>
  <v-dialog 
    v-model="deleteDialog"
    max-width="300"
    persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="error"
        text>
        <v-icon>mdi-delete</v-icon> Delete
      </v-btn>
    </template>
    <v-card class="pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="font-weight-medium text-body-1 mb-2">Delete {{ form.desc }} (AF {{ form.type }})?</h4>
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
            @click="onDeleteForm"
            text>
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DeleteAccountableFormDialog extends Vue {
  @Prop() public readonly form!: _object;
  public deleteDialog = false;

  public onDeleteForm() {
    this.deleteDialog = false;
    this.$emit('deleteItem');
  }
}
</script>


