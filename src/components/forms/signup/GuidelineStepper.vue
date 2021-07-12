<template>
  <v-stepper
    vertical
    class="transparent mx-auto elevation-0 pt-16">
    <v-stepper-step step="1" class="rounded-lg p-10 mb-4 blue lighten-1 elevation-3">
      <h5 class="text-h6 text-uppercase font-weight-medium">Step 1</h5>
      <p class="font-weight-light">Provide your information and other details for validation</p>
    </v-stepper-step>
    <v-stepper-step step="2" class="rounded-lg p-10 mb-4 red lighten-1 elevation-3">
      <h5 class="text-h6 text-uppercase font-weight-medium black--text">Step 2</h5>
      <p class="font-weight-light black--text">Upload relevant documents in the following format: .pdf,.png,.jpg</p>
    </v-stepper-step>
    <v-stepper-step step="3" class="rounded-lg p-10 mb-4 grey lighten-3 elevation-3">
      <h5 class="text-h6 text-uppercase font-weight-medium black--text">Step 3</h5>
      <p class="font-weight-light black--text">Wait for confirmation to pay w/in 24 hours, via SMS or email.</p>
    </v-stepper-step>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class GuidelineStepper extends Vue {

}
</script>


