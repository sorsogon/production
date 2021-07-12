<template>
  <v-menu
    left
    bottom
    offset-x
    offset-y
    max-width="300">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        absolute
        v-bind="attrs"
        v-on="on"
        class="primary">
        <v-icon>mdi-folder-multiple</v-icon>
      </v-btn>
    </template>
    <v-sheet class="pa-0 transparent">
      <v-list
      class="ma-0 pa-0 text-subtitle-2 font-weight-regular"
      dense>
        <div class="px-3 pt-2">
          <v-img
            class="float-left mr-2"
            max-width="22"
            src="@/assets/images/png/iconpack/point-of-sale.png"></v-img>
          <h4 class="mb-1 font-weight-medium main--text main--text primary--text">Provincial Fees and Charges</h4>
          <p class="text-caption font-weight-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo.</p>
        </div>
        <v-list-item-group>
          <v-list-item
            to="/d/taxpayer/stats/accountable-forms">
            <v-row no-gutters class="pa-2">
              <v-col cols="auto" class="d-flex align-center">
                <v-img
                  class="mr-2"
                  max-width="32"
                  src="@/assets/images/png/iconpack/payment.png"></v-img>
              </v-col>
              <v-col class="d-flex align-center">
                <strong class="font-weight-regular">Accountable Forms</strong>
              </v-col>
            </v-row>
          </v-list-item>
          <div class="px-3">
            <h4 class="text-subtitle-2 font-weight-medium">Provincial Rental Charges</h4>
          </div>
          <v-divider></v-divider>
          <v-list-item
            to="/d/taxpayer/stats/gymnasium-rental">
            <v-row no-gutters class="pa-2">
              <v-col cols="auto" class="d-flex align-center">
                <v-img
                  class="mr-2"
                  max-width="32"
                  src="@/assets/images/png/iconpack/house.png"></v-img>
              </v-col>
              <v-col class="d-flex align-center">
                <strong class="font-weight-regular">Provincial Gymnasium Rental</strong>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item
            to="/d/taxpayer/stats/heavy-equipment-rental">
            <v-row no-gutters class="pa-2">
              <v-col cols="auto" class="d-flex align-center">
                <v-img
                  class="mr-2"
                  max-width="32"
                  src="@/assets/images/png/iconpack/demolishing.png"></v-img>
              </v-col>
              <v-col class="d-flex align-center">
                <strong class="font-weight-regular">Heavy Equipment Rental</strong>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item
            to="/d/taxpayer/stats/space-lot-rental">
            <v-row no-gutters class="pa-2">
              <v-col cols="auto" class="d-flex align-center">
                <v-img
                  class="mr-2"
                  max-width="32"
                  src="@/assets/images/png/iconpack/parking.png"></v-img>
              </v-col>
              <v-col class="d-flex align-center">
                <strong class="font-weight-regular">Space & Lot Rental</strong>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FeesChargesDropdown extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
