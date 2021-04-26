import Vue from "vue";
import App from "./App.vue";
import injector from "vue-inject";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(injector);
require("./resources/resorceService");

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
