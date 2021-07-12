<template>
  <v-container>
    <v-row>
      <v-col
        order-md="2"
        order-lg="2" 
        order-sm="2"
        order="2" class="flex-grow-0">
        <v-responsive  width="400" class="mr-auto ml-auto">
          <v-sheet color="transparent" class="pa-1 pa-lg-3 pa-md-3 pa-sm-3">
            <FormHeaderSection />
            <v-sheet 
              style="opacity: 0.9;"
              class="pb-2" 
              elevation="2" 
              color="main" 
              rounded="lg">
              <SignInForm />
            </v-sheet>
          </v-sheet>
        </v-responsive>
      </v-col>
      <v-col 
        order="1" class="d-flex">
        

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import FormHeaderSection from '@/components/forms/FormHeaderSection.vue';
import SignInForm from '@/components/forms/signin/SignInForm.vue';

@Component({
  layout: 'guest',
  components: {
    FormHeaderSection,
    SignInForm
  }
})
export default class AuthSignInPage extends Vue {
  
}
</script>

<style lang="postcss" scoped>

</style>
