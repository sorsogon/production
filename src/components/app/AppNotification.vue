<template>
  <v-sheet
    v-if="$notification.length == 0"
    class="transparent mx-0 mx-sm-3">
    <v-sheet class="transparent">
      <h4 class="text-h6 font-weight-medium">🔔 Notifications</h4>
    <p class="text-caption font-weight-light mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo.</p>
      <v-img 
        class="mx-auto"
        max-width="100"
        src="@/assets/images/png/iconpack/no-results.png"></v-img>
      <h5 class="text-caption mt-3 font-weight-light text-center ml-8 mr-8 pb-3">
        There are currently no notifications for you at the moment.
      </h5>
    </v-sheet>
  </v-sheet>
  <v-sheet 
    v-else
    class="transparent pa-0">
    <h4 class="text-h6 font-weight-medium mx-3">🔔 Notifications</h4>
    <p class="text-caption font-weight-light mb-3 mx-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo.</p>
    <v-list 
      :class="{ 'rounded-lg': $vuetify.breakpoint.xs }"
      class="pa-0 transparent">
      <v-list-item
        class="pa-0 ma-0" 
        :class="{
          'rounded-lg': $vuetify.breakpoint.xs
        }"
        v-for="(item, i) in $notification.slice(0, 5)"
        @click="$root.updateNotificationStatus(item);"
        :key="i">
        <v-sheet 
          class="pa-1 transparent"
          width="100%"
          :class="{ 
            'main primary theme--dark': !item.seen,
            'rounded-lg': $vuetify.breakpoint.xs
          }">
          <v-row no-gutters class="py-1">
            <v-col class="flex-grow-0 ml-3">
              <v-img 
                :src="getAvatar(item)"
                max-width="54" 
                max-height="54"
                class="rounded-circle mx-auto"></v-img>
            </v-col>
            <v-col class="ml-4 mr-3">
              <em class="text-caption font-weight-light float-right">{{ new Date().getTime() - new Date(item.created_at).getTime() | formatTimeString }}</em>
              <h5 
                :class="{ 'main--text primary--text': item.seen }"
                class="font-weight-medium text-subtitle-2">{{ item.from ? item.from.name : 'To: ' + item.to.name }}</h5>
              <p class="text-caption font-weight-light ma-0 mb-2" v-html="item.message"></p>
            </v-col>
          </v-row>
        </v-sheet>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppNotification extends Vue {

  public getAvatar(item: _object) {
    return (item.from ? item.from.avatar : item.to.avatar) ?? '/images/default_profile_400x400.png';
  }

  get $notification() {
    return this.$root.$notifications;
  }
}
</script>

