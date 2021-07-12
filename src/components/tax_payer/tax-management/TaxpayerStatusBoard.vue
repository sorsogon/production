<template>
  <v-row
    no-gutters>

    <!-- Action Forms -->
    <v-col cols="12">
      <v-row 
        class="mt-2"
        v-if="$route.params.category == 'annual-fixed-tax'"
        no-gutters>
        <v-col 
          cols="12">
          <ManagePayerVehicle />
        </v-col>
      </v-row>

      <v-row 
        class="mt-2"
        v-else-if="
          $route.params.category == 'franchise-tax' || 
          $route.params.category == 'amusement-tax' || 
          $route.params.category == 'sand-gravel-tax' ||
          $route.params.category == 'printing-publication-tax'"
        no-gutters>
        <v-col cols="12">
          <ManagePayerBusinesses />
        </v-col>

        <v-col cols="12" v-if="$route.params.category == 'sand-gravel-tax'">
          <v-row no-gutters>
            <v-col cols="12" class="mt-2">
              <ManageSandGravelRate />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row
        class="mt-2"
        v-else-if="$route.params.category == 'professional-tax'"
        no-gutters>
        <v-col cols="12" class="mt-2">
          <ManagePayerProfessions />
        </v-col>
      </v-row>

      <v-row 
        v-else-if="$route.params.category == 'transfer-tax'"
        no-gutters>
        <v-col>
          
        </v-col>
      </v-row>

      <v-row 
        class="mt-2"
        v-else-if="
        $route.params.category == 'gymnasium-rental' ||
        $route.params.category == 'heavy-equipment-rental' ||
        $route.params.category == 'space-lot-rental'"
        no-gutters>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col 
              cols="12" 
              class="pr-0 pr-sm-0 pr-md-0 pr-lg-2 pb-2 pb-sm-2 pb-md-2 pb-lg-0">
              <ManageGymnasiumRate v-if="$route.params.category == 'gymnasium-rental'" />
              <ManageHeavyEquipmentRate v-else-if="$route.params.category == 'heavy-equipment-rental'" />
              <ManageSpaceLotRentalRate v-else-if="$route.params.category == 'space-lot-rental'" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>


      <v-row
        class="mt-2"  
        v-else-if="$route.params.category == 'accountable-forms'"
        no-gutters>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="12" class="mb-2">
              <v-sheet
                class="pa-0 transparent">
                <h4 class="mb-1 font-weight-medium main--text main--text primary--text">
                  📈 Official Accountable Forms
                </h4>
                <p class="text-caption font-weight-light mb-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo.
                </p>
                <v-select
                  v-model="selectedAccountables"
                  dense
                  outlined
                  hide-details
                  :items="$payer.accountableCategories"
                  item-text="desc"
                  item-value="desc"
                  label="Categories"
                  placeholder="Description"
                  class="px-1 mb-2"></v-select>
              </v-sheet>
            </v-col>
            <v-col 
              cols="12" 
              sm="12" 
              md="12"
              lg="6"
              class="pr-0 pr-sm-0 pr-md-0 pr-lg-2 pb-2 pb-sm-2 pb-md-2 pb-lg-0">
              <ManageAccountableForm 
                :selectedAccountables="selectedAccountables"
                v-on:updateAccountables="onAccountablesUpdated" />
            </v-col>
            <v-col>
              <PurchaseAccountableForm :selectedAccountables="selectedAccountables" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="my-2">
          <div class="py-2">
            <h4 class="font-weight-medium main--text primary--text text-body-1">🧾 Ready to Pay</h4>
            <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditat.
            </p>
          </div>
          <div class="payable">
            <ManagePayableSets />
          </div>
        </v-col>
      </v-row>
    </v-col>

  </v-row>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import AddNewPayerVehicle from './actions/modal/AddNewPayerVehicle.vue';
import PurchaseAccountableForm from './actions/PurchaseAccountableForm.vue';

import ManagePayerVehicle from './manage/ManagePayerVehicle.vue';
import ManagePayerBusinesses from './manage/ManagePayerBusinesses.vue';
import ManagePayerProfessions from './manage/ManagePayerProfessions.vue';
import ManageAccountableForm from './manage/ManageAccountableForm.vue';

import ManageGymnasiumRate from './manage/rentals/ManageGymnasiumRate.vue';
import ManageHeavyEquipmentRate from './manage/rentals/ManageHeavyEquipmentRate.vue';
import ManageSpaceLotRentalRate from './manage/rentals/ManageSpaceLotRentalRate.vue';
import ManageSandGravelRate from './manage/ManageSandGravelRate.vue';
import ManagePayableSets from './manage/ManagePayableSets.vue';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component({
  components: {
    AddNewPayerVehicle,
    PurchaseAccountableForm,
    
    ManagePayerVehicle,
    ManagePayerBusinesses,
    ManagePayerProfessions,
    ManageAccountableForm,

    ManageGymnasiumRate,
    ManageHeavyEquipmentRate,
    ManageSpaceLotRentalRate,

    ManageSandGravelRate,

    ManagePayableSets
  }
})
export default class TaxpayerStatusBoard extends Mixins(TaxpayerServiceMixin) {
  public selectedAccountables = null;

  public onAccountableFormsUpdate() {
    console.log();
  }

  public onAccountablesUpdated() {
    if (this.$accountableCategories.length > 0)
      this.selectedAccountables = this.$accountableCategories[0].desc ?? '';
  }

  get $accountableCategories(): _object[] {
    return this.$payer.accountableCategories ?? [];
  }
}
</script>

<style scoped>
.payable {
  overflow: auto;
}
</style>
