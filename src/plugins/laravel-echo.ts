import Vue, { PluginObject } from 'vue';

import Echo from 'laravel-echo';
import Pusher, { Options as PusherOptions } from 'pusher-js';

export default new class implements PluginObject<PusherOptions> {

  public install(_Vue: typeof Vue, options?: PusherOptions) {
    _Vue.prototype.$echo = new Echo({
      authEndpoint: process.env.VUE_APP_AXIOS_API_BASE_URL + '/broadcasting/auth',
      broadcaster: 'pusher',
      client: new Pusher(process.env.VUE_APP_LARAVEL_PUSHER_KEY as string, options),
      encrypted: true
    });
  }

}


