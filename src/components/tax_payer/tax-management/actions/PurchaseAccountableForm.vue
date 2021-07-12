<template>
  <v-sheet
    elevation="2"
    class="pa-0 rounded-lg">
    <div class="mx-3 pt-2">
      <h4 class="font-weight-medium main--text primary--text text-body-1">Purchase Accountable Form</h4>
      <p class="font-weight-light text-caption pa-0 ma-0 mt-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam qui, laborum cupiditat.
      </p>
    </div>
    <v-form
      ref="form"
      class="pa-3"
      @submit.prevent="onPayerPurchaseAF">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="12" class="mb-2">
              <v-select
                dense
                v-model="selectedId"
                :items="$accountableForms.forms"
                item-text="type"
                item-value="type"
                :error="errors.category ? true : false"
                id="category"
                outlined
                hide-details
                label="Accountable Form"></v-select>
            </v-col>
            <v-col cols="6" class="pr-2">
              <v-text-field
                dense
                hide-details
                outlined
                name="amount"
                readonly
                prefix="₱"
                :value="($selected.price * quantity + ($selected.price * quantity * $accountableForms.mark_up_rate)).toFixed(2)"
                label="Amount"
                class="disabled"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="quantity"
                dense
                hide-details
                outlined
                name="quantity"
                :error="errors.quantity ? true : false"
                type="number"
                value="1"
                min="1"
                label="Quantity"></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="text-caption font-weight-medium my-0 mt-1"
                 v-if="$accountableForms">{{ note }}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-2">
          <UploadDocumentField :errors="errors" v-on:removeFileError="errors.docs = undefined" />
        </v-col>
        <v-col cols="12">
          <v-btn
            depressed
            class="main primary mt-2"
            width="100%"
            type="submit">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import TaxpayerServiceMixin from '@/services/payer.service.ts';

import UploadDocumentField from './docs/UploadDocument.vue';

@Component({
  components: {
    UploadDocumentField
  }
})
export default class PurchaseAccountableForm extends Mixins(TaxpayerServiceMixin) {
  @Prop() public readonly selectedAccountables!: string;
  public errors: _object = {};

  public quantity = 1;
  public selectedId = null;
  public selected = 0;

  get $selected(): _object {
    return this.$accountableForms.forms.find((el: _object) => el.type === this.selectedId) ?? {
      price: 0
    };
  }

  get $selectedCategory() {
    const accountableForms = this.$accountableCategories.find((elem: _object) => elem.desc === this.selectedAccountables) ?? {};

    return accountableForms;
  }

  get $accountableForms() {
    return this.$selectedCategory.rates ? this.$selectedCategory.rates : {
      mark_up_rate: 0,
      forms: []
    };
  }

  get $accountableCategories(): _object {
    return this.$payer.accountableCategories ?? [];
  }

  public async onPayerPurchaseAF(e: Event) {
    

    const data = new FormData(e.target as HTMLFormElement);
    
    if (this.selectedId)
      data.set('category', JSON.stringify({
        mark_up_rate: this.$accountableForms.mark_up_rate,
        form: this.$selected
      }));

    try {
      await this.uploadPayerDocuments(data);
      (this.$refs.form as HTMLFormElement).reset();
    } catch(error) {
      this.errors = error.errors;
    }
    
  }

  get note() {
    const rate = this.$accountableForms.mark_up_rate;
    return `Note: An additional ${ (rate*100).toFixed(0) + '%' } mark-up value will be added to the total amount.`
  }
}
</script>
