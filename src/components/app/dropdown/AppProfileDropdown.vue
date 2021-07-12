<template>
  <v-menu 
    :close-on-content-click="false"
    min-width="250"
    offset-x 
    offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-sheet>
      <v-row no-gutters>
        <v-col cols="12">
          <v-list 
            dense
            class="pa-0">
            <v-list-item class="px-2">
              <v-row no-gutters class="my-3">
                <v-col class="flex-grow-0">
                  <v-img
                  class="rounded-circle shadow-lg"
                  max-width="80"
                  height="80"
                  :src="$user.avatar || '/images/default_profile_400x400.png'"></v-img>
                </v-col>
                <v-col class="ml-2 text-truncate">
                  <p style="line-height: 1.2rem" class="text-subtitle-1 font-weight-medium mt-1 main--text primary--text">{{ $user.name }}</p>
                  <h6 class="text-subtitle-2 mt-9 font-weight-light text-capitalize">{{ $role.name }}</h6>
                </v-col>
              </v-row>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item class="mt-1 mb-2">
              <v-row no-gutters>
                <v-col class="pr-1">
                  <v-btn 
                    @click="onToggleState('light')"
                    :color="!$vuetify.theme.dark ? 'primary' : ''"
                    width="100%">
                    <v-icon class="mr-1">mdi-weather-sunny</v-icon>
                    Light
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn 
                    @click="onToggleState('dark')"
                    :color="$vuetify.theme.dark ? 'primary' : ''"
                    width="100%">
                    <v-icon class="mr-1">mdi-weather-night</v-icon>
                    Dark
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>

            <v-list-item-group>
              <v-list-item class="pa-1" to="/d/profile/edit">
                <v-row no-gutters class="align-center px-4">
                  <v-col cols="auto" class="mr-2 flex-grow-0">
                    <v-img
                      max-width="30"
                      src="@/assets/images/png/iconpack/edit.png"></v-img>
                  </v-col>
                  <v-col class="text-truncate">
                    <span class="text-subtitle-2 font-weight-medium ml-3">Edit Profile</span>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item class="pa-1" @click.prevent="onSignOut">
                <v-row no-gutters class="align-center px-4">
                  <v-col cols="auto" class="mr-2 flex-grow-0">
                    <v-img
                      max-width="30"
                      src="@/assets/images/png/iconpack/remove.png"></v-img>
                  </v-col>
                  <v-col class="text-truncate">
                    <span class="text-subtitle-2 font-weight-medium ml-3">Logout, {{ $user.email }}</span>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class AppProfileDropdown extends Vue {
  public async onSignOut() {
    
    try {
      const { data: { message } } = await this.$axios.put('/auth/logout');

      localStorage.removeItem('user'); 
      await this.$router.replace('/auth/signin');
      

      this.$store.commit('snackBar/toggle', {
        message,
        color: 'success',
        toggle: true
      });

    } catch(error) {
      console.log(error);
      
      this.$store.commit('snackBar/toggle', {
        message: error.message,
        color: 'red accent-2',
        toggle: true
      });

    }

    this.$vuetify.theme.dark = false;
    
  }

  public async onToggleState(theme: string) {
    this.$vuetify.theme.dark = theme == 'light' ? false : true;

    try {
      await this.$root.updateUserTheme();
    } catch(error) {
      console.log(error);
    }
  }


  get $user() {
    return this.$root.$user ?? {};
  }

  get $profile() {
    return this.$user.profile ?? {};
  }

  get $role() {
    return this.$root.$user.role ?? {};
  }

}
</script>

