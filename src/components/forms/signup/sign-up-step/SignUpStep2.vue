<template>
  <v-sheet color="main">
    <v-sheet class="mr-3 ml-3 mt-2 main">
      <!-- <v-btn 
        @click.prevent="onResetSignUp"
        class="mb-2 mt-1" 
        icon>
        <v-icon size="32">mdi-arrow-left</v-icon>
      </v-btn> -->
      <h4 class="text-h5 font-weight-regular primary--text">Welcome, {{ username }}!</h4>
      <p class="text-body-2 mt-1 font-weight-light">
        Please provide us some additional information about you 🖋️, so that we
        can give you a better experience:
      </p>
    </v-sheet>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-alert 
          v-bind="attrs"
          v-on="on"
          type="info" 
          class="mx-3" 
          outlined
           dense 
          color="warning">
          <span>[Globe Labs] Server Timeout Error</span>
        </v-alert>
      </template>
      <span>Note: You're mobile number will not receive any notification from the server.</span>
    </v-tooltip>

    <v-form @submit.prevent="onSignUpSubmit">
      <h4 class="mr-3 ml-3 mt-2 text-body-2">
        Residence Address
      </h4>
      <v-divider class="mb-2"></v-divider>

      <v-sheet class="pr-4 pl-4 pt-1 main">
        <v-row>
          <v-col cols="6" class="pr-1">
            <v-combobox
              outlined
              dense
              label="Province"
              v-model="fields.residence_province"
              :error="errors.residence_province ? true : false"
              name="residence_province"
              :items="provinces"
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
              v-model="fields.residence_city"
              :error="errors.residence_city ? true : false"
              name="residence_city"
              :items="r_citiesMunicipalities"
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
          v-model="fields.residence_barangay"
          :error="errors.residence_barangay ? true : false"
          name="residence_barangay"
          :items="r_barangays"
          item-text="name"
          hide-details="auto"
          class="mb-2"
        ></v-combobox>

        <v-textarea
          outlined
          label="Address Line"
          placeholder="Blk/Lot#,Street/Purok#,House/Unit/Flr#"
          v-model="fields.residence_address_line"
          :error="errors.residence_address_line ? true : false"
          name="residence_address_line"
          prepend-inner-icon="mdi-map-marker"
          height="100"
          hide-details="auto"
          class="mb-0 text-body-2"
        >
        </v-textarea>
      </v-sheet>

      <h4 class="mr-3 ml-3 mt-4 text-body-2">
        Permanent Address
      </h4>
      <v-divider></v-divider>

      <v-sheet class="pr-4 pl-4 pb-3 main">
        <v-sheet class="pa-0 mt-2 mb-2 d-flex align-center transparent">
          <v-checkbox
            dense
            name="copy_residence_address"
            id="checkbox"
            v-model="fields.copy_residence_address"
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
            <span class="grey--text font-weight-medium">permanent and residence address</span>
            are the same.
          </label>
        </v-sheet>
        <v-row>
          <v-col cols="6" class="pr-2">
            <v-combobox
              outlined
              dense
              label="Province"
              v-model="fields.permanent_province"
              :error="errors.permanent_province ? true : false"
              name="permanent_province"
              :items="provinces"
              item-text="name"
              item-value="code"
              hide-details="auto"
              :disabled="fields.copy_residence_address"
              class="mb-2"
            ></v-combobox>
          </v-col>
          <v-col cols="6" class="pl-1">
            <v-combobox
              outlined
              dense
              label="City/Municipality"
              v-model="fields.permanent_city"
              :error="errors.permanent_city ? true : false"
              name="permanent_city"
              :items="p_citiesMunicipalities"
              item-text="name"
              hide-details="auto"
              :disabled="fields.copy_residence_address"
              class="mb-2"
            ></v-combobox>
          </v-col>
        </v-row>

        <v-combobox
          outlined
          dense
          label="City/Municipality"
          v-model="fields.permanent_city"
          :error="errors.permanent_city ? true : false"
          name="permanent_city"
          :items="p_citiesMunicipalities"
          item-text="name"
          hide-details="auto"
          :disabled="fields.copy_residence_address"
          class="mb-2"
        ></v-combobox>
        <v-combobox
          outlined
          dense
          label="Barangay"
          v-model="fields.permanent_barangay"
          :error="errors.permanent_barangay ? true : false"
          name="permanent_barangay"
          :items="p_barangays"
          item-text="name"
          hide-details="auto"
          :disabled="fields.copy_residence_address"
          class="mb-2"
        ></v-combobox>

        <v-textarea
          outlined
          dense
          label="Address Line"
          placeholder="Blk/Lot#,Street/Purok#,House/Unit/Flr#"
          v-model="fields.permanent_address_line"
          :error="errors.permanent_address_line ? true : false"
          name="permanent_address"
          prepend-inner-icon="mdi-map-marker"
          height="100"
          hide-details="auto"
          :disabled="fields.copy_residence_address"
          class="mb-0 text-body-2"
        >
        </v-textarea>
      </v-sheet>

      <v-sheet class="pl-4 pr-4 pt-0 main">
        <v-btn
          elevation="0"
          color="primary"
          class="text-button"
          type="submit"
          large
          ref="submitBtn"
          width="100%"
          >Sign Up</v-btn>
      </v-sheet>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class SignUpStep1 extends Vue {
  @Prop() public readonly data!: _object;
  @Prop() public readonly errors!: _object;
  public submitButtonDisabled = false;
  public provinces: _object[] = [];

  public r_citiesMunicipalities: _object[] = [];
  public r_barangays: _object[] = [];
  public p_citiesMunicipalities: _object[] = [];
  public p_barangays: _object[] = [];

  public fields: _object = {
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

  public async onSignUpSubmit() {
    const submitBtn = this.$refs.submitBtn as HTMLButtonElement;
    this.submitButtonDisabled = !this.submitButtonDisabled;

    if (this.fields.copy_residence_address) {
      delete this.fields.permanent_province;
      delete this.fields.permanent_city;
      delete this.fields.permanent_barangay;
      delete this.fields.permanent_address_line;
    }

    console.log(this.fields);

    for (const name of Object.keys(this.fields)) {
      if (this.fields[name] && this.fields[name].name)
        this.fields[name] = this.fields[name].name;
    }

    this.submitButtonDisabled = !this.submitButtonDisabled;
    this.$emit("complete", this.fields);
  }

  public async onResetSignUp() {
    const credentials = new FormData();
    credentials.append("code", this.data.code);

    try {
      await this.$axios.post(this.data.reset_url, credentials);
      this.$emit("back");
    } catch (error) {
      console.log(error);
    }
  }

  public async created() {
    try {
      const { data } = await this.$axios.get("/api/psgc/provinces");
      this.provinces = data;
    } catch (error) {
      console.log(error);
    }
  }

  @Watch("fields.residence_province")
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

  @Watch("fields.residence_city")
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

  @Watch("fields.residence_barangay")
  private async onResidenceBarangayChanged() {
    if (this.errors.residence_barangay) this.errors.residence_barangay = null;
  }

  @Watch("fields.residence_address_line")
  private async onResidenceAddressLineChanged() {
    if (this.errors.residence_address_line)
      this.errors.residence_address_line = null;
  }

  @Watch("fields.permanent_province")
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

  @Watch("fields.permanent_city")
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

  @Watch("fields.permanent_barangay")
  private async onPermanentBarangayChanged() {
    if (this.errors.permanent_barangay) this.errors.permanent_barangay = null;
  }

  get username() {
    console.log(this.data);
    if (this.data.name) return this.data.name.split(" ")[0];
    else return "";
  }
}
</script>

<style lang="postcss" scoped></style>
