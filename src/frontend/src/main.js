import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Styles
import scss from "./styles/app.scss";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:3000"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
