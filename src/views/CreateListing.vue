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
                    @click="placeHolder"
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
import db from "../firebase/firebaseInit";
export default {
  name: "CreateListing",
  data() {
    return {
      image: ListingImage,
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
          (v && v.length <= 30) ||
          "Description must be less than 250 characters",
      ],
      priceRules: [
        (v) => !!v || "Price is required",
        (v) => /^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$/.test(v) || "Invalid Price",
      ],
    };
  },
  methods: {
    changePicture() {
      document.getElementById("pic-input").click();
    },
    placeHolder() {},
    validate() {
      if (!this.$refs.form.validate()) {
        return;
      }
      db.collection("listings")
        .add(
          {
            name: this.productName,
            qtyDesc: this.quantityDesc,
            desc: this.productDesc,
            price: this.price,
            tags: this.tags,
            storeName: this.$route.params.id,
            dateCreated: new Date(),
            ReviewScoreTotal: 0,
            ReviewScoreCount: 0,
            viewCount: 0,
            imageRef: "",
          },
          { merge: true }
        )
        .then(
          this.$router.push({
            name: "Profile",
            params: { id: this.$route.params.id },
          })
        )
        .catch((error) => {
          alert(error);
        });
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
