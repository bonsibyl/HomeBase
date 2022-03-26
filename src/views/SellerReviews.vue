<template>
  <v-app>
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="loading" />

    <v-navigation-drawer app absolute color="#f5f5f5">
      <v-list class="pt-0">
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

        <v-col v-show="ListingResults.length === 0">
          <h2 class="font-weight-bold">No results found :(</h2>
        </v-col>
        <v-card v-for="result in ListingResults" :key="result.name" cols="4">
          <div class="listingInfo">
            <v-img class="listingImg" :src="result.imageURL"></v-img>
            <h3 class="listingDesc" v-if="result.ReviewScoreCount > 0">
            {{result.name}}<br/>
            ${{result.price}}, {{result.qtyDesc}}<br/>
            Total Reviews: {{result.ReviewScoreCount}}<br/>
            Average Rating: 
            {{(result.ReviewScoreTotal / result.ReviewScoreCount).toFixed(2)}}
            <v-icon color="yellow darken-2">mdi-star</v-icon>
            </h3>

            <h3 class="listingDesc" v-else>
            {{result.name}}<br/>
            ${{result.price}}, {{result.qtyDesc}}<br/>
            Total Reviews: {{result.ReviewScoreCount}}<br/>
            Average Rating: -
            </h3>
          </div>

            <v-col
              :cols="12"
              v-for="review in result.Reviews"
              :key="review.name"
              class="review-spacing"
            >
              <v-row class="grey lighten-3 rounded-lg">
                <v-col :cols="0" class="mr-0 reduce-space-circle">
                  <div class="circle">{{ review.name.toUpperCase() }}</div>
                </v-col>
                <h4 :cols="0" class="pt-md-6 ml-0">
                  <RatingStars :rating="review.rating" :isReview="true" />
                </h4>
                <v-col :cols="11">
                  <h3 class="title">{{ review.title }}</h3>
                  </v-col>
                <v-col :cols="12"><p class="desc">{{ review.description }}</p></v-col>
              </v-row>
            </v-col>

        </v-card>
    </v-container>
  </v-app>
</template>

<script>
import RatingStars from "../components/RatingStars.vue";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

export default {
  props: ["listingID"],
  components: {
    Modal,
    Loading,
    RatingStars,
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

.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #90caf9;
  text-align: center;
  padding: 12px;
}

.reduce-space-circle {
  max-width: 70px;
}
.review-spacing {
  padding: 20px;
}
.review-header {
  color: #6f4411;
  font-size: 1.2em;
}

.v-card {
  padding: 2%;
  margin-bottom: 1%;
}

.listingImg {
  width: 110px;
  height: 110px;
  padding: 20px;
  margin-left: 10px;
  margin-bottom: 15px;
}

.listingDesc {
  float: right;
  margin-left: 20px;
}

.listingInfo {
  display: inline-flex;
}

.v-icon {
  margin-left: -1%;
  margin-top: -1.5%;
}

.title {
  margin-top: -15px;
  margin-bottom: -10px;
}

.desc {
  margin-top: -10px;
  margin-bottom: 5px;
}
</style>
