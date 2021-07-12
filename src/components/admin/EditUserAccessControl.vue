<template>
  <v-dialog
    v-model="dialogState"
    persistent
    max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        v-bind="attrs"
        v-on="on"
        icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-0 rounded-lg elevation-2">
      <v-form
        ref="form"
        @submit.prevent="onUpdateUser">
        <v-row no-gutters class="pa-3">
          <v-col cols="12">
            <h5 class="font-weight-medium pt-2 text-body-1">🧑 User Access Control</h5>
            <p class="font-weight-light text-caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique!</p>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="12" class="mb-1">
                <v-text-field
                  dense
                  :value="user.name"
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-face"
                  label="Name"
                  name="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pr-sm-1 mb-1">
                <v-text-field
                  dense
                  :value="user.email"
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-email"
                  label="Email"
                  name="email"
                  type="email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-1">
                <v-text-field
                  dense
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-key"
                  label="Bypass Password"
                  name="passkey"
                  type="password"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pr-sm-1 mb-1">
                <v-text-field
                  dense
                  :value="user.mobile"
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-phone"
                  label="Mobile"
                  name="mobile"
                  type="tel"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-1">
                <v-select
                  dense
                  :value="$role.name"
                  hide-details
                  outlined
                  prepend-inner-icon="mdi-lock"
                  label="Role"
                  :items="$roles"
                  item-text="name"
                  item-value="keyword"
                  name="role"></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <p class="font-weight-light text-caption">
              <strong>Note: </strong> Consectetur sint nulla sunt cillum exercitation exercitation.
            </p>
          </v-col>
          <v-col cols="12" v-if="[ 'payer', 'developer' ].findIndex(role => role === $role.name) != -1 && user.profile.status === 'pending' && user.profile.document">
            <v-row no-gutters>
              <v-col cols="12">
                <v-alert 
                  dense
                  type="warning">
                  Carefully review the following information that has been provided by the taxpayer:
                  <ul class="mt-2 text-subtitle-2">
                    <li class="font-weight-medium">Profile picture</li>
                    <li class="font-weight-medium">Submitted ID</li>
                  </ul>
                </v-alert>
              </v-col>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="5">
                    <v-sheet 
                      class="pa-2 pb-9" 
                      elevation="3" 
                      rounded="sm"
                      color="white">
                      <v-img
                        max-width="100%"
                        :src="user.avatar ? user.avatar : '/images/default_profile_400x400.png'"></v-img>
                    </v-sheet>
                  </v-col>
                  <v-col cols="7" class="pl-2">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-btn 
                          :href="user.profile.document"
                          target="_blank"
                          class="mb-2"
                          width="100%"
                          depressed 
                          color="primary">
                          <v-icon class="mr-1">mdi-eye</v-icon> Preview ID
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <h4 class="text-subtitle-2 font-weight-medium primary--text">
                          Basic Information
                        </h4>
                        <address>
                          <ul class="text-subtitle-2">
                            <li>{{ user.email }}</li>
                            <li>{{ '+639' + user.mobile }}</li>
                            <li>{{ user.address.residence.province }}</li>
                          </ul>
                        </address>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" v-else-if="[ 'payer', 'guest', 'developer' ].findIndex(role => role === $role.name) != -1 && user.profile.status !== 'verified'">
            <v-alert 
              outlined
              dense
              type="info">This taxpayer haven't submitted a document yet.</v-alert>
          </v-col>
          <v-col cols="12" v-else-if="[ 'payer', 'guest', 'developer' ].findIndex(role => role === $role.name) != -1">
            <v-alert 
              outlined
              dense
              type="success">This taxpayer has already been verified.</v-alert>
          </v-col>
          <v-col cols="12" class="mt-2">
            <div class="float-right">
              <v-dialog 
                max-width="300"
                v-if="$role.name === 'payer' && !user.profile.status || user.profile.status === 'pending'"
                v-model="verifyDialogState">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    v-bind="attrs"
                    v-on="on"
                    class="mr-1" 
                    color="success"
                    text>Verify</v-btn>
                </template>
                <v-card class="pa-3">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h4 class="font-weight-medium text-body-1 mb-2">Verify {{ user.email }}?</h4>
                      <p class="font-weight-light text-caption my-0">
                        Commodo officia proident exercitation pariatur duis 
                        ex nisi labore commodo velit commodo adipisicing.
                      </p>
                    </v-col>
                    <v-col cols="12" class="d-flex align-center justify-end">
                      <v-btn 
                        @click="verifyDialogState = false"
                        class="float-right" 
                        text>Cancel</v-btn>
                      <v-btn 
                        color="success"
                        class="float-right"
                        @click="onUserAccountVerify"
                        text>
                        Verify
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-dialog>
              <v-btn
                color="error"
                class="mr-1"
                @click="onDiscardChange"
                text>Discard</v-btn>
              <v-btn
                color="primary"
                type="submit"
                text>Save</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';

@Component
export default class EditUserAccessControl extends Mixins(AdminServiceMixin) {
  @Prop({ required: true }) public readonly user!: _object;
  public errors: _object = {};

  public dialogState = false;
  public verifyDialogState = false;

  get $roles() {
    return this.getAllRoles();
  }

  get $role() {
    return this.user.role ?? {};
  }

  public async onUpdateUser(e: Event) {
    try {
      const data = new FormData(e.target as HTMLFormElement);

      await this.updateUser(this.user.id, data);

      this.dialogState = false;
    } catch(error) {
      this.errors = error.errors;
    }
  }

  public async onDiscardChange() {
    await this.getAllUsers();

    this.dialogState = false;
  }

  public async onUserAccountVerify() {
    try {
      await this.verifyUserAccount(this.user.id);

      this.dialogState = false;
      this.$store.commit('snackBar/toggle', {
        toggle: true,
        message: `${this.user.email} has been verified!`,
        color: 'success'
      });

      this.getAllUsers();
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

