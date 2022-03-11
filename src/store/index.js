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
    cartItems: [],
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
    setCart(state, cart) {
      state.cartItems = cart;
    },
    addCartItem(state, listing) {
      state.cartItems = state.cartItems.push(listing);
    },
    removeCartItem(state, listing) {
      var idx = state.cartItems.findIndex(c => c.title == listing.title)
      console.log(idx)
      console.log(listing.title)
      state.cartItems.splice(idx,1);
      console.log(state.cartItems)
    },
    incrementQty(state, listing) {
      var index = state.cartItems.findIndex(c => c.title == listing.title)
      let oldqty = state.cartItems[index].qty;
      state.cartItems[index].qty = oldqty + 1;
      console.log(state.cartItems[index].qty);
    },
    decrementQty(state, listing) {
      var index = state.cartItems.findIndex(c => c.title == listing.title)
      let oldqty = state.cartItems[index].qty;
      state.cartItems[index].qty = oldqty - 1;
      console.log(state.cartItems[index].qty + state.cartItems[index].title);
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
    async getCart({commit}) { //love u weiyang get cart from firebase here
      let initCart =   [{
        title: "Cake",
        price: 27.80,
        qty: 2,
        store: "nuttybutterybakery",
        desc: "10' Strawberry Cake",
      },
      {
        title: "Almond Financiers",
        price: 15.50,
        qty: 1,
        store: "susanbakes",
        desc: "Box of 8 Bite-Sized Financiers",
      },
      {
        title: "Berry Financiers",
        price: 15.50,
        qty: 1,
        store: "susanbakes",
        desc: "Box of 8 Bite-Sized Financiers",
      }]
      commit("setCart", initCart);
    }
  },
  modules: {},
});

export default store;
