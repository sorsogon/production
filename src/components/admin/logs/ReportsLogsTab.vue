<template>
  <v-row no-gutters>
    <v-col cols="12">
      <p class="font-weight-regular text-subtitle-2 mt-1">
        Incididunt ex laboris veniam culpa deserunt nostrud aliqua eiusmod velit quis amet aliqua cupidatat 
        esse. In nisi pariatur eiusmod irure sunt proident consequat sint cillum ea.
      </p>
    </v-col>
    <v-col cols="12">
      <v-data-table
        class="ma-1 elevation-2"
        hide-default-footer
        :headers="headers"></v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ReportsLogsTab extends Vue {
  public headers = [
    { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Description', value: 'desc' },
    { text: 'Logged At', value: 'logged_at' },
  ];
}
</script>
