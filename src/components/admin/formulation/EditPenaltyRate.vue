<template>
  <v-dialog
    v-model="editorState"
    persistent
    max-width="360">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        small
        depressed
        color="primary py-1">
        <v-icon>mdi-pencil</v-icon>  
        Edit Rate
      </v-btn>
    </template>
    <v-card>
      <v-form
        ref="form"
        @submit.prevent="onPenaltySave">
        <v-row no-gutters>
          <v-col cols="12" class="pa-3">
            <h4 class="font-weight-medium main--text primary--text text-body-1 mb-1 d-flex align-center">
              <v-icon class="mr-1 text-h5 main--text primary--text">mdi-table-edit</v-icon>
              Edit Penalty Rate
            </h4>
            <p class="text-caption font-weight-light mb-0">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
              harum nesciunt.
            </p>
          </v-col>

          <v-col cols="12" class="pa-2 pt-1 pb-1 px-4">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              flat
              hint="Late payment shall be imposed with additional % surcharge."
              placeholder="(e.g. 0.2)"
              v-model="$penalty.surcharge"
              label="(%) Surcharge Rate"></v-text-field>
          </v-col>

          <v-col cols="6" class="pa-2 pt-1 pr-0 pb-0 pl-4">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              flat
              hint="Late payment shall be imposed with additional % interest. Maximum of %."
              placeholder="(e.g. 0.02)"
              v-model="$penalty.interest"
              label="(%) Interest Rate"></v-text-field>
          </v-col>

          <v-col cols="6" class="pa-2 pt-1 pl-1 pb-0 pr-4">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              flat
              placeholder="(e.g. 0.72)"
              v-model="$penalty.max_interest"
              label="(%) Max Interest"></v-text-field>
          </v-col>

          <v-col cols="12" class="pa-2 px-3">
            <DeletePenalty v-on:deleteItem="onDeleteItem" />
            <v-btn
              v-if="!$penalty.verified_at"
              color="success"
              class="mr-1"
              @click="onVerifyPenalty"
              text>
              Verify
            </v-btn>
            <v-btn
              text
              class="float-right"
              type="submit"
              color="primary">
              Save
            </v-btn>
            <v-btn
              text
              class="float-right"
              color="error"
              @click="onDiscardPenalty">
              Discard
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';
import DeletePenalty from './DeletePenalty.vue';

@Component({
  components: {
    DeletePenalty
  }
})
export default class EditPenaltyRate extends Mixins(AdminServiceMixin) {
  @Prop({ required: true }) public readonly penalty!: _object;
  public errors: _object = {};
  public editorState = false;

  @Watch('editorState', { immediate: true })
  onPenaltyChange() {
    this.setPenaltyToEdit(this.penalty);
  }

  public async onPenaltySave() {
    try {
      await this.updatePenalty();

      this.$store.commit('snackBar/toggle', {
        message: `Updated ${ this.$penalty.desc }!`,
        color: 'success',
        toggle: true
      });
      
      this.editorState = false;
      this.resetPenalty();
    } catch(error) {
      this.errors = error.errors;
    }
  }

  public onDiscardPenalty() {
    this.editorState = false;
    this.getAllPenalties();
    this.resetPenalty();
  }
  
  public async onDeleteItem(item: _object) {
    try {
      await this.deletePenalty(this.$penalty.id);
      this.editorState = false;
    } catch(error) {
      console.log(error);
    }
  }

  public async onVerifyPenalty() {
    try {
      await this.verifyPenalty();

      this.$store.commit('snackBar/toggle', {
        message: `Verified ${ this.$ruleset.desc }`,
        color: 'success',
        toggle: true
      });
      
    } catch(error) {
      console.log(error);
    }
  }
}
</script>
