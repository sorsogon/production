<template>
  <v-stepper 
    v-model="step" 
    dark
    class="sign-in-form transparent elevation-0">
    <v-stepper-items>
      <v-stepper-content step="1">
        <SignInStep0 v-on:next="proceed" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <SignInStep1 
          :countdown="timer"
          v-on:back="onBack" 
          :signInData="signInData" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SignInStep0 from './sign-in-step/SignInStep0.vue';
import SignInStep1 from './sign-in-step/SignInStep1.vue';

@Component({
  components: {
    SignInStep0, SignInStep1
  }
})
export default class SignInForm extends Vue {
  public step = 1;
  public signInData: _object = {};
  public timer = 60;
  private w!: any;

  public proceed(data: _object) {
    if (this.step < 2) ++this.step;
    
    this.w = setInterval(() => {
      if (this.timer < 1) this.onBack();

      this.timer--;
    }, 1000);

    this.signInData = { ...this.signInData, ...data };
  }

  public onBack() {
    this.step--;
    this.timer = 60;
    clearInterval(this.w);
  }
}
</script>

<style lang="postcss" scoped>
.sign-in-form * > * { padding: 0; }
</style>
