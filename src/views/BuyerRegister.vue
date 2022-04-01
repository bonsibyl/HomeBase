<template>
  <div class="form-wrap">
    <form class="register">
      <h2>Register As Customer</h2>
      <div class="inputs">
        <div class="input">
          <input
            type="text"
            placeholder="First Name"
            v-model="firstName"
            required
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Last Name"
            v-model="lastName"
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
            placeholder="Home Address"
            v-model="address"
            required
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" required />
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

        <h4 class="profile">Profile Picture:</h4>
        <v-file-input
          class="fileInput"
          v-model="profileModel"
          accept="image/png, image/jpeg, image/bmp"
        ></v-file-input>

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
        Are you a business owner?
        <router-link class="router-link" :to="{ name: 'SellerRegister' }"
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
  name: "BuyerRegister",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      number: "",
      address: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      profileModel: [],
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== "" &&
        this.number !== "" &&
        this.address !== ""
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
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          number: this.number,
          address: this.address,
          email: this.email,
          seller: false,
        });

        
      var storageRef = firebase.storage().ref();
      var profileURL = "/user/profile/" + firebase.auth().currentUser.uid;
      //check if image already exists
      console.log(this.check);
      if (
        this.check &&
        (Array.isArray(this.profileModel) || Array.isArray(this.qrModel))
      ) {
        this.error = true;
        this.errorMsg = "Please fill out the required fields!";
        return;
      }
      if (this.shopDesc !== "") {
        this.error = false;
        this.errorMsg = "";
        //image handling
        console.log(this.profileModel);
        if (!Array.isArray(this.profileModel)) {
          await storageRef.child(profileURL).put(this.profileModel);
        }
      }


        console.log("success")
        this.$router.push({ name: "AuthHome" }); //push user to homepage aft auth
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

  button {
    width: 300px;
  }
}

.profile {
  margin-top: 15px;
}
</style>
