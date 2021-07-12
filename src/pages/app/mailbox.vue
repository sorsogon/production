<template>
  <v-container 
    v-if="$vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.mdAndUp"
    class="height-100 d-flex">
    <v-row
      no-gutters>
      <v-col cols="3">
        <MailboxSideNavigation />
      </v-col>
      <v-col cols="4">
        <v-row
          class="flex-column height-100"
          no-gutters>
          <v-col class="mheight-100">
            <MailboxContactList />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row
          class="flex-column height-100"
          no-gutters>
          <v-col class="mheight-100 relative">
            <div class="d-flex flex-column justify-end">
            <MailboxContentView />
            <v-sheet 
              width="100%"
              class="px-3 py-2 rounded-xl absolute">
              <v-form
                class="d-flex align-center"
                @submit.prevent="">
                <v-text-field
                  class="rounded-xl"
                  placeholder="Write your message..."
                  dense
                  outlined
                  hide-details></v-text-field>
                <v-btn
                  class="ml-2"
                  icon
                  large>
                  <v-icon>mdi-attachment</v-icon>
                </v-btn>
                <v-btn
                  icon
                  large>
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </v-form>
            </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import MailboxSideNavigation from '@/components/app/mailbox/wide/MailboxSideNavigation.vue';
import MailboxContactList from '@/components/app/mailbox/wide/MailboxContactList.vue';
import MailboxContentView from '@/components/app/mailbox/wide/MailboxContentView.vue';

@Component({
  components: {
    MailboxSideNavigation,
    MailboxContactList,
    MailboxContentView
  }
})
export default class AppMailboxPage extends Vue {}
</script>

<style lang="postcss">
.relative {
  position: relative;
}

.absolute {
  position: sticky;
  bottom: 0px;
}

.height-100 {
  height: 100%;
  max-height: 100%;
}

.mheight-100 {
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mheight-100::-webkit-scrollbar {
  display: none;
}
</style>