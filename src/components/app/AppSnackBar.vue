<template>
  <v-snackbar
    timeout="2000"
    :color="$state.color"
    v-model="$state.toggle">
    <p class="ma-0 font-weight-medium text-center" 
      v-if="$state.message">
      {{ $state.message }}
    </p>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppSnackBar extends Vue {
  
  get $state() {
    return this.$store.state.snackBar._state;
  }


}
</script>
