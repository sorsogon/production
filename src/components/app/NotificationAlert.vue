<template>
  <v-snackbar
    top right
    max-width="300"
    timeout="3000"
    color="primary"
    class="elevation-0"
    v-model="$state.toggle">
    <v-sheet 
      max-width="300"
      class="pa-0 ma-0 transparent">
      <v-row class="pa-0" no-gutters>
        <v-col cols="12" v-if="$notification.from">
          <p class="mb-0 pb-2 font-weight-medium text-capitalize">{{ $notification.from.name }}</p>
        </v-col>
        <v-col cols="12" v-else>
          <p class="mb-0 pb-2 font-weight-medium text-capitalize">PTMS Management</p>
        </v-col>
        <v-col cols="12">
          <span v-html="$notification.message"></span>
        </v-col>
      </v-row>
    </v-sheet>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NotificationAlert extends Vue {
  
  get $state() {
    return this.$store.state.alert._state;
  }

  get $notification() {
    return this.$root.$allUserNotifications[0] ?? {};
  }

}
</script>
