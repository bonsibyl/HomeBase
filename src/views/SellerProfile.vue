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
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>Business</span>
        </div>
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
          <input type="number" id="hpNumber" v-model="hpNumber" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg";

export default {
  name: "SellerProfile",
  components: {
    Modal,
    adminIcon,
  },
  data() {
    return {
      modalMessage: "Changes were saved!",
      modalActive: null,
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateUserSettings");
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
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
    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit("changeUsername", payload);
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
        background-color: #818181;
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
        background-color: #86560e;
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
        background-color: rgb(50, 126, 34);
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

      button:hover {
        background-color: rgb(63, 158, 44);
      }
    }
  }
}
</style>
