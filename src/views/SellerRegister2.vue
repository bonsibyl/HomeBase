<template>
  <div class="form-wrap">
    <form class="register">
      <h2>Provide Your Business Details</h2>
      <div class="entire">
        <div class="inputs">
            <h4>Profile Picture:</h4>
            <v-file-input class="fileInput" v-model="email" required></v-file-input>
            <h4>Payment QR Code (PayLah! / PayNow):</h4>
            <v-file-input class="fileInput" v-model="email" required></v-file-input>

            <h4>Shop Description:</h4>
            <v-textarea
              v-model="productDesc"
              counter
              maxlength="250"
              :rules="descRules"
              full-width
              single-line
              required
            ></v-textarea>
        </div>

        <div class="uploads">
          <h4>Opening Hours:</h4>
          <div v-for="day in week" :key="day">
            <h5>{{ day }}</h5>
            <input full-width type="time" />
            <input class="bottom" full-width type="time" />
          </div>

          <div v-show="error" class="error">{{ this.errorMsg }}</div>
          <!-- only show if error == true -->
        </div>
        </div>

      <button @click.prevent="register"><b>Complete Registration!</b></button>
      <!-- click.prevent stops page from refreshing -->
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "SellerRegister2",
  components: {},
  data() {
    return {
      profilePic: "",
      qrPic: "",
      shopDesc: "",
      openingHours: "",
      monday: "",
      error: null,
      errorMsg: "",
      week: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
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
        const createUser = await firebaseAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch((err) => {
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
}

.fileInput {
  button {
    background-color: white !important;
    padding: 0px !important;
    margin: 0px !important;
    min-width: 0px !important;
  }
}
.entire {
    margin: auto;
    display: flex;
    width: 100%;
}

.inputs, .uploads {
    width: 100%;
    padding: 3%;
    
}

.register {
    padding: 3%;
}

h4 {
    margin-bottom: 7px;
}

.bottom {
    margin-bottom: 5px;
}

input {
    width: 100%;
}

.fileInput {
    margin-bottom: 20%;
}
</style>