import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3333",
    vuex: {
      store,
      actionPrefix: "socket_",
      mutationPrefix: "SOCKET_"
    }
  })
);

// Styles
import scss from "./styles/app.scss";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:3000"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
