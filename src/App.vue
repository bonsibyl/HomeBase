<template>
  <v-app>
    <div class="app-wrapper">
      <div class="app">
        <Navigation v-if="!unauth" />
        <UnauthNavigation v-else/>
        <!-- only show for pages excl. login/register/pw -->
        <router-view />
        <Footer v-if="!unauth" />
        <!-- only show for pages excl. login/register/pw -->
      </div>
    </div>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import UnauthNavigation from "./components/UnauthNavigation"

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: { Navigation, Footer, UnauthNavigation },
  data() {
    return {
      unauth: true, //for nav bar rendering, true === disabled
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user); //update user whenever there is new auth
      if (user) {
        this.$store.dispatch("getCurrentUser");
        this.unauth=false;
      }
    });
    //this.checkRoute(); //initialise in lifecycle
  },
  mounted() {},
  methods: {
    //detect route that we are on, for page rendering
    // checkRoute() {
    //   if (
    //     this.$route.name === "Login" ||
    //     this.$route.name === "Register" ||
    //     this.$route.name === "ForgotPassword"
    //   ) {
    //     this.unauth = true;
    //     return;
    //   }
    //   this.unauth = false;
    // },
  },
  // watch: {
  //   $route() {
  //     this.checkRoute(); //whenever route changes, run checkRoute() funct
  //   },
  // },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

//put arrows in global state due to multiple usage instances
.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  //margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5);
}

.error {
  text-align: center;
  font-size: 12px;
  color: maroon;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr; //for mobile ver, 1 card per row

    @media (min-width: 500px) {
      grid-template-columns: repeat(
        2,
        1fr
      ); //for desktop ver, 2 cards per row for >500px
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(
        3,
        1fr
      ); //for desktop ver, 3 cards per row for >900px
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(
        4,
        1fr
      ); //for desktop ver, 4 cards per row for >1200px
    }
  }
}
</style>
