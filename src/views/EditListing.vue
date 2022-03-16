<template>
  <div class="edit-form">
    <v-container>
      <v-row>
        <v-col :cols="5">
          <!-- settle file handling -->
          <v-file-input
            id="pic-input"
            class="hide-input"
            accept="image/png, image/jpeg, image/bmp"
            v-model="uploaded"
            @change="onUpload"
          ></v-file-input>
          <v-img height="570" :src="image" @click="changePicture"></v-img>
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
                    @click="validate"
                  >
                    Save Changes
                  </v-btn>
                </v-col>
                <v-col :cols="4" class="d-flex justify-center mb-6">
                  <v-btn
                    block
                    color="#B4B4B4"
                    class="white--text"
                    @click="cancelButton()"
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
  </div>
</template>

<script>
import ListingImage from "../assets/background.png";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {
  name: "EditListing",
  data() {
    return {
      image: ListingImage,
      imageURL: "",
      uploaded: null,
      productName: "Almond Financiers",
      quantityDesc: "Box of 8 Bite-Sized Financiers",
      price: "13.90",
      tags: ["North-East", "Serangoon", "Almonds", "Home Baked"],
      productDesc:
        "These delicate almond financiers are made fresh to-order, using premium ingredients imported from Brittany, France. They are buttery and fluffy, pairing exceptionally well with a warm cup of earl grey tea.",
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
    };
  },
  mounted() {
    db.collection("listings")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        const allData = doc.data();
        this.productName = allData.name;
        this.quantityDesc = allData.qtyDesc;
        this.price = allData.price;
        this.productDesc = allData.desc;
        this.tags = allData.tags;
        this.imageURL = allData.imageRef;
      })
      .then(() => {
        const storageRef = firebase.storage().ref();
        console.log(this.imageURL);
        storageRef
          .child(this.imageURL)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.image = url;
          })
          .catch((error) => {
            console.log(error);
          });
      });
  },
  methods: {
    changePicture() {
      document.getElementById("pic-input").click();
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
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
      var imageUpload = this.uploaded;
      var listingName = this.$route.params.user;
      if (this.uploaded) {
        storageRef
          .child(this.imageURL)
          .delete()
          .then(() => {
            storageRef
              .child("listings/" + this.productName + listingName)
              .put(imageUpload);
          })
          .catch(() => {
            storageRef
              .child("listings/" + this.productName + listingName)
              .put(imageUpload);
          });
      }

      db.collection("listings")
        .doc(this.$route.params.id)
        .update({
          name: this.productName,
          qtyDesc: this.quantityDesc,
          desc: this.productDesc,
          price: parseInt(this.price),
          tags: this.tags,
          imageRef: this.uploaded
            ? "listings/" + this.productName + this.$route.params.user
            : this.imageURL,
        })
        .then(
          this.$router.push({
            name: "Profile",
            params: { id: this.$route.params.user },
          })
        )
        .catch((error) => {
          alert(error);
        });
      alert("Listing edited");
    },
  },
  computed: {
    cancelButton() {
      return this.$router.go(-1);
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
