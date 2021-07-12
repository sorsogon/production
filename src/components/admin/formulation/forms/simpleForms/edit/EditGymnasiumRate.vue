<template>
  <v-dialog 
    v-model="dialogState"
    max-width="360">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        v-bind="attrs"
        v-on="on"
        small
        color="primary">
        <v-icon class="mr-1">mdi-plus</v-icon>
        Edit Rate
      </v-btn>
    </template>
    <v-card>
      <v-row no-gutters>
        <v-col cols="12" class="pa-3">
          <h4 class="font-weight-medium main--text primary--text text-body-1 mb-1 d-flex align-center">
            <v-icon class="mr-1 text-h5 main--text primary--text">mdi-table-edit</v-icon>
            Edit Rate
          </h4>
          <p class="text-caption font-weight-light mb-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
            harum nesciunt.
          </p>
        </v-col>

        <v-col cols="12" class="px-3 pb-1">
          <v-text-field
            dense
            hide-details
            outlined
            v-model="rules.activity"
            label="Activity"></v-text-field>
        </v-col>

        <v-col cols="6" class="px-3 pr-1 pb-1">
          <v-text-field
            dense
            hide-details
            outlined
            prefix="₱"
            v-model="rules.rates.with_ac"
            placeholder="Rate/Hr"
            label="with aircon"></v-text-field>
        </v-col>
        <v-col cols="6" class="px-3 pl-0">
          <v-text-field
            dense
            hide-details
            outlined
            prefix="₱"
            placeholder="Rate/Hr"
            v-model="rules.rates.wout_ac"
            label="without aircon"></v-text-field>
        </v-col>
        
        <v-col cols="12" class="pa-2 pt-3">
          <DeleteGymnasiumRateDialog :item="rules" v-on:deleteItem="onDeleteRate" />
          <v-btn
            text
            color="success"
            class="float-right"
            @click="dialogState = false">
            Done
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service.ts';

import DeleteGymnasiumRateDialog from '../delete/DeleteGymnasiumRateDialog.vue';

@Component({
  components: {
    DeleteGymnasiumRateDialog
  }
})
export default class EditGymnasiumRate extends Mixins(AdminServiceMixin) {
  @Prop() public readonly rules!: _object;
  public dialogState = false;

  public async onDeleteRate() {
    this.$ruleset.rates.rates = this.$ruleset.rates.rates.filter((el: _object) => el.activity !== this.rules.activity);

    console.log(1);
    this.dialogState = false;
  }
}
</script>
