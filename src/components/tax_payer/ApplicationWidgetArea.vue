<template>
  <v-sheet
    min-height="100%"
    class="mx-auto transparent mx-0 mb-0">
    <v-row no-gutters>
      <v-col cols="12">
        <RecentActivitiesWidget />
      </v-col>
      <v-col cols="12" class="mt-3"> 
        <PendingPaymentWidget />
      </v-col>
      <!-- <v-col cols="12"> 
        <UpcomingTaxDueDate />
      </v-col> -->
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import RecentActivitiesWidget from './widgets/RecentActivitiesWidget.vue';
import PendingPaymentWidget from './widgets/PendingPaymentWidget.vue';
import UpcomingTaxDueDate from './widgets/UpcomingTaxDueDate.vue';

@Component({
  components: { 
    RecentActivitiesWidget,
    UpcomingTaxDueDate,
    PendingPaymentWidget
  }
})
export default class ApplicationWidgetArea extends Vue {  }
</script>
