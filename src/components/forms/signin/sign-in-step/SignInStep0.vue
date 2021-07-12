<template>
  <v-sheet 
    color="main">
    <v-sheet class="ml-4 mr-4 mt-2 main">
      <h2 class="font-weight-regular font-weight-medium text-left primary--text">Welcome</h2>
      <p class="text-body-2 font-weight-light mt-2">
        Get a full-time access to our Tax|Portal rich features, 
        by <router-link
          to="/auth/signup"
          class="text-decoration-none font-weight-bold white--text">signing up</router-link> an account today! 🥳
      </p>
    </v-sheet>

    <v-tabs 
      right
      dark
      background-color="transparent"
      color="primary"
      v-model="signInType">
      <v-tab>Mobile</v-tab>
      <v-tab>Email</v-tab>

      <v-tabs-items 
        dark
        v-model="signInType" class="transparent">
        <v-divider class="blue-grey darken-1"></v-divider>

        <v-tab-item>
          <MobileSignIn v-on:next="onUserSignIn" />
        </v-tab-item>
        <v-tab-item>
          <EmailSignIn v-on:next="onUserSignIn" />
        </v-tab-item>
      </v-tabs-items>

    </v-tabs>
    

    <router-link 
    to="/auth/signup"
    class="text-caption font-weigh-thin text-decoration-none text-center primary--text d-block mt-2">Don't have an account yet?</router-link>

    <!-- 
    <FormSectionSeparator message="or" />

    <v-sheet class="mr-3 ml-3 main">
      <FacebookLoginButton :signInButton="true">
        Connect <span class="text-lowercase">with</span>
      </FacebookLoginButton>
    </v-sheet> 
    -->
    
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import FacebookLoginButton from '@/components/button/social/FacebookLoginButton.vue';
import FormSectionSeparator from '@/components/forms/FormSectionSeparator.vue';

import EmailSignIn from './sign-in-step-0/EmailSignIn.vue';
import MobileSignIn from './sign-in-step-0/MobileSignIn.vue';


@Component({
  components: { 
    FacebookLoginButton,
    FormSectionSeparator,

    EmailSignIn,
    MobileSignIn
  }
})
export default class SignInForm extends Vue {
  public signInType = true;

  public onUserSignIn(data: _object) {
    this.$emit('next', data);
  }
}
</script>

<style lang="postcss" scoped>

</style>
