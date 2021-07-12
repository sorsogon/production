<template>
  <v-container class="pa-4">
    <h4 class="text-h5 font-weight-medium mb-2 d-flex align-center">
      <v-img 
        max-width="32" 
        class="mr-2"
        src="@/assets/images/png/iconpack/bar-chart-675.png"></v-img> PTMS Dashboard
    </h4>
    <p class="font-weight-regular text-body-2 mb-6">
      Ipsum ex ipsum reprehenderit ut dolor et. Ut occaecat consequat fugiat voluptate 
      commodo cupidatat occaecat amet labore magna dolor culpa.
    </p>

    <v-row no-gutters class="mb-1">
      <v-col cols="12"  sm="6" lg="4" md="4" class="pa-1">
        <NewUserChart />
      </v-col>
      <v-col cols="12"  sm="6" lg="4" md="4" class="pa-1">
        <TransactionChart />
      </v-col>
      <v-col cols="12"  sm="6" lg="4" md="4" class="pa-1">
        <CollectionChart />
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-2">
      <v-col cols="12" sm="7" md="8" lg="8" class="pa-1">
        <DailyCollectionChart />
      </v-col>
      <v-col cols="12" sm="5" md="4" lg="4" class="pa-1">
        <ProfitChart />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-0">
        <TaxPayerStatusTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import NewUserChart from '@/components/dashboard/charts/NewUserChart.vue';
import TransactionChart from '@/components/dashboard/charts/TransactionChart.vue';
import CollectionChart from '@/components/dashboard/charts/CollectionChart.vue';
import DailyCollectionChart from '@/components/dashboard/charts/DailyCollectionChart.vue';
import ProfitChart from '@/components/dashboard/charts/ProfitChart.vue';

import TaxPayerStatusTable from '@/components/dashboard/tables/TaxPayerStatusTable.vue';

@Component({
  components: {
    NewUserChart,
    TransactionChart,
    CollectionChart,
    DailyCollectionChart,
    ProfitChart,
    TaxPayerStatusTable
  }
})
export default class DashboardPage extends Vue {
  
}
</script>

<style lang="postcss" scoped>

</style>
