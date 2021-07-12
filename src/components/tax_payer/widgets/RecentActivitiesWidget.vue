<template>
  <v-sheet
    rounded="lg"
    elevation="2"
    class="py-2  mt-2 transparent-sm transparent-md transparent-lg">
    <h4 class="mx-4 mb-1 font-weight-medium main--text primary--text text-body-1">🖥️ Activities</h4>
    <p class="text-caption font-weight-light mx-4 mb-3">In enim velit nostrud laboris nisi voluptate id fugiat laboris magna irure culpa nisi.</p>
    <v-list 
      v-if="$activity && $activity.length > 0"
      class="transparent pa-0" 
      dense>
      <v-list-item 
        v-for="(item) in $activity.slice(0, 4)"
        :key="item.id"
        class="d-flex ma-0">
        <v-row no-gutters class="pa-0">
          <v-col cols="auto">
            <v-img 
              :src="getAvatar(item)" 
              max-width="48" 
              max-height="48"
              class="rounded-circle mx-auto"></v-img>
          </v-col>
          <v-col class="ml-2">
            <h4 class="d-inline font-weight-medium text-subtitle-2 main--text primary--text">
              {{ item.to.name }} <span v-if="item.to.name === $root.$user.name">(You)</span>
            </h4>
            <small class="font-weight-light text-caption float-right">
              {{ new Date().getTime() - new Date(item.created_at).getTime() | formatTimeString }}
            </small>
            <p 
              v-html="item.message"
              class="font-weight-light text-caption"></p>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-row
      v-else
      no-gutters>
      <v-col class="mt-3 d-flex flex-column align-center justify-center">
        <v-img
          max-width="144"
          src="@/assets/images/png/iconpack/box.png"></v-img>
        <span class="mt-2 mb-3 font-weight-light text-subtitle-2">
          No recent activities
        </span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class RecentActivitiesWidget extends Vue {

  get $activity() {
    return this.$root.$activities;
  }

   public getAvatar(item: _object) {
    return item.to.avatar.length > 0 ? item.to.avatar : '/images/default_profile_400x400.png';
  }
  
}
</script>

