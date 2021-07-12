<template>
  <v-sheet color="main">
    <v-sheet class="ml-4 mr-4 mt-2 pt-1" color="main">
      <h3 class="text-h5 font-weight-bold primary--text">Create an Account</h3>
      <p class="text-body-2 font-weight-light mt-2">
        Please do note that our platform authenticates a user with an OTP authentication code,
        hence you don't have to keep a 🔑.
      </p>
    </v-sheet>
    <v-divider class="mt-2 mb-5"></v-divider>
    <v-form
      class="ml-4 mr-4"
      @submit.prevent="onSignUpSubmit">
      <v-text-field
        outlined
        dense
        label="Full Name"
        name="name"
        v-model="fields.name"
        :error="errors.name ? true : false"
        prepend-inner-icon="mdi-face"
        hide-details="auto"
        class="mb-2">
      </v-text-field>
      <v-text-field
        outlined
        dense
        label="Email Address"
        name="email"
        v-model="fields.email"
        :error-messages="errors.email"
        type="email"
        placeholder="username@domain.com"
        prepend-inner-icon="mdi-email"
        hide-details="auto"
        class="mb-2">
      </v-text-field>
      <v-text-field
        outlined
        dense
        label="Mobile Number"
        name="mobile"
        v-model="fields.mobile"
        :error-messages="errors.mobile"
        type="tel"
        placeholder="(+63) xxx-xxxxxxx"
        prepend-inner-icon="mdi-phone"
        hide-details="auto"
        class="mb-0">
      </v-text-field>

      <v-sheet color="main">
        <label class="text-caption font-weight-light primary--text">Birthdate</label>
        <v-row>
          <v-col cols="5" class="pl-3 pr-1">
            <v-select
              outlined
              dense
              label="Month"
              :items="months"
              name="month"
              v-model="fields.month"
              hide-details="auto"
              class="ma-0"></v-select>
          </v-col>
          <v-col cols="3" class="pl-0 pr-0">
            <v-select
              outlined
              dense
              label="Day"
              :items="days"
              name="day"
              v-model="fields.day"
              hide-details="auto"
              class="ma-0"></v-select>
          </v-col>
          <v-col cols="4" class="pr-3 pl-1">
            <v-select
              outlined
              dense
              label="Year"
              :items="years"
              name="year"
              v-model="fields.year"
              hide-details="auto"
              class="ma-0"></v-select>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet class="pt-0 mb-2" color="main">
        <label class="text-caption font-weight-light">Gender</label>
        <v-radio-group 
          class="pa-0" 
          name="gender"
          v-model="fields.gender"
          dense
          hide-details="auto">
          <v-row>
            <v-col class="pl-3 pr-1 pt-0">
              <v-radio 
                value="female"
                label="Female"></v-radio>
            </v-col>
            <v-col class="pl-0 pr-0 pt-0">
              <v-radio 
                value="male"
                label="Male"></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-sheet>

      <v-btn 
        elevation="0"
        color="primary"
        class="mt-3 text-button"
        type="submit"
        large
        ref="submitBtn"
        :disabled="submitButtonDisabled"
        width="100%">Next</v-btn>

      <p class="text-caption font-weight-light mt-1">
        By clicking Next, we assume that you agree to our
        <router-link 
          to=""
          class="text-decoration-none font-weight-medium grey--text"><em>Terms & Condition</em></router-link> and
        <router-link 
          to=""
          class="text-decoration-none font-weight-medium grey--text"><em>Privacy Policy</em></router-link>.
      </p>

      <!-- <GoogleLoginButton 
        v-on:social="onGoogleSignUp"
        :signInButton="false"
        :class="{ 'd-none': hideGoogleButton }">
        Continue <span class="text-lowercase">with</span>
      </GoogleLoginButton> -->
      <div class="text-center">
        <router-link
        to="/auth/signin"
        class="text-decoration-none text-caption primary--text font-weight-light d-inline-block mt-2">Already have an account?</router-link>
      </div>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import GoogleLoginButton from '@/components/button/social/GoogleLoginButton.vue';

@Component({
  components: { GoogleLoginButton }
})
export default class SignUpStep0 extends Vue {
  public submitButtonDisabled = false;
  public hideGoogleButton = false;
  public errors: _object = {};
  public fields: _object = {
//  basic             birthday            gender
    name: '',         month: 'January',                     gender: 'female',
    email: '',        day: 1,                               avatar: '',
    mobile: '',       year: (new Date().getFullYear())-18,  id: '',              refreshToken: ''
  };

  public onGoogleSignUp(user: _object) {
    console.log(`%c(using data from the Google account).`, 'font-weight: bold; color: green;');
    console.log(user);

    for (const name of Object.keys(user)) {
      if (this.fields[name] !== undefined) 
        this.fields[name] = user[name];
    }

    this.hideGoogleButton = true;
  }

  /** */
  public async onSignUpSubmit(e: Event) {
    await this.$axios.get('/sanctum/csrf-cookie');
    const submitBtn = this.$refs.submitBtn as HTMLButtonElement;
    const credentials = new FormData();

    
    this.submitButtonDisabled = !this.submitButtonDisabled;

    console.log(`%c[Client] Attempting to verify the user information from the server.`, 'font-weight: bold');

    for (const name of Object.keys(this.fields))
      credentials.append(name, this.fields[name]);

    try {
      const { data: user } = await this.$axios.post('/auth/signup/confirmation', credentials);
      console.log(`%c[Server] Successfully verified the inputted data.`, 'font-weight: bold; color: green');
      console.log(user);

      if (user.timeout) {
        return this.skipConfirmation(user);
      }

      this.$emit('next', user);
    } catch(error) {
      console.log(`%c[Server] An error occured while verifying the user information:`, 'font-weight: bold; color: red;');
      console.log(error);

      this.errors = error.errors;
    }

    this.submitButtonDisabled = !this.submitButtonDisabled;
    
  }

  public async skipConfirmation(user: _object) {
    const submitBtn = this.$refs.submitBtn as HTMLButtonElement;
    const credentials = new FormData();

    this.submitButtonDisabled = !this.submitButtonDisabled;

    console.log(
      `%c[Client] Attempting to verify the confirmation code.`,
      "font-weight: bold"
    );

    credentials.append("csrftoken", user.csrftoken);
    credentials.append("sessionid", user.sessionid);
    credentials.append("code", 'timeout');

    try {
      const { data } = await this.$axios.post(
        `/auth/signup/confirmation/timeout`,
        credentials
      );
      console.log(
        `%c[Server] Validated confirmation code`,
        "font-weight: bold; color: green"
      );

      this.$emit("skip", { ...data, ...user });
    } catch (error) {
      console.log(
        `%c[Server] There was an error while attempting to verify the confirmation code.`,
        "font-weight: bold; color: red;"
      );
      console.log(error);

      this.errors = error.errors;
    }

    this.submitButtonDisabled = !this.submitButtonDisabled;
  }

  get months() {
    return [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October',
      'November', 'December'
    ];
  }

  get years() {
    const S = [];
    const current = (new Date).getFullYear();

    for (let i = current-1e2; i <= current-18; ++i) S[S.length] = i;
    return S.reverse();
  }

  get days() {
    let days = 31;
    const month = this.months.findIndex((j) => j == this.fields.month)+1;
    const year = this.fields.year;

    let fmt = (month: number, day: number, year: number) => new Date(`${month}/${day}/${year}`);

    for (let curr: Date = fmt(month, days, year);; --days, curr = fmt(month, days, year))
      if (curr.getDate() == days) break;

    return [...Array(days).keys()].map(i => i+1);
  }

  @Watch('fields.name')
  onNameChanged() {
    if (this.errors.name) this.errors.name = null;
  }

  @Watch('fields.email')
  onEmailChanged() {
    if (this.errors.email) this.errors.email = null;
  }

  @Watch('fields.mobile')
  onMobileChanged() {
    if (this.errors.mobile) this.errors.mobile = null;
  }
}
</script>
