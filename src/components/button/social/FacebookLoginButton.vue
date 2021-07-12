<template>
  <v-btn
    @click.prevent="onFacebookClicked"
    outlined
    color="primary"
    class="mt-2 pa-6 text-capitalize"
    width="100%">
    <v-img src="@/assets/images/svg/social/facebook-logo.svg" max-width="32"></v-img>
    <span class="d-block mt-2 ml-2 font-weight-medium mb-auto"><slot></slot> Facebook</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FacebookLoginButton extends Vue {
  @Prop({ default: true }) public readonly signInButton!: boolean;

  public async onFacebookClicked() {
    window.removeEventListener('message', this.onMessageHandler, true);

    try {
      console.log(`%c[Facebook] Waiting for the user to acknoledge the Facebook consent provided by our app.`, 'font-weight: bold; font-style: italic');

      const { data: url } = await this.$axios.get('/auth/facebook');
      window.open(url, 'FacebookLoginConsent');

      window.addEventListener('message', this.onMessageHandler, { once: true });
    } catch(error) {
      console.log(error);
    }
    
  }

  private async onMessageHandler(e: MessageEvent) {
    e.stopPropagation();
    if (e.origin !== process.env.VUE_APP_AXIOS_API_BASE_URL) return;

    

    const { data: user } = e;
    console.log(`%c[Facebook] Displaying the credentials of %c${user.name}`, 'font-weight: bold; color: lightred;', 'font-style: italic');
    console.log(user);
    
    if (this.signInButton) await this.onFacebookSignIn(user);
    else await this.onFacebookSignUp(user);

    
  }

  private async onFacebookSignIn(data: any) {
    await this.$axios.get('/sanctum/csrf-cookie');

    console.log(`%c[Facebook] Signing in with %cFacebook`, "font-weight: bold", "color: lightblue; font-weight: bold; font-style: italic");

    const { user } = data;
    const credentials = new FormData();

    credentials.append('email', user.email);
    credentials.append('password', user.id);

    try {
      const { stringify } = JSON;
      const { data } = await this.$axios.post('/auth/login', credentials);

      console.log(`%c[Facebook] Authenticated ${data.email}`, 'font-weight: bold; color: green');
      console.log(data);

      this.$store.commit('snackBar/toggle', {
        message: `Authenticated ${data.email}`,
        color: 'success',
        toggle: true
      });

      localStorage.setItem('user', stringify(data));
      this.$router.replace('/dashboard');
    } catch(error) {
      console.log(`%c[Facebook] !!An error occured!!`, 'font-weight: bold; color: red');

      this.$store.commit('snackBar/toggle', {
        message: error.message,
        color: 'red accent-2',
        toggle: true
      });

      console.log(error);
    }

  }

  private async onFacebookSignUp(user: any) {

    console.log(`%c[Facebook] Signing up with %cFacebook`, "font-weight: bold", "color: lightblue; font-weight: bold; font-style: italic");

    try {
      console.log(`%c[Facebook] Successfully appended some important data from ${user.email} to the registration form.`, 'font-weight: bold; color: green');

      this.$store.commit('snackBar/toggle', {
        message: `Connected with ${user.email}`,
        color: 'success',
        toggle: true
      });

      this.$emit('social', user);
    } catch(error) {
      console.log(`%c[Facebook] !!An error occured!!`, 'font-weight: bold; color: red');
      
      this.$store.commit('snackBar/toggle', {
        message: error.message,
        color: 'red accent-2',
        toggle: true
      });

      console.log(error);
    }

  }

}
</script>

<style lang="postcss" scoped>

</style>
