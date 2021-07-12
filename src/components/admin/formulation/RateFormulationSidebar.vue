<template>
  <v-list 
    elevation="2"
    class="rounded-lg"
    v-if="$vuetify.breakpoint.mdAndUp">
    <v-list-item-group 
      v-model="selected"
      mandatory>
      <v-list-item
        :key="i"
        :to="item.to"
        v-for="(item, i) in $selectedCategory">
        <v-img
          class="mr-2"
          max-width="30"
          max-height="30"
          :src="item.icon"></v-img>
        <span class="font-weight-medium text-subtitle-2">{{ item.name }}</span>
        <v-spacer></v-spacer>
        <v-chip 
          class="ml-1"
          small
          color="primary">New</v-chip>
      </v-list-item>
    </v-list-item-group>
    <v-list-item
      disabled
      @click="onCreateNewItem">
      <v-icon max-width="30" class="mr-2">mdi-plus</v-icon>
      <span class="font-weight-medium text-subtitle-2">Add New Item</span>
    </v-list-item>
  </v-list>
  <v-tabs 
    show-arrows
    background-color="transparent"
    v-else>
    <v-tab 
      v-for="(item, i) in $selectedCategory"
      :to="item.to"
      :key="i">
      <v-img 
        max-width="24"
        class="mr-2"
        :src="item.icon"></v-img>
      {{ item.name }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import formulationTabs from './formulation-sidebar';

@Component
export default class RateFormulationSidebar extends Vue {
  @Prop({ required: true }) public category!: string;
  public categories: _object = formulationTabs;
  public selected = 0;

  get $selectedCategory() {
    return this.categories[this.category] ?? [];
  }

  @Watch('selected')
  @Watch('$selectedCategory', { immediate: true })
  onSelectedUpdated() {
    const $selected = this.$selectedCategory[this.selected] ?? {};

    $selected.param = ($selected?.name as string ?? '').toLowerCase();

    this.$emit('selectedItemUpdated', $selected);
  }

  public onCreateNewItem() {
    alert(`Creating a new item for ${ this.category.charAt(0).toLocaleUpperCase() + this.category.slice(1) }!`);
  }
}
</script>