<template>
  <modal
    name="screenshot"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="550"
  >
    <div class="box">
      <div class="partition" id="partition-register">
        <div class="partition-title">
          <img class="paylahQR" :src="qrPic" alt="" />
          <br />
          We have received your order with thanks! <br /><br />
          To proceed, please upload a screenshot of your PayLah! payment to
          confirm your order. <br />
        </div>
        <div class="form">
          <v-file-input
            class="fileInput"
            label="Upload Screenshot"
            filled
            full-width
            prepend-icon="mdi-camera"
          ></v-file-input>
        </div>
        <div class="button-div">
          <button id="submit-btn" @click.prevent="submit">Submit</button>
          <button id="cancel-btn" @click.prevent="cancel">Go Back</button>
          <div style="margin-bottom: 20px"></div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import firebase from "firebase/app";
const MODAL_WIDTH = 656;
export default {
  components: {},
  name: "ScreenshotUpload",
  data() {
    return {
      qrPic: "",
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  props: {
    qrRoute: String,
  },
  methods: {
    submit() {
      alert("You have successfully submitted your payment screenshot");
    },
    cancel() {
      this.$modal.hide("screenshot");
    },
  },
  computed: {
    checkQRUpdate() {
      return this.$store.state.checkQRUpdate;
    },
  },
  watch: {
    async checkQRUpdate(oldCount, newCount) {
      console.log(oldCount + " " + newCount);
      this.qrPic = await firebase
        .storage()
        .ref()
        .child("/user/qr/" + this.qrRoute)
        .getDownloadURL();
    },
  },
};
</script>
<style lang="scss">
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}

button {
  cursor: pointer;
  padding: 12px 24px;
  border: none;
}

#submit-btn {
  background-color: #336632;
  color: white;
  font-size: 12px;
  width: 30%;
}

#cancel-btn {
  background-color: #7a7a7a;
  color: white;
  font-size: 12px;
  width: 30%;
}

.button-div {
  text-align: center;
}

.form {
  width: 70%;
  margin: auto;
}

.fileInput {
  button {
    background-color: white !important;
    padding: 0px !important;
    margin: 0px !important;
    min-width: 0px !important;
  }
}
.paylahQR {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
</style>
