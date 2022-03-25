<template>
  <div class="profile">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="container" v-if="$store.state.seller">
      <h2><b>Account Settings</b></h2>
      <div class="profile-info">
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>Business</span>
        </div>
        <v-row :justify="'center'">
          <v-col :cols="3">
            <v-btn block @click="editShopRoute">Edit Shop Details</v-btn>
          </v-col>
        </v-row>
        <div class="input">
          <label for="username">Username:</label>
          <input disabled type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="shopName">Shop Name:</label>
          <input type="text" id="shopName" v-model="shopName" />
        </div>
        <div class="input">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="address" />
        </div>
        <div class="input">
          <label for="hpNumber">Contact No.:</label>
          <input type="text" id="hpNumber" v-model="hpNumber" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            v-model="currentPassword"
          />
        </div>
        <div class="input">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="buttonDiv">
          <v-btn class="edit" dark :to="'/seller-register-2/'"
            >Edit Other Shop Details</v-btn
          >
          <v-btn class="save" dark @click="updateProfile">Save Changes</v-btn>
        </div>
      </div>
    </div>

    <div class="container" v-else>
      <h2><b>Account Settings</b></h2>
      <div class="profile-info">
        <div class="initials">
          {{ firstName[0] + lastName[0] }}
        </div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>Customer</span>
        </div>
        <v-row :justify="'center'">
          <v-col :cols="3">
            <v-btn block @click="changePicture">Edit Profile Pic</v-btn>
          </v-col>
          <v-file-input
            id="pic-input"
            class="hide-input"
            accept="image/png, image/jpeg, image/bmp"
            v-model="uploaded"
          ></v-file-input>
        </v-row>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input disabled type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="address" />
        </div>
        <div class="input">
          <label for="hpNumber">Contact No.:</label>
          <input type="text" id="hpNumber" v-model="hpNumber" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            v-model="currentPassword"
          />
        </div>
        <div class="input">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      transition="scale-transition"
    >
      {{ snackbar.msg }}
    </v-snackbar>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import firebase from "firebase/app";
export default {
  name: "EditAccount",
  components: {
    Modal,
    adminIcon,
  },
  data() {
    return {
      modalMessage: "Changes were saved!",
      modalActive: null,
      password: "",
      snackbar: {
        show: false,
        msg: null,
        color: null,
      },
      currentPassword: "",
      error: false,
      uploaded: null,
    };
  },
  methods: {
    changePicture() {
      document.getElementById("pic-input").click();
    },
    async updateProfile() {
      console.log(this.uploaded);
      this.error = false;
      if (this.password) {
        if (this.password.length < 6) {
          this.snackbar = {
            show: true,
            msg: "Your password has to be at least 6 characters!",
            color: "error",
          };
          return;
        }
        var user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          this.currentPassword
        );
        await user
          .reauthenticateWithCredential(credential)
          .then((doc) => {
            console.log(doc);
          })
          .catch((error) => {
            this.snackbar = {
              show: true,
              msg: error,
              color: "error",
            };
            this.error = true;
            return;
          });
        await user.updatePassword(this.password).catch((error) => {
          this.snackbar = {
            show: true,
            msg: error,
            color: "error",
          };
          this.error = true;
          return;
        });
      }
      if (!this.error) {
        this.$store.dispatch("updateUserSettings");
        if (this.uploaded) {
          await firebase
            .storage()
            .ref()
            .child("user/profile/" + firebase.auth().currentUser.uid)
            .put(this.uploaded)
            .catch(() => {
              firebase
                .storage()
                .ref()
                .child("user/profile/" + firebase.auth().currentUser.uid)
                .put(this.uploaded);
            });
        }
        this.snackbar = {
          show: true,
          msg: "Changes saved!",
          color: "success",
        };
      } else {
        console.log("wtf is going on");
      }
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
    editShopRoute() {
      this.$router.push({ name: "SellerRegister2" });
    },
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },
    shopName: {
      get() {
        return this.$store.state.profileShopName;
      },
      set(payload) {
        this.$store.commit("changeShopName", payload);
      },
    },
    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit("changeUsername", payload);
      },
    },
    address: {
      get() {
        return this.$store.state.address;
      },
      set(payload) {
        this.$store.commit("changeAddress", payload);
      },
    },
    hpNumber: {
      get() {
        return this.$store.state.number;
      },
      set(payload) {
        this.$store.commit("changeNumber", payload);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 100%;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        text-transform: uppercase;
        background-color: #44703e;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #7b8997;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
        background-color: rgb(185, 145, 93);
        transition: 500ms ease all;
        cursor: pointer;
        padding: 12px 24px;
        border: none;
        border-radius: 5px;
        color: white;
        margin-top: 15px;
        margin-bottom: 25px;
        font-weight: bold;
      }
    }
  }
}

.sellerDisplay {
  position: initial;
  width: 20%;
  padding: 1%;
  font-size: 30px;
  background-color: #fffdf6;
  color: rgb(156, 92, 18);
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.edit {
  float: left;
  margin-right: 3%;
  margin-top: 4%;
  background-color: darkolivegreen !important;
  font-weight: bold;
}

.save {
  float: right;
  margin-left: 3%;
}

.buttonDiv {
  display: flex;
  margin: auto;
}

.hide-input {
  display: none;
}
</style>
