<template>
  <v-card
    dark
    min-height="100%"
    class="main mx-auto">
    <v-card-text>
      <v-row class="pr-4 pl-4 pt-0 justify-between">
        <v-col class="pa-0 pt-1 pl-4 flex-grow-1">
          <h4 class="text-button">Daily Collection</h4>
        </v-col>
        <v-col class="flex-shrink-1">
          <v-combobox
            outlined
            dense
            label="Range"
            hide-details="auto"
            class="mb-2"
            width="200"></v-combobox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-spacer></v-spacer>
    <canvas ref="daily-collection-chart" class="pa-4 mt-5"></canvas>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Chart from 'chart.js/auto';

import { ChartConfiguration } from 'chart.js';

@Component({
  mounted() {
    const context = this.$refs['daily-collection-chart'] as HTMLCanvasElement;

    new Chart(context, this.$data.planetChartData);
  }
})
export default class NewUserChart extends Vue {
  public readonly planetChartData: ChartConfiguration = {
    type: 'line',
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
        {
          data: [12, 43, 54, 43, 64, 53, 153],
          fill: true,
          label: '# Daily Collection',
          backgroundColor: 'rgba(255, 255, 255, .5)',
          borderColor: '#fff'
        }
      ]
    },
    options: {
      responsive: true
    }
  };

  private getRandomInt () {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
  }
}
</script>

<style lang="postcss" scoped>

</style>
