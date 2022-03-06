<template>
  <v-app>
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1">
        <div id="content">
          <v-row id="row1">
            <v-col cols="auto" id="imgupload">
              <v-col cols="auto">
                <v-file-input
                  prepend-icon="mdi-camera"
                  accept="image/png, image/jpeg,"
                  v-model="image"
                  placeholder="Upload A Photo"
                  dense
                  hide-details
                  solo
                  type="file"
                  class="input"
                  @change="onUpload"
                  outlined
                />
              </v-col>
              <v-col class="pt-0" cols="auto">
                <v-img
                  :src="imageUrl"
                  style="border: 1px dashed #ccc; min-height: 400px; max-height:400px; min-width:450px; max-width:550px;"
                />
              </v-col>
            </v-col>
            <v-col id="hours">
              <v-row class="hourrow">
                <v-col class="pt-0">
                  <h1 class="font-weight-bold">Operating Hours:</h1>
                </v-col>
                <v-col> </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Monday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.mon"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Tuesday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.tues"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Wednesday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.wed"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Thursday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.thurs"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Friday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.fri"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Saturday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.sat"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols="4">
                  <h3 class="text--secondary">Sunday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="hours.sun"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row id="row2">
            <v-col>
              <v-row>
                <v-col class="pb-0 pt-0">
                  <h3 class="font-weight-bold ">Shop Name:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="shop.name"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-spacer />
              <v-row>
                <v-col class="pb-0 pt-0">
                  <h3 class="font-weight-bold">Contact Number:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="shop.number"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col class="pb-0 pt-0 ml-6">
                  <h3 class="font-weight-bold">Business Email:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="shop.email"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-spacer />
              <v-row>
                <v-col class="pb-0 pt-0 ml-6">
                  <h3 class="font-weight-bold">Address:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="shop.address"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <h3 class="font-weight-bold pb-2">About you:</h3>
          <v-textarea
            dense
            v-model="shop.about"
            counter
            maxlength="250"
            full-width
            filled
          ></v-textarea>
          <v-divider></v-divider>
          <h3 class="font-weight-bold pb-2">Store Tags:</h3>
          <v-combobox
            dense
            v-model="tags"
            :items="tags"
            multiple
            small-chips
            filled
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
                close
                close-icon="mdi-delete"
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
          <v-divider></v-divider>
          <v-row id="socials">
            <v-col>
              <v-row>
                <v-col class="pb-0">
                  <h3 class="font-weight-bold ">Instagram:</h3>
                </v-col>
                <v-col class="pb-0">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="socials.instagram"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-spacer />
              <v-row>
                <v-col class="pb-0 ">
                  <h3 class="font-weight-bold">Facebook:</h3>
                </v-col>
                <v-col class="pb-0 ">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="socials.facebook"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col class="pb-0 ml-6">
                  <h3 class="font-weight-bold">Twitter:</h3>
                </v-col>
                <v-col class="pb-0 ">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="socials.twitter"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-spacer />
              <v-row>
                <v-col class="pb-0 ml-6">
                  <h3 class="font-weight-bold">TikTok:</h3>
                </v-col>
                <v-col class="pb-0 ">
                  <v-text-field
                    filled
                    rounded
                    dense
                    :value="socials.tiktok"
                    full-width
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row id="btnrow">
            <v-col
              cols="8"
              class="d-flex pt-0 justify-center align-content-center mb-6"
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
            <v-col cols="4" class="d-flex pt-0 justify-center mb-6">
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
        </div>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "EditShop",
  data() {
    return {
      image: undefined,
      imageUrl: "",
      hours: {
        mon: "10:00am - 6.30pm",
        tues: "10:00am - 6.30pm",
        wed: "10:00am - 6.30pm",
        thurs: "10:00am - 6.30pm",
        fri: "10:00am - 6.30pm",
        sat: "-",
        sun: "-",
      },
      shop: {
        name: "Simply Cakery",
        number: "+65 8234 1866",
        email: "simple.cakery@gmail.com",
        address: "8 College Ave East",
        about:
          "Simply Cakery is a Home Based Bakery helmed by a mother-daughter duo. Their online bakery started when founder Melissa decided to pursue her love of baking with the additional time spent at home during the Singapore's circuit breaker period.",
      },
      socials: {
        instagram: "@simplycakery",
        facebook: "Simply Cakery",
        twitter: "@simplycakery",
        tiktok: "@simplycakery",
      },
      tags: ["North-East", "Serangoon", "Dessert", "Cake"],
    };
  },
  methods: {
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onUpload(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
  },
};
</script>

<style>
#sheet {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
}
#content {
  margin: 0 5vw 0 5vw;
}
#hours {
  margin-top: 1vh;
}
.v-divider {
  margin: 2vh 0 2vh 0;
}
</style>
