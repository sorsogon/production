<template>
  <v-container class="pa-3">
    <h4 class="text-h6 font-weight-regular mb-1">👮 Manage Access Control</h4>
    <p class="text-subtitle-2 font-weight-light">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
      harum nesciunt nam reprehenderit temporibus tenetur cupiditate, nemo, saepe blanditiis 
      unde facere maxime rem pariatur nostrum reiciendis dignissimos? Iste.
    </p>
    <v-row no-gutters>
      <v-col cols="12">
        <AddNewUser />
      </v-col>
      <v-col cols="12">
        <v-sheet class="elevation-2 rounded-lg">
          <v-row no-gutters>
            <v-col>
              <v-row 
                class="ma-3 align-center"
                no-gutters>
                <v-col>
                  <h4 class="font-weight-medium primary--text main--text text-body-1 d-flex align-center">
                    <v-icon class="primary--text main--text mr-1">mdi-face</v-icon> Manage User Account
                  </h4>
                </v-col>
                <v-col>
                  <v-row no-gutters>
                    <v-col cols="12" md="5" class="pb-1 pb-md-0 pr-md-1">
                      <v-select
                        v-model="roleFilter"
                        dense
                        hide-details
                        outlined
                        solo
                        :items="$roles.concat([{ keyword: null, name: 'All' }]).reverse()"
                        item-text="name"
                        item-value="keyword"
                        flat
                        label="Role"
                        prepend-inner-icon="mdi-lock"></v-select>
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-text-field
                        v-model="search"
                        dense
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        outlined
                        solo
                        flat
                        label="Search"
                        type="search"></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-data-table
                :search="search"
                :items="$items"
                :headers="headers">

                <template v-slot:item.actions="{ item }">
                  <EditUserAccessControl 
                    :user="item" 
                    v-on:updateUser="onUserUpdate" />
                  <DeleteDialog :user="item" />
                </template>

                <template v-slot:item.mobile="{ item }">
                  0{{ item.mobile }}
                </template>

                <template v-slot:item.created_at="{ item }">
                  <v-chip 
                    small
                    color="success">{{ new Date(item.created_at) | formatDateString }}</v-chip>
                </template>

                <template v-slot:item.role="{ item }">
                  <v-chip v-if="item.role.name == 'admin/verifier'" :color="getColor(item.role.name)">Admin/Verifier</v-chip>
                  <v-chip v-else-if="item.role.name == 'payer'" :color="getColor(item.role.name)">Taxpayer</v-chip>
                  <v-chip v-else class="text-capitalize" :color="getColor(item.role.name)">{{ item.role.name }}</v-chip>
                </template>

                <template v-slot:item.status="{ item }">
                  <v-switch
                    class="pa-0 ma-0"
                    dense
                    :input-value="item.status == 'enabled' ? true : false"
                    hide-details
                    :checked="item.status == 'enabled' ? true : false"
                    @change="onUpdateUserStatus(item)"></v-switch>
                </template>

              </v-data-table>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import AddNewUser from '@/components/admin/AddNewUser.vue';
import DeleteDialog from '@/components/admin/DeleteDialog.vue';
import EditUserAccessControl from '@/components/admin/EditUserAccessControl.vue';

import AdminServiceMixin from '@/services/admin.service';

@Component({
  components: {
    EditUserAccessControl,
    AddNewUser,
    DeleteDialog
  }
})
export default class SettingsACLPage extends Mixins(AdminServiceMixin) {
  public dialogState = false;
  public roleFilter = null;
  public search = null;
  public headers = [
    { text: 'Name', align: 'start', sortable: true, value: 'name' },
    { text: 'Email Address', align: 'start', sortable: true, value: 'email' },
    { text: 'Mobile Number', align: 'start', sortable: true, value: 'mobile' },
    { text: 'Created At', align: 'start', sortable: true, value: 'created_at' },
    { text: 'Role', align: 'start', sortable: true, value: 'role' },
    { text: 'Action', align: 'start', sortable: false, value: 'actions' },
    { text: 'Enabled', align: 'start', sortable: false, value: 'status' }
  ];

  public async created() {
    await this.getAllUsers();
  }

  get $items() {
    if (this.roleFilter && this.roleFilter != 'all') return this.$users.filter(el => el.role.name === this.roleFilter) ?? [];

    return this.$users;
  }

  get $users() {
    return this.$admin.users ?? [];
  }

  get $roles() {
    return this.getAllRoles();
  }

  public async onUserUpdate(user: _object) {
    try {
      this.$store.commit('admin/updateUsers', this.$admin.users?.filter(el => el.id != user.id));
      this.$admin.users?.unshift(user);
    } catch(error) {
      console.log(error);
    }
  }

  public async onUpdateUserStatus(item: _object) {
    try {
      const state = item.status == 'disabled' ? 'Enabled' : 'Disabled';
      item.status = item.status == 'disabled' ? 'enabled' : 'disabled';
      
      await this.updateUserStatus(item.id);

      this.$store.commit('snackBar/toggle', {
        message: `${ state } ${ item.email }!`, 
        color: 'success',
        toggle: true
      });
    } catch(error) {
      console.log(error);
    }
  }

  public getColor(role: string) {
    switch (role) {
    case 'admin/verifier': return 'error';
    case 'developer': return 'info';
    case 'collector': return 'error';
    case 'liquidator':
    case 'cashier': return 'warning darken-1';
    case 'payer': return 'secondary';
    }
  }
}
</script>
