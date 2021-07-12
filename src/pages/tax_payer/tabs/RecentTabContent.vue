<template>
  <v-container class="px-0">
    <v-row no-gutters>
      <v-col 
        v-if="$profile.status != 'verified'"
        cols="12">
        <UnverifiedUserAccount />
      </v-col>
      <v-col
        v-else
        cols="12">
        <v-row no-gutters>
          <v-col cols="12">
            <TaxDashboardStatistics />
          </v-col>

          <v-col 
            class="d-block d-sm-none d-md-none d-lg-none"
            cols="12">
            <RecentActivitiesWidget class="my-1 mx-1" />
          </v-col>

          <!-- TaxDashboardStatistics view -->
          <v-col cols="12" class="px-1">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import UnverifiedUserAccount from '@/components/tax_payer/unverified-user-account/UnverifiedUserAccount.vue';
import RecentActivitiesWidget from '@/components/tax_payer/widgets/RecentActivitiesWidget.vue';
import TaxDashboardStatistics from '@/components/tax_payer/TaxDashboardStatistics.vue';

@Component({
  components: { 
    UnverifiedUserAccount,
    RecentActivitiesWidget,
    TaxDashboardStatistics
  }
})
export default class RecentTabContent extends Vue {
  get $profile() {
    return this.$root.$user.profile ?? {};
  }
}
</script>

