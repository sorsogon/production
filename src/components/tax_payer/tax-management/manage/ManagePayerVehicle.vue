<template>
  <v-sheet
    min-height="100%"
    elevation="2"
    class="pa-0 rounded-lg">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pb-0">
        <h4 class="font-weight-medium main--text primary--text text-body-1">
          <v-icon class="main--text primary--text">mdi-book</v-icon> Delivery Vehicles
        </h4>
        <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
          Voluptate pariatur velit nisi consectetur non commodo qui.
        </p>

      </v-col>

      <v-col cols="12" class="px-3">
        <AddNewPayerVehicle />
      </v-col>


      <v-col cols="12" class="d-flex flex-column justify-end">
        <v-data-table
          :items="$vehicles"
          :headers="headers">

          <template v-slot:item.type="{ item }">
            <v-tooltip
              bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  small
                  v-bind="attrs"
                  v-on="on">
                  {{ item.category.type }}
                </v-chip>
              </template>
              <span>
                Rate: <span class="font-weight-medium" v-html="$root.formatCurrency(item.category.rate)"></span>
              </span>
            </v-tooltip>
          </template>

          <template v-slot:item.date_added="{ item }">
            <v-chip color="success" small>
              {{ new Date(item.created_at) | formatDateString }}
            </v-chip>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

import AddNewPayerVehicle from '../actions/modal/AddNewPayerVehicle.vue';

@Component({
  components: {
    AddNewPayerVehicle
  }
})
export default class ManagePayerVehicle extends Mixins(TaxpayerServiceMixin) {
  public custom = false;
  public prev = 0;
  public next = 3;

  public headers = [
    { text: 'Plate #', align: 'start', sortable: true, value: 'plate_number' },
    { text: 'Model', align: 'start', sortable: true, value: 'model' },
    { text: 'Type', align: 'start', sortable: true, value: 'type' },
    { text: 'Date Added', align: 'start', sortable: true, value: 'date_added' }
  ];

  public navigateNextPage() {
    this.prev = this.next; this.next += 3;
    if (this.$vehicles.length == 0) this.navigatePrevPage();
  }

  public navigatePrevPage() {
    if (this.prev == 0) return;
    this.prev -= 3; this.next -= 3;
  }

  public async created() {
    await this.getAllPayerVehicles();
  }

  get $vehicles() {
    return this.$payer.payerVehicles ?? [];
  }
}
</script>

<style lang="postcss" scoped>

</style>
