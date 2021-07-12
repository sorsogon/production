<template>
  <v-file-input
    name="docs[]"
    v-model="files"
    max-width="100%"
    prepend-icon=""
    prepend-inner-icon="mdi-folder-multiple"
    :error="errors.docs ? true : false"
    multiple
    accept="application/pdf,image/png,image/jpg"
    label=" Upload Document/s"
    outlined
    dense
    hide-details
    @change="onFileChanged"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip small v-if="index < 1" class="mr-2 d-inline">
        {{ text }}
      </v-chip>
      <span
        class="text-subtitle-2 font-weight-medium grey--text"
        v-else-if="index === 1"
      >
        {{ files.length - 1 }}+
        <v-icon>mdi-dots-horizontal</v-icon>
      </span>
    </template>
  </v-file-input>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class UploadDocument extends Vue {
  @Prop() public readonly errors!: _object;
  public files = [];

  public onFileChanged() {
    this.$emit("removeFileError");
  }
}
</script>
