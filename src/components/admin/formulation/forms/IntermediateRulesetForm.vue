<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col
              cols="4">
              <h4 class="font-weight-medium text-subtitle-2 grey--text darken">Key</h4>
            </v-col>
            <v-col
              cols="8">
              <h4 class="font-weight-medium text-subtitle-2 grey--text darken">Value</h4>
            </v-col>
          </v-row>
        </v-col>
        
        <v-col cols="12">
          <v-divider class="my-1"></v-divider>
          <v-row no-gutters>
            <v-col cols="12" class="mb-1">
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="pr-1">
                  <v-text-field
                    class="font-weight-light"
                    flat
                    dense
                    hide-details
                    outlined
                    solo
                    label="Name"></v-text-field>
                </v-col>
                <v-col
                  cols="8">
                  <v-text-field
                    flat
                    dense
                    hide-details
                    outlined
                    solo
                    label="Value"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mb-1">
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="pr-1">
                  <v-text-field
                    class="font-weight-light"
                    flat
                    dense
                    hide-details
                    outlined
                    solo
                    label="Name"></v-text-field>
                </v-col>
                <v-col
                  cols="8">
                  <v-text-field
                    flat
                    dense
                    hide-details
                    outlined
                    solo
                    label="Value"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="mt-4">
      <v-menu 
        offset-y
        bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            color="main primary"
            v-bind="attrs"
            v-on="on"
            class="float-right">
            <v-icon>mdi-plus</v-icon>
            Add Property
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group>
            <v-list-item>
              <v-img
                class="mr-2"
                max-width="28"
                src="@/assets/images/png/iconpack/taxes.png"></v-img>
              <span class="font-weight-medium float-right text-subtitle-2">Rate Prop</span>
            </v-list-item>
            <v-list-item>
              <v-img
                class="mr-2"
                max-width="28"
                src="@/assets/images/png/iconpack/blocks.png"></v-img>
              <span class="font-weight-medium float-right text-subtitle-2">String Prop</span>
            </v-list-item>
            <v-list-item>
              <v-img
                class="mr-2"
                max-width="28"
                src="@/assets/images/png/iconpack/storage-box.png"></v-img>
              <span class="font-weight-medium float-right text-subtitle-2">Collection Prop</span>
            </v-list-item>
            <v-list-item>
              <v-img
                class="mr-2"
                max-width="28"
                src="@/assets/images/png/iconpack/edit.png"></v-img>
              <span class="font-weight-medium float-right text-subtitle-2">Object Prop</span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import AdminServiceMixin from '@/services/admin.service';

@Component
export default class IntermediateRulesetForm extends Mixins(AdminServiceMixin) {
  @Prop({ required: true }) public readonly ruleset!: _object;
}
</script>

