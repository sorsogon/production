<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Tax Payer</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row class="pt-3">
              <v-text-field
                outlined
                dense
                label="Full Name"
                name="name"
                v-model="fields1.name"
                :error="errors.name ? true : false"
                prepend-inner-icon="mdi-face"
                hide-details="auto"
                class="mb-2 mr-2"
              >
              </v-text-field>
              <v-text-field
                outlined
                dense
                label="Email Address"
                name="email"
                v-model="fields1.email"
                :error-messages="errors.email"
                type="email"
                placeholder="username@domain.com"
                prepend-inner-icon="mdi-email"
                hide-details="auto"
                class="mb-2"
              >
              </v-text-field>
              <v-text-field
                outlined
                dense
                label="Mobile Number"
                name="mobile"
                v-model="fields1.mobile"
                :error-messages="errors.mobile"
                type="tel"
                placeholder="(+63) xxx-xxxxxxx"
                prepend-inner-icon="mdi-phone"
                hide-details="auto"
                class="mb-0"
              >
              </v-text-field>

              <v-sheet width="100%">
                <label class="text-caption font-weight-light primary--text"
                  >Birthdate</label
                >
                <v-row>
                  <v-col cols="6" class="pl-3 pr-2">
                    <v-select
                      outlined
                      dense
                      label="Month"
                      :items="months"
                      name="month"
                      v-model="fields1.month"
                      hide-details="auto"
                      class="ma-0"
                    ></v-select>
                  </v-col>
                  <v-col class="pl-0 pr-0">
                    <v-select
                      outlined
                      dense
                      label="Day"
                      :items="days"
                      name="day"
                      v-model="fields1.day"
                      hide-details="auto"
                      class="ma-0"
                    ></v-select>
                  </v-col>
                  <v-col class="pr-3 pl-2">
                    <v-select
                      outlined
                      dense
                      label="Year"
                      :items="years"
                      name="year"
                      v-model="fields1.year"
                      hide-details="auto"
                      class="ma-0"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-sheet>

              <v-sheet width="100%">
                <label class="text-caption font-weight-light primary--text"
                  >Gender</label
                >
                <v-radio-group
                  class="pa-0"
                  name="gender"
                  v-model="fields1.gender"
                  dense
                  hide-details="auto"
                >
                  <v-row>
                    <v-col class="pl-3 pr-1 pt-0">
                      <v-radio value="female" label="Female"></v-radio>
                    </v-col>
                    <v-col class="pl-0 pr-0 pt-0">
                      <v-radio value="male" label="Male"></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-sheet>

              <v-sheet width="100%">
                <label class="text-caption font-weight-light primary--text"
                  >Residence Address</label
                >
                <v-row>
                  <v-col cols="6" class="pr-1">
                    <v-combobox
                      outlined
                      dense
                      label="Province"
                      v-model="fields2.residence_province"
                      name="residence_province"
                      :items="provinces"
                      :error="errors.residence_province ? true : false"
                      item-text="name"
                      hide-details="auto"
                      class="mb-2"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="6" class="pl-1">
                    <v-combobox
                      outlined
                      dense
                      label="City/Municipality"
                      v-model="fields2.residence_city"
                      name="residence_city"
                      :items="r_citiesMunicipalities"
                      :error="errors.residence_city ? true : false"
                      item-text="name"
                      hide-details="auto"
                      class="mb-2"
                    ></v-combobox>
                  </v-col>
                </v-row>

                <v-combobox
                  outlined
                  dense
                  label="Barangay"
                  v-model="fields2.residence_barangay"
                  name="residence_barangay"
                  :items="r_barangays"
                  :error="errors.residence_barangay ? true : false"
                  item-text="name"
                  hide-details="auto"
                  class="mb-2"
                ></v-combobox>

                <v-textarea
                  outlined
                  label="Address Line"
                  placeholder="Blk/Lot#,Street/Purok#,House/Unit/Flr#"
                  v-model="fields2.residence_address_line"
                  :error="errors.residence_address_line ? true : false"
                  name="residence_address_line"
                  prepend-inner-icon="mdi-map-marker"
                  height="100"
                  hide-details="auto"
                  class="mb-0 text-body-2"
                >
                </v-textarea>
              </v-sheet>

              <v-sheet width="100%">
                <label class="text-caption font-weight-light primary--text"
                  >Permanent Address</label
                >
                <v-sheet class="pa-0 mt-2 mb-2 d-flex align-center transparent">
                  <v-checkbox
                    dense
                    name="copy_residence_address"
                    id="checkbox"
                    v-model="fields2.copy_residence_address"
                    hide-details="auto"
                    type="checkbox"
                    class="pa-0 ma-0"
                  ></v-checkbox>
                  <label
                    for="checkbox"
                    role="button"
                    class="text-caption ma-0 font-weight-light"
                    style="line-height: 0.95rem"
                  >
                    By clicking this checkbox, you agree that your
                    <span class="primary--text"
                      >permanent and residence address</span
                    >
                    are the same.
                  </label>
                </v-sheet>
                <v-row>
                  <v-col cols="6" class="pr-1">
                    <v-combobox
                      outlined
                      dense
                      label="Province"
                      v-model="fields2.permanent_province"
                      name="permanent_province"
                      :items="provinces"
                      :error="errors.permanent_province ? true : false"
                      item-text="name"
                      item-value="code"
                      hide-details="auto"
                      :disabled="fields2.copy_residence_address"
                      class="mb-2"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="6" class="pl-1">
                    <v-combobox
                      outlined
                      dense
                      label="City/Municipality"
                      v-model="fields2.permanent_city"
                      name="permanent_city"
                      :items="p_citiesMunicipalities"
                      :error="errors.permanent_city ? true : false"
                      item-text="name"
                      hide-details="auto"
                      :disabled="fields2.copy_residence_address"
                      class="mb-2"
                    ></v-combobox>
                  </v-col>
                </v-row>

                <v-combobox
                  outlined
                  dense
                  label="Barangay"
                  v-model="fields2.permanent_barangay"
                  name="permanent_barangay"
                  :items="p_barangays"
                  :error="errors.permanent_barangay ? true : false"
                  item-text="name"
                  hide-details="auto"
                  :disabled="fields2.copy_residence_address"
                  class="mb-2"
                ></v-combobox>

                <v-textarea
                  outlined
                  dense
                  label="Address Line"
                  placeholder="Blk/Lot#,Street/Purok#,House/Unit/Flr#"
                  v-model="fields2.permanent_address_line"
                  :error="errors.permanent_address_line ? true : false"
                  name="permanent_address"
                  prepend-inner-icon="mdi-map-marker"
                  height="100"
                  hide-details="auto"
                  :disabled="fields2.copy_residence_address"
                  class="mb-0 text-body-2"
                >
                </v-textarea>
              </v-sheet>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text type="reset" @click="cancelAddTaxPayer">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          text
          type="submit"
          @click.prevent="onAddNewTaxPayer"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class RegisterTaxPayerModal extends Vue {
  @Prop() public dialog!: boolean;

  public errors: _object = {};
  public data = {
    csrftoken: "",
    sessionid: "",
  };
  public provinces: _object[] = [];
  public districts: number[] = [];

  public r_citiesMunicipalities: _object[] = [];
  public r_barangays: _object[] = [];
  public p_citiesMunicipalities: _object[] = [];
  public p_barangays: _object[] = [];

  public fields1: _object = {
    //  basic             birthday            gender
    name: "",
    month: "January",
    gender: "female",
    email: "",
    day: 1,
    avatar: "",
    mobile: "",
    year: new Date().getFullYear() - 18,
    id: null,
    refreshToken: "",
  };

  public fields2: _object = {
    // Residence
    residence_province: "",
    residence_barangay: "",
    residence_address_line: "",
    residence_city: "",

    copy_residence_address: false,

    // Permanent
    permanent_province: "",
    permanent_barangay: "",
    permanent_address_line: "",
    permanent_city: "",
  };

  public cancelAddTaxPayer() {
    this.$emit("closeRegisterModal");
    this.resetSignUpForm();
  }

  public resetSignUpForm() {
    this.fields1 = {
      name: "",
      month: "January",
      gender: "female",
      email: "",
      day: 1,
      avatar: "",
      mobile: "",
      year: new Date().getFullYear() - 18,
      id: null,
      refreshToken: "",
      google_id: null,
    };
    this.fields2 = {
      residence_province: "",
      residence_barangay: "",
      residence_address_line: "",
      residence_city: "",
      copy_residence_address: false,
      permanent_province: "",
      permanent_barangay: "",
      permanent_address_line: "",
      permanent_city: "",
    };
    this.errors = {};
  }

  public async onAddNewTaxPayer() {
    // if (this.fields2.copy_residence_address) {
    //   delete this.fields2.permanent_province;
    //   delete this.fields2.permanent_district;
    //   delete this.fields2.permanent_city;
    //   delete this.fields2.permanent_barangay;
    //   delete this.fields2.permanent_address_line;
    // }

    // const credentials = new FormData();

    // for (const name of Object.keys(this.fields1))
    //   credentials.append(name, this.fields1[name]);

    // for (const name of Object.keys(this.fields2)) {
    //   if (this.fields2[name] && this.fields2[name].name)
    //     this.fields2[name] = this.fields2[name].name;
    //   credentials.append(name, this.fields2[name]);
    // }

    // try {
    //   const { data: user } = await this.$axios.post(
    //     "/auth/v2/signup",
    //     credentials
    //   );
    //   console.log(
    //     `%c[Server] Successfully signed up ${user.email} from the application.`,
    //     "font-weight: bold; color: green"
    //   );
    //   this.resetSignUpForm();
    //   this.$emit("newTaxPayer", user);
    //   this.$store.commit("snackBar/toggle", {
    //     message: `${user.email} is Added`,
    //     color: "success",
    //     toggle: true,
    //   });
    // } catch (error) {
    //   console.log(
    //     `%c[Server] There was an error while attempting to sign up the user.`,
    //     "font-weight: bold; color: red;"
    //   );
    //   console.log(error);
    //   this.errors = error.errors;
    // }
    this.$emit("newTaxPayer");
  }

  public async created() {
    try {
      const { data } = await this.$axios.get("/api/psgc/provinces");
      const { data: districts } = await this.$axios.get("/api/psgc/districts");
      this.provinces = data;
      this.districts = [...Array(districts.length).keys()].map((i) => i + 1);
    } catch (error) {
      console.log(error);
    }
  }

  @Watch("fields1.name")
  onNameChanged() {
    if (this.errors.name) this.errors.name = null;
  }

  @Watch("fields1.email")
  onEmailChanged() {
    if (this.errors.email) this.errors.email = null;
  }

  @Watch("fields1.mobile")
  onMobileChanged() {
    if (this.errors.mobile) this.errors.mobile = null;
  }

  @Watch("fields2.residence_province")
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

  @Watch("fields2.residence_district")
  private async onResidenceDistrictChanged() {
    if (this.errors.residence_district) this.errors.residence_district = null;
  }

  @Watch("fields2.residence_city")
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

  @Watch("fields2.residence_barangay")
  private async onResidenceBarangayChanged() {
    if (this.errors.residence_barangay) this.errors.residence_barangay = null;
  }

  @Watch("fields2.residence_address_line")
  private async onResidenceAddressLineChanged() {
    if (this.errors.residence_address_line)
      this.errors.residence_address_line = null;
  }

  @Watch("fields2.permanent_province")
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

  @Watch("fields2.permanent_district")
  private async onPermanentDistrictChanged() {
    if (this.errors.permanent_district) this.errors.permanent_district = null;
  }

  @Watch("fields2.permanent_city")
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

  @Watch("fields2.permanent_barangay")
  private async onPermanentBarangayChanged() {
    if (this.errors.permanent_barangay) this.errors.permanent_barangay = null;
  }

  get months() {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  get years() {
    const S = [];
    const current = new Date().getFullYear();

    for (let i = current - 1e2; i <= current - 18; ++i) S[S.length] = i;
    return S.reverse();
  }

  get days() {
    let days = 31;
    let S: number[] = [];
    const month = this.months.findIndex((j) => j == this.fields1.month) + 1;
    const year = this.fields1.year;

    let fmt = (month: number, day: number, year: number) =>
      new Date(`${month}/${day}/${year}`).toLocaleDateString();

    while (fmt(month, days, year) !== `${month}/${days}/${year}`) --days;

    return [...Array(days).keys()].map((i) => i + 1);
  }
}
</script>

<style lang="postcss" scoped></style>
