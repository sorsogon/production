<template>
  <div class="d-flex align-center grey--text">
    <v-divider></v-divider>
    <span class="ml-1 mr-1 primary--text font-weight-light">{{ message }}</span>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FormSectionSeparator extends Vue {
  @Prop({ required: true }) public readonly message!: string;

}
</script>

<style lang="postcss" scoped>

</style>
