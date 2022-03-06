import Vue from "vue";
import Vuex from "vuex";
import {createStore} from "vuex-extensions"
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";


Vue.use(Vuex);

const store = createStore(Vuex.Store,{
  state: {
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    isSeller: true,
    seller: null,
    number: null,
    address: null,
    authenticated: false,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateSeller(state) {
      state.isSeller = !state.isSeller;
    },
    updateUser(state, payload) {
      state.user = payload; //payload returns true or false
    },
    setProfileInfo(state, doc) {
      //doc is dbResults
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      state.seller = doc.data().seller;
      state.number = doc.data().number;
      state.address = doc.data().address;
      state.profileShopName = doc.data().shopName;
      state.authenticated = true;
    },
    setProfileInitials(state) {
      state.setProfileInitials = //get initials of first + last name
        state.profileFirstName.slice(0) + state.profileLastName.slice(0);
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeShopName(state, payload) {
      state.profileShopName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    changeNumber(state, payload) {
      state.number = payload;
    },
    changeAddress(state, payload) {
      state.address = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      //edit values in MUTATIONS --> use commit funct
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },

    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },
  modules: {},
});

export default store;
