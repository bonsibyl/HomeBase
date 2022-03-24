<template>
  <v-app>
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="loading" />

    <v-navigation-drawer app absolute>
      <v-list>
        <v-list-item
          v-for="[page, route] in pages"
          :key="page"
          link
          :to="route + checkRoute"
        >
          <v-list-item-content>
            {{ page }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container class="dashboardContainer">
      <h1 style="text-align: left">Shop Reviews</h1>
      <hr />
      <br />

      <v-row>
        <v-col v-show="ListingResults.length === 0">
          <h2 class="font-weight-bold">No results found :(</h2>
        </v-col>
        <v-col v-for="result in ListingResults" :key="result.name" cols="4">
          <v-card
            class="rounded-lg test"
            min-width="150"
            min-height="100"
            height="400"
            hover
            @click="showModal"
          >
            <v-img
              gradient="to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(132, 131, 131, 0.8) 100%"
              class="white--text align-end bottom-gradient test"
              height="100%"
              :src="result.imageURL"
            >
              <v-card-title class="font-weight-medium">{{
                result.name
              }}</v-card-title>
              <v-card-subtitle class="py-0">{{
                result.qtyDesc
              }}</v-card-subtitle>
              <v-card-subtitle class="pt-0">{{
                "$" + result.price
              }}</v-card-subtitle>
            </v-img></v-card
          >
          <ReviewPopUp :listingID="ListingResults" />
        </v-col>
        <!-- </v-col> -->
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
//import RatingStars from "../components/RatingStars.vue";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";
import ReviewPopUp from "./ReviewPopUp.vue";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

export default {
  props: ["listingID"],
  components: {
    ReviewPopUp,
    Modal,
    Loading,
  },
  async mounted() {
    const user = firebase.auth().currentUser.uid;
    const listings = await this.retrieveSellerListings(user);
    for (let i = 0; i < listings.length; i++) {
      var ref = listings[i];
      var imageURL = await this.retrieveImage(ref.imageRef);
      listings[i]["imageURL"] = imageURL;
    }
    this.ListingResults = listings;
  },
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview/"],
      ["Orders", "/sellerordermanagement/"],
      ["Reviews", "/sellerreviews/"],
      ["Analytics", "/dashboard/"],
    ],
    ListingResults: [],
    reviewDetails: [],
    userMatch: false,
    seller: null,
    snackbar: {
      show: false,
      msg: null,
      color: null,
    },
  }),
  // async mounted() {
  // const user = firebase.auth().currentUser.uid;
  // this.userMatch = this.$route.params.id === user;
  // const information = await this.retrieveUserType(this.$route.params.id);
  // this.seller = information;
  // if (this.seller) {
  //   const listings = await this.retrieveSellerListings(this.$route.params.id);
  //   for (let i = 0; i < listings.length; i++) {
  //     var ref = listings[i];
  //     db.collection("listings")
  //   .doc(ref)
  //   .get()
  //   .then((doc) => {
  //     const allData = doc.data();
  //     this.fullListing = allData;
  //     this.productName = allData.name;
  //     this.productDetails = allData.qtyDesc;
  //     this.rating = allData.ReviewScoreCount
  //       ? Math.round(allData.ReviewScoreTotal / allData.ReviewScoreCount)
  //       : 0;
  //     this.numReviews = allData.ReviewScoreCount;
  //     this.price = allData.price;
  //     this.productDescription = allData.desc;
  //     this.tags = allData.tags;
  //     this.reviewDetails = allData.Reviews;
  //     this.imageURL = allData.imageRef;
  //   });
  //   }
  //   this.ListingResults = listings;
  //   console.log(this.ListingResults);
  // }

  //},
  // components: {
  //   RatingStars,
  // },
  methods: {
    async retrieveUserType(id) {
      const docRef = db.collection("users").doc(id);
      var sellerType = null;
      await docRef.get().then((doc) => {
        sellerType = doc.data().seller;
        if (sellerType) {
          this.storeName = doc.data().shopName;
        } else {
          this.buyerName = doc.data().firstName + " " + doc.data().lastName;
        }
        this.shopUsername = doc.data().username;
        this.email = doc.data().email;
        this.contactNo = doc.data().number;
        this.address = doc.data().address;
      });
      return sellerType;
    },
    async closeModal() {
      this.modalActive = !this.modalActive;
    },
    async showModal() {
      this.$modal.show("review");
    },

    async retrieveSellerListings(id) {
      const docRef = db.collection("listings").where("storeName", "==", id);
      var listings = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listings.push({ ...doc.data(), docID: doc.id });
        });
      });
      return listings;
    },
    async retrieveReviews(id) {
      const docRef = db.collection("listings").where("storeName", "==", id);
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
  computed: {
    checkRoute() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
#appcontainer {
  background: url("../assets/SellerBackground.png");
  background-size: cover;
}

hr {
  margin-top: 1%;
}

.dashboardContainer {
  width: 80%;
  margin-top: 2%;
  margin-left: 300px;
}

.v-data-table::v-deep th {
  font-size: 17px !important;
}
.v-data-table::v-deep td {
  font-size: 17px !important;
}
</style>
