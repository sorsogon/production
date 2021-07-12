<template>
  <v-container>
    <v-row no-gutters>
      
      <v-col cols="12" class="mb-1">
        <h4 class="font-weight-medium main--text primary--text">Edit Profile</h4>
        <p class="font-weight-light text-subtitle-2">Sit eu ullamco consectetur Lorem enim laboris occaecat aliquip consectetur mollit proident laborum.</p>
      </v-col>

      <v-col cols="12">
        <v-form
          @submit.prevent="onProfileChangeSubmit">
          <label class="text-caption font-weight-light main--text primary--text">About</label>
          <v-textarea 
            dense
            outlined
            hide-details
            name="about"
            label="🖊️ Write something about yourself"
            no-resize
            :value="$user.profile.about"
            rows="3"
            class="mb-3"></v-textarea>
          <v-sheet 
            id="info"
            rounded="lg"
            class="pa-4 elevation-2">
            <h5 class="font-weight-medium text-body-2">Basic Information</h5>
            <label class="text-caption font-weight-light main--text primary--text">Birthdate</label>
            <v-row>
              <v-col cols="5" class="pl-3 pr-1">
                <v-select
                  outlined
                  dense
                  label="Month"
                  :items="months"
                  :value="months[new Date($user.birthdate).getMonth()]"
                  name="month"
                  hide-details="auto"
                  class="ma-0"></v-select>
              </v-col>
              <v-col cols="3" class="pl-0 pr-0">
                <v-select
                  outlined
                  dense
                  label="Day"
                  :items="days"
                  :value="new Date($user.birthdate).getDate()"
                  name="day"
                  hide-details="auto"
                  class="ma-0"></v-select>
              </v-col>
              <v-col cols="4" class="pr-3 pl-1">
                <v-select
                  outlined
                  dense
                  label="Year"
                  :items="years"
                  :value="new Date($user.birthdate).getFullYear()"
                  name="year"
                  hide-details="auto"
                  class="ma-0"></v-select>
              </v-col>
            </v-row>

            <label class="text-caption font-weight-light main--text primary--text">Gender</label>
            <v-radio-group 
              class="pa-0" 
              name="gender"
              dense
              :value="$user.gender"
              hide-details="auto">
              <v-row>
                <v-col class="pl-3 pr-1 pt-0">
                  <v-radio 
                    value="female"
                    label="Female"></v-radio>
                </v-col>
                <v-col class="pl-0 pr-0 pt-0">
                  <v-radio 
                    value="male"
                    label="Male"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>

            <label class="text-caption font-weight-light main--text primary--text">Profession</label>
            <v-combobox
              outlined
              dense
              placeholder="What's your professions?"
              multiple
              name="professions"
              :items="professions"
              :value="$user.profile.professions"
              prepend-inner-icon="mdi-account-tie"
              hide-details="auto"
              class="mb-2">
              <template v-slot:selection="{ item, index }">
                <v-chip color="primary" class="mb-1 mr-sm-1 mb-sm-0" v-if="index < 4" small>
                  <span>{{ item }}</span>
                </v-chip>
                <v-icon v-else-if="index == 4">
                  mdi-dots-horizontal
                </v-icon>
              </template>
            </v-combobox>
          </v-sheet>

          <v-sheet 
            id="education"
            rounded="lg"
            class="pa-4 elevation-2 my-4">
            <h5 class="font-weight-medium text-body-2">Education</h5>
            <label class="text-caption font-weight-light main--text primary--text">Primary</label>
            <v-text-field
              outlined
              dense
              placeholder="What primary school did you went to?"
              name="primary_edu"
              :value="$user.profile.primary_edu"
              prepend-inner-icon="mdi-chair-school"
              hide-details="auto"
              class="mb-2">
            </v-text-field>
            <label class="text-caption font-weight-light main--text primary--text">Secondary</label>
            <v-text-field
              outlined
              dense
              placeholder="What high school did you went to?"
              name="secondary_edu"
              :value="$user.profile.secondary_edu"
              prepend-inner-icon="mdi-pencil"
              hide-details="auto"
              class="mb-2">
            </v-text-field>
            <label class="text-caption font-weight-light main--text primary--text">Tertiary</label>
            <v-text-field
              outlined
              dense
              placeholder="What university/college did you went to?"
              name="tertiary_edu"
              :value="$user.profile.tertiary_edu"
              prepend-inner-icon="mdi-pen"
              hide-details="auto"
              class="mb-2">
            </v-text-field>
          </v-sheet>

          <v-sheet 
            id="contact"
            rounded="lg"
            class="pa-4 elevation-2 my-4 mb-2">
            <h5 class="font-weight-medium text-body-2">Contact</h5>
            <label class="text-caption font-weight-light main--text primary--text">Email</label>
            <v-text-field
              outlined
              dense
              name="email"
              :value="$user.email"
              type="email"
              placeholder="username@domain.com"
              prepend-inner-icon="mdi-email"
              hide-details="auto"
              disabled
              class="mb-2">
            </v-text-field>
            <label class="text-caption font-weight-light main--text primary--text">Mobile</label>
            <v-text-field
              outlined
              dense
              name="mobile"
              :value="'0'+$user.mobile"
              type="tel"
              placeholder="(+63) xxx-xxxxxxx"
              prepend-inner-icon="mdi-phone"
              hide-details="auto"
              disabled
              class="mb-0">
            </v-text-field>
            <label class="text-caption font-weight-light main--text primary--text">Website URL</label>
            <v-text-field
              outlined
              dense
              name="website_url"
              :value="$user.profile.website_url"
              prepend-inner-icon="mdi-at"
              hide-details="auto"
              class="mb-0">
            </v-text-field>

            <label class="d-block mt-3 text-caption font-weight-medium main--text primary--text">Residence</label>
            <v-divider></v-divider>

            <v-row no-gutters>
              <v-col cols="6" class="pr-1">
                <label class="text-caption font-weight-light main--text primary--text">Province</label>
                <v-combobox
                  outlined
                  dense
                  name="residence_province"
                  :items="provinces"
                  :value="$user.residence.province"
                  item-text="name"
                  item-value="code"
                  hide-details="auto"
                  class="mb-2"
                  @change="onResidenceProvinceChanged"
                ></v-combobox>
              </v-col>
              <v-col cols="6" class="pl-1">
                <label class="text-caption font-weight-light main--text primary--text">City</label>
                <v-combobox
                  outlined
                  dense
                  placeholder="City/Municipality"
                  name="residence_city"
                  :value="$user.residence.city"
                  :items="r_citiesMunicipalities"
                  item-text="name"
                  item-value="code"
                  hide-details="auto"
                  class="mb-2"
                  @change="onResidenceCityChanged"
                ></v-combobox>
              </v-col>
              <v-col cols="12">
                <label class="text-caption font-weight-light main--text primary--text">Barangay</label>
                <v-combobox
                  outlined
                  dense
                  placeholder="Barangay"
                  name="residence_barangay"
                  :value="$user.residence.barangay"
                  :items="r_barangays"
                  item-text="name"
                  item-value="code"
                  hide-details="auto"
                  class="mb-2"
                  @change="onResidenceBarangayChanged"
                ></v-combobox>
              </v-col>
            </v-row>

            <label class="text-caption font-weight-light main--text primary--text">Address Line</label>
            <v-textarea
              outlined
              placeholder="Blk/Lot#,Street/Purok#,House/Unit/Flr#"
              name="residence_address_line"
              :value="$user.residence.address_line"
              prepend-inner-icon="mdi-map-marker"
              height="100"
              hide-details="auto"
              class="mb-0 text-body-2"
              @change="onResidenceAddressLineChanged">
            </v-textarea>

            <label class="d-block mt-3 text-caption font-weight-medium main--text primary--text">Permanent</label>
            <v-divider></v-divider>

            <v-row no-gutters>
              <v-col cols="6" class="pr-1">
                <label class="text-caption font-weight-light main--text primary--text">Province</label>
                <v-combobox
                  outlined
                  dense
                  name="permanent_province"
                  :items="provinces"
                  :value="$user.permanent.province"
                  item-text="name"
                  item-value="code"
                  hide-details="auto"
                  class="mb-2"
                  @change="onPermanentProvinceChanged"
                ></v-combobox>
              </v-col>
              <v-col cols="6" class="pl-1">
                <label class="text-caption font-weight-light main--text primary--text">City</label>
                <v-combobox
                  outlined
                  dense
                  placeholder="City/Municipality"
                  name="permanent_city"
                  :items="p_citiesMunicipalities"
                  :value="$user.permanent.city"
                  item-text="name"
                  item-value="code"
                  hide-details="auto"
                  class="mb-2"
                  @change="onPermanentCityChanged"
                ></v-combobox>
              </v-col>
              <v-col cols="12">
                <label class="text-caption font-weight-light main--text primary--text">Barangay</label>
                <v-combobox
                  outlined
                  dense
                  placeholder="Barangay"
                  name="permanent_barangay"
                  :items="p_barangays"
                  :value="$user.permanent.barangay"
                  item-text="name"
                  item-value="code"
                  hide-details="auto"
                  class="mb-2"
                  @change="onPermanentBarangayChanged"
                ></v-combobox>
              </v-col>
            </v-row>

            <label class="text-caption font-weight-light main--text primary--text">Address Line</label>
            <v-textarea
              outlined
              placeholder="Blk/Lot#,Street/Purok#,House/Unit/Flr#"
              name="permanent_address_line"
              :value="$user.permanent.address_line"
              prepend-inner-icon="mdi-map-marker"
              height="100"
              hide-details="auto"
              class="mb-0 text-body-2">
            </v-textarea>
          </v-sheet>

          <v-sheet class="transparent pa-0 float-right">
            <v-btn 
              text 
              color="error"
              dense 
              @click.prevent="$router.back()">Cancel</v-btn>
            <v-btn 
              text 
              dense 
              dark 
              class="mr-1 main--text primary--text"
              type="submit">Save</v-btn>
          </v-sheet>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class AboutProfilePageEditor extends Mixins(TaxpayerServiceMixin) {
  public fields: _object = {};
  public errors: _object = {};

  public provinces: _object[] = [];
  public professions: _object[] = [];

  public r_citiesMunicipalities: _object[] = [];
  public r_barangays: _object[] = [];
  public p_citiesMunicipalities: _object[] = [];
  public p_barangays: _object[] = [];

  public mounted() {
    document.getElementById(this.$route.params.page)?.scrollIntoView();
  }

  public async created() {
    try {
      const { data } = await this.$axios.get('/api/psgc/provinces');
      this.provinces = data;
    } catch (error) {
      console.log(error);
    }

    try {
      const { data } = await this.$axios.get('/api/app/payer/taxes/category/professional-tax?all=true');

      console.log(data);

      this.professions = data.pop().rates.map((elem: any) => elem.title);
    } catch(error) {
      console.log(error);
    }
  }

  public onProfileChangeSubmit(e: Event) {
    const form = e.target as HTMLFormElement;
    this.$root.updatePayerProfile(form);
  }

  private async onResidenceProvinceChanged(val: _object) {
    if (this.errors.residence_province) this.errors.residence_province = null;
    try {
      const { data } = await this.$axios.get(
        `/api/psgc/provinces/${val.code}/cities-municipalities`
      );
      this.r_citiesMunicipalities = data;
    } catch (error) {
      console.log(error);
    }
  }

  private async onResidenceCityChanged(val: _object) {
    if (this.errors.residence_city) this.errors.residence_city = null;
    try {
      const { data } = await this.$axios.get(
        `/api/psgc/cities-municipalities/${val.code}/barangays`
      );
      this.r_barangays = data;
    } catch (error) {
      console.log(error);
    }
  }

  private async onResidenceBarangayChanged() {
    if (this.errors.residence_barangay) this.errors.residence_barangay = null;
  }

  private async onResidenceAddressLineChanged() {
    if (this.errors.residence_address_line)
      this.errors.residence_address_line = null;
  }

  private async onPermanentProvinceChanged(val: _object) {
    if (this.errors.residence_city) this.errors.permanent_province = null;
    try {
      const { data } = await this.$axios.get(
        `/api/psgc/provinces/${val.code}/cities-municipalities`
      );
      this.p_citiesMunicipalities = data;
    } catch (error) {
      console.log(error);
    }
  }

  private async onPermanentCityChanged(val: _object) {
    if (this.errors.residence_city) this.errors.permanent_city = null;
    try {
      const { data } = await this.$axios.get(
        `/api/psgc/cities-municipalities/${val.code}/barangays`
      );
      this.p_barangays = data;
    } catch (error) {
      console.log(error);
    }
  }

  private async onPermanentBarangayChanged() {
    if (this.errors.permanent_barangay) this.errors.permanent_barangay = null;
  }

  get months() {
    return [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October',
      'November', 'December'
    ];
  }

  get years() {
    const S = [];
    const current = (new Date).getFullYear();

    for (let i = current-1e2; i <= current-18; ++i) S[S.length] = i;
    return S.reverse();
  }

  get days() {
    let days = 31;
    const month = this.fields.month ? this.months.findIndex((j) => j == this.fields.month)+1 : 1;
    const year = this.fields.year ?? this.years[0];

    let fmt = (month: number, day: number, year: number) => new Date(`${month}/${day}/${year}`);

    for (let curr: Date = fmt(month, days, year);; --days, curr = fmt(month, days, year))
      if (curr.getDate() == days) break;

    return [...Array(days).keys()].map(i => i+1);
  }

  get $user(): _object {
    return this.$root.$user ?? {};
  }

}
</script>
