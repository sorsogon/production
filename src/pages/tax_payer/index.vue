<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7" sm="6" lg="8">
        <v-row no-gutters>
          <v-col cols="12">
            <UserInformationCard />
            
          </v-col>
          <v-col cols="12" class="mt-5">
            <div 
              v-if="tab == 0 && $profile.status == 'verified'"
              class="float-right mr-15 mt-5">
              <v-tooltip
                bottom>
                <template v-slot:activator="{ on, attrs }">
                  <FeesChargesDropdown 
                    v-bind="attrs"
                    v-on="on" /> 
                </template>
                <span>Miscellaneous</span>
              </v-tooltip>
            </div>

            <v-tabs 
              v-model="tab" 
              color="main"
              background-color="transparent">
              <v-tab class="text-capitalize">Dashboard</v-tab>
              <v-tab class="text-capitalize">About</v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <v-tabs-items 
              v-model="tab" 
              class="transparent" 
              touchless>
              <v-tab-item>
                <RecentTabContent />
              </v-tab-item>
              <v-tab-item>
                <AboutTabContent />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="4" class="d-none d-sm-block d-md-block d-lg-block">
        <ApplicationWidgetArea />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import UserInformationCard from "@/components/tax_payer/user-information-card/UserInformationCard.vue";
import ApplicationWidgetArea from "@/components/tax_payer/ApplicationWidgetArea.vue";

import RecentTabContent from "./tabs/RecentTabContent.vue";
import AboutTabContent from "./tabs/AboutTabContent.vue";

import FeesChargesDropdown from "@/components/tax_payer/FeesChargesDropdown.vue";

@Component({
  components: {
    UserInformationCard,
    ApplicationWidgetArea,
    RecentTabContent,
    AboutTabContent,
    FeesChargesDropdown
  },
})
export default class TaxPayerProfile extends Vue {
  public tab = null;
  public readonly items = ["recent", "about"];

  get $profile() {
    return this.$root.$user.profile ?? {};
  }
}
</script>
