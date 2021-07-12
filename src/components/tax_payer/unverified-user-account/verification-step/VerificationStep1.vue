<template>
  <v-sheet
    rounded="lg"
    elevation="2"
    class="py-4 mx-1 px-4 mb-3 mt-2 lighten-1">
    <v-row no-gutters class="
      px-0 px-sm-4 px-md-4 px-lg-4 py-5">
      <v-col 
        cols="12" 
        sm="auto" 
        lg="auto" 
        md="auto" 
        class="d-flex align-center justify-center">
        <v-img 
          class="mb-4 mb-sm-0 mb-md-0 mb-lg-0"
          max-width="128" 
          src="@/assets/images/png/iconpack/chat-support-1707.png"></v-img>
      </v-col>
      <v-col class="ml-sm-8 ml-md-8 ml-lg-8 d-flex flex-column">
        <v-row no-gutters>
          <v-col cols="12">
            <h5 class="font-weight-medium text-body-1 mb-4">
              Hi, <span class="main--text primary--text lighten-2">{{ $root.$user.email }}</span>!
            </h5>

            <p class="text-subtitle-2 font-weight-light mb-4">
              Noted, we will review your document as soon as possible so please just standby, and 
              have a sip of coffee while you're waiting!
            </p>
          </v-col>
          <v-col class="main--text primary--text">
            <v-progress-circular
              class="pa-0 mr-2"
              size="18" width="2"
              indeterminate></v-progress-circular>
            <h5 class="d-inline font-weight-medium text-caption">Pending for verification</h5>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VerificationStep0 extends Vue {
  get $profile() {
    return this.$root.$user.profile ?? {};
  }
}
</script>


