<template>
  <v-sheet
    height="100%"
    elevation="2"
    class="pa-0 rounded-lg">
    <div class="mx-3 pt-2">
      <h4 class="font-weight-medium main--text primary--text text-body-1">
        <v-img
          class="mr-2 float-left"
          max-width="24"
          src="@/assets/images/png/iconpack/folder-1486.png"></v-img>
        Accountable Forms
      </h4>
      <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditat.
      </p>
    </div>

    <v-row no-gutters class="px-2">
      <v-col cols="12">
        <v-btn 
          @click="prevPage"
          icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn 
          @click="nextPage"
          class="float-right"
          icon>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters class="px-3">
      <v-col>
        <strong class="text-subtitle-2 font-weight-medium main--text primary--text">Name</strong>
      </v-col>
      <v-col>
        <strong class="text-subtitle-2 font-weight-medium main--text primary--text float-right">Price</strong>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-list
      dense
      class="pa-0 transparent">
      <v-list-item-group>
        <v-list-item 
          :key="item.id"
          v-for="(item, i) in $accountableForms.forms.slice(prev, next)"
          class="d-flex pa-0">
          <v-tooltip 
            color="primary"
            offset-overflow
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-row 
                v-bind="attrs"
                v-on="on"
                no-gutters>
                <v-col cols="12" class="d-flex pa-3 align-center">
                  <strong class="font-weight-light text-subtitle-2">Accountable Form {{ item.type }}</strong>
                  <v-spacer></v-spacer>
                  <strong class="font-weight-bold float-right text-subtitle-2" v-html="$root.formatCurrency(item.price)"></strong>
                </v-col>
                <v-col cols="12" v-if="i != $accountableForms.forms.slice(prev, next).length-1">
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </template>
            <span>{{ item.desc }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import TaxpayerServiceMixin from '@/services/payer.service.ts';

@Component
export default class ManageAccountableForm extends Mixins(TaxpayerServiceMixin) {
  @Prop() public readonly selectedAccountables!: string;

  public selected = 0;
  public prev = 0;
  public next = 4;

  public prevPage() {
    this.prev -= 4;
    this.next -= 4;

    if (this.prev <= 0) this.nextPage();
  }

  public nextPage() {
    this.prev += 4;
    this.next += 4;

    if (this.$accountableForms.forms.slice(this.prev, this.next).length == 0) this.prevPage();
  }

  public async created() {
    await this.getAllAccountableFormCategory();

    this.$emit('updateAccountables');
  }

  get $accountableForms() {
    const accountableForms = this.$accountableCategories.find(elem => elem.desc === this.selectedAccountables) ?? {};
    console.log(accountableForms);
    return accountableForms.rates ? accountableForms.rates : {
      mark_up_rate: 0,
      forms: []
    };
  }

  get $accountableCategories() {
    return this.$payer.accountableCategories ?? [];
  }
}
</script>
