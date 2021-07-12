<template>
  <v-list dense>
    <v-list-item class="text-center d-flex justify-center">
      <v-sheet class="transparent d-flex align-center">
        <v-img
          max-width="50"
          src="@/assets/images/png/sorsogon-logo.png"
        ></v-img>

        <h5 class="text-h4 ml-2 font-weight-medium text-uppercase">Ptms</h5>
      </v-sheet>
    </v-list-item>

    <v-list-item-group class="mt-4">
      <span 
        v-for="item in sideNavigationLinks" 
        v-show="item.allowedRoles.findIndex(elem => elem == $role.name) !== -1 && (($role.name === 'payer' && $profile.status === 'verified') || $role.name !== 'payer')"
        :key="item.title">
        <v-list-item
          v-if="!item.sub" 
          :to="item.to"
          class="d-flex align-center">
          <v-img max-width="28" :src="item.icon"></v-img>
          <span class="font-weight-regular text-caption ml-4">{{
            item.title
          }}</span>
        </v-list-item>
        <v-list-group
          v-else>
          <template v-slot:activator>
            <v-list-item-title class="d-flex align-center">
              <v-img max-width="28" :src="item.icon"></v-img>
              <span class="font-weight-regular text-caption ml-4">{{ item.title }}</span>
            </v-list-item-title>
          </template>
          <span
            v-for="subItem in item.sub"
            :key="subItem.title">
            <v-list-item 
              class="ma-0 pa-0 pl-8"
              v-if="!subItem.sub"
              :to="subItem.to">
              <v-list-item-content>
                <v-list-item-title class="font-weight-regular text-caption">{{
                  subItem.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              v-else
              no-action
              sub-group>
              <template v-slot:activator>
                <v-list-item-title class="font-weight-regular">{{ subItem.title }}</v-list-item-title>
              </template>

              <v-list-item
                v-for="item in subItem.sub"
                class="px-0 mx-0 d-flex justify-end pr-4"
                :key="item.title"
                :to="item.to">
                <div class="d-flex align-center">
                  <strong class="font-weight-regular float-right text-caption">{{ item.title }}</strong>
                  <v-img 
                    style="filter: grayscale(100%)"
                    max-width="24" 
                    class="ml-2" 
                    :src="item.icon"></v-img>
                </div>
              </v-list-item>
            </v-list-group>
          </span>
        </v-list-group>
      </span>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import sideNavigationLinks from "./side-navigation-links";

@Component
export default class AppSideNavigation extends Vue {
  public sideNavigationLinks = sideNavigationLinks;
  
  get $role() {
    return this.$root.$user.role ?? {};
  }

  get $profile() {
    return this.$root.$user.profile ?? {};
  }
}
</script>

<style lang="postcss" scoped></style>
