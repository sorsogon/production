<template>
  <v-container>
    <v-row class="font-weight-medium text-body-2">
      <v-col class="pa-1" cols="4">
        <div>Full Name:</div>
      </v-col>
      <v-col class="pa-1 px-5">
        <div>{{ taxPayer.name }}</div>
      </v-col>
    </v-row>
    <v-row class="font-weight-medium text-body-2">
      <v-col class="pa-1" cols="4">
        <div>Email:</div>
      </v-col>
      <v-col class="pa-1 px-5">
        <div>{{ taxPayer.email }}</div>
      </v-col>
    </v-row>
    <v-row class="font-weight-medium text-body-2">
      <v-col class="pa-1" cols="4">
        <div>Contact No:</div>
      </v-col>
      <v-col class="pa-1 px-5">
        <div>{{ taxPayer.mobile }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="pa-1 d-flex align-center font-weight-medium text-body-2"
        cols="4"
        sm="4"
      >
        <div>Documents:</div>
      </v-col>
      <v-col class="pa-1" cols="12" sm="8">
        <v-list dense class="pa-0">
          <v-list-group v-if="images.length > 0">
            <template v-slot:activator>
              <v-list-item-title class="font-weight-medium text-body-2"
                >Images</v-list-item-title
              >
            </template>
            <v-list-item>
              <v-carousel
                id="imageCarousel"
                :height="200"
                class="rounded"
                hide-delimiters
                :show-arrows-on-hover="true"
              >
                <v-carousel-item
                  v-for="(item, i) in images"
                  :key="i"
                  :src="item.url"
                >
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
                  id="expandBtn"
                  :height="36"
                  :width="36"
                  @click.prevent="$emit('enlargeImages', images)"
                >
                  <v-icon>
                    mdi-fullscreen
                  </v-icon>
                </v-btn>
              </v-carousel>
            </v-list-item>
          </v-list-group>
          <v-list-group v-if="documents.length > 0">
            <template v-slot:activator>
              <v-list-item-title class="font-weight-medium text-body-2"
                >PDF</v-list-item-title
              >
            </template>
            <v-list-item
              v-for="(item, i) in documents"
              :key="i"
              link
              @click="$emit('viewPdf', item)"
            >
              <v-list-item-title v-text="item.filename"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row class="font-weight-medium text-body-2">
      <v-col class="pa-1" cols="4">
        <span>Status:</span>
      </v-col>
      <v-col class="pa-1 px-5">
        <v-chip
          v-if="taxPayer.status == 'granted'"
          color="success"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Granted</span>
        </v-chip>
        <v-chip
          v-if="taxPayer.status == 'walk_in'"
          color="success"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Walk In</span>
        </v-chip>
        <v-chip
          v-else-if="taxPayer.status == 'pending'"
          color="warning"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Pending</span>
        </v-chip>
        <v-chip
          v-else-if="taxPayer.status == 'denied'"
          color="error"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Denied</span>
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { filter } from "vue/types/umd";

@Component
export default class UserInfo extends Vue {
  @Prop() public readonly taxPayer!: _object;

  public documents: _object[] = [];
  public images: _object[] = [];

  public showImages = false;

  private getTaxPayerDocuments() {
    if (this.taxPayer.documents != null) {
      const documents = this.taxPayer.documents;

      for (let i = 0; i < documents.length; i++) {
        const d = documents[i];
        let file = {
          type: "",
          url: "",
          filename: "",
        };

        let s = d.url.substr(0, 5);
        if (s == "/9j/4") {
          file = {
            type: "jpeg",
            url: `data:image/jpeg;base64,${d.url}`,
            filename: d.filename,
          };
          this.images.push(file);
        } else if (s == "iVBOR") {
          file = {
            type: "png",
            url: `data:image/png;base64,${d.url}`,
            filename: d.filename,
          };
          this.images.push(file);
        } else if (s == "JVBER") {
          file = {
            type: "pdf",
            url: `data:application/pdf;base64,${d.url}`,
            filename: d.filename,
          };
          this.documents.push(file);
        }
      }
    }
  }

  private created() {
    this.getTaxPayerDocuments();
  }
}
</script>

<style scoped>
#expandBtn {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

#imageCarousel {
  width: 360px !important;
}
</style>
