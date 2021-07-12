<template>
  <v-stepper 
    v-model="step"
    class="sign-up-form transparent elevation-0 pa-0">
    <v-stepper-items>
      <v-stepper-content class="pa-0" step="1">
        <VerificationStep0 v-on:next="step = 2" />
      </v-stepper-content>
      <v-stepper-content class="pa-0" step="2">
        <VerificationStep1 />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import VerificationStep0 from './verification-step/VerificationStep0.vue';
import VerificationStep1 from './verification-step/VerificationStep1.vue';

@Component({
  components: {
    VerificationStep0,
    VerificationStep1
  }
})
export default class UnverifiedUserAccount extends Vue {
  public step: number | null = 0;

  get $profile() {
    return this.$root.$user.profile ?? {};
  }

  public mounted() {
    
    this.step = this.$profile.status == 'unverified' || !this.$profile.status ? 1 :
                this.$profile.status == 'pending' ? 2 : 1;
  }
}
</script>
