<template>
  <v-container class="pa-3">
    <router-view></router-view>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DashboardTaxLiquidatorPage extends Vue {}
</script>

<style lang="postcss" scoped></style>
