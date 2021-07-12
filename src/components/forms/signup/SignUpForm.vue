<template>
  <v-stepper 
    v-model="step"
    class="sign-up-form transparent elevation-0">
    <v-stepper-items>
      <v-stepper-content step="1">
        <SignUpStep0 
          v-on:skip="skip"
          v-on:next="proceed" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <SignUpStep1 
          :data="signUpData"
          v-on:next="proceed"
          v-on:back="--step" />
      </v-stepper-content>
      <v-stepper-content step="3">
        <SignUpStep2 
          v-on:complete="onSignUpComplete" 
          :data="signUpData"
          :errors="errors"
          v-on:back="step = 1" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SignUpStep0 from './sign-up-step/SignUpStep0.vue';
import SignUpStep1 from './sign-up-step/SignUpStep1.vue';
import SignUpStep2 from './sign-up-step/SignUpStep2.vue';

@Component({
  components: {
    SignUpStep0, 
    SignUpStep1, 
    SignUpStep2
  }
})
export default class SignUpForm extends Vue {
  public step = 1;
  public errors: _object = {};
  public signUpData: _object = {};

  public proceed(data: _object) {
    this.signUpData = { ...this.signUpData, ...data };
    if (this.step < 3) this.step++;
  }

  public skip(data: _object) {
    this.signUpData = { ...this.signUpData, ...data };
    console.log(this.signUpData);
    this.step = 3;
  }

  public async onSignUpComplete(data: _object) {
    
    this.proceed(data);

    console.log(this.signUpData);
    const credentials = new FormData();

    for (const name of Object.keys(this.signUpData))
      credentials.append(name, this.signUpData[name]);

    try {
      const { data: user } = await this.$axios.post('/auth/signup', credentials);
      console.log(`%c[Server] Successfully signed up ${user.email} from the application.`, 'font-weight: bold; color: green');
      console.log(user);

      this.$store.commit('snackBar/toggle', {
        message: `Welcome, ${user.email}`,
        color: 'success',
        toggle: true
      });

      this.$router.replace('/auth/signin');
    } catch(error) {
      console.log(`%c[Server] There was an error while attempting to sign up the user.`, 'font-weight: bold; color: red;');
      console.log(error);
      
      this.errors = error.errors;
    }

    
  }

}
</script>

<style lang="postcss" scoped>
.sign-up-form * > * {
  padding: 0;
}
</style>
