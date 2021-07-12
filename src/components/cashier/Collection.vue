<template lang="html">
  <v-container class="pa-0">
    <h4 class="text-h6 font-weight-regular mb-1">
      <v-img 
        class="float-left mr-2"
        max-width="32" 
        src="@/assets/images/png/iconpack/storage-box.png"></v-img>
      Payment Collections
    </h4>
    <p class="text-subtitle-2 font-weight-light">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
      harum nesciunt nam reprehenderit.
    </p>

    <v-row no-gutters>

      <!-- Denomination recorder -->
      <v-col cols="12" v-if="$onsite.length > 0">
        <v-expansion-panels
          v-model="denominationPanel">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h4 class="font-weight-regular text-body-1 main--text primary--text">
                <v-icon class="mr-1 main--text primary--text">mdi-bank</v-icon>
                Payment Denomination
              </h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0 ma-0">
              <DenominationRecorder />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col 
        class="mt-3"
        cols="12">
        <h4 class="font-weight-medium text-body-1 mb-1 main--text primary--text">
          <v-icon class="mr-1 main--text primary--text">mdi-timelapse</v-icon> Daily Collections
        </h4>
        <p class="text-subtitle-2 font-weight-light">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

        <v-sheet
          width="100%"
          color="transparent"
          class="py-2 d-inline-flex status-scroller">
          <v-dialog
            v-for="(item, key) in $dailyCollections"
            :key="key" 
            max-width="400">
            <template v-slot:activator="{ on, attrs }">
              <v-card
                v-bind="attrs"
                v-on="on"
                width="250"
                min-width="250"
                min-height="120"
                rounded="md"
                class="pa-0 px-3 py-2 ml-1 mr-1">
                <v-row no-gutters class="flex-column">
                  <v-col cols="12" class="d-flex">
                    <h4 class="font-weight-medium text-subtitle-2">OR#</h4>
                    <v-spacer></v-spacer>
                    <strong>{{ item.or_number }}</strong>
                  </v-col>
                  <v-col cols="12" class="d-flex">
                    <h4 class="font-weight-medium text-subtitle-2">Payment</h4>
                    <v-spacer></v-spacer>
                    <v-chip 
                      small
                      :color="item.status === 'paid_online' ? 'primary' : 'secondary'">
                      <span v-if="item.status === 'paid_online'">Online</span>
                      <span v-else>Onsite</span>
                    </v-chip>
                  </v-col>
                  <v-col cols="12" class="d-flex">
                    <h4 class="font-weight-medium text-subtitle-2">Amount</h4>
                    <v-spacer></v-spacer>
                    <strong>
                      <span v-html="$root.formatCurrency(item.amount)"></span>
                    </strong>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <h4 class="font-weight-medium text-subtitle-2 pt-2 primary--text text-capitalize">
                      {{ item.for.replace('-', ' ') }}
                    </h4>
                  </v-col>
                </v-row>
              </v-card>
            </template>
            <v-row no-gutters="">
              <v-col cols="12">
                <PreviewPaymentItem :item="item" />
              </v-col>
              <v-col cols="12"></v-col>
            </v-row>
          </v-dialog>
        </v-sheet>
      </v-col>


      <v-col cols="12" class="mt-3">
        <h4 class="font-weight-medium text-body-1 mb-1 main--text primary--text">
            <v-icon class="mr-1 main--text primary--text">mdi-timelapse</v-icon> Record Payment
          </h4>
        <p class="font-weight-light text-subtitle-2 my-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse corporis mollitia recusandae obcaecati, laboriosam iste.
        </p>

        <v-row no-gutters>
          <v-col cols="12">
            <v-sheet 
              elevation="2"
              rounded="lg"
              no-gutters>
              <v-data-table :headers="headers" :items="$cashier.payments">

                <template v-slot:item.for="{ item }">
                  <span class="text-capitalize">{{ item.for.replace('-', ' ')  }}</span>
                </template>

                <template v-slot:item.issued_by="{ item }">
                  <v-menu 
                    open-on-hover
                    bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip 
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="success">{{ item.issued_by.name }}</v-chip>
                    </template>
                    <TooltipUserProfile :user="item.issued_by" />
                  </v-menu>
                </template>

                <template v-slot:item.amount="{ item }">
                  <span v-html="$root.formatCurrency(item.amount)"></span>
                </template>
                
                <template v-slot:item.paid_at="{ item }">
                  <v-chip color="success" small>{{ new Date(item.paid_at) | formatDateString }}</v-chip>
                </template>

                <template v-slot:item.status="{ item }">
                  <v-chip 
                    small
                    :color="item.status === 'paid_online' ? 'primary' : 'secondary'">
                    <span v-if="item.status === 'paid_online'">Online</span>
                    <span v-else>Onsite</span>
                  </v-chip>
                </template>

                <template v-slot:item.action="{ item }">
                  <PaymentMiscInformation :payment="item" />
                </template>

              </v-data-table>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import CashierServiceMixin from '@/services/cashier.service.ts';

import DenominationRecorder from './components/DenominationRecorder.vue';
import PaymentMiscInformation from './components/PaymentMiscInformation.vue';
import PaymentInfoModal from './components/PaymentInfoModal.vue';
import PreviewPaymentItem from '@/components/tax_payer/PreviewPaymentItem.vue';

import TooltipUserProfile from '@/components/admin/TooltipUserProfile.vue';

@Component({
  components: {
    DenominationRecorder,
    PaymentMiscInformation,
    PaymentInfoModal,
    PreviewPaymentItem,
    TooltipUserProfile
  }
})
export default class Collection extends Mixins(CashierServiceMixin) {
  public denominationPanel = false;

  public async created() {
    await this.getAllPayments();
  }

  public headers = [
    { text: 'OR No.', align: 'start', sortable: true, value: 'or_number' },
    { text: 'Payment Type', align: 'start', sortable: true, value: 'for' },
    { text: 'Mode of Payment', align: 'start', sortable: true, value: 'status' },
    { text: 'Collection Officer', align: 'start', sortable: true, value: 'issued_by'  },
    { text: 'Amount', align: 'start', sortable: true, value: 'amount' },
    { text: 'Payment Date', align: 'start', sortable: true, value: 'paid_at' },
    { text: 'Action', align: 'start', sortable: true, value: 'action' }
  ];


  get $dailyCollections() {
    const today = new Date();

    return this.$cashier.payments?.filter((el: _object) => (new Date(el.paid_at) as any) - (new Date(today.toDateString()) as any) >= 0);
  }

  get $onsite() {
    return this.$cashier.payments?.filter((el: _object) => el.status === 'paid_onsite' && !el.denomination) ?? [];
  }

}
</script>

<style lang="postcss">
.status-scroller {
  overflow: auto;
  /* scrollbar-width: none;
  -ms-overflow-style: none; */
}

</style>