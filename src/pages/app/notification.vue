<template>
  <v-container>
    <AppNotification />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AppNotification from '@/components/app/AppNotification.vue';

@Component({
  components: { AppNotification }
})
export default class AppNotificationPage extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
