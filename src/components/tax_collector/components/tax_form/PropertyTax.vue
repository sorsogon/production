<template> </template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
// import * as Calculation from "@/services/calculation.service.ts";

@Component
export default class PropertyTaxForm extends Vue {
  @Prop() public readonly taxPayer!: _object;
  @Prop() public savePaymentRoute!: string;
}
</script>

<style></style>
