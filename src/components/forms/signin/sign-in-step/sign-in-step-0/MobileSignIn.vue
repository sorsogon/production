<template>
  <v-form
    class="ml-4 mr-4 mt-3"
    @submit.prevent="onSubmitSignIn">
    <v-text-field
      outlined
      label="Mobile Number"
      :error="errors.mobile ? true : false"
      v-model="mobile"
      name="mobile"
      type="tel"
      placeholder="(+63) xxx-xxxxxxx"
      prepend-inner-icon="mdi-phone"
      hide-details="auto">
    </v-text-field>

    <v-btn 
      elevation="0"
      color="primary"
      class="mt-2 text-button"
      type="submit"
      large
      :disabled="disabled"
      width="100%">Sign In</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class MobileSignIn extends Vue {
  public errors: _object = {};
  public mobile = '';
  public disabled = false;
  
  public async onSubmitSignIn(e: Event) {
    const credentials = new FormData(e.target as HTMLFormElement);
    
    
    await this.$axios.get('/sanctum/csrf-cookie');
    this.disabled = true;

    console.log(`%c[Client] Attempting to sign-in user into the server using the server endpoint /auth/login...`, 'font-weight: bold; color: pink');

    try {
      const { data } = await this.$axios.post('/auth/signin/mobile', credentials);
      console.log(`%c[Server] Sending an authentication code to the user.`, 'font-weight: bold;');
      console.log(data);
      
      // Pass in the verification url into the next phase.
      this.$emit('next', data);
    } catch(error) {
      console.log(`%c[Server] There was an error while authenticating the user.`, 'font-weight: bold; color: red');
      console.log(error);
      this.errors = error.errors ?? { mobile: '' };

      if ((error.message as string).length > 27)
        this.$store.commit('snackBar/toggle', {
          message: 'Invalid mobile number provided',
          color: 'error',
          toggle: true
        });
    }

    this.disabled = false;
    
  }

  @Watch('mobile')
  public onMobileChanged() {
    if (this.errors.mobile) this.errors.mobile = null;
  }
}
</script>

<style lang="postcss" scoped>

</style>
