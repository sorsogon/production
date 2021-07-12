<template>
  <v-dialog
    v-model="modalState"
    max-width="320">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        class="float-right mt-4"
        color="primary"
        depressed>
        <v-icon>mdi-plus</v-icon> Add Business
      </v-btn>
    </template>
    <v-form
      class="elevation-0"
      ref="addForm"
      @submit.prevent="addNewPayerBusiness">
      <v-sheet width="100%" class="rounded-lg pa-3">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex align-center mb-2">
            <v-icon class="main--text primary--text float-left">mdi-home-modern</v-icon>
            <h4 
              v-if="$route.params.category == 'franchise-tax'"
              class="font-weight-medium main--text primary--text text-subtitle-2">Add New Franchise</h4>
            <h4 
              v-else-if="$route.params.category == 'amusement-tax'"
              class="font-weight-medium main--text primary--text text-subtitle-2">Add New Amusement</h4>
            <h4 
              v-else-if="$route.params.category == 'sand-gravel-tax'"
              class="font-weight-medium main--text primary--text text-subtitle-2">Add New Sand & Gravel Business</h4>
            <h4 
              v-else-if="$route.params.category == 'printing-publication-tax'"
              class="font-weight-medium main--text primary--text text-subtitle-2">Add New Printing & Publishing Business</h4>
          </v-col>

          <v-col cols="12" class="mt-1">
            <label 
              v-if="$route.params.category == 'sand-gravel-tax'"
              class="text-caption font-weight-light main--text primary--text">Sand&Gravel Business Name</label>
            <label 
              v-if="$route.params.category == 'franchise-tax'"
              class="text-caption font-weight-light main--text primary--text">Franchise Name</label>
            <label 
              v-if="$route.params.category == 'amusement-tax'"
              class="text-caption font-weight-light main--text primary--text">Amusement Name</label>
            <v-text-field
              ref="business"
              dense
              outlined
              hide-details
              placeholder="Business Name"
              name="name"
              :error="errors.name ? true : false">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6">
            <label class="text-caption font-weight-light main--text primary--text">Province</label>
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
              disabled></v-combobox>
          </v-col>
          <v-col cols="6" class="pl-1">
            <label class="text-caption font-weight-light main--text primary--text">City</label>
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
              @change="onCityChanged"></v-combobox>
          </v-col>
          <v-col cols="12">
            <label class="text-caption font-weight-light main--text primary--text">Barangay</label>
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
              hide-details="auto"></v-combobox>
          </v-col>
          <v-col cols="12">
            <label class="text-caption font-weight-light main--text primary--text">Address Line (optional)</label>
            <v-textarea
              ref="addressLine"
              outlined
              dense
              placeholder="Address Line"
              name="address_line"
              :error="errors.address_line ? true : false"
              hide-details="auto"
              rows="2"
              no-resize></v-textarea>
          </v-col>
          <v-col cols="12" class="mb-2">
            <label class="text-caption font-weight-light main--text primary--text">Note (optional)</label>
            <v-textarea
              ref="note"
              name="note"
              placeholder="Write something about your business"
              rows="2"
              no-resize
              outlined
              hide-details
              dense></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="main primary"
              class="float-right"
              text
              type="submit">Add</v-btn>
            <v-btn
              color="error"
              class="float-right"
              text
              @click="clearAddForm">Discard</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class PayerCreateNewBusiness extends Mixins(TaxpayerServiceMixin) {
  public errors: _object = {};
  public modalState = false;

  public sorsogon: _object[] = [];
  public citiesMunicipalities: _object[] = [];
  public barangays: _object[] = [];

  public async created() {
    try {
      const { data } = await this.$axios.get('/api/psgc/provinces');
      this.sorsogon = data.filter((province: _object) => province.name == 'Sorsogon');
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

  @Watch('$route', { immediate: true })
  public async clearAddForm() {
    this.errors = {};
    this.modalState = false;

    try {
      (this.$refs.city as any).reset();
      (this.$refs.barangay as any).reset();
      (this.$refs.addressLine as any).reset();
      (this.$refs.note as any).reset();
      (this.$refs.business as any).reset();
    } catch(error) {
      error;
    }
  }

  private async resetCustomValue() { 
    switch (this.$route.params.category) {
    case 'sand-gravel-tax':
      await this.getAllPayerSandGravelBusiness();
      break;
    case 'amusement-tax':
      await this.getAllPayerAmusements();
      break;
    case 'franchise-tax':
      await this.getAllPayerFranchises();
      break;
    case 'printing-publication-tax':
      await this.getAllPayerPrintingPublishingBusiness();
      break;
    }
  }

  public async addNewPayerBusiness(e: Event) {
    
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const elements = form.elements as _object;

    elements.province._value && data.set('province', elements.province._value.name ?? elements.province.value);
    elements.city._value && data.set('city', elements.city._value.name ?? elements.city.value);
    elements.barangay._value && data.set('barangay', elements.barangay._value.name ?? elements.barangay.value);

    try {
      switch (this.$route.params.category) {
      case 'sand-gravel-tax':
        await this.addNewSandGravelBusiness(data);
        break;
      case 'amusement-tax':
        await this.addNewAmusement(data);
        break;
      case 'franchise-tax':
        await this.addNewFranchise(data);
        break;
      case 'printing-publication-tax':
        await this.addNewPrintingPublishingBusiness(data);
        break;
      }

      this.$store.commit('snackBar/toggle', {
        message: `[${ data.get('name') }] was added!`,
        color: 'success',
        toggle: true
      });

      this.clearAddForm();
      this.resetCustomValue();
    } catch(error) {
      this.errors = error.errors;
    }
  }

}
</script>
