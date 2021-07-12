<template>
  <v-progress-linear 
    color="main primary"
    :hidden="!$store.state.progressBar._state"
    indeterminate 
    fixed></v-progress-linear>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppProgressBar extends Vue {

}
</script>
