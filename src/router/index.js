import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import Vuetifytest from "../views/Vuetifytest.vue";
import Listing from "../views/Listing.vue";
import EditListing from "../views/EditListing.vue";
import UserProfile from "../views/UserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/listing/:id",
    name: "Listing",
    component: Listing,
    meta: {
      title: "Listing",
    },
  },
  {
    path: "/EditListing/:id",
    name: "EditListing",
    component: EditListing,
    meta: {
      title: "EditListing",
    },
  },
  {
    path: "/UserProfile/:id",
    name: "UserProfile",
    component: UserProfile,
    meta: {
      title: "UserProfile",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/vuetify",
    name: "Vuetifytest",
    component: Vuetifytest,
    meta: {
      title: "Vuetifytest",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//document titles (name that appears on your tab display)
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | BT3103Donkeys`; //format interpolation
  next();
});

export default router;
