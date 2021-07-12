<template>
  <v-dialog
    v-model="editorState"
    persistent
    max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        v-bind="attrs"
        v-on="on"
        color="main primary"
        class="float-right">
        <v-icon>mdi-plus</v-icon>
        Add Penalty Rate
      </v-btn>
    </template>
    <v-sheet class="pa-4 rounded-lg">
      <v-form 
        ref="form"
        @submit.prevent="onPenaltySave">
        <v-row no-gutters>
          <v-col cols="12">
            <h4 class="text-body-1 font-weight-medium mb-2 main--text primary--text">
              <v-img 
                class="float-left mr-2"
                max-width="24"
                src="@/assets/images/png/iconpack/to-do-list.png"></v-img>
              Add New Penalty Rate
            </h4>
            <p class="text-caption font-weight-light mb-0">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
              harum nesciunt.
            </p>
          </v-col>
          <v-col cols="12" class="mt-4 mt-3">
            <v-text-field
              dense
              prepend-inner-icon="mdi-message-text-outline"
              hide-details
              outlined
              :rules="descRules"
              required
              v-model="$penalty.desc"
              label="Description"
              name="desc"></v-text-field>
          </v-col>
          <v-col cols="12" class="mt-1">
            <v-textarea
              rows="2"
              dense
              outlined
              hide-details
              no-resize
              v-model="$penalty.note"
              name="note"
              placeholder="Write an important note about this penalty rate. (optional)"></v-textarea>
            <p class="font-weight-light my-0 text-caption">Note: <span class="font-weight-bold">Elit ad ut anim consectetur occaecat velit commodo.</span></p>
          </v-col>
          
          <v-col cols="4" class="pr-1 mt-2">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              flat
              hint="Late payment shall be imposed with additional % surcharge."
              placeholder="(e.g. 0.2)"
              v-model="$penalty.surcharge"
              name="surcharge"
              label="(%) Surcharge Rate"></v-text-field>
          </v-col>

          <v-col cols="4" class="pr-1 mt-2">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              flat
              hint="Late payment shall be imposed with additional % interest. Maximum of %."
              placeholder="(e.g. 0.02)"
              v-model="$penalty.interest"
              name="interest"
              label="(%) Interest Rate"></v-text-field>
          </v-col>

          <v-col cols="4" class="mt-2">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              flat
              placeholder="(e.g. 0.72)"
              v-model="$penalty.max_interest"
              name="max_interest"
              label="(%) Max Interest"></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-3">
            <div class="float-right">
              <v-btn
                color="error"
                class="mr-1"
                @click="onDiscardPenalty"
                text>Discard</v-btn>
              <v-btn
                color="primary"
                type="submit"
                text>Save</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import AdminServiceMixin from '@/services/admin.service';

@Component
export default class AddPenaltyRate extends Mixins(AdminServiceMixin) {
  public errors: _object = {};
  public editorState = false;

  public descRules = [ (v: string) => !!v || 'Description is required.' ];

  @Watch('editorState', { immediate: true })
  onEditorStateChange() {
    const penalty = {
      desc: null,
      surcharge: null,
      interest: null,
      max_interest: null,
      due_at: null,
      note: null
    };

    this.setPenaltyToEdit(penalty);
  }

  public async onPenaltySave() {
    try {
      await this.savePenalty();

      this.$store.commit('snackBar/toggle', {
        message: `Updated ${ this.$ruleset.desc }!`,
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
}
</script>
