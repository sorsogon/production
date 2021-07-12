<template>
  <v-sheet class="pa-3 rounded-lg elevation-2">
    <div>
      <h4 class="mb-1 font-weight-medium main--text primary--text text-body-1 d-flex align-center">
        <v-icon 
          class="mr-1"
          color="primary"
          max-width="18">mdi-server</v-icon> 
        Server Information</h4>
      <p class="font-weight-light text-caption mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, aspernatur.</p>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SystemInformation extends Vue {

}
</script>
