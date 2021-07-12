<template>
  <v-dialog
    v-model="editorState"
    max-width="610">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        v-bind="attrs"
        v-on="on"
        color="primary"
        depressed
        small>
        <v-icon class="mr-1">mdi-pencil</v-icon> Edit Ruleset
      </v-btn>
    </template>
    <v-sheet class="pa-4 rounded-lg">
      <v-form
        ref="form"
        @submit.prevent="onRulesetSave">
        <v-row no-gutters>
          <v-col cols="12">
            <h4 class="text-body-1 font-weight-medium mb-2 main--text primary--text">
              <v-img 
                class="float-left mr-2"
                max-width="24"
                src="@/assets/images/png/iconpack/to-do-list.png"></v-img>
              Edit Ruleset
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
              v-model="$ruleset.desc"
              :error="errors.desc ? true : false"
              outlined
              label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" class="mt-1">
            <v-textarea
              rows="2"
              dense
              outlined
              hide-details
              no-resize
              v-model="$ruleset.note"
              placeholder="Write an important note about this ruleset. (optional)"></v-textarea>
            <p class="font-weight-light my-0 text-caption">Note: <span class="font-weight-bold">Elit ad ut anim consectetur occaecat velit commodo.</span></p>
          </v-col>
          <v-col cols="12" class="mt-2">
            <v-tabs
              v-model="formType">
              <v-tab>Simple</v-tab>
              <v-tab disabled>Advance</v-tab>
              <v-tab disabled>JSON</v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-tabs-items
              v-model="formType">
              <v-tab-item tab="1">
                <p class="font-weight-light my-1 text-subtitle-2">Elit ad ut anim consectetur occaecat velit commodo.</p>
                <SimpleRulesetForm :errors="errors" />
              </v-tab-item>
              <v-tab-item tab="2">
                <p class="font-weight-light my-1 text-subtitle-2">Elit ad ut anim consectetur occaecat velit commodo.</p>
                <IntermediateRulesetForm />
              </v-tab-item>
              <v-tab-item tab="3">
                <p class="font-weight-light my-1 text-subtitle-2">Elit ad ut anim consectetur occaecat velit commodo.</p>
                <JSONRulesetForm />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
          <v-col cols="12" class="mt-3">
            <DeleteRuleset :ruleset="ruleset" v-on:deleteItem="onDeleteRuleset" />
            <div class="float-right">
              <v-btn
                v-if="!$ruleset.verified_at"
                color="success"
                class="mr-1"
                @click="onVerifyRuleset"
                text>
                Verify
              </v-btn>
              <v-btn
                color="error"
                class="mr-1"
                @click="onDiscardRuleset"
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
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import AdminServiceMixin from '@/services/admin.service';

import SimpleRulesetForm from './forms/SimpleRulesetForm.vue';
import IntermediateRulesetForm from './forms/IntermediateRulesetForm.vue';
import JSONRulesetForm from './forms/JSONRulesetForm.vue';

import DeleteRuleset from './DeleteRuleset.vue';

@Component({
  components: {
    SimpleRulesetForm,
    IntermediateRulesetForm,
    JSONRulesetForm,
    DeleteRuleset
  }
})
export default class EditRuleset extends Mixins(AdminServiceMixin) {
  @Prop({ required: true }) public readonly ruleset!: _object;

  public errors: _object = {};
  public formType = null;
  public editorState = false;

  @Watch('editorState', { immediate: true })
  onRulesetUpdate() {
    this.setRulesetToEdit(this.ruleset);
  }

  public async onRulesetSave() {
    try {
      await this.updateRuleset();

      this.$store.commit('snackBar/toggle', {
        message: `Updated ${ this.$ruleset.desc }!`,
        color: 'success',
        toggle: true
      });
      
      this.editorState = false;
      this.resetRuleset();
    } catch(error) {
      this.errors = error.errors;
    }
  }
  
  public onDiscardRuleset() {
    this.editorState = false;
    this.getAllRulesets();
    this.resetRuleset();
  }

  public async onVerifyRuleset() {
    try {
      await this.verifyRuleset();

      this.$store.commit('snackBar/toggle', {
        message: `Verified ${ this.$ruleset.desc }`,
        color: 'success',
        toggle: true
      });
      
    } catch(error) {
      console.log(error);
    }
  }

  public onDeleteRuleset() {
    this.editorState = false;
    this.$emit('deleteItem');
  }
}
</script>
