<template>
  <div class="form-wrap">
    <form class="register">
      <h2>Register Your Business</h2>
      <div class="inputs">
        <div class="input">
          <input
            type="text"
            placeholder="Shop Name"
            v-model="shopName"
            required
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Contact No."
            v-model="number"
            required
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Shop Address"
            v-model="address"
            required
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Business Email" v-model="email" required />
          <email class="icon" />
        </div>
        <div class="input">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
        <!-- only show if error == true -->
      </div>

      <button @click.prevent="register"><b>Register</b></button>
      <!-- click.prevent stops page from refreshing -->

      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <p class="login-register">
        Are you a customer?
        <router-link class="router-link" :to="{ name: 'BuyerRegister' }"
          >Register here</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "SellerRegister",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      shopName: "",
      username: "",
      number: "",
      email: "",
      address: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.shopName !== "" &&
        this.number !== "" &&
        this.address !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        ).catch(err => {
          this.error = true;
          this.errorMsg = err.message;
        });
        const result = await createUser;
        if (!this.error) {
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          shopName: this.shopName,
          username: this.username,
          number: this.number,
          address: this.address,
          email: this.email,
          seller: true,
        });
        this.$router.push({ name: "SellerRegister2" }); //push user to register pg 2 aft auth
        return;
        }
      } else {
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  background-color: white;
  width: 200px;
  margin: 3% 15% 5% 15%;
}
</style>
