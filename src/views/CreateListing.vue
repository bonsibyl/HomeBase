<template>
  <div class="create-form">
    <v-container>
      <v-row>
        <v-col :cols="5">
          <!-- settle file handling -->
          <v-file-input
            id="pic-input"
            class="hide-input"
            accept="image/png, image/jpeg, image/bmp"
            v-model="uploaded"
            :rules="imageRules"
            @change="onUpload"
          ></v-file-input>
          <v-img height="570" :src="baseImage" @click="changePicture"></v-img>
        </v-col>

        <v-col :cols="7">
          <v-form ref="form" lazy-validation>
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader><strong>Product Name</strong></v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    dense
                    v-model="productName"
                    required
                    counter
                    maxlength="30"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader
                    ><strong>Quantity Description</strong></v-subheader
                  >
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    dense
                    v-model="quantityDesc"
                    required
                    counter
                    maxlength="30"
                    :rules="qtyRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader><strong>Price</strong></v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    dense
                    v-model="price"
                    prefix="$"
                    required
                    :rules="priceRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader><strong>Tags</strong></v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-combobox
                    dense
                    v-model="tags"
                    multiple
                    small-chips
                  ></v-combobox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader><strong> Product</strong></v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-textarea
                    dense
                    v-model="productDesc"
                    label="Description"
                    counter
                    maxlength="250"
                    :rules="descRules"
                    full-width
                    single-line
                  ></v-textarea>
                </v-col>
              </v-row>
              <br /><br />
              <br />
              <v-row>
                <v-col
                  :cols="8"
                  class="d-flex justify-center align-content-center mb-6"
                >
                  <v-btn
                    block
                    color="#6B7855"
                    class="mr-4 white--text"
                    @click="validate()"
                  >
                    Create Listing
                  </v-btn>
                </v-col>
                <v-col :cols="4" class="d-flex justify-center mb-6">
                  <v-btn
                    block
                    color="#B4B4B4"
                    class="white--text"
                    :to="cancelButton"
                  >
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
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
import ListingImage from "../assets/background.png";
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";

export default {
  name: "CreateListing",
  data() {
    return {
      baseImage: ListingImage,
      uploaded: [],
      productName: "",
      quantityDesc: "",
      price: "",
      tags: null,
      productDesc: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      qtyRules: [
        (v) => !!v || "Quantity Description is required",
        (v) =>
          (v && v.length <= 30) ||
          "Quantity description must be less than 30 characters",
      ],
      descRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length <= 250) ||
          "Description must be less than 250 characters",
      ],
      priceRules: [
        (v) => !!v || "Price is required",
        (v) => /^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$/.test(v) || "Invalid Price",
      ],
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
  methods: {
    changePicture() {
      document.getElementById("pic-input").click();
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.baseImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onUpload(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
    validate() {
      if (!this.$refs.form.validate()) {
        return;
      }
      var storageRef = firebase.storage().ref();
      if (this.uploaded.size > 0) {
        var imageUpload = this.uploaded;
        var upload = storageRef
          .child("listings/" + this.productName + this.$route.params.id)
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
            });
          }
        );
      }

      db.collection("listings")
        .add(
          {
            name: this.productName,
            qtyDesc: this.quantityDesc,
            desc: this.productDesc,
            price: parseInt(this.price),
            tags: this.tags,
            storeName: this.$route.params.id,
            shopName: this.shopName,
            dateCreated: new Date(),
            ReviewScoreTotal: 0,
            ReviewScoreCount: 0,
            viewCount: 0,
            imageRef:
              this.uploaded.size > 0
                ? "listings/" + this.productName + this.$route.params.id
                : "",
            Reviews: [],
          },
          { merge: true }
        )
        .then(() => {
          this.snackbar = {
            color: "success",
            show: true,
            msg: "Listing Created!",
          };
          setTimeout(() => this.$router.push({
            name: "Profile",
            params: { id: this.$route.params.id },
          }),1600);
        })
        .catch((error) => {
          this.snackbar = {
            color: "error",
            show: true,
            msg: error,
          };
        });
    },
  },
  computed: {
    cancelButton() {
      return "/Profile/" + this.$route.params.id;
    },
    shopName() {
      return this.$store.state.profileUsername;
    },
  },
};
</script>

<style scoped>
.v-subheader {
  font-size: 1.2em;
}
.hide-input {
  display: none;
}
</style>
