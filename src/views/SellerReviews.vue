<template>
  <v-app>
    <v-navigation-drawer app absolute>
      <v-list>
        <v-list-item
          v-for="[page, route] in pages"
          :key="page"
          link
          :to="route"
        >
          <v-list-item-content>
            {{ page }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="dashboardContainer">
        <h1 style="text-align: left">Shop Reviews</h1>
        <hr />

        <v-row align="center">
          <v-col
            :cols="12"
            v-for="review in reviewDetails"
            :key="review"
            class="review-spacing"
          >
            <v-row class="grey lighten-3 rounded-lg">
              <v-col :cols="0" class="mr-0 reduce-space-circle">
                <div class="circle">{{ review.name }}</div>
              </v-col>
              <v-col :cols="11" class="pt-md-6 ml-0">
                <RatingStars :rating="review.rating" :isReview="true" />
              </v-col>
              <v-col :cols="12"
                ><strong>{{ review.title }}</strong></v-col
              >
              <v-col :cols="12">{{ review.description }}</v-col>
            </v-row>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RatingStars from "../components/RatingStars.vue";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {
  mounted() {
    db.collection("listings")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        const allData = doc.data();
        this.shopName = allData.storeName;
        this.productName = allData.name;
        this.productDetails = allData.qtyDesc;
        this.rating = allData.ReviewScoreCount
          ? Math.round(allData.ReviewScoreTotal / allData.ReviewScoreCount)
          : 0;
        this.numReviews = allData.ReviewScoreCount;
        this.price = allData.price;
        this.productDescription = allData.desc;
        this.tags = allData.tags;
        this.reviewDetails = allData.reviewDetails;
        this.imageURL = allData.imageRef;
      })
      .then(
        db
          .collection("users")
          .doc(this.$route.params.user)
          .get()
          .then((doc) => {
            const data = doc.data();
            this.shopName = data.shopName;
            this.makerDetails = data.makerDetails;
            this.storeDetails = data.address;
            this.openingHours = data.openingHours;
          })
      )
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
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview"],
      ["Orders", "/sellerordermanagement"],
      ["Reviews", "/sellerreviews"],
      ["Analytics", "/dashboard"],
    ],
  }),
  methods: {
    getLink(orderid) {
      return "/order" + orderid;
    },
  },
  components: {
    RatingStars,
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
  width: 93%;
  margin-top: 2%;
}

.v-data-table::v-deep th {
  font-size: 17px !important;
}
.v-data-table::v-deep td {
  font-size: 17px !important;
}
</style>