<template>
  <div class="landing-container">
    <div v-if="$store.state.seller" class="landing-rectangle">
      <strong class="supporting-header">Welcome back to Homebase!</strong>

      <p class="supporting-text">
        How did your shop fare this week? <br />
        Take a look at your analytics dashboard.
      </p>
      <router-link
        :to="{ name: 'Dashboard' }"
        tag="button"
        class="landing-register-button"
      >
        View Shop Analytics
      </router-link>
    </div>
    <div v-else class="landing-rectangle">
      <strong class="supporting-header">Welcome back to Homebase!</strong>
      <p class="supporting-text">
        Looking for something to satisfy your cravings?<br />
        Look no further, browse our bakes on offer today.
      </p>
      <router-link
        :to="{ name: 'Search' }"
        tag="button"
        class="landing-register-button"
        >View All Available Bakes!</router-link
      >
    </div>
    <v-container class="separator"></v-container>
    <div class="browse-new">
      <div class="content-buyer">
        <br />
        <h1 class="div-title">See what's new</h1>
        <br />
        <v-row>
          <v-col v-for="result in getListings" :key="result.name" cols="3">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card
                  class="rounded-lg"
                  min-width="150"
                  min-height="100"
                  height="350"
                  :to="'/listing/' + result.storeName + '/' + result.docID"
                  hover
                >
                  <v-img
                    gradient="to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(132, 131, 131, 0.8) 100%"
                    class="white--text align-end bottom-gradient"
                    height="100%"
                    :src="result.imageURL"
                  >
                    <v-img
                      gradient="to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(132, 131, 131, 0.8) 100%"
                      class="white--text align-end bottom-gradient"
                      height="100%"
                      :src="result.imageURL"
                    >
                      <v-card-title class="font-weight-medium">{{
                        result.name
                      }}</v-card-title>
                      <v-card-subtitle class="text-left"
                        >{{ result.qtyDesc}}
                        <br />
                        {{"$" + result.price }}</v-card-subtitle
                      >
                    </v-img>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#fff">
                        <v-btn color="#f5e4d0" class="black--text"
                          >View Listing</v-btn
                        >
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";
export default {
  name: "Landing",
  data: () => ({
    ListingResults: [],
  }),
  async mounted() {
    const listings = await this.retrieveListings();
    for (let i = 0; i < listings.length; i++) {
      var ref = listings[i];
      var imageURL = await this.retrieveImage(ref.imageRef);
      listings[i]["imageURL"] = imageURL;
    }
    this.ListingResults = listings;
  },
  computed: {
    isSeller() {
      return this.$store.state.isSeller;
    },
    getListings() {
      return this.ListingResults;
    },
  },
  methods: {
    async retrieveListings() {
      const docRef = db.collection("listings");
      var listings = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listings.push({ ...doc.data(), docID: doc.id });
        });
      });
      return listings;
    },
    async retrieveImage(imageRef) {
      const storageRef = firebase.storage().ref();
      var imageURL = "";
      await storageRef
        .child(imageRef)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          if (url) {
            imageURL = url;
          } else {
            imageURL =
              "https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_e0c99cb9-6dbf-427a-91b0-de7a3e115026_900x.jpg?v=1596376378";
          }
        })
        .catch((error) => {
          console.log(error);
          imageURL =
            "https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_e0c99cb9-6dbf-427a-91b0-de7a3e115026_900x.jpg?v=1596376378";
        });
      return imageURL;
    },
  },
};
</script>

<style lang="scss" scoped>
.landing-container {
  background-image: url("../assets/LandingBackground.png");
  background-size: cover;
  height: 92vh;
  text-align: center;
  display: block;

  .landing-rectangle {
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    display: flex;
    flex-direction: column;
    left: 10%;
    top: 10%;
    width: 30%;
    margin-top: 5%;
    .supporting-header {
      font-size: 25px;
      text-align: center;
    }
  }
  .landing-register-button {
    border-radius: 0px;
    height: 75px;
    background-color: #e89f71;
    color: #ffffff;
    font-weight: 600;
  }
  .div-title {
    text-align: left;
  }
  .separator {
    height: 25vh;
  }
  .browse-new {
    //margin-top: 198px;
    background-color: #fffbf5;
  }
  .content-buyer {
    margin: 0 5vw 0 5vw;
  }
}
</style>
