<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="showImages"
  >
    <v-card class="rounded-0">
      <v-carousel height="100vh" hide-delimiters show-arrows-on-hover>
        <v-carousel-item
          class="grey darken-4 "
          v-for="(item, i) in images"
          :key="i"
        >
          <v-sheet height="100vh" class="d-flex justify-center align-center">
            <img class="mt-3" :src="item.url" alt="" />
          </v-sheet>
        </v-carousel-item>
        <v-btn
          elevation="2"
          fab
          plain
          x-small
          absolute
          top
          right
          class="mt-7"
          id="collapseBtn"
          @click="$emit('collapseImages')"
          :height="36"
          :width="36"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-carousel>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ImageViewer extends Vue {
  @Prop() public showImages!: boolean;
  @Prop() public images!: _object[];
}
</script>

<style scoped>
#collapseBtn {
  background-color: rgba(0, 0, 0, 0.4) !important;
}
img {
  height: 90vh;
  max-width: 90%;
  object-fit: contain;
}
</style>
