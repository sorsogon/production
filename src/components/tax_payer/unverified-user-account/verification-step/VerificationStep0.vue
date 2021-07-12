<template>
  <v-sheet
    rounded="lg"
    elevation="2"
    class="py-5 mx-1 px-4 mb-3 mt-2 lighten-1"
  >
    <v-row
      no-gutters
      class="
      px-0 px-sm-4 px-md-4 px-lg-4
      py-3 py-sm-1 py-md-1 py-lg-1"
    >
      <v-col
        cols="12"
        sm="auto"
        lg="auto"
        md="auto"
        class="d-flex align-center justify-center"
      >
        <v-img
          max-width="128"
          src="@/assets/images/png/iconpack/id-card.png"
        ></v-img>
      </v-col>
      <v-col class="ml-sm-8 ml-md-8 ml-lg-8 d-flex flex-column">
        <h5
          class="text-body-1 font-weight-medium mb-2 mt-4 mt-sm-0 mt-md-0 mt-lg-0 main--text primary--text"
        >
          Choose an ID for verification
        </h5>

        <p class="text-subtitle-2 font-weight-light mb-8">
          To continue our transaction with you, please provide us any valid ID
          for verification. Below are some of the recommended ID:
        </p>

        <v-form @submit.prevent="onDocumentSubmit" class="d-flex align-center">
          <v-file-input
            accept="image/png, image/jpeg, application/pdf"
            name="document"
            dense
            outlined
            elevation="1"
            hide-details
            :error="errors.document ? true : false"
            prepend-inner-icon="mdi-file"
            prepend-icon=""
            label="Upload ID"
            class="elevation-0 mr-2"
            @change="errors.document = undefined"
          ></v-file-input>
          <v-btn type="submit" text>Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";

import TaxpayerServiceMixin from "@/services/payer.service.ts";

@Component
export default class VerificationStep0 extends Mixins(TaxpayerServiceMixin) {
  public errors: _object = {};

  public async onDocumentSubmit(e: Event) {
    try {
      await this.uploadPayerIdentityDocument(new FormData(e.target as HTMLFormElement));
      this.$emit("next");
    } catch (error) {
      console.log(error);
      this.errors = error.errors;
    }
  }
}
</script>
