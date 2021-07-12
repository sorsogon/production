<template>
  <v-sheet elevation="2" rounded="lg" class="pb-0">
    <div class="pa-3 pt-2">
      <h4 class="mb-2 font-weight-medium main--text primary--text text-body-1">
        🖈 Waiting for Verification
      </h4>
      <p class="font-weight-light text-caption mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
        aspernatur.
      </p>
    </div>

    <v-list
      v-if="$pendingPaymentData.length > 0"
      class="transparent pa-0 pb-2"
      dense
    >
      <v-divider class="mb-2"></v-divider>
      <v-list-item
        v-for="(item, i) in $pendingPaymentData"
        :key="item.id"
        class="d-flex pa-0"
      >
        <v-row no-gutters class="pa-0 align-center">
          <v-col cols="3" class="flex-grow-0 pr-1 pl-2">
            <v-img
              v-if="item.status == 'pending'"
              max-width="55"
              src="@/assets/images/png/iconpack/search-1504.png"
            ></v-img>
            <v-img
              v-else-if="item.status == 'denied' || !item.status"
              max-width="55"
              src="@/assets/images/png/iconpack/convert-3220.png"
            ></v-img>
          </v-col>

          <v-col cols="9" class="pr-2">
            <v-row no-gutters>
              <v-col cols="12">
                <v-sheet class="pa-0 transparent">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <strong
                        class="font-weight-light text-subtitle-2 float-left">Status</strong>
                      <p
                        class="ma-0 float-right text-subtitle-2 font-weight-medium">
                        <v-chip
                          small
                          :color="
                            item.status == 'pending' ? 'warning' : 'error'
                          "
                          class="text-capitalize">
                          {{ item.status }}
                        </v-chip>
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <strong
                        class="font-weight-light text-subtitle-2 float-left"
                        >Uploaded on</strong
                      >
                      <p
                        class="ma-0 float-right text-subtitle-2 font-weight-medium"
                      >
                        {{ new Date(item.updated_at) | formatDateString }}
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <strong
                        class="font-weight-light text-subtitle-2 float-left"
                        >Expired At</strong
                      >
                      <p
                        class="ma-0 float-right text-subtitle-2 font-weight-medium"
                      >
                        {{ new Date(item.expired_at) | formatDateString }}
                      </p>
                    </v-col>
                  </v-row>
                </v-sheet>
                <small class="font-weight-light mt-2 text-caption pa-0">
                </small>
              </v-col>

              <v-col cols="12" class="flex-grow-1 d-flex justify-end">
                <v-btn class="float-right" icon>
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn class="float-right" color="error" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="px-0">
            <v-divider
              v-show="i != $pendingPaymentData.length - 1"
              class="my-2"
            ></v-divider>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-sheet v-else class="pa-4 mt-2 text-center transparent">
      <v-img
        class="mx-auto"
        max-width="144"
        src="@/assets/images/png/iconpack/box.png"
      ></v-img>
      <h4 class="mt-3 font-weight-light text-subtitle-1">No data available.</h4>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from "vue-property-decorator";

import TaxpayerServiceMixin from "@/services/payer.service.ts";

@Component
export default class PendingPaymentWidget extends Mixins(TaxpayerServiceMixin) {
  @Watch("$route")
  public async updatePendingPaymentData() {
    await this.getAllPendingPayments();
  }

  public async mounted() {
    await this.updatePendingPaymentData();

    console.log(this.$pendingPaymentData);
  }

  get $pendingPaymentData() {
    return this.$payer.pendingPayments ?? [];
  }
}
</script>

<style lang="postcss" scoped></style>
