<template>
  <v-menu
    v-if="!$vuetify.breakpoint.xs"
    left
    max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        v-show="getUnreadNotificationCount != 0"
        offset-x="16"
        offset-y="20"
        color="primary"
        dot
        overlap
        bottom>
        <v-btn  v-bind="attrs" v-on="on" icon>
          <v-img
            max-width="26" src="@/assets/images/png/iconpack/bell-2031.png"></v-img>
        </v-btn>
      </v-badge>
      <v-btn v-show="getUnreadNotificationCount == 0" v-bind="attrs" v-on="on" icon>
        <v-img
          max-width="26" src="@/assets/images/png/iconpack/bell-2031.png"></v-img>
      </v-btn>
    </template>

    <v-sheet rounded="lg" class="pt-2">
      <AppNotification />
    </v-sheet>
  </v-menu>
  <v-btn to="/app/notification" icon v-else>
    <v-img
    max-width="26" src="@/assets/images/png/iconpack/bell-2031.png"></v-img>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import AppNotification from "../AppNotification.vue";

@Component({
  components: { AppNotification },
})
export default class AppNotificationDropdown extends Vue {

  get getUnreadNotificationCount() {
    return this.$root.$notifications.filter(
      (elem: _object) => !elem.seen && elem.type != 'activity'
    ).length;
  }

}
</script>
