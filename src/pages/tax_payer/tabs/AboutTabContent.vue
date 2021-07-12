<template>
  <v-container class="px-1">
    <p class="font-weight-light text-caption">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Nobis nemo optio qui, repellat dicta accusantium 
      iure minima facilis magni obcaecati.
    </p>
    <v-row no-gutters>
      <v-col cols="12" class="mb-4">
        <AboutProfileEditButton edit="info" />
        <h4 class="pa-0 font-weight-medium mb-3 main--text primary--text">Basic Information</h4>
        <v-list 
          class="pa-0 rounded-lg" 
          dense 
          elevation="2">
          <v-list-item class="d-flex">
            <em class="text-subtitle-2">Birthdate</em>
            <v-spacer></v-spacer>
            <strong class="text-caption">{{ new Date($user.birthdate).toDateString() }}</strong>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="d-flex">
            <em class="text-subtitle-2">Gender</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-capitalize">{{ $user.gender }}</strong>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="d-flex">
            <em class="text-subtitle-2">Profession(s)</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-truncate ml-4">{{ $profile.professions.join(', ') }}</strong>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" class="mb-4">
        <AboutProfileEditButton edit="education" />
        <h4 class="pa-0 font-weight-medium text-body-2 mb-3 main--text primary--text">Education</h4>
        <v-list 
          class="pa-0 rounded-lg" 
          dense 
          elevation="2">
          <v-list-item class="d-flex">
            <em class="text-subtitle-2">Primary</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-truncate ml-4" title="">{{ $profile.primary_edu }}</strong>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="d-flex">
            <em class="text-subtitle-2">Secondary</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-truncate ml-4" title="">{{ $profile.secondary_edu }}</strong>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="d-flex">
            <em class="text-subtitle-2">Tertiary</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-truncate ml-4" title="">{{ $profile.tertiary_edu }}</strong>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" class="mb-4">
        <AboutProfileEditButton edit="contact" />
        <h4 class="pa-0 font-weight-medium text-body-2 mb-3 main--text primary--text">Contact</h4>
        <v-list 
          class="pa-0 rounded-lg" 
          dense 
          elevation="2">
          <v-list-item class="d-flex">
            <em class=" text-subtitle-2">Email</em>
            <v-spacer></v-spacer>
            <strong class="text-caption">{{ $user.email }}</strong>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="d-flex">
            <em class=" text-subtitle-2">Mobile</em>
            <v-spacer></v-spacer>
            <strong class="text-caption">0{{ $user.mobile }}</strong>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="d-flex">
            <em class=" text-subtitle-2">Residence</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-truncate ml-4">
              {{ $residence.province }},
              {{ $residence.city }},
              {{ $residence.barangay }}
              <span v-if="$root.$user.residence.address_line" class="font-weight-light text-caption">, ({{ $root.$user.residence.address_line }})</span>
            </strong>
          </v-list-item>
          <v-list-item class="d-flex">
            <em class=" text-subtitle-2">Permanent</em>
            <v-spacer></v-spacer>
            <strong class="text-caption text-truncate ml-4">
              {{ $permanent.province }},
              {{ $permanent.city }},
              {{ $permanent.barangay }}
              <span v-if="$permanent.address_line" class="font-weight-light text-caption">, ({{ $root.$user.permanent.address_line }})</span>
            </strong>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AboutProfileEditButton from '@/components/tax_payer/AboutProfileEditButton.vue';

@Component({
  components: {
    AboutProfileEditButton
  }
})
export default class AboutTabContent extends Vue {
  get $user() {
    return this.$root.$user;
  }

  get $residence() {
    return this.$root.$user.residence ?? {};
  }

  get $permanent() {
    return this.$root.$user.permanent ?? {};
  }

  get $profile() {
    return this.$root.$user.profile ?? {};
  }
}
</script>

