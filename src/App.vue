<template>
  <v-app>
    <div class="app-wrapper">
      <div class="app">
        <header>
        <Navigation v-if="this.$store.state.authenticated" />
        <UnauthNavigation v-else />
        </header>
        <!-- only show for pages excl. login/register/pw -->
          <router-view />
        <FooterLanding v-if="footerRendering" />
        <!-- only show for pages excl. login/register/pw -->
      </div>
    </div>
  </v-app>
</template>

<script>
import FooterLanding from "./components/FooterLanding";
import Navigation from "./components/Navigation";
import UnauthNavigation from "./components/UnauthNavigation";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: { Navigation, FooterLanding, UnauthNavigation,},
  data() {
    return {
      navigation: null, //for nav bar rendering, true === disabled
      footerRendering: null, //for landing page footer rendering, true === enabled
      cartRendering: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user); //update user whenever there is new auth
      if (user) {
        this.$store.dispatch("getCurrentUser");
        this.$store.dispatch("getCart");
      }
    });
    //this.checkRoute(); //initialise in lifecycle
  },
  mounted() {
    this.checkRoute();
  },
  methods: {
    //detect route that we are on, for page rendering
    checkRoute() {
      this.navigation = false;
      this.footerRendering = false;
      if (this.$route.name === "Home") {
        this.footerRendering = true;
      }
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = true;
        return;
      }
    },
  },

  watch: {
    $route() {
      this.checkRoute(); //whenever route changes, run checkRoute() funct
    },
  },
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

.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  padding: 12px 24px;
  border: none;
  text-transform: uppercase;
  background-color: rgb(206, 137, 81);
  border-radius: 5px;
  color: white;
  margin-top: 15px;
  margin-bottom: 25px;
  font-weight: bold;

  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(114, 114, 114);
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
  font-size: 15px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 4px;
}
</style>
