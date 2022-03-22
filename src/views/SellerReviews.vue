<template>
  <v-app>
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
      <v-row align="center">
        <!-- <v-col
          :cols="12"
          v-for="result in ListingResults"
          :key="result"
          class="review-spacing"
        > -->
        <v-col
          :cols="12"
          v-for="result in reviewDetails"
          :key="result"
          class="review-spacing"
        >
          <v-row class="grey lighten-3 rounded-lg">
            <v-col :cols="0" class="mr-0 reduce-space-circle">
              <div class="circle">{{ result.name.toUpperCase() }}</div>
            </v-col>
            <v-col :cols="11" class="pt-md-6 ml-0">
              <RatingStars :rating="result.rating" :isReview="true" />
            </v-col>
            <v-col :cols="12"
              ><strong>{{ result.title }}</strong></v-col
            >
            <v-col :cols="12">{{ result.description }}</v-col>
          </v-row>
        </v-col>
        <!-- </v-col> -->
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import RatingStars from "../components/RatingStars.vue";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {

  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview/:id"],
      ["Orders", "/sellerordermanagement/:id"],
      ["Reviews", "/sellerreviews/:id"],
      ["Analytics", "/dashboard/:id"],
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
    async mounted() {
    const user = firebase.auth().currentUser.uid;
    this.userMatch = this.$route.params.id === user;
    const information = await this.retrieveUserType(this.$route.params.id);
    this.seller = information;
    if (this.seller) {
      const listings = await this.retrieveSellerListings(this.$route.params.id);
      for (let i = 0; i < listings.length; i++) {
        var ref = listings[i];
        db.collection("listings")
      .doc(ref)
      .get()
      .then((doc) => {
        const allData = doc.data();
        this.fullListing = allData;
        this.productName = allData.name;
        this.productDetails = allData.qtyDesc;
        this.rating = allData.ReviewScoreCount
          ? Math.round(allData.ReviewScoreTotal / allData.ReviewScoreCount)
          : 0;
        this.numReviews = allData.ReviewScoreCount;
        this.price = allData.price;
        this.productDescription = allData.desc;
        this.tags = allData.tags;
        this.reviewDetails = allData.Reviews;
        this.imageURL = allData.imageRef;
      });
      }
      this.ListingResults = listings;
      console.log(this.ListingResults);
    }

  },
  components: {
    RatingStars,
  },
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
  },
  computed: {
    checkRoute() {
      return this.$route.params.id;
    },
  }
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
