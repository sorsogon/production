<template>
  <v-row 
    class="pa-2 pt-0 px-5"
    no-gutters>

    <v-col cols="12" v-if="item.for === 'professional-tax'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Profession</strong>
              <v-spacer></v-spacer>
              
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p
                      v-bind="attrs"
                      v-on="on"
                      class="ma-0 float-right pa-0 ml-6 text-truncate font-weight-medium text-capitalize">{{ data.category.title }}</p>
                  </span>
                </template>
                <span class="text-capitalize">{{ data.category.title }}</span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Amount
              </strong>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-regular">
                      <span v-html="$root.formatCurrency(data.amount*1)"></span>
                    </p>
                  </span>
                </template>
                <span class="text-capitalize">{{ data.category.desc }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>



    <v-col cols="12" v-else-if="item.for === 'annual-fixed-tax'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Vehicle Plate #</strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">{{ data.vehicle.plate_number }}</p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Amount
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
                <span class="text-capitalize">{{ data.category.type }} Provincial Government Rate</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>



    <v-col cols="12" v-else-if="item.for === 'amusement-tax'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Gross Annual Receipt</strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">
                <span v-html="$root.formatCurrency(data.ga_receipt_value)"></span>
              </p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                ({{ (data.category.province*100).toFixed(1) + '%' }}) Amusement Tax
              </strong>
              <v-spacer></v-spacer>
              <v-tooltip 
                max-width="400"
                bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-medium">
                      <span v-html="$root.formatCurrency(data.ga_receipt_value*data.category.province)"></span>
                    </p>
                  </span>
                </template>
                <span>
                  {{ (data.category.province*100).toFixed(1) }}%  for  the  Municipality 
                  where the amusement place is situated and {{ (data.category.municipality*100).toFixed(1) }}% 
                  for the Province.
                </span>
              </v-tooltip>
              
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>


    <v-col cols="12" 
      v-else-if="
      item.for === 'franchise-tax' ||
      item.for === 'printing-publication-tax' ||
      item.for === 'transfer-tax'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in combinedTaxes(item)"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in combinedTaxes(item)"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                <span v-if="item.for === 'transfer-tax'">Fair Market Value</span>
                <span v-else>Gross Annual Receipt</span>
              </strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">
                <span v-html="$root.formatCurrency(data.ga_receipt_value ? data.ga_receipt_value : data.fair_market_value)"></span>
              </p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                ({{ (data.category.rate*100).toFixed(1) + '%' }})
                <span v-if="item.for === 'franchise-tax'">Franchise Tax</span>
                <span v-if="item.for === 'printing-publication-tax'">Print & Pub. Tax</span>
                <span v-if="item.for === 'amusement-tax'">Amusement Tax</span>
                <span v-if="item.for === 'transfer-tax'">Transfer Tax</span>
              </strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">
                <span 
                  v-if="item.for === 'transfer-tax'"
                  v-html="$root.formatCurrency(data.fair_market_value*data.category.rate)"></span>
                <span 
                  v-else
                  v-html="$root.formatCurrency(data.ga_receipt_value*data.category.rate)"></span>
              </p>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>


    <v-col cols="12" v-else-if="item.for === 'sand-gravel-tax'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Material</strong>
              <v-spacer></v-spacer>
              <v-tooltip max-width="400" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">{{ data.category.fair_market_value.material }}</p>
                  </span>
                </template>
                <span>
                  {{ data.category.desc }}
                </span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">(cu.m) Weight</strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">{{ data.weight }}</p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                ({{ (data.category.rate*100).toFixed(0) + '%' }}) Fair Market Value 
              </strong>
              <v-spacer></v-spacer>
              <v-tooltip max-width="400" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">
                      <span v-html="$root.formatCurrency(data.category.rate*data.category.fair_market_value.value)"></span>
                    </p>
                  </span>
                </template>
                <span>
                  {{ (data.category.rate*100).toFixed(0) + '%' }} of the market value as determined by the Provincial Quarry Technical Working Committee will be added to the total amount.
                </span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Amount
              </strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-regular">
                <span v-html="$root.formatCurrency(data.amount)"></span>
              </p>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>

    <v-col cols="12" v-else-if="item.for === 'property-tax'">
      <v-tabs
        class="d-none"
        v-model="dataTabState">
        <v-tab 
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          {{ index }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="dataTabState">
        <v-tab-item
          v-for="(data, index) in item.data.tax_due"
          :key="index">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Assessed Value</strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium text-capitalize">
                <span v-html="$root.formatCurrency(data.assessed_value)"></span>
              </p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                ({{ (data.category.basic*100).toFixed(1) + '%' }}) Property Tax
              </strong>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-regular">
                      <span v-html="$root.formatCurrency(data.category.sef*data.assessed_value)"></span>
                    </p>
                  </span>
                </template>
                <span>Basic Property Tax Rate</span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
                <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                  ({{ (data.category.basic*100).toFixed(1) + '%' }}) Special Edu. Fund
                </strong>
                <v-spacer></v-spacer>
                <v-tooltip max-width="400" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-on="on" v-bind="attrs">
                      <p class="ma-0 float-right pa-0 font-weight-regular">
                        <span v-html="$root.formatCurrency(data.category.sef*data.assessed_value)"></span>
                      </p>
                    </span>
                  </template>
                  <span>An additional ({{ (data.category.sef*100).toFixed(1) + '%' }}) special educational fund will be added to the total amount.</span>
                </v-tooltip>
              </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>

    <v-col cols="12" class="mt-1" v-if="count(item)">
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

@Component
export default class PayableTaxesContent extends Vue {
  @Prop({ required: true }) public readonly item!: _object;
  public dataTabState = 0;

  public combinedTaxes(item: _object) {
    return item.data.tax_due;
  }
  
  public count(item: _object) {
    return item.data.tax_due.length > 1;
  }
}
</script>
