import Vue from "vue";
import App from "./App.vue";
import injector from "vue-inject";

Vue.use(injector);
require("./resources/resorceService");

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
