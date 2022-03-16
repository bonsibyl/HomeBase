<template>
  <v-container>
    <v-row>
      <!-- add route return to listing -->
      <v-col :cols="2">
        <v-btn
          @click="goBack"
          block
          color="#B4B4B4"
          class="mr-4 black--text"
          text
        >
          <v-icon dark left> mdi-arrow-left </v-icon>
          Return to Listings
        </v-btn>
      </v-col>
      <v-col :cols="2" class="offset-md-8">
        <v-btn
          block
          color="#6B7855"
          class="white--text"
          :to="{ name: 'EditListing', params: { id: this.$route.params.id } }"
          v-if="userMatch"
        >
          Edit Listing
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="5">
        <v-img height="455" :src="image"></v-img>
      </v-col>
      <v-col :cols="6" class="offset-md-1">
        <v-row
          ><h3>{{ shopName }}</h3></v-row
        >
        <v-row
          ><h1>{{ productName }}</h1></v-row
        >
        <v-row class="grey--text"
          ><h3>{{ productDetails }}</h3></v-row
        >
        <v-row></v-row>
        <v-row class="rating-stars">
          <RatingStars :numReviews="numReviews" :rating="rating"
        /></v-row>
        <v-row>
          <h2 v-if="price % 1 == 0">${{ price }}.00</h2>
          <h2 v-else>${{ price }}0</h2></v-row
        >
        <v-row class="add-to-cart-btn">
          <v-col :cols="7">
            <v-btn
              block
              color="#A76E2A"
              class="mr-4 white--text"
              @click="addListingToCart"
              v-if="!seller"
            >
              <v-icon dark left> mdi-cart </v-icon>
              Add to Cart
            </v-btn>
          </v-col></v-row
        >
        <v-row>{{ productDescription }}</v-row>
        <v-row class="store-tags">
          <v-chip-group active-class="">
            <v-chip class="tags" v-for="tag in tags" :key="tag" label>
              {{ tag }}
            </v-chip>
          </v-chip-group></v-row
        >
      </v-col>
    </v-row>
    <br />
    <hr />
    <v-row class="store-details">
      <v-col :cols="6">
        <v-row>
          <v-col :cols="12">
            <v-subheader
              ><strong><u>Opening Hours</u></strong></v-subheader
            >
          </v-col>
          <v-col :cols="5">
            <v-row>Monday</v-row>
            <v-row>Tuesday</v-row>
            <v-row>Wednesday</v-row>
            <v-row>Thursday</v-row>
            <v-row>Friday</v-row>
            <v-row>Saturday</v-row>
            <v-row>Sunday</v-row>
          </v-col>
          <v-col :cols="7">
            <v-row v-for="(hours, index) in openingHours" :key="index">{{
              hours
            }}</v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="6">
        <v-row>
          <v-col :cols="12">
            <v-subheader
              ><strong><u>The Maker</u></strong></v-subheader
            >
          </v-col>
          <v-row>{{ makerDetails }}</v-row>
        </v-row>

        <v-row>
          <v-col :cols="12">
            <v-subheader
              ><strong><u>Store Details</u></strong></v-subheader
            >
          </v-col>
          <v-row>{{ storeDetails }}</v-row>
        </v-row>
      </v-col>
    </v-row>
    <br />
    <br />
    <hr />
    <br />

    <v-row align="center">
      <v-col :cols="12" class="review-header" v-if="reviewDetails"
        ><strong>Customer Reviews</strong></v-col
      >
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
    <br />
    <br />

    <!-- REVIEW COMPONENT BELOW -->
  </v-container>
</template>

<script>
import RatingStars from "../components/RatingStars.vue";
import image from "../assets/background.png";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {
  name: "Listing",
  async mounted() {
    const user = firebase.auth().currentUser.uid;
    this.userMatch = this.$route.params.user === user;
    const information = await this.retrieveUserType(user);
    this.seller = information;
    db.collection("listings")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        const allData = doc.data();
        this.fullListing = allData;
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
  data() {
    return {
      fullListing: null,
      image: image,
      imageURL: "",
      shopName: "",
      productName: "",
      productDetails: "",
      rating: 3,
      numReviews: 5,
      price: 10.0,
      productDescription: "",
      tags: [],
      openingHours: [
        "10:00am - 6:30pm",
        "10:00am - 6:30pm",
        "10:00am - 6:30pm",
        "10:00am - 6:30pm",
        "10:00am - 6:30pm",
        "10:00am - 6:30pm",
        "10:00am - 6:30pm",
      ],
      makerDetails:
        "Nutty Buttery Bakery is a small home-based bakery established in 2019. We specialise in French desserts, such as financiers, macarons and eclairs. We also bake whole cakes to-order.",
      storeDetails: "",
      reviewDetails: [],
      userMatch: false,
      seller: false,
    };
  },
  methods: {
    async retrieveUserType(id) {
      const docRef = db.collection("users").doc(id);
      var sellerType = null;
      await docRef.get().then((doc) => {
        sellerType = doc.data().seller;
      });
      return sellerType;
    },
    goBack() {
      this.$router.go(-1);
    },
    addListingToCart() {
      const addListing = { ...this.fullListing, qty: 1 };
      const cartRef = JSON.parse(localStorage.getItem("cart"));
      this.$store.commit("checkCartUpdateFunc");
      if (cartRef) {
        const duplicateCheck = cartRef.filter((x) => {
          return (
            x.productName + x.storeName ===
            addListing.productName + addListing.storeName
          );
        });
        const diffStoreCheck = cartRef.filter((x) => {
          return x.storeName !== addListing.storeName;
        });
        if (duplicateCheck.length > 0) {
          console.log(cartRef);
          alert("You have already added this item to your cart!");
          return;
        }
        if (diffStoreCheck.length > 0) {
          alert("You can only add items from the same store to your cart!");
          return;
        }
        cartRef.push(addListing);
        localStorage.setItem("cart", JSON.stringify(cartRef));
      } else {
        localStorage.setItem("cart", JSON.stringify([addListing]));
      }
    },
  },
  components: {
    RatingStars,
  },
  computed: {
    isSeller() {
      return this.$store.state.isSeller;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-subheader {
  font-size: 1.2em;
  position: relative;
  left: -5%;
}
.rating-stars {
  padding-top: 10px;
  padding-bottom: 10px;
}
.add-to-cart-btn {
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
  left: -1%;
}
.store-tags {
  padding-top: 50px;
}
.store-details {
  position: relative;
  left: 1%;
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
</style>
