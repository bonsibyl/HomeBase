import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from "firebase/app";
import "firebase/auth";
<<<<<<< HEAD
import vuetify from './plugins/vuetify'
=======
import vuetify from "@/plugins/vuetify"
>>>>>>> 5f913d2a30566edaeb4839c17888ee0f4e6e956f

Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      vuetify,
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount("#app");
  }
})
