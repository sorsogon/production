<template>
  <v-row 
    class="pa-2 pt-0 px-4"
    no-gutters>

    
    <v-col cols="12" v-if="item._for === 'accountable-forms'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in item.data.forms"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in item.data.forms"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Accountable Form Type</strong>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-regular">{{ data.category.form.type }}</p>
                  </span>
                </template>
                <span>
                  {{ data.category.form.desc }}
                </span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Total Amount
              </strong>
              <v-spacer></v-spacer>
              
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-medium">
                      <span v-html="$root.formatCurrency(data.amount*1)"></span>
                    </p>
                  </span>
                </template>
                <span>
                  Quantity * Price
                </span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                ({{ (data.category.mark_up_rate*100).toFixed(0) + '%' }}) Mark-up Value
              </strong>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-medium">
                      <span v-html="$root.formatCurrency(data.category.mark_up_rate*data.amount)"></span>
                    </p>
                  </span>
                </template>
                <span>
                  A {{ (data.category.mark_up_rate*100).toFixed(0) + '%' }} Mark-up value shall be 
                  added to the original acquisition cost.
                </span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>

    <v-col cols="12" class="mt-1" v-if="item.data.forms.length > 1">
      <v-btn 
        :color="$vuetify.theme.dark ? '' : 'primary'"
        class="float-right"
        @click="dataTabState++"
        depressed
        small>
        Next <v-icon class="ml-1" small>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
    
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';


@Component({
  components: {}
})
export default class PayableTaxesContent extends Vue {
  @Prop({ required: true }) public readonly item!: _object;
  public dataTabState = 0;
}
</script>