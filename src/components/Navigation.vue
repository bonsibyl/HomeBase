<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
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
                v-show="!this.$store.state.seller"
                icon
                color="black"
                to="/cart"
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
                  <v-list-item>
                    <v-list-item-title>{{this.$store.state.profileUsername}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item link to="/profile">
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="signOut">
                    <v-list-item-title>Sign Out</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <!-- <v-col>
              <v-btn icon color="black" @click="signOut">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </v-col> -->
          </v-row>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  components: {},
  data() {
    //data for dropdown nav (mobile)
    return {
      profileMenu: null,
      windowWidth: null, //num value, check window width VS threshold
    };
  },

  created() {
    //created lifecycle hook
    window.addEventListener("resize", this.checkScreen); //whenever encounter resize, will run checkScreen funct
    this.checkScreen(); //run the checkScreen funct
  },

  methods: {
    toggleProfileMenu(event) {
      if (event.target === this.$refs.profile) {
        //look for profile ref to see what user is toggling
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
    },
  },

  computed: {
    user() {
      return this.$store.state.user; //returns value of true or false
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
