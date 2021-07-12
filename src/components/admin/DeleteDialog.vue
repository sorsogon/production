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
        icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <h4 class="font-weight-medium text-body-1 mb-2">Delete {{ user.email }}?</h4>
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
            @click="onDeleteUser"
            text>
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import AdminServiceMixin from '@/services/admin.service';
import { Mixins, Component, Prop } from 'vue-property-decorator';


@Component
export default class DeleteDialog extends Mixins(AdminServiceMixin) {
  public deleteDialog = false;
  @Prop({ required: true }) public readonly user!: _object;

  public async onDeleteUser(item: _object) {
    try {
      await this.deleteUser(this.user.id);
      const users = (this.$admin.users as _object[]).filter(user => user.id != this.user.id);
      this.$store.commit('admin/updateUsers', users);
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

