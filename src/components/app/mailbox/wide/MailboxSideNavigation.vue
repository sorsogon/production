<template>
  <v-sheet class="pa-0 pr-8 transparent">
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn
          width="100%"
          rounded
          color="main primary"
          class="text-capitalize font-weight-regular"
          large>
          <v-img
            max-width="24"
            class="mr-2"
            src="@/assets/images/png/iconpack/chat.png"></v-img>
          New Message
        </v-btn>
      </v-col>

      <v-col cols="12" class="my-4">
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12" class="pa-0">
        <v-list 
          elevation="2"
          class="rounded-lg">
          <v-list-item-group mandatory>
            <v-list-item>
              <v-icon class="mr-3">mdi-inbox</v-icon>
              <span class="font-weight-medium">Inbox</span>
              <v-spacer></v-spacer>
              <v-chip 
                small
                color="main primary">10</v-chip>
            </v-list-item>
            <v-list-item>
              <v-icon class="mr-3">mdi-send</v-icon>
              <span class="font-weight-medium">Sent Messages</span>
              <v-spacer></v-spacer>
              <v-chip 
                small
                color="main primary">10</v-chip>
            </v-list-item>
            <v-list-item>
              <v-icon class="mr-3">mdi-pen</v-icon>
              <span class="font-weight-medium">Draft</span>
              <v-spacer></v-spacer>
              <v-chip 
                small
                color="main primary">10</v-chip>
            </v-list-item>
            <v-list-item>
              <v-icon class="mr-3">mdi-star</v-icon>
              <span class="font-weight-medium">Favourite</span>
              <v-spacer></v-spacer>
              <v-chip 
                small
                color="main primary">10</v-chip>
            </v-list-item>
            <v-list-item>
              <v-icon class="mr-3" color="error">mdi-delete-variant</v-icon>
              <span class="font-weight-medium">Deleted</span>
              <v-spacer></v-spacer>
              <v-chip 
                small
                color="main primary">10</v-chip>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MailboxSideNavigation extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
