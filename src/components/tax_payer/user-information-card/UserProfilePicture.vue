<template>
  <v-col cols="12" sm="auto" md="auto" lg="auto" class="d-flex justify-center align-end">
    <v-menu
      offset-x
      offset-y
      min-width="270"
      :close-on-content-click="false"
      v-model="showProfilePictureDropdown">
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          offset-x="45"
          offset-y="30"
          icon="mdi-camera"
          color="transparent"
          bottom
          overlap>
          <template v-slot:badge>
            <v-btn
              dark
              x-small
              icon
              class="rounded-circle main primary"
              @click="showProfilePictureDropdown = true">
              <v-icon x-small>mdi-camera</v-icon>
            </v-btn>
          </template>

          <v-img 
            max-width="150" 
            height="150"
            class="rounded-circle mx-auto" 
            v-bind="attrs"
            v-on="on"
            :src="$root.$user.avatar || '/images/default_profile_400x400.png'"></v-img>
        </v-badge>
      </template>

      <v-form @submit.prevent="onUpdateProfilePicture">
        <input 
          id="avatar"
          class="d-none"
          name="avatar"
          type="file" 
          accept="image/png,image/jpeg"
          value=""
          @change="onProfilePictureChange" />
        <input
          id="remove-profile"
          class="d-none"
          name="remove_profile"
          type="checkbox"
          :checked="false"
          @change="onRemoveProfilePicture" />
        <input
          ref="updateProfilePicture"
          class="d-none"
          type="submit" />
        <v-list
          dense
          class="pa-0">
          <v-list-item 
            class="pt-1"
            ripple>
            <v-list-item-content>
              <label for="avatar">
                <v-row no-gutters>
                  <v-col cols="auto" class="flex-grow-0">
                    <v-img 
                      max-width="32" 
                      src="@/assets/images/png/iconpack/camera-1429.png"></v-img>
                  </v-col>
                  <v-col class="d-flex align-center ml-4">
                    <h6 class="font-weight-medium text-subtitle-2">Upload a Profile Picture</h6>
                  </v-col>
                </v-row>
              </label>
            </v-list-item-content>
          </v-list-item>
          <v-list-item 
            class="pb-1"
            ripple>
            <v-list-item-content>
              <label for="remove-profile">
                <v-row no-gutters>
                  <v-col cols="auto" class="flex-grow-0">
                    <v-img 
                      max-width="32" 
                      src="@/assets/images/png/iconpack/dustbin.png"></v-img>
                  </v-col>
                  <v-col class="d-flex align-center ml-4">
                    <h6 class="font-weight-medium text-subtitle-2">Remove Profile Picture</h6>
                  </v-col>
                </v-row>
              </label>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-form>
    </v-menu>
    
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UserProfilePicture extends Vue {
  public showProfilePictureDropdown = false;

  public onProfilePictureChange(e: Event) {
    

    (this.$refs.updateProfilePicture as HTMLButtonElement).click();
    this.showProfilePictureDropdown = false;
  }

  public async onUpdateProfilePicture(e: Event) {
    

    await this.$root.updateProfilePicture(e.target as HTMLFormElement);
    
    
  }

  public async onRemoveProfilePicture(e: Event) {
    await this.onProfilePictureChange(e);
    (e.target as HTMLInputElement).checked = false;
  }
}
</script>
