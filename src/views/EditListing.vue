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
          ></v-file-input>
          <v-img height="570" :src="image" @click="changePicture"></v-img>
        </v-col>

        <v-col :cols="7">
          <v-form>
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader><strong>Product Name</strong></v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    dense
                    :value="productName"
                    required
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
                    :value="quantityDesc"
                    required
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
                    :value="price"
                    prefix="$"
                    required
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
                    :items="tags"
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
                    @click="placeHolder"
                  >
                    Save Changes
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

export default {
  name: "EditListing",
  data() {
    return {
      image: ListingImage,
      productName: "Almond Financiers",
      quantityDesc: "Box of 8 Bite-Sized Financiers",
      price: "13.90",
      tags: ["North-East", "Serangoon", "Almonds", "Home Baked"],
      productDesc:
        "These delicate almond financiers are made fresh to-order, using premium ingredients imported from Brittany, France. They are buttery and fluffy, pairing exceptionally well with a warm cup of earl grey tea.",
    };
  },
  methods: {
    changePicture() {
      document.getElementById("pic-input").click();
    },
    placeHolder() {},
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
