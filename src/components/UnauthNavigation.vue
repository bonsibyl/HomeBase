<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >Homebase</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <!--only show if mobile nav is FALSE-->
          <router-link class="link hover" :to="{ name: 'Home' }" exact
            >About us</router-link
          >
          <router-link class="link hover" :to="{ name: 'Login' }"
            >Login</router-link
          >
          <router-link
            v-if="!user"
            class="link hover"
            :to="{ name: 'SellerRegister' }"
            >Seller Register</router-link
          >
          <router-link
            v-if="!user"
            class="link hover"
            :to="{ name: 'BuyerRegister' }"
            >Buyer Register</router-link
          >
        </ul>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    <!--on click toggle mobile nav-->
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <!--only show if mobile nav is TRUE-->
        <router-link class="link" :to="{ name: 'Home' }" exact
          >Home</router-link
        >
        <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  components: {
  },
  data() {
    //data for dropdown nav (mobile)
    return {
      profileMenu: null,
      mobile: null, //boolean, check if mobile mode
      mobileNav: null, //boolean, check if nav open
      windowWidth: null, //num value, check window width VS threshold
    };
  },

  created() {
    //created lifecycle hook
    window.addEventListener("resize", this.checkScreen); //whenever encounter resize, will run checkScreen funct
    this.checkScreen(); //run the checkScreen funct
  },

  methods: {
    //functions for drop-down nav bar
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true; //set state to mobile mode
        return;
      } else {
        this.mobile = false; //set state to desktop
        this.mobileNav = false; //ensure mobile nav is not showing
        return;
      }
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav; //opp of current state when toggling
    },
    toggleProfileMenu(event) {
      if (event.target === this.$refs.profile) {
        //look for profile ref to see what user is toggling
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
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
      margin-right: 32px;

      .link {
        margin-right: 32px;
        color: #000;
      }

      .router-link-active,
      .router-link-exact-active {
        color: #dd905f;
      }

      .link:last-child {
        margin-right: 0;
      }
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

      .profile-menu {
        position: absolute;
        top: 60px;
        right: 0;
        width: 250px;
        background-color: #303030;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .info {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #fff;

          .initials {
            position: initial;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #303030;
            background-color: #fff;
          }

          .right {
            flex: 1;
            margin-left: 12px;
          }
        }

        .options {
          padding: 15px;
          .option {
            text-decoration: none;
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .icon {
              width: 18px;
              height: auto;
            }

            p {
              font-size: 14px;
              margin-left: 12px;
            }
          }
          .option:last-child {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;

  .link {
    padding: 15px 0;
    color: #fff;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  //target the enter and leaving of toggling button only
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px); //nav bar out of screen
}

.mobile-nav-enter-to {
  transform: translateX(0); //nav bar back onto screen
}

.mobile-nav-leave-to {
  transform: translateX(-250px); //nav bar out of screen
}
</style>
