<template>
  <v-sheet 
    v-if="$readyToPay.length > 0"
    min-width="100%"
    class="d-inline-flex pa-1 payable transparent">
    <v-card
      width="300"
      rounded="md"
      elevation="2"
      class="pa-0 ml-0 mr-2"
      v-for="(item) in $readyToPay"
      :key="item.id">
      <v-row 
        class="pa-2 px-3 mb-2 pt-3"
        no-gutters>
        <v-col 
          cols="12"
          class="d-flex align-center">
          <span class="d-flex align-center">
            <v-img
              class="rounded-circle mr-2"
              max-width="40"
              max-height="40"
              :src="item.issued_by.avatar.length ? item.issued_by.avatar : '/images/default_profile_400x400.png'"></v-img>
            <div class="d-flex flex-column">
              <span class="font-weight-medium text-button text-caption grey--text">Verified By</span>
              <v-menu
                open-on-hover
                bottom
                offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs" class="font-weight-medium primary--text">{{ item.issued_by.email }}</span>
                </template>
                <TooltipUserProfile :user="item.issued_by" />
              </v-menu>
            </div>
          </span>
          <v-spacer></v-spacer>
          <v-menu
            offset-y
            left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                small
                class="text-capitalize font-weight-light float-left">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group>
                <v-list-item>
                  <v-icon color="error" class="mr-2">mdi-alert</v-icon>
                  Report Payment
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      
      <v-sheet
        :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
        class="mx-2 pa-1 px-3 rounded-lg d-flex align-center grey--text">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex align-center">
            <strong class="font-weight-light text-caption">Date Added</strong>
            <v-spacer></v-spacer>
            <p class="ma-0 float-right text-subtitle-2 font-weight-medium">{{ new Date(item.created_at) | formatDateString }}</p>
          </v-col>
          <v-col cols="12" class="d-flex align-center">
            <strong class="font-weight-light text-caption">Date Verified</strong>
            <v-spacer></v-spacer>
            <p class="ma-0 float-right text-subtitle-2 font-weight-medium">{{ new Date(item.updated_at) | formatDateString }}</p>
          </v-col>
          <v-col cols="12" class="d-flex align-center">
            <strong class="font-weight-light text-caption">Expires At</strong>
            <v-spacer></v-spacer>
            <p class="ma-0 float-right text-subtitle-2 font-weight-medium">{{ new Date(item.expired_at) | formatDateString }}</p>
          </v-col>
        </v-row>
      </v-sheet>

      <v-row no-gutters class="px-3 mt-2">
        <v-col cols="12" class="d-flex align-center">
          <strong class="font-weight-medium secondary--text darken-2 text-caption float-left">Payment Summary:</strong>
        </v-col>
      </v-row>
      
      <PayableMiscContent :item="item" v-if="item.for == 'misc'" />
      <PayableRentalsContent :item="item" v-else-if="item.for.search(/rental/g) > 0" />
      <PayableTaxesContent :item="item" v-else-if="item.for.search(/tax/g) > 0" />

      <SurchargeInterestTotal :item="item" />

      <FeesAndChargesTotal :item="item" />

      <v-divider></v-divider>

      <v-row no-gutters class="pt-0 px-2 pb-2">
        <v-col cols="12">
          <v-sheet
            class="px-2 d-flex align-center mt-2 rounded-lg">
            <strong class="darken-4 font-weight-medium text-subtitle-2 float-left pa-0">Total Due</strong>
            <v-spacer></v-spacer>
            <p 
              v-html="$root.formatCurrency(item.amount)"
              class="ma-0 float-right main--text pa-0 primary--text font-weight-medium">
            </p>
          </v-sheet>
        </v-col>
      </v-row>

      <v-sheet
        class="mt-2 mx-3 transparent d-flex align-center">
        <v-row no-gutters>
          <v-col v-if="isAccountableAvailable(item)">
            <v-tooltip
              max-width="300"
              bottom>

              <template v-slot:activator="{ on, attrs }">
                <v-alert
                  v-bind="attrs"
                  v-on="on"
                  class="mb-1"
                  type="error"
                  dense
                  hide-details
                  outlined>Service Unavailable</v-alert>
              </template>

              <span>{{ item.issued_by.name }} (Collection Officer) doesn't have an available AF-51 at the moment.</span>

            </v-tooltip>
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              depressed
              large
              color="primary"
              :disabled="isAccountableAvailable(item)"
              class="text-capitalize float-right mb-2"
              @click="onPayButtonClicked(item)">
              <v-img 
                max-width="26"
                class="mr-1"
                src="@/assets/images/png/iconpack/invoice.png"></v-img>
              Pay Now
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </v-sheet>
  <v-sheet
    v-else
    class="d-flex justify-center pa-1 payable transparent">
    <div class="mt-3 d-flex flex-column align-center">
      <v-img
        class="mb-2"
        max-width="144"
        src="@/assets/images/png/iconpack/box.png"></v-img>
      <span class="mb-2 text-subtitle-2 font-weight-light">
        There are currently no data available.
      </span>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

import PayableMiscContent from './payables/PayableMiscContent.vue';
import PayableRentalsContent from './payables/PayableRentalsContent.vue';
import PayableTaxesContent from './payables/PayableTaxesContent.vue';
import SurchargeInterestTotal from './payables/SurchargeInterestTotal.vue';
import FeesAndChargesTotal from './payables/FeesAndChargesTotal.vue';

import TooltipUserProfile from '@/components/admin/TooltipUserProfile.vue';

@Component({
  components: {
    PayableMiscContent,
    PayableRentalsContent,
    PayableTaxesContent,
    TooltipUserProfile,
    SurchargeInterestTotal,
    FeesAndChargesTotal
  }
})
export default class ManagePayableSets extends Mixins(TaxpayerServiceMixin) {
  public async mounted() {
    await this.getAllReadyToPay();
  }

  get $readyToPay() {
    return this.$payer.readyToPay ?? [];
  }

  public onPayButtonClicked(data: _object) {
    this.$store.commit('payer/updatePaymentProcess', data);
    this.$router.push({ path: `/d/taxpayer/payment/${ this.$route.params.category }/${ data.id }` });
  }

  public isAccountableAvailable(payment: _object) {
    let isNotAvailable = false;

    if (payment.accountables.length < 1) return true;

    for (const accountable of payment.accountables) {
      if (accountable.serial_number.end-accountable.current < 0) {
        isNotAvailable = true;
        break;
      }
    }

    return isNotAvailable;
  }
}
</script>

<style lang="postcss">
.payable {
  overflow-x: auto;
}
</style>
