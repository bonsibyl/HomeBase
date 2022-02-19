<template>
  <div class="form-wrap">
    <form class="login">
      <h2>Login to your account!</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
        Forgot your password?
      </router-link>
      <button type="submit" @click.prevent="signIn"><b>Sign In</b></button>
    </form>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Login",
  components: {
    email,
    password,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    signIn() {
      if (this.email !== "" && this.password !== "") {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Home" });
            this.erorr = false;
            this.errorMsg = "";
            console.log(firebase.auth().currentUser.uid);
          })
          .catch((err) => {
            this.error = true;
            this.errorMsg = err.message;
          });
      } else {
        this.error = true;
        this.errorMsg = "Please fill out all the fields!";
        return;
      }
    },
  },
};
</script>

<style lang="scss">
//not scoped because the template is shared w/ register & forgot-pw

.login {
    background-color: white;
    width: 200px;
    height: 500px;
    margin: 5% 25% 10% 25%;
}

.form-wrap {
  background-color: rgb(255, 245, 228);
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  width: 100%;

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 50px;

    button {
      color: white;
      background-color: rgb(206, 137, 81);
      width: 300px;
    }
    
    button:hover {
      background-color: rgb(31, 104, 42);
    } 

    .router-link {
      color: #000;
    }

    .router-link:hover {
      color: rgb(146, 146, 146);
      transition: 0.3s ease all;
    }

    h2 {
      text-align: center;
      font-size: 40px;
      margin-bottom: 20px;
    }

    .inputs {
      width: 100%;
      max-width: 450px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      color: #000;
      margin: 16px 0 16px;
      transition: 0.5s ease all;
    }

    .forgot-password:hover {
      color: rgb(146, 146, 146);
      transition: 0.3s ease all;
    }
  }
}

</style>
>
