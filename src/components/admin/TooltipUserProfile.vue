<template>
  <v-sheet 
    elevation="2"
    class="rounded-lg mt-1 pa-3">
    <v-row no-gutters class="align-center">
      <v-col class="flex-grow-0">
        <v-img
          class="rounded-circle"
          max-width="48"
          :src="user.avatar"></v-img>
      </v-col>
      <v-col class="pl-2">
        <h5 class="text-body-2 font-weight-medium">{{ user.name }}</h5>
        <h5 class="font-weight-light mt-2 text-subtitle-2">{{ user.email }}</h5>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TooltipUserProfile extends Vue {
  @Prop({ required: true }) public readonly user!: _object;
}
</script>

