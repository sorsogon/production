<template>
  <v-sheet
    elevation="2"
    rounded="lg">
    <v-row no-gutters>
      <v-col>Statistics</v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import TooltipUserProfile from '@/components/admin/TooltipUserProfile.vue';

@Component({
  components: { 
    TooltipUserProfile
  }
})
export default class RuleFormulationTab extends Vue {

}
</script>

