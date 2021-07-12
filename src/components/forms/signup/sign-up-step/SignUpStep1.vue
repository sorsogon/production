<template>
  <v-form class="mt-2 pb-1" @submit.prevent="onSignUpSubmit">
    <v-sheet class="mr-3 ml-3 mt-2 main">
      <v-btn @click.prevent="$emit('back')" class="mb-2 mt-1" icon>
        <v-icon size="32">mdi-arrow-left</v-icon>
      </v-btn>
    </v-sheet>

    <v-sheet class="text-center mr-5 ml-5 mt-10 main">
      <v-img
        class="mx-auto"
        max-width="128"
        src="@/assets/images/png/iconpack/sent-message.png"
      ></v-img>
      <h4 class="text-h5 primary--text font-weight-medium">
        Confirmation Code Sent
      </h4>
      <p class="text-body-2 ml-2 mr-2 text-left mt-1 font-weight-light">
        Please enter the confirmation code that was sent to your mobile number
        <strong class="font-weight-medium">{{ data.mobile }}</strong
        >. Our application would like to access your phone number and to perform
        some necessary actions.
      </p>
    </v-sheet>

    <v-sheet class="mr-5 ml-5 mt-10 main">
      <v-text-field
        outlined
        label="Confirmation Code"
        placeholder="(ex. 86323948)"
        name="code"
        type="tel"
        v-model="code"
        :error-messages="errors.code"
        prepend-inner-icon="mdi-cellphone-basic"
        hide-details="auto"
        class="mb-2 mt-2"
      >
      </v-text-field>

      <v-btn
        elevation="0"
        color="primary"
        class="text-button"
        type="submit"
        large
        ref="submitBtn"
        width="100%"
        >Next</v-btn
      >
    </v-sheet>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class SignInStep1 extends Vue {
  @Prop() public readonly data!: _object;
  public submitButtonDisabled = false;
  public errors: _object = {};
  public code = "";

  public async onSignUpSubmit() {
    const submitBtn = this.$refs.submitBtn as HTMLButtonElement;
    const credentials = new FormData();

    this.submitButtonDisabled = !this.submitButtonDisabled;

    console.log(
      `%c[Client] Attempting to verify the confirmation code.`,
      "font-weight: bold"
    );

    credentials.append("csrftoken", this.data.csrftoken);
    credentials.append("sessionid", this.data.sessionid);
    credentials.append("code", this.code);

    try {
      const { data } = await this.$axios.post(
        `/auth/signup/confirmation/${this.code}`,
        credentials
      );
      console.log(
        `%c[Server] Validated confirmation code`,
        "font-weight: bold; color: green"
      );

      this.$emit("next", data);
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

  @Watch("code")
  onCodeChanged() {
    if (this.errors.code) this.errors.code = null;
  }
}
</script>

<style lang="postcss" scoped></style>
