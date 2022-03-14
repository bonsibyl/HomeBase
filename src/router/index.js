import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import AuthHome from "../views/AuthHome.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import BuyerRegister from "../views/BuyerRegister.vue";
import SellerRegister from "../views/SellerRegister.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import EditAccount from "../views/EditAccount.vue";
import Admin from "../views/Admin.vue";
import Listing from "../views/Listing.vue";
import EditListing from "../views/EditListing.vue";
import EditShop from "../views/EditShop.vue";
import UserProfile from "../views/UserProfile.vue";
import Search from "../views/Search.vue";
import Profile from "../views/Profile.vue";
import Checkout from "../views/Checkout.vue";
import Payment from "../views/Payment.vue";
import Dashboard from "../views/Dashboard.vue";
import SellerOrderOverview from "../views/SellerOrderOverview.vue"
import SellerOrderManagement from "../views/SellerOrderManagement.vue"
import OrderSummary from "../views/OrderSummary.vue";

//import store from "../store/index.js"

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
    path: "/authhome",
    name: "AuthHome",
    component: AuthHome,
    meta: {
      title: "AuthHome",
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
    path: "/buyer-register",
    name: "BuyerRegister",
    component: BuyerRegister,
    meta: {
      title: "BuyerRegister",
    },
  },
  {
    path: "/seller-register",
    name: "SellerRegister",
    component: SellerRegister,
    meta: {
      title: "SellerRegister",
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
    path: "/editaccount",
    name: "EditAccount",
    component: EditAccount,
    meta: {
      title: "EditProfile",
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
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      title: "Search",
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      title: "Checkout",
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    meta: {
      title: "Payment",
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/sellerorderoverview",
    name: "Seller Order Overview",
    component: SellerOrderOverview,
    meta: {
      title: 'Seller Order Overview',
    },
  },
  {
    path: "/sellerordermanagement",
    name: "Seller Order Management",
    component: SellerOrderManagement,
    meta: {
      title: 'Seller Order Management',
    },
  },
  {
    path: "/ordersummary",
    name: "Order Summary",
    component: OrderSummary,
    meta: {
      title: 'Order Summary',
    },
  },
  {
    path: "/editshop",
    name: "EditShop",
    component: EditShop,
    meta: {
      title: "EditShop",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active",
});

//document titles (name that appears on your tab display)
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | BT3103Donkeys`; //format interpolation
  next();
});

export default router;
