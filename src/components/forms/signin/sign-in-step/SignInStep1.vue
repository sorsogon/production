<template>
  <v-form
    class="mt-4 pb-1" 
    @submit.prevent="attemptToAuthenticateUser">
    <v-sheet class="mr-3 ml-3 mt-2 main">
      <v-btn 
        @click.prevent="goBack"
        class="mb-2 mt-1" 
        icon>
        <v-icon size="32">mdi-arrow-left</v-icon>
      </v-btn>
    </v-sheet>

    <v-sheet class="text-center mr-5 ml-5 mt-10 main">
      <v-img 
        class="mx-auto"
        max-width="128"
        src="@/assets/images/png/iconpack/sent-message.png"></v-img>
      <h4 class="text-h5 white--text font-weight-medium primary--text">OTP Authentication</h4>
      <p class="text-body-2 ml-2 mr-2 mt-1 font-weight-light">
        Please enter the One-Time password Authentication Code that was sent to your 
        <span v-if="this.signInData.mobile">mobile number</span> 
        <span v-else>email address</span> 
        <strong class="font-weight-medium"> {{ credentials }}</strong>.
        <em>This OTP code is only valid for one-minute.</em>
      </p>
    </v-sheet>

    <v-sheet class="mr-5 ml-5 mt-10 main">
      <v-text-field
        outlined
        label="Authentication Code"
        placeholder="(ex. 65334)"
        :error-messages="errors.code"
        v-model="code"
        type="password"
        name="code"
        prepend-inner-icon="mdi-cellphone-basic"
        hide-details="auto"
        class="mb-2 mt-3">
      </v-text-field>

      <v-btn 
        elevation="0"
        color="primary"
        class="text-button"
        type="submit"
        large
        width="100%">({{ countdown }}) Sign Up</v-btn>
    </v-sheet>

  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SignInStep2 extends Vue {
  @Prop() public readonly signInData!: _object;
  @Prop() public readonly countdown!: number;
  public errors: _object = {};
  public code = '';

  public async attemptToAuthenticateUser(e: Event) {
    const credentials = new FormData(e.target as HTMLFormElement);

    try {
      const { data } = await this.$axios.post(this.signInData.verification_url, credentials);
      console.log(`%c[Server] We have authenticated ${data.email} from the server!`, 'font-weight: bold; color: green');
      console.log(data);

      this.$store.commit('snackBar/toggle', {
        message: `Authenticated ${data.email}`,
        color: 'success',
        toggle: true
      });
      
      this.$store.dispatch('user/update', data);
      this.$router.replace('/dashboard');
    } catch(error) {
      console.log(error);
      this.errors = error.errors ?? [];
      console.log(this.errors.code);
    }
  }

  public goBack() {
    this.$emit('back');
  }

  @Watch('code')
  private async onCodeChanged() {
    if (this.errors.code) this.errors.code = null;
  }

  get credentials() {
    return this.signInData.mobile ?? this.signInData.email ?? '';
  }
}
</script>

<style lang="postcss" scoped>

</style>
