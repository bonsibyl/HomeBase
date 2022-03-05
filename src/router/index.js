import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import BuyerRegister from "../views/BuyerRegister.vue";
import SellerRegister from "../views/SellerRegister.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import EditAccount from "../views/EditAccount.vue";
import Admin from "../views/Admin.vue";
import Search from "../views/Search.vue";
import Profile from "../views/Profile.vue";
import Checkout from "../views/Checkout.vue";
import Payment from "../views/Payment.vue";
import Dashboard from "../views/Dashboard.vue";
import SellerOrderOverview from "../views/SellerOrderOverview.vue"
import SellerOrderManagement from "../views/SellerOrderManagement.vue"

import BuyerProfile from "../views/BuyerProfile.vue";
import SellerProfile from "../views/SellerProfile.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs',
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: "/buyer-register",
    name: "BuyerRegister",
    component: BuyerRegister,
    meta: {
      title: 'BuyerRegister',
    },
  },
  {
    path: "/seller-register",
    name: "SellerRegister",
    component: SellerRegister,
    meta: {
      title: 'SellerRegister',
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
    },
  },
  {
    path: "/editaccount",
    name: "EditAccount",
    component: EditAccount,
    meta: {
      title: 'EditProfile',
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: 'Admin',
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      title: 'Search',
    },
  },
    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout,
      meta: {
        title: 'Checkout',
      },
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    meta: {
      title: 'Payment',
    },
},
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile',
    },
  },
  {
    path: "/buyer-profile",
    name: "BuyerProfile",
    component: BuyerProfile,
    meta: {
      title: 'BuyerProfile',
    },
  },
  {
    path: "/seller-profile",
    name: "SellerProfile",
    component: SellerProfile,
    meta: {
      title: 'SellerProfile',
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: 'Dashboard',
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
  }
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
