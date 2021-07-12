<template>
  <v-card
    dark
    min-height="100%"
    class="main mx-auto">
    <v-sheet
      class="mx-auto pb-2 rounded-t-0"
      color="grey lighten-1"
      elevation="12"
      rounded="lg"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        label-size="10"
        :labels="labels"
        :value="value"
        color="primary darken-1"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-4">
      <div class="title font-weight-regular mb-2">
        User Registrations (345)
      </div>
      <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class NewUserChart extends Vue {
  public readonly labels = [ '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%' ];
  public readonly value = [ 13, 432, 54, 164, 653, 24, 521, 65, 89 ];
}
</script>

<style lang="postcss" scoped>

</style>
