<template>
  <v-card
    dark
    min-height="100%"
    class="main mx-auto">
    <v-card-text class="pb-0 mb-0">
      <div class="title font-weight-regular mb-2">
        Profit
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
      <canvas ref="daily-collection-chart" class="pa-2 pt-4 pb-2 mb-2"></canvas>
    </v-card-text>
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
    type: 'doughnut',
    data: {
      labels: [
        'Prof. Tax',
        'Biz. Tax',
        'Rental Tax'
      ],
      datasets: [
        {
          data: [64, 53, 153],
          fill: true,
          label: '# Daily Collection',
          backgroundColor: [
            '#21c5da',
            '#fdb738',
            '#5969c0'
          ],
          borderColor: [
            '#21c5da',
            '#fdb738',
            '#5969c0'
          ]
        }
      ]
    },
    options: {
      responsive: true,
    }
  };

  private getRandomInt () {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
  }
}
</script>

<style lang="postcss" scoped>

</style>
