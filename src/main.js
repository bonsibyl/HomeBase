import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from "firebase/app";
import "firebase/auth";
import vuetify from "@/plugins/vuetify";
import VModal from "vue-js-modal";
import Chartkick from "vue-chartkick";
import Chart from "chart.js/auto";

Vue.use(Vue2Editor);
Vue.use(VModal);
Vue.use(Chartkick.use(Chart));

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
