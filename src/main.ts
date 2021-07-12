import { Vue } from "vue-property-decorator";

Vue.config.productionTip = process.env.NODE_ENV === "production" ? true : false;

process.env.NODE_ENV != "production" ? null : (console.log = () => ({}));

import { router, vuetify } from "@/plugins";
import store from "@/store";
import { initRouterMiddleware } from "@/routes/middleware";

import UserServiceMixin from "@/services/user.service";

export default new Vue({
  store,
  router: initRouterMiddleware(router),
  vuetify,
  mixins: [ UserServiceMixin ],
  render: (h) => h("router-view"),
}).$mount("#app-root");
