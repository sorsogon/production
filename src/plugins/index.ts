/* eslint-disable */
import { router as _router } from '@/plugins/router';
import { vuetify as _vuetify } from '@/plugins/vuetify';

import { Vue } from 'vue-property-decorator';
import { PluginFunction, PluginObject } from 'vue';
import { AxiosRequestConfig } from 'axios';
import { Options as PusherOptions } from 'pusher-js';

/** Plugins */
import AxiosPlugin from '@/plugins/axios';
import VuetifyPlugin from '@/plugins/vuetify';
import VuexPlugin from 'vuex';
import LaravelEchoPlugin from '@/plugins/laravel-echo';
import PortalVuePlugin from 'portal-vue';

/** Utilities */
import Filters from '@/utils/filters';

interface VuePlugin {
  plugin: PluginObject<any> | PluginFunction<any>;
  options?: any | undefined;
};

const plugins: VuePlugin[] = [
  {
    plugin: AxiosPlugin,
    options: {
      withCredentials: true,
      baseURL: process.env.VUE_APP_AXIOS_API_BASE_URL,
      headers: {
        'Accept': 'application/json'
      }
    } as AxiosRequestConfig
  },
  {
    plugin: VuetifyPlugin,
    options: undefined
  },
  {
    plugin: VuexPlugin,
    options: undefined
  },
  {
    plugin: LaravelEchoPlugin,
    options: {
      forceTLS: true,
      cluster: process.env.VUE_APP_LARAVEL_PUSHER_CLUSTER,
    } as PusherOptions
  },
  {
    plugin: PortalVuePlugin,
    options: undefined
  },
  {
    plugin: Filters,
    options: undefined
  }
];

for (const { plugin, options } of plugins) Vue.use(plugin, options);

export const router = _router;
export const vuetify = _vuetify;