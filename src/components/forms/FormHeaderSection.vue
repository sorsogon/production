<template>
  <v-row class="mb-4">
    <v-col>
      <v-img src="@/assets/images/png/sorsogon-logo.png" max-width="150"></v-img>
    </v-col>
    <v-col class="flex-grow-0 d-flex justify-center">
      <v-divider
        vertical></v-divider>
    </v-col>
    <v-col class="text-uppercase d-flex align-center">
      <div class="white--text">
        <h5 class="text-h5 text-right" style="line-height: 1.5rem">
        <span class="font-weight-light text-h6" style="line-height: 1.3rem">Office of the </span>
        <span class="font-weight-bold text-h5" style="line-height: 1.4rem">Provincial Treasurer</span>
        </h5>
        <h6 class="text-subtitle-2 font-weight-light text-right">Tax | Portal</h6>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FormHeaderSection extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
