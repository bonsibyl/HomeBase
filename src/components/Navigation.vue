<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'AuthHome' }"
          >Homebase</router-link
        >
      </div>
      <div class="nav-links">
        <ul>
          <v-row dense>
            <v-col>
              <v-btn
                icon
                color="black"
                to="/search"
                exact-active-class="activebtn"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                icon
                color="black"
                to="/message"
                exact-active-class="activebtn"
              >
                <v-icon>mdi-message-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                v-if="!this.$store.state.seller"
                icon
                color="black"
                @click="drawer = !drawer"
                exact-active-class="activebtn"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-menu offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon color="black" v-bind="attrs" v-on="on">
                    <v-icon>mdi-account-circle</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item >
                    <v-list-item-title class="text-center"
                      >Welcome,
                      {{ this.$store.state.profileUsername }}</v-list-item-title
                    >
                  </v-list-item>
                  <v-divider class="mt-0"></v-divider>
                  <v-list-group
                    prepend-icon="mdi-account-circle"
                    @click.stop.prevent
                  >
                    <template v-slot:activator>
                      <v-list-item-title>Profile</v-list-item-title>
                    </template>
                    <v-list-item
                      link
                      :to="{
                        name: 'Profile',
                        params: { id: this.$store.state.profileId },
                      }"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-account-box</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>View Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/editaccount">
                      <v-list-item-icon>
                        <v-icon>mdi-account-cog</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      link
                      to="/dashboard"
                      v-show="this.$store.state.seller"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-chart-pie</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                  <v-list-item @click="signOut">
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Sign Out</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </ul>
      </div>
      <v-navigation-drawer
        v-model="drawer"
        width="350"
        fixed
        temporary
        right
        class="py-0"
      >
        <v-layout column fill-height>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon large color="#A76E2A">mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold text-h5"
                  >Shopping Cart</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider id="sidedivider"></v-divider>
            <v-list-item
              v-if="cartDetails.length === 0"
              class="px-0 py-0 align-center justify-center"
            >
              <v-icon size="108" color="#A76E2A">mdi-emoticon-sad</v-icon>
            </v-list-item>
            <v-list-item v-if="cartDetails.length === 0" class="ml-4">
              <v-list-item-content class="font-weight-bold">
                Your shopping cart is looking a little empty!
              </v-list-item-content>
            </v-list-item>
            <template v-for="(listing, index) in cartDetails">
              <v-divider v-show="index !== 0" :key="`${index}-divider`" />
              <v-list-item :key="index" class="pl-0 pr-8">
                <v-row no-gutters>
                  <v-col id="btns" cols="2" align="center">
                    <v-btn icon @click="incrementQty(listing)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <h5>{{ listing.qty }}</h5>
                    <v-btn
                      icon
                      @click="decrementQty(listing)"
                      :disabled="listing.qty === 1"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col id="desc" cols="8">
                    <h5 class="green--text">@{{ listing.shopName }}</h5>
                    <h5>{{ listing.name }}</h5>
                    <h5>({{ listing.qtyDesc }})</h5>
                    <h5>${{ listing.price }}</h5>
                  </v-col>
                  <v-col id="total" cols="2" align="center">
                    <h4>
                      ${{ parseFloat(listing.price) * parseInt(listing.qty) }}
                    </h4>
                    <v-btn
                      small
                      tile
                      color="#FF5A5F"
                      class="white--text mt-5"
                      @click="deleteCartItem(listing)"
                      >Remove</v-btn
                    >
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
          </v-list>
          <v-spacer></v-spacer>
          <v-list class="py-2">
            <v-list-item>
              <v-btn block tile dark large height="48px" to="/checkout">
                Checkout
              </v-btn>
            </v-list-item>
          </v-list>
        </v-layout>
      </v-navigation-drawer>
    </nav>
  </header>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  data() {
    return {
      drawer: false,
      cartDetails: [],
    };
  },
  mounted() {
    this.cartDetails = JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      let newState = {};
      Object.keys(this.$store.state).forEach((key) => {
        newState[key] = null;
      });
      this.$store.replaceState(newState);
      this.$router.push({ name: "Home" });
    },
    deleteCartItem(listing) {
      var index = this.cartDetails.indexOf(listing);
      const arrRef = this.cartDetails;
      if (index > -1) {
        arrRef.splice(index, 1);
        this.cartDetails = arrRef;
        localStorage.setItem("cart", JSON.stringify(arrRef));
      }
    },
    incrementQty(listing) {
      var index = this.cartDetails.indexOf(listing);
      const arrRef = this.cartDetails;
      if (index > -1) {
        listing.qty = listing.qty + 1;
        arrRef.splice(index, 1);
        arrRef.push(listing);
        this.cartDetails = arrRef;
        localStorage.setItem("cart", JSON.stringify(arrRef));
      }
    },
    decrementQty(listing) {
      var index = this.cartDetails.indexOf(listing);
      const arrRef = this.cartDetails;
      if (index > -1) {
        listing.qty = listing.qty - 1;
        arrRef.splice(index, 1);
        arrRef.push(listing);
        this.cartDetails = arrRef;
        localStorage.setItem("cart", JSON.stringify(arrRef));
      }
    },
  },
  computed: {
    checkCartUpdate() {
      return this.$store.state.checkCartUpdate;
    },
  },
  watch: {
    checkCartUpdate(oldCount, newCount) {
      console.log(oldCount + " " + newCount);
      this.cartDetails = JSON.parse(localStorage.getItem("cart"));
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #f5e4d0;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8ba;
    }
  }
}

.activebtn {
  background-color: #fff;
}

#sidedivider {
  margin-top: 0;
}

nav {
  display: flex;
  padding: 25px 0;

  .branding {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 24px;
      color: #000;
      text-decoration: none;
    }
  }

  .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;

    ul {
      margin-right: 20px;
    }

    .profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      background-color: #303030;

      span {
        pointer-events: none;
      }
    }
  }
}
</style>
