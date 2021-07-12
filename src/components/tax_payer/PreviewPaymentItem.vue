<template>
  <v-sheet class="pa-0 transparent">
    <v-row no-gutters>
      <v-col>
        <v-card
          width="100%"
          rounded="md"
          elevation="2"
          class="pa-0 ml-0 mr-2">
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
            </v-col>
          </v-row>

          <v-row no-gutters class="pa-3 pb-2 pt-0 px-3">
            <v-col cols="12">
              <v-alert 
                width="100%"
                border="left"
                color="primary"
                outlined
                dense
                class="my-0">
                <div class="d-flex align-center">
                  <strong class="font-weight-medium text-subtitle-2 float-left">Official Receipt No.</strong>
                  <v-spacer></v-spacer>
                  <p class="ma-0 float-right text-subtitle-1 font-weight-medium" v-if="item.or_number">{{ item.or_number }}</p>
                  <span v-else class="font-weight-light text-caption">
                    In Progress
                    <v-progress-circular
                      class="ml-2"
                      size="24"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </span>
                </div>
              </v-alert>
            </v-col>
          </v-row>

          <v-sheet
            :elevation="$vuetify.theme.dark ? 1 : ''"
            :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
            class="mx-3 pa-2 px-3 rounded-lg d-flex align-center grey--text">
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
            </v-row>
          </v-sheet>

          <v-row no-gutters class="px-3 mt-2">
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-medium secondary--text darken-2 text-caption float-left">Payment Summary: </strong>
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
                class="pa-2 d-flex align-center mt-2 rounded-lg">
                <strong class="darken-4 font-weight-medium text-subtitle-2 float-left pa-0">Total Due</strong>
                <v-spacer></v-spacer>
                <p 
                  v-html="$root.formatCurrency(item.amount)"
                  class="ma-0 float-right main--text pa-0 primary--text font-weight-medium">
                </p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

import PayableMiscContent from './tax-management/manage/payables/PayableMiscContent.vue';
import PayableRentalsContent from './tax-management/manage/payables/PayableRentalsContent.vue';
import PayableTaxesContent from './tax-management/manage/payables/PayableTaxesContent.vue';
import SurchargeInterestTotal from './tax-management/manage/payables/SurchargeInterestTotal.vue';
import FeesAndChargesTotal from './tax-management/manage/payables/FeesAndChargesTotal.vue';
import TooltipUserProfile from '@/components/admin/TooltipUserProfile.vue';

@Component({
  components: {
    PayableMiscContent,
    PayableRentalsContent,
    PayableTaxesContent,

    SurchargeInterestTotal,
    FeesAndChargesTotal,

    TooltipUserProfile
  }
})
export default class PreviewPaymentItem extends Mixins(TaxpayerServiceMixin) {
  @Prop({ required: true }) public readonly item!: _object;
}
</script>
