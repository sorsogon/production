<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="showPdf"
  >
    <v-sheet height="100%" class="grey darken-4 d-flex justify-center">
      <v-toolbar absolute width="100%" color="grey darken-4" dense>
        <h4 class="white--text">{{ document.filename }}</h4>
        <v-icon v-if="verified" class="ml-2" color="blue" :size="20">
          mdi-star-check
        </v-icon>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="secondary"
          class="white--text mx-1"
          @click="printPdf"
        >
          Print
          <v-icon right dark>
            mdi-printer
          </v-icon>
        </v-btn>
        <v-btn
          small
          color="error"
          class="white--text ml-1"
          @click="$emit('hidePdf')"
        >
          Close
          <v-icon right dark>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="primary"
        class="mt-12"
      ></v-progress-linear>
      <iframe
        v-if="!loading"
        ref="pdfViewer"
        class="mt-12"
        :src="src"
        frameborder="0"
        width="100%"
        height="calc(100vh - 48px)"
      ></iframe>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class PdfViewer extends Vue {
  @Prop() public showPdf!: boolean;
  @Prop() public document!: _object;

  public src = "";
  public loading = true;
  public verified = true;

  private async getPdf() {
    const pdfData = await fetch(this.document.url);
    const blob = await pdfData.blob();
    const src = await URL.createObjectURL(blob);
    setTimeout(() => {
      this.src = `${src}#toolbar=0`;
      this.loading = false;
    }, 1000);
  }

  private printPdf() {
    const pdf_viewer: _object = this.$refs.pdfViewer;
    let doc = pdf_viewer.contentWindow;
    if (doc != null) {
      doc.focus();
      doc.print();
    }
  }

  private created() {
    this.getPdf();
  }
}
</script>

<style scoped></style>
