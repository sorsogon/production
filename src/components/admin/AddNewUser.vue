<template>
  <v-dialog
    v-model="dialogState"
    persistent
    max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :width="$vuetify.breakpoint.smAndUp ? 'auto' : '100%'"
        color="primary"
        large
        class="mb-2 float-right">
        <v-icon class="mr-1">mdi-plus</v-icon> Add New User
      </v-btn>
    </template>
    <v-card class="pa-0 px-2 rounded-lg elevation-2">
      <v-form
        ref="form"
        @submit.prevent="onCreateNewUser">
        <v-row no-gutters class="pa-3">
          <v-col cols="12">
            <h5 class="font-weight-medium pt-2 text-body-1">🔐 Create New Admin Account</h5>
            <p class="font-weight-light text-caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique!</p>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="12" class="mb-1">
                <v-text-field
                  dense
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-face"
                  label="Name"
                  :error="errors.name ? true : false"
                  @change="errors.name = null"
                  name="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pr-sm-1 mb-1">
                <v-text-field
                  dense
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-email"
                  label="Email"
                  :error="errors.email ? true : false"
                  @change="errors.email = null"
                  name="email"
                  type="email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-1">
                <v-text-field
                  dense
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-key"
                  label="Bypass Key"
                  :error="errors.passkey ? true : false"
                  @change="errors.passkey = null"
                  name="passkey"
                  type="password"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pr-sm-1 mb-1">
                <v-text-field
                  dense
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-phone"
                  label="Mobile"
                  :error="errors.mobile ? true : false"
                  @change="errors.mobile = null"
                  name="mobile"
                  type="tel"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-1">
                <v-select
                  dense
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-lock"
                  label="Role"
                  :items="$roles"
                  item-text="name"
                  item-value="keyword"
                  :error="errors.role ? true : false"
                  @change="errors.role = null"
                  name="role"></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <p class="font-weight-light text-caption">
              <strong>Note: </strong> Consectetur sint nulla sunt cillum exercitation exercitation.
            </p>
          </v-col>
          <v-col cols="12">
            <div class="float-right">
              <v-btn
                color="error"
                class="mr-1"
                @click="clearAddForm"
                text>Discard</v-btn>
              <v-btn
                color="primary"
                type="submit"
                text>Create</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';

@Component
export default class AddNewUser extends Mixins(AdminServiceMixin) {
  public errors: _object = {};
  public dialogState = false;

  public clearAddForm() {
    this.dialogState = false;
    (this.$refs.form as any).reset();
  }

  get $roles() {
    return this.getAllRoles();
  }

  public async onCreateNewUser(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);

    try {
      await this.createNewUser(data);
      this.clearAddForm();
    } catch(error) {
      this.errors = error.errors;
    }
  }
}
</script>
