<template>
  <v-sheet
    class="transparent mt-4">
    <h4 class="mb-2 font-weight-medium main--text primary--text text-body-1">Upcoming Due</h4>
    <p class="font-weight-light text-caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, aspernatur.</p>
    <v-list 
      class="transparent pa-0" 
      dense>
      <v-list-item class="d-flex pa-0">
        <v-row no-gutters class="pa-0">
          <v-col cols="auto">
            <v-img max-width="55" src="@/assets/images/png/iconpack/mail-1020.png"></v-img>
          </v-col>
          <v-col class="ml-3">
            <h4 class="d-inline font-weight-medium text-subtitle-2">
              Professional Tax Due
            </h4>
            <small class="font-weight-light text-caption float-right">25 sec ago</small>
            <p class="font-weight-regular text-caption">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="d-flex pa-0 mt-3">
        <v-row no-gutters class="pa-0">
          <v-col cols="auto">
            <v-img max-width="55" src="@/assets/images/png/iconpack/mail-1007.png"></v-img>
          </v-col>
          <v-col class="ml-3">
            <h4 class="d-inline font-weight-medium text-subtitle-2">
              Annual Fixed Tax Due
            </h4>
            <small class="font-weight-light text-caption float-right">25 sec ago</small>
            <p class="font-weight-regular text-caption">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UpcomingTaxDueDate extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
