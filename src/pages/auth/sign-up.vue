<template>
  <v-container>
    <v-row>
      <v-col
        order-sm="2"
        order="1" class="flex-grow-0 mx-auto">
        <v-responsive  width="400" class="">
          <v-sheet color="transparent" class="pa-1 pa-lg-3 pa-md-3 pa-sm-3">
            <FormHeaderSection />
            <v-sheet 
              style="opacity: 0.9;"
              class="pb-2 elevation-3" 
              dark 
              color="main" 
              rounded="lg">
              <SignUpForm />
            </v-sheet>
          </v-sheet>
        </v-responsive>
      </v-col>
      <v-col
        order-sm="1"
        order="2"
        class="
          ml-lg-8 ml-md-8 ml-0
          mt-lg-16 pt-lg-16 
          mt-md-16 pt-md-16
          mt-sm-16 pt-sm-16">
        <v-responsive max-width="500" class="mx-auto mt-lg-2 mt-md-2 pl-2 pr-2 pl-lg-0 pr-lg-0 pl-md-0 pr-md-0 pl-sm-0 pr-sm-0">
          <GuidelineStepper />
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import FormHeaderSection from '@/components/forms/FormHeaderSection.vue';
import SignUpForm from '@/components/forms/signup/SignUpForm.vue';
import GuidelineStepper from '@/components/forms/signup/GuidelineStepper.vue';

@Component({
  layout: 'guest',
  components: {
    FormHeaderSection,
    GuidelineStepper,
    SignUpForm
  }
})
export default class AuthSignUpPage extends Vue {
  
}
</script>

<style lang="postcss" scoped>

</style>
