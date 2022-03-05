<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <h2>Forgot Password</h2>
        <p>We will send a password reset email to your registered email address.</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword"><b>Reset Password</b></button>
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      modalActive: false, //toggle pop-up on & off
      modalMessage: "", //pop-up message shown
      loading: null,
    };
  },
  components: {
    email,
    Modal,
    Loading,
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.modalMessage = "If your account exists, you will receive an email";
        this.loading = false;
        this.modalActive = true;
      }).catch(err => {
        this.modalMessage = err.message;
        this.loading = false;
        this.modalActive = true;
      });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  background-color: rgb(255, 245, 228);
  position: relative;
  flex-grow: 1;
  h2 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
}

.reset {
    background-color: white;
    width: 200px;
    height: 500px;
    margin: 3% 15% 5% 15%;
}

button {
  background-color: rgb(206, 137, 81);
  border-radius: 5px;
  width: 30%;
  color: white;
  margin-top: 15px;
  margin-bottom: 25px;
}

button:hover {
  background-color: rgb(31, 104, 42);
}
</style>