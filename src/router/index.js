import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import AuthHome from "../views/AuthHome.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import BuyerRegister from "../views/BuyerRegister.vue";
import SellerRegister from "../views/SellerRegister.vue";
import SellerRegister2 from "../views/SellerRegister2.vue";
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
import SellerOrderOverview from "../views/SellerOrderOverview.vue";
import SellerOrderManagement from "../views/SellerOrderManagement.vue";
import CreateListing from "../views/CreateListing.vue";
import OrderSummary from "../views/OrderSummary.vue";
import ReviewOverview from "../views/ReviewOverview.vue";
import SellerReviews from "../views/SellerReviews.vue";

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
    path: "/listing/:user/:id",
    name: "Listing",
    component: Listing,
    meta: {
      title: "Listing",
    },
  },
  {
    path: "/EditListing/:user/:id",
    name: "EditListing",
    component: EditListing,
    meta: {
      title: "EditListing",
    },
  },
  {
    path: "/CreateListing/:id",
    name: "CreateListing",
    component: CreateListing,
    meta: {
      title: "CreateListing",
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
    path: "/seller-register-2",
    name: "SellerRegister2",
    component: SellerRegister2,
    meta: {
      title: "SellerRegister2",
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
    path: "/dashboard/:id",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/sellerorderoverview/:id",
    name: "Seller Order Overview",
    component: SellerOrderOverview,
    meta: {
      title: "Seller Order Overview",
    },
  },
  {
    path: "/sellerordermanagement/:id",
    name: "Seller Order Management",
    component: SellerOrderManagement,
    meta: {
      title: "Seller Order Management",
    },
  },
  {
    path: "/ordersummary/:id",
    name: "Order Summary",
    component: OrderSummary,
    props: true,
    meta: {
      title: "Order Summary",
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
  {
    path: "/reviewoverview",
    name: "ReviewOverview",
    component: ReviewOverview,
    meta: {
      title: "ReviewOverview",
    },
  },
  {
    path: "/sellerreviews/:id",
    name: "Reviews",
    component: SellerReviews,
    meta: {
      title: "Reviews",
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
  document.title = `${to.meta.title} | HomeBase`; //format interpolation
  next();
});

export default router;
