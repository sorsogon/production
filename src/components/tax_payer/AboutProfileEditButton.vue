<template>
  <v-btn
    :to="`/d/profile/edit${ edit ? '/' + edit : '' }`"
    x-small
    hide-details
    elevation="0"
    class="float-right transparent main--text primary--text">
    <v-icon x-small>mdi-pencil</v-icon>
    Edit
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AboutProfileEditButton extends Vue {
  @Prop() public readonly edit!: string;
}
</script>

<style lang="postcss" scoped>

</style>
