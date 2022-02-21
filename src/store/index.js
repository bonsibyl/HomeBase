import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Donkey #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2021"},
      { blogTitle: "Donkey #2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2021"},
      { blogTitle: "Donkey #3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2021"},
      { blogTitle: "Donkey #4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2021"},
    ],
    editPost: null, //for toggle-edit in BLOGS
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    seller: null,
    number: null,
    address: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload; //payload returns true or false
    },
    setProfileInfo(state, doc) { //doc is dbResults
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      state.seller = doc.data().seller;
      state.number = doc.data().number;
      state.address = doc.data().Address;
    },
    setProfileInitials(state) {
      state.setProfileInitials = //get initials of first + last name
        state.profileFirstName.match(/(\b\S)?/g).join("") + 
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}) { //edit values in MUTATIONS --> use commit funct
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },

    async updateUserSettings({commit, state}) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },

  },
  modules: {
  }
})



export default store