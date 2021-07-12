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
        Add New Ruleset
      </v-btn>
    </template>
    <v-sheet class="pa-4 rounded-lg">
      <v-form
        @submit.prevent="onRulesetSave">
        <v-row no-gutters>
          <v-col cols="12">
            <h4 class="text-body-1 font-weight-medium mb-2 main--text primary--text">
              <v-img 
                class="float-left mr-2"
                max-width="24"
                src="@/assets/images/png/iconpack/to-do-list.png"></v-img>
              Add New Ruleset
            </h4>
            <p class="text-caption font-weight-light mb-0">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique voluptates 
              harum nesciunt.
            </p>
          </v-col>
          <v-col cols="12" class="mt-4 mt-3">
            <v-text-field
              v-model="$ruleset.desc"
              dense
              prepend-inner-icon="mdi-message-text-outline"
              hide-details
              outlined
              :error="errors.desc ? true : false"
              name="desc"
              label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" class="mt-1">
            <v-textarea
              v-model="$ruleset.note"
              rows="2"
              dense
              outlined
              hide-details
              no-resize
              name="note"
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
            <div class="float-right">
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
import { Mixins, Component, Watch } from 'vue-property-decorator';

import SimpleRulesetForm from './forms/SimpleRulesetForm.vue';
import IntermediateRulesetForm from './forms/IntermediateRulesetForm.vue';
import JSONRulesetForm from './forms/JSONRulesetForm.vue';

import AdminServiceMixin from '@/services/admin.service';

@Component({
  components: { 
    SimpleRulesetForm,
    IntermediateRulesetForm,
    JSONRulesetForm
  }
})
export default class AddRuleset extends Mixins(AdminServiceMixin) {
  public errors: _object = {};
  public formType = null;
  public editorState = false;

  public async onRulesetSave() {
    try {
      await this.saveRuleset();

      this.$store.commit('snackBar/toggle', {
        message: `Added a new Ruleset!`,
        color: 'success',
        toggle: true
      });

      this.editorState = false;
      this.resetRuleset();
    } catch(error) {
      this.errors = error.errors;
    }
  }

  @Watch('editorState')
  onEditorStateChange() {
    const ruleset = { desc: null, note: null };

    switch (this.$route.params.category) {
    case 'professional-tax':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          rates: []
        }
      });
      break;
    case 'annual-fixed-tax':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          rates: []
        }
      });
      break;
    case 'amusement-tax':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          province:  null,
          municipality: null
        }
      });
      break;
    case 'sand-gravel-tax':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          rate: null,
          fair_market_value: []
        }
      });
      break;
    case 'franchise-tax':
    case 'printing-publication-tax':
    case 'transfer-tax':
      this.setRulesetToEdit({ 
        ...ruleset, rates: { 
          account_code: null,
          rate: null
        } 
      });
      break;
    case 'property-tax':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          basic: null,
          sef: null
        }
      });
      break;
    case 'heavy-equipment-rental':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          rates: []
        }
      });
      break;
    case 'gymnasium-rental':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          rates: []
        }
      });
      break;
    case 'space-lot-rental':
      this.setRulesetToEdit({
        ...ruleset, rates: {
          account_code: null,
          rates: []
        }
      });
      break;
    case 'accountable-forms':
      this.setRulesetToEdit({
        ...ruleset,
        rates: {
          account_code: null,
          mark_up_rate: null,
          forms: []
        }
      });
    }
  }

  public onDiscardRuleset() {
    this.editorState = false;
    this.resetRuleset();
  }
}
</script>
