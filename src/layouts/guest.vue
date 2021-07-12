<!--
  layout: DefaultLayout
  desc: Ang layout na gagamitin ng mga taong walang permiso.
-->
<template>
  <div id="app-vuetfiy-root" :style="{
    backgroundImage: `url(${require('../assets/images/jpeg/slides/14.jpeg')})`
  }">
    <v-app id="vuetify">
      <AppProgressBar />
      <AppSnackBar />
      <v-main>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AppProgressBar from '@/components/app/AppProgressBar.vue';
import AppSnackBar from '@/components/app/AppSnackBar.vue';

@Component({
  components: {
    AppProgressBar,
    AppSnackBar
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="postcss" scoped>
#app-vuetfiy-root {
  background-repeat: no-repeat;
  background-size: cover;
}

#vuetify {
  background-color: rgba(0, 0, 0, .5);
}
</style>
