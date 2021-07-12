<template>
  <v-container class="pa-3">
    <h4 class="text-h6 font-weight-medium mb-1">
      <v-img
        class="float-left mr-1"
        max-width="32"
        src="@/assets/images/png/iconpack/file.png"></v-img>
      Application Logs
    </h4>
    <p class="text-subtitle-2 font-weight-light">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
      harum nesciunt nam reprehenderit temporibus tenetur cupiditate, nemo.
    </p>
    <v-row no-gutters>
      <v-col cols="12" class="mb-3">
        <v-text-field
          dense
          outlined
          hide-details="auto"
          placeholder="Looking for something?"
          prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col
            order="2"
            order-sm="1"
            cols="12"
            sm="6"
            md="8">
            <v-tabs
              show-arrows
              background-color="transparent"
              v-model="tabState">
              <v-tab class="text-capitalize">
                <v-img 
                  class="mr-2"
                  max-width="24" 
                  src="@/assets/images/png/iconpack/programmer.png"></v-img>
                Users</v-tab>
              <v-tab class="text-capitalize">
                <v-img 
                  class="mr-2"
                  max-width="24" 
                  src="@/assets/images/png/iconpack/invoice_1.png"></v-img>
                Payments
              </v-tab>
              <v-tab class="text-capitalize">
                <v-img 
                  class="mr-2"
                  max-width="24" 
                  src="@/assets/images/png/iconpack/storage-box.png"></v-img>
                Collections
              </v-tab>
              <v-tab class="text-capitalize">
                <v-img 
                  class="mr-2"
                  max-width="24" 
                  src="@/assets/images/png/iconpack/to-do-list.png"></v-img>
                Settings
              </v-tab>
              <v-tab class="text-capitalize">
                <v-img 
                  class="mr-2"
                  max-width="24" 
                  src="@/assets/images/png/iconpack/post-it.png"></v-img>
                Reports
              </v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-tabs-items
              class="transparent"
              v-model="tabState">
              <v-tab-item><UsersLogsTab /></v-tab-item>
              <v-tab-item><PaymentsLogsTab /></v-tab-item>
              <v-tab-item><CollectionLogsTab /></v-tab-item>
              <v-tab-item><SettingsLogsTab /></v-tab-item>
              <v-tab-item><ReportsLogsTab /></v-tab-item>
            </v-tabs-items>
          </v-col>
          <v-col 
            order="1"
            order-sm="2"
            cols="12" 
            sm="6" 
            md="4"
            class="pl-sm-3 pt-sm-11">
            <v-row 
              class="flex-column"
              no-gutters>
              <v-col cols="12" class="mb-3"><SystemInformation /></v-col>
              <v-col cols="12"><RealTimeLogViewer /></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import UsersLogsTab from '@/components/admin/logs/UsersLogsTab.vue';
import PaymentsLogsTab from '@/components/admin/logs/PaymentsLogsTab.vue';
import CollectionLogsTab from '@/components/admin/logs/CollectionLogsTab.vue';
import SettingsLogsTab from '@/components/admin/logs/SettingsLogsTab.vue';
import ReportsLogsTab from '@/components/admin/logs/ReportsLogsTab.vue';

import RealTimeLogViewer from '@/components/admin/logs/widgets/RealTimeLogViewer.vue';
import SystemInformation from '@/components/admin/logs/widgets/SystemInformation.vue';

@Component({
  components: {
    UsersLogsTab,
    PaymentsLogsTab,
    CollectionLogsTab,
    SettingsLogsTab,
    ReportsLogsTab,

    RealTimeLogViewer,
    SystemInformation
  }
})
export default class SettingsLogsPage extends Vue {
  public tabState = null;
}
</script>

