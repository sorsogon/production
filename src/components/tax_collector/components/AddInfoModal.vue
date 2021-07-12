<template>
  <v-dialog v-model="addInfoModal" persistent scrollable max-width="500px">
    <v-card>
      <v-card-title>
        <v-btn fab icon small v-if="!addInfo" class="mr-2 ml-n2" @click="back">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <span class="headline">{{ headline }}</span>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-sheet v-if="addInfo">
          <v-list dense nav elevation="2" class="mx-4 pa-2 my-2">
            <v-list-group value="true" class="mb-2">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>mdi-truck</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium text-body-2"
                  >Vehicles (Annual Fixed Tax)</v-list-item-title
                >
              </template>
              <v-list-item v-for="(item, i) in user_vehicles" :key="i">
                <v-list-item-title
                  class="pl-4"
                  v-text="`${item.plate_number} (${item.model})`"
                ></v-list-item-title>
              </v-list-item>
              <v-list-item class="d-flex justify-end">
                <v-btn small color="primary" @click="addPayerVehicle"
                  >Add Vehicle</v-btn
                >
              </v-list-item>
            </v-list-group>
            <v-list-group class="mb-2">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>mdi-city-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium text-body-2"
                  >Businesses (Amusement Tax)</v-list-item-title
                >
              </template>
              <v-list-item v-for="(item, i) in amusements" :key="i">
                <v-list-item-title
                  v-text="`${item.name}`"
                  class="pl-4"
                ></v-list-item-title>
              </v-list-item>
              <v-list-item class="d-flex justify-end">
                <v-btn small color="primary" @click="addAmusement"
                  >Add Business</v-btn
                >
              </v-list-item>
            </v-list-group>
            <v-list-group class="mb-2">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>mdi-storefront</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium text-body-2"
                  >Businesses (Franchise Tax)</v-list-item-title
                >
              </template>
              <v-list-item v-for="(item, i) in franchises" :key="i">
                <v-list-item-title
                  v-text="`${item.name}`"
                  class="pl-4"
                ></v-list-item-title>
              </v-list-item>
              <v-list-item class="d-flex justify-end">
                <v-btn small color="primary" @click="addFranchise"
                  >Add Business</v-btn
                >
              </v-list-item>
            </v-list-group>
            <v-list-group class="mb-2">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium text-body-2"
                  >Businesses (Sand & Gravel Tax)</v-list-item-title
                >
              </template>
              <v-list-item v-for="(item, i) in aggregate_business" :key="i">
                <v-list-item-title
                  v-text="`${item.name}`"
                  class="pl-4"
                ></v-list-item-title>
              </v-list-item>
              <v-list-item class="d-flex justify-end">
                <v-btn small color="primary" @click="addSGBusiness"
                  >Add Business</v-btn
                >
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-sheet>
        <v-sheet v-if="addVehicle" class="pa-0">
          <v-form ref="vehicleForm" @submit.prevent="onAddNewVehicleSubmit">
            <v-row no-gutters>
              <v-col cols="12" class="px-4 py-2 pb-4">
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
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          dense
                          disabled
                          outlined
                          :value="'₱ ' + $selectedType.rate + '.00'"
                          label="Rate"
                          hide-details
                          class="ml-1"
                        ></v-text-field>
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
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-1">
                    <v-text-field
                      name="plate_number"
                      label="Plate Number"
                      :error="errors.plate_number ? true : false"
                      prepend-inner-icon="mdi-pound-box"
                      outlined
                      hide-details
                      dense
                    ></v-text-field>
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
                      dense
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-btn
                      width="100%"
                      depressed
                      type="submit"
                      class="main primary"
                      >Add Vehicle</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
        <v-sheet v-if="addBusiness" class="pa-0">
          <v-form
            class="elevation-0"
            ref="addForm"
            @submit.prevent="addNewPayerBusiness"
          >
            <v-sheet width="100%" class="rounded-lg pa-4 pt-2">
              <v-row no-gutters>
                <v-col cols="12" class="mt-1">
                  <label
                    v-if="tax_type == 'sand-gravel-tax'"
                    class="text-caption font-weight-light main--text primary--text"
                    >Sand&Gravel Business Name</label
                  >
                  <label
                    v-if="tax_type == 'franchise-tax'"
                    class="text-caption font-weight-light main--text primary--text"
                    >Franchise Name</label
                  >
                  <label
                    v-if="tax_type == 'amusement-tax'"
                    class="text-caption font-weight-light main--text primary--text"
                    >Amusement Name</label
                  >
                  <v-text-field
                    ref="business"
                    dense
                    outlined
                    hide-details
                    placeholder="Business Name"
                    name="name"
                    :error="errors.name ? true : false"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="6">
                  <label
                    class="text-caption font-weight-light main--text primary--text"
                    >Province</label
                  >
                  <v-combobox
                    ref="province"
                    outlined
                    dense
                    name="province"
                    :items="sorsogon"
                    :value="sorsogon[0]"
                    item-text="name"
                    item-value="code"
                    :error="errors.province ? true : false"
                    hide-details="auto"
                    disabled
                  ></v-combobox>
                </v-col>
                <v-col cols="6" class="pl-1">
                  <label
                    class="text-caption font-weight-light main--text primary--text"
                    >City</label
                  >
                  <v-combobox
                    ref="city"
                    outlined
                    dense
                    placeholder="City/Municipality"
                    name="city"
                    :items="citiesMunicipalities"
                    :error="errors.city ? true : false"
                    item-text="name"
                    item-value="code"
                    hide-details="auto"
                    @change="onCityChanged"
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <label
                    class="text-caption font-weight-light main--text primary--text"
                    >Barangay</label
                  >
                  <v-combobox
                    ref="barangay"
                    outlined
                    dense
                    placeholder="Barangay"
                    name="barangay"
                    :items="barangays"
                    :error="errors.barangay ? true : false"
                    item-text="name"
                    item-value="code"
                    hide-details="auto"
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <label
                    class="text-caption font-weight-light main--text primary--text"
                    >Address Line (optional)</label
                  >
                  <v-textarea
                    ref="addressLine"
                    outlined
                    dense
                    placeholder="Address Line"
                    name="address_line"
                    :error="errors.address_line ? true : false"
                    hide-details="auto"
                    rows="2"
                    no-resize
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="mb-3">
                  <label
                    class="text-caption font-weight-light main--text primary--text"
                    >Note (optional)</label
                  >
                  <v-textarea
                    ref="note"
                    name="note"
                    placeholder="Write something about your business"
                    rows="2"
                    no-resize
                    outlined
                    hide-details
                    dense
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    width="100%"
                    depressed
                    type="submit"
                    class="main primary"
                    >Add Business</v-btn
                  >
                </v-col>
              </v-row>
            </v-sheet>
          </v-form>
        </v-sheet>
      </v-card-text>
      <v-card-actions v-if="addInfo">
        <v-spacer></v-spacer>
        <v-btn color="secondary" text type="reset" @click="$emit('skip')">
          Skip
        </v-btn>
        <!-- <v-btn
          color="primary"
          text
          type="submit"
          @click.prevent="$emit('closeModal')"
        >
          Submit
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Mixins } from "vue-property-decorator";

import TaxpayerServiceMixin from "@/services/payer.service.ts";

@Component
export default class AddInfoModal extends Mixins(TaxpayerServiceMixin) {
  @Prop() public addInfoModal!: boolean;
  @Prop() public readonly taxPayer!: _object;

  public addInfo = true;
  public headline = "Additional Information";
  public user_vehicles: _object[] = [];
  public amusements: _object[] = [];
  public franchises: _object[] = [];
  public aggregate_business: _object[] = [];
  public tax_type = "";

  public addVehicle = false;
  public selected = 0;
  public vehicleType = null;
  public errors: _object = {};

  public addBusiness = false;
  public sorsogon: _object[] = [];
  public citiesMunicipalities: _object[] = [];
  public barangays: _object[] = [];

  private addPayerVehicle() {
    this.addVehicle = true;
    this.addInfo = false;
    this.headline = "Add New Vehicle";
  }

  private addAmusement() {
    this.addBusiness = true;
    this.addInfo = false;
    this.tax_type = "amusement-tax";
    this.headline = "Add New Amusement";
  }

  private addFranchise() {
    this.addBusiness = true;
    this.addInfo = false;
    this.tax_type = "franchise-tax";
    this.headline = "Add New Franchise";
  }

  private addSGBusiness() {
    this.addBusiness = true;
    this.addInfo = false;
    this.tax_type = "sand-gravel-tax";
    this.headline = "Add New Sand & Gravel Business";
  }

  private back() {
    this.addInfo = true;
    this.addVehicle = false;
    this.addBusiness = false;
    this.headline = "Additional Information";
    this.clearAddForm();
  }

  private async getVehicles() {
    try {
      const { data } = await this.$axios.get(`/api/app/collector/vehicles`);
      const rates = await this.$axios.get(
        "api/app/collector/categories/annual-fixed-tax"
      );
      let user_vehicles = [];
      user_vehicles = data.vehicles;
      this.user_vehicles = user_vehicles.filter(
        (v: _object) => v.owned_by == this.taxPayer.id
      );
    } catch (error) {
      console.log(error);
    }
  }

  private async getAmusements() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/businesses/amusement-tax"
      );
      this.amusements = data;
    } catch (error) {
      console.log(error);
    }
  }

  private async getFranchises() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/businesses/franchise-tax"
      );
      this.franchises = data;
    } catch (error) {
      console.log(error);
    }
  }

  private async getAggregateBusiness() {
    try {
      const { data } = await this.$axios.get(
        "/api/app/collector/businesses/sand-gravel-tax"
      );

      this.aggregate_business = data;
    } catch (error) {
      console.log(error);
    }
  }

  public async onAddNewVehicleSubmit(e: Event) {
    const form = e.target as HTMLFormElement;

    try {
      const vehicle = new FormData(form);

      if (this.vehicleType)
        vehicle.set("category", JSON.stringify(this.$selectedType));

      await this.addNewPayerVehicle(vehicle);

      await this.getAllVehicleCategory();
      await this.getVehicles();

      this.$store.commit("snackBar/toggle", {
        toggle: true,
        message: `Added a Delivery Vehicle`,
        color: "success",
      });

      (this.$refs.vehicleForm as any).reset();
      this.back();
    } catch (error) {
      this.errors = error.errors;
    }
  }

  private async getAddress() {
    try {
      const { data } = await this.$axios.get("/api/psgc/provinces");
      this.sorsogon = data.filter(
        (province: _object) => province.name == "Sorsogon"
      );
      {
        const { data } = await this.$axios.get(
          `/api/psgc/provinces/${this.sorsogon[0].code}/cities-municipalities`
        );
        this.citiesMunicipalities = data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async onCityChanged(val: _object) {
    if (this.errors.residence_city) this.errors.residence_city = null;

    try {
      const { data } = await this.$axios.get(
        `/api/psgc/cities-municipalities/${val.code}/barangays`
      );
      this.barangays = data;
    } catch (error) {
      console.log(error);
    }
  }

  public async clearAddForm() {
    this.errors = {};

    try {
      (this.$refs.city as any).reset();
      (this.$refs.barangay as any).reset();
      (this.$refs.addressLine as any).reset();
      (this.$refs.note as any).reset();
      (this.$refs.business as any).reset();
    } catch (error) {
      error;
    }
  }

  private async resetCustomValue() {
    switch (this.tax_type) {
      case "sand-gravel-tax":
        await this.getAggregateBusiness();
        break;
      case "amusement-tax":
        await this.getAmusements();
        break;
      case "franchise-tax":
        await this.getFranchises();
        break;
      // case "printing-publication-tax":
      //   await this.getAllPayerPrintingPublishingBusiness();
      //   break;
    }
  }

  public async addNewPayerBusiness(e: Event) {
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const elements = form.elements as _object;

    elements.province._value &&
      data.set(
        "province",
        elements.province._value.name ?? elements.province.value
      );
    elements.city._value &&
      data.set("city", elements.city._value.name ?? elements.city.value);
    elements.barangay._value &&
      data.set(
        "barangay",
        elements.barangay._value.name ?? elements.barangay.value
      );

    try {
      switch (this.tax_type) {
        case "sand-gravel-tax":
          await this.addNewSandGravelBusiness(data);
          break;
        case "amusement-tax":
          await this.addNewAmusement(data);
          break;
        case "franchise-tax":
          await this.addNewFranchise(data);
          break;
        // case "printing-publication-tax":
        //   await this.addNewPrintingPublishingBusiness(data);
        //   break;
      }

      this.$store.commit("snackBar/toggle", {
        message: `[${data.get("name")}] was added!`,
        color: "success",
        toggle: true,
      });

      this.clearAddForm();
      this.resetCustomValue();
      this.back();
    } catch (error) {
      this.errors = error.errors;
    }
  }

  get $selectedType(): _object {
    return (
      this.$vehicleCategory.find(
        (elem: _object) => elem.type == this.vehicleType
      ) ?? {
        rate: "0",
      }
    );
  }

  get $vehicleCategory(): _object[] {
    return this.$vehicleCategories.length > 0
      ? this.$vehicleCategories[this.selected].rates.rates
      : [];
  }

  get $vehicleCategories(): _object[] {
    return this.$payer.vehicleCategories ?? [];
  }

  private created() {
    this.getVehicles();
    this.getAmusements();
    this.getFranchises();
    this.getAggregateBusiness();
    this.getAllVehicleCategory();
    this.getAddress();
  }
}
</script>

<style></style>
