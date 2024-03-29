<template>
  <div class="form-wrap">
    <form class="register">
      <h2>Provide Your Business Details</h2>
      <div class="entire">
        <div class="inputs">
          <h4>Profile Picture:</h4>
          <v-file-input
            class="fileInput"
            v-model="profileModel"
            accept="image/png, image/jpeg, image/bmp"
          ></v-file-input>
          <h4>Payment QR Code (PayLah! / PayNow):</h4>
          <v-file-input
            class="fileInput"
            v-model="qrModel"
            accept="image/png, image/jpeg, image/bmp"
          ></v-file-input>

          <h4>Shop Description:</h4>
          <v-textarea
            v-model="shopDesc"
            counter
            maxlength="250"
            full-width
            single-line
            required
          ></v-textarea>
        </div>

        <div class="uploads">
          <h4>Opening Hours:</h4>
          <div>
            <h5>Monday</h5>
            <input full-width type="time" v-model="monOpening" />
            <input class="bottom" full-width type="time" v-model="monClosing" />
          </div>

          <div>
            <h5>Tuesday</h5>
            <input full-width type="time" v-model="tuesOpening" />
            <input
              class="bottom"
              full-width
              type="time"
              v-model="tuesClosing"
            />
          </div>

          <div>
            <h5>Wednesday</h5>
            <input full-width type="time" v-model="wedOpening" />
            <input class="bottom" full-width type="time" v-model="wedClosing" />
          </div>

          <div>
            <h5>Thursday</h5>
            <input full-width type="time" v-model="thursOpening" />
            <input
              class="bottom"
              full-width
              type="time"
              v-model="thursClosing"
            />
          </div>

          <div>
            <h5>Friday</h5>
            <input full-width type="time" v-model="friOpening" />
            <input class="bottom" full-width type="time" v-model="friClosing" />
          </div>

          <div>
            <h5>Saturday</h5>
            <input full-width type="time" v-model="satOpening" />
            <input class="bottom" full-width type="time" v-model="satClosing" />
          </div>

          <div>
            <h5>Sunday</h5>
            <input full-width type="time" v-model="sunOpening" />
            <input class="bottom" full-width type="time" v-model="sunClosing" />
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
      userID: "",
      shopDesc: "",
      qrModel: [],
      profileModel: [],
      monOpening: "",
      monClosing: "",
      tuesOpening: "",
      tuesClosing: "",
      wedOpening: "",
      wedClosing: "",
      thursOpening: "",
      thursClosing: "",
      friOpening: "",
      friClosing: "",
      satOpening: "",
      satClosing: "",
      sunOpening: "",
      sunClosing: "",
      check: false,
      error: null,
      errorMsg: "",
    };
  },

  async mounted() {
    this.userID = firebase.auth().currentUser.uid;
    console.log(this.userID);
    await firebase
      .storage()
      .ref()
      .child("/user/qr/" + this.userID)
      .getDownloadURL()
      .catch((error) => {
        console.log(error);
        this.check = true;
      });

    await db
      .collection("users")
      .doc(this.userID)
      .get()
      .then((doc) => {
        this.shopDesc = doc.data().shopDesc ? doc.data().shopDesc : "";
        if (doc.data().openingDetails) {
          const ref = doc.data().openingDetails;
          this.monOpening = ref.Monday.opening;
          this.monClosing = ref.Monday.closing;
          this.tuesOpening = ref.Tuesday.opening;
          this.tuesClosing = ref.Tuesday.closing;
          this.wedOpening = ref.Wednesday.opening;
          this.wedClosing = ref.Wednesday.closing;
          this.thursOpening = ref.Thursday.opening;
          this.thursClosing = ref.Thursday.closing;
          this.friOpening = ref.Friday.opening;
          this.friClosing = ref.Friday.closing;
          this.satOpening = ref.Saturday.opening;
          this.satClosing = ref.Saturday.closing;
          this.sunOpening = ref.Saturday.opening;
          this.sunClosing = ref.Saturday.closing;
        }
      });
  },

  methods: {
    async register() {
      var storageRef = firebase.storage().ref();
      var qrURL = "/user/qr/" + firebase.auth().currentUser.uid;
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
        if (!Array.isArray(this.qrModel)) {
          await storageRef.child(qrURL).put(this.qrModel);
        }
        //image handling end
        const dataBase = db.collection("users").doc(this.userID);
        await dataBase.update({
          shopDesc: this.shopDesc,
          openingDetails: {
            Monday: { opening: this.monOpening, closing: this.monClosing },
            Tuesday: { opening: this.tuesOpening, closing: this.tuesClosing },
            Wednesday: { opening: this.wedOpening, closing: this.wedClosing },
            Thursday: {
              opening: this.thursOpening,
              closing: this.thursClosing,
            },
            Friday: { opening: this.friOpening, closing: this.friClosing },
            Saturday: { opening: this.satOpening, closing: this.satClosing },
            Sunday: { opening: this.sunOpening, closing: this.sunClosing },
          },
        });
        this.$router.push({ name: "AuthHome" }); //push user to homepage aft auth
        return;
      } else {
        this.error = true;
        this.errorMsg = "Please fill out the required fields!";
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

.inputs,
.uploads {
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
