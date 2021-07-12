<template>
  <v-dialog
    v-model="dialogState"
    max-width="350">

    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="float-right mt-4"
        color="primary"
        depressed>
        <v-icon>mdi-plus</v-icon> Add Vehicle
      </v-btn>
    </template>


    <v-sheet
      elevation="2"
      class="pa-0 rounded-lg">
      <v-form
        ref="form"
        @submit.prevent="onAddNewVehicleSubmit">
        <v-row no-gutters>
          <v-col cols="12" class="pa-3">
            <h4 class="font-weight-medium main--text primary--text text-body-1">🚘 Add a Delivery Vehicle</h4>
            <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
              Voluptate pariatur velit nisi consectetur non commodo qui. Aute amet minim fugiat 
              adipisicing.
            </p>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="pa-4">
            <v-row no-gutters>
              <v-col cols="12" class="mt-1">
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-select
                      v-model="vehicleType"
                      label="Select Vehicle Type"
                      :items="$vehicleCategory"
                      :error="errors.category ? true : false"
                      item-text="type"
                      item-value="type"
                      prepend-inner-icon="mdi-car"
                      outlined
                      hide-details
                      dense></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      dense
                      disabled
                      outlined
                      :value="'₱ ' + $selectedType.rate + '.00'"
                      label="Rate"
                      hide-details
                      class="ml-1"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" class="mt-1">
                <v-text-field
                  name="model"
                  label="Vehicle Model"
                  :error="errors.model ? true : false"
                  prepend-inner-icon="mdi-pencil"
                  placeholder="Brand/Model"
                  outlined
                  hide-details
                  dense></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-1">
                <v-text-field
                  name="plate_number"
                  label="Plate Number"
                  :error="errors.plate_number ? true : false"
                  prepend-inner-icon="mdi-pound-box"
                  outlined
                  hide-details
                  dense></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-1">
                <v-textarea
                  name="note"
                  label="Note (optional)"
                  rows="2"
                  class="text-caption"
                  no-resize
                  outlined
                  hide-details
                  dense></v-textarea>
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-btn
                  width="100%"
                  depressed
                  type="submit"
                  class="main primary">Add Vehicle</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class AddNewPayerVehicle extends Mixins(TaxpayerServiceMixin) {
  public dialogState = false;
  public selected = 0;
  public vehicleType = null;
  public errors: _object = {};

  public async created(): Promise<void> {
    await this.getAllVehicleCategory();
  }

  public async onAddNewVehicleSubmit(e: Event) {
    
    const form = e.target as HTMLFormElement;

    try {
      const vehicle = new FormData(form);

      if (this.vehicleType) vehicle.set('category', JSON.stringify(this.$selectedType));

      await this.addNewPayerVehicle(vehicle);

      this.getAllVehicleCategory();
      this.getAllPayerVehicles();

      this.$store.commit('snackBar/toggle', {
        toggle: true,
        message: `Added a Delivery Vehicle`,
        color: 'success'
      });

      (this.$refs.form as any).reset();
      this.dialogState = false;
    } catch(error) {
      this.errors = error.errors;
    }
    
  }

  get $selectedType(): _object {
    return this.$vehicleCategory.find((elem: _object) => elem.type == this.vehicleType) ?? {
      rate: '0'
    };
  }

  get $vehicleCategory(): _object[] {
    return this.$vehicleCategories.length > 0 ? this.$vehicleCategories[this.selected].rates.rates : [];
  }

  get $vehicleCategories(): _object[] {
    return this.$payer.vehicleCategories ?? [];
  }

}
</script>
