<template>
  <div class="landing-container">
    <div v-if="$store.state.seller">
        <div class="landing-rectangle">
        <v-container>
          <strong class="supporting-header">Welcome back to Homebase!</strong>

          <p class="supporting-text">
            How did your shop fare this week? <br />
            Take a look at your analytics dashboard.
          </p>
          <router-link
            :to="{ name: 'Dashboard', params: { id: this.$store.state.profileId }}"
            
            tag="button"
            class="landing-register-button"
          >
            View Shop Analytics
          </router-link>
        </v-container>
      </div>
      <v-container></v-container>
      <v-container class="landing-overview">
        <h1 class="overview-title">Today's Order Overview</h1>
        <v-data-table :headers="headers" :items="fireorders">
        </v-data-table>
      </v-container>
    </div>
    <div v-else>
      <div class="landing-rectangle">
        <strong class="supporting-header">Welcome back to Homebase!</strong>
        <p class="supporting-text">
          With over 100 reputable small local food businesses on our platform,
          there is sure to be an option for you.
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
                      <v-card-title class="font-weight-medium pt-0">{{
                        result.name
                      }}</v-card-title>
                      <v-card-subtitle class="text-left py-0">By {{
                        result.shopName
                      }}</v-card-subtitle>
                      <v-card-subtitle class="text-left pt-0"
                        >{{ result.qtyDesc }}
                        <br />
                        {{ "$" + result.price }}</v-card-subtitle
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
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";
export default {
  name: "Landing",
  data: () => ({
    ListingResults: [],
    headers: [
      { text: "Item", value: "item" },
      //{ text: "Batch No.", value: "batchno" },
      //{ text: "Total No. of Pieces", value: "pieceno" },
      { text: "Total no. of Units", value: "unitno" },
      { text: "Price per Unit", value: "perunitprice" },
      { text: "Total Earnings", value: "earnings" },
    ],
    orders: [
      {
        item: "Almond Financiers",
        batchno: "1",
        pieceno: "40",
        unitno: "5",
        perunitprice: "$13.90",
        earnings: "$69.50",
      },

      {
        item: "Chocolate Macarons",
        batchno: "1",
        pieceno: "36",
        unitno: "2",
        perunitprice: "$20.90",
        earnings: "$41.80",
      },

      {
        item: "Almond Financiers",
        batchno: "2",
        pieceno: "16",
        unitno: "2",
        perunitprice: "$13.90",
        earnings: "$27.80",
      },

      {
        item: "Blueberry Muffins",
        batchno: "1",
        pieceno: "6",
        unitno: "2",
        perunitprice: "$12.90",
        earnings: "$25.80",
      },
    ],
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

  .landing-overview {
    background-color: rgba(255,255,255, 0.7);
    width: 100%;
    .overview-title {
      text-align:left;
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
