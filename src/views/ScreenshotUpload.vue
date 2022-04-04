<template>
  <v-container>
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
              accept="image/png, image/jpeg, image/bmp"
              v-model="uploaded"
              :rules="imageRules"
            ></v-file-input>
          </div>
          <div class="button-div">
            <button id="submit-btn" @click="submit">Submit</button>
            <button id="cancel-btn" @click.prevent="cancel">Go Back</button>
            <div style="margin-bottom: 20px"></div>
          </div>
        </div>
      </div>
    </modal>
    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color"
      >{{ snackbar.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

const MODAL_WIDTH = 656;
export default {
  components: {},
  name: "ScreenshotUpload",
  data() {
    return {
      qrPic: "",
      OrderInfo: [],
      uploaded: [],
      imageRules: [
        (value) => !!value || "Image is required",
        (value) =>
          value.size < 2000000 || "Image size should be less than 2 MB!",
      ],
      snackbar: {
        show: false,
        msg: null,
        color: null,
      },
    };
  },
  // props: {
  //   orderRef: String,
  // },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  props: {
    qrRoute: String,
    orderRef: Object,
  },
  methods: {
    submit() {
      var storageRef = firebase.storage().ref();
      console.log(this.OrderInfo[0]);
      if (this.uploaded.size == null) {
          this.snackbar = {
          color: "error",
          show: true,
          msg: "Please upload a file!",
        };
      }
      if (this.uploaded.size > 0) {
        var imageUpload = this.uploaded;
        var upload = storageRef
          .child("orders/" + this.orderRef.docID)
          .put(imageUpload);
        // Listen for state changes, errors, and completion of the upload.
        upload.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                break;
              case "storage/canceled":
                break;
              case "storage/unknown":
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              this.$emit("changeProcessing", this.orderRef.docID);
              db.collection("orders").doc(this.orderRef.docID).update({
                status: "Processing",
                paymentImgRef: downloadURL,
              });
            });
          }
        );
        this.snackbar = {
          color: "success",
          show: true,
          msg: "You have successfully submitted your payment screenshot!",
        };
        this.$modal.hide("screenshot");
        //location.reload();
      }
      //location.reload();
    },
    cancel() {
      this.$modal.hide("screenshot");
    },
  },
  computed: {
    checkQRUpdate() {
      return this.$store.state.checkQRUpdate;
    },
    checkOrderUpdate() {
      return this.orderRef;
    },
  },
  watch: {
    async checkQRUpdate(oldCount, newCount) {
      console.log(oldCount + " " + newCount);
      await firebase
        .storage()
        .ref()
        .child("/user/qr/" + this.qrRoute)
        .getDownloadURL()
        .then((url) => {
          this.qrPic = url;
        })
        .catch((error) => {
          this.qrPic = error;
        });
    },
    checkOrderUpdate(newVal, oldVal) {
      this.OrderInfo = [this.orderRef];
      newVal = oldVal;
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
