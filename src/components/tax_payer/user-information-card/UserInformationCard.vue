<template>
  <v-sheet min-height="100%" class="mx-auto transparent mx-4 mb-0">
    <v-row>
      <UserProfilePicture />
      <v-col>
        <AboutProfileEditButton />
        <h3 class="font-weight-medium mb-0 pb-0 main--text primary--text">
          {{ $user.name }}
        </h3>

        <span v-if="$profile.professions.length > 0" class="text-caption font-weight-light">
          <v-icon small>mdi-android-studio</v-icon> 
          <em> {{ $profile.professions[0] }}</em>
        </span>

        <strong class="font-weight-light text-caption d-block">
          <v-icon small>mdi-map-marker</v-icon> {{ $residence.city }}, {{ $residence.province }}
        </strong>
        <strong class="font-weight-light text-caption d-block" v-if="$profile.website_url">
          <v-icon small>mdi-at</v-icon> {{ $profile.website_url }}
        </strong>

        <p v-if="$profile.about" class="font-weight-light text-caption my-2">
          {{ $profile.about }}
        </p>
        <p v-else class="font-weight-light text-caption my-2 mb-0">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          modi ea asperiores laborum id nisi eum et quisquam. Blanditiis,
          officiis!
        </p>

        <v-chip
          :class="{
            'success': $profile.status == 'verified',
            'warning': $profile.status == 'pending',
            'error': $profile.status == 'denied' || !$profile.status,
          }"
          class="ma-0 mt-1"
          small>
          <span class="font-weight-medium text-capitalize">{{ $profile.status ? $profile.status : 'Unverified' }}</span>
        </v-chip>

      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import AboutProfileEditButton from '../AboutProfileEditButton.vue';
import UserProfilePicture from './UserProfilePicture.vue';

@Component({
  components: { 
    AboutProfileEditButton,
    UserProfilePicture
  }
})
export default class UserInformationCard extends Vue {
  get $profile(): _object {
    return this.$root.$user.profile ?? {};
  }

  get $residence(): _object {
    return this.$root.$user.residence ?? {};
  }

  get $role(): _object {
    return this.$root.$user.role ?? {};
  }

  get $user(): _object {
    return this.$root.$user ?? {};
  }
}
</script>
