<template>
  <v-row 
    class="pa-2 pt-0 px-5"
    no-gutters>
    
    <v-col cols="12" v-if="item.for === 'gymnasium-rental'">
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
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Activity</strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-regular text-capitalize">{{ data.category.activity }}</p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Total Amount
              </strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-regular">
                <span v-html="$root.formatCurrency(data.amount*1)"></span>
              </p>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>



    <v-col cols="12" v-else-if="item.for === 'heavy-equipment-rental'">
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
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">Equipment Type</strong>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right ml-6 text-truncate pa-0 font-weight-regular">{{ data.category.type }}</p>
                  </span>
                </template>
                <span>
                  Heavy Equipment that shall be rented by the Provincial Government.
                </span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Total Amount
              </strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-regular">
                <span v-html="$root.formatCurrency(data.amount*1)"></span>
              </p>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>


    <v-col cols="12" v-else-if="item.for === 'space-lot-rental'">
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
            <v-col cols="12" class="mb-2">
              <strong class="font-weight-medium grey--text text-caption pa-0">
                Lot Description
              </strong>
              <v-spacer></v-spacer>
              <v-sheet 
                :color="$vuetify.theme.dark ? 'grey darken-3' : 'primary lighten-3'"
                class="pa-2 rounded-lg">
                <p class="ma-0 pa-0 text-caption font-weight-bold">{{ data.category.desc.search(/\./g) > 0 ? data.category.desc : data.category.desc + '.' }}</p>
              </v-sheet>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                (sq.m) Dimension
              </strong>
              <v-spacer></v-spacer>
              <p class="ma-0 float-right pa-0 font-weight-medium">{{ data.sqm }}</p>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <strong class="font-weight-regular text-subtitle-2 float-left pa-0">
                Total Amount
              </strong>
              <v-spacer></v-spacer>
              <v-tooltip
                bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-on="on" v-bind="attrs">
                    <p class="ma-0 float-right pa-0 font-weight-medium">
                      <span v-html="$root.formatCurrency(data.amount*1)"></span>
                    </p>
                  </span>
                </template>
                <span>Dimension * (Lot %)</span>
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

  public count(item: _object) {
    switch (item.for) {
    case 'heavy-equipment-rental':
      return item.data.heavy_equipments > 1;
    case 'space-lot-rental':
    case 'gymnasium-rental':
      return item.data.rental_spaces.length > 1;
    }
  }
}
</script>
