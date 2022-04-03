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
          ><v-btn :to="shopRoute" text plain dense class="pa-0"
            ><h3>@{{ shopName }}</h3></v-btn
          ></v-row
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
            <v-chip
              class="tags"
              v-for="(tag, index) in tags"
              :key="index"
              label
            >
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
        v-for="(review, index) in reviewDetails"
        :key="index"
        class="review-spacing"
      >
        <v-row class="grey lighten-3 rounded-lg">
          <v-col :cols="0" class="mr-0 reduce-space-circle">
            <div class="circle">{{ review.name.toUpperCase() }}</div>
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
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      transition="scale-transition"
    >
      {{ snackbar.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import RatingStars from "../components/RatingStars.vue";
import image from "../assets/background.png";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {
  name: "Listing",
  data() {
    return {
      fullListing: null,
      image: image,
      imageURL: "",
      shopName: "",
      productName: "",
      productDetails: "",
      rating: 0,
      numReviews: 0,
      price: 0,
      productDescription: "",
      tags: [],
      openingHours: [],
      makerDetails: "",
      storeDetails: "",
      reviewDetails: [],
      userMatch: false,
      seller: false,
      snackbar: {
        show: false,
        msg: null,
        color: null,
      },
    };
  },
  async mounted() {
    const user = firebase.auth().currentUser.uid;
    this.userMatch = this.$route.params.user === user;
    const information = await this.retrieveUserType(user);
    this.seller = information;
    if (!this.userMatch) {
      db.collection("users")
        .doc(this.$route.params.user)
        .update({ viewCount: firebase.firestore.FieldValue.increment(1) });
    }
    await db
      .collection("listings")
      .doc(this.$route.params.id)
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
      })
      .then(
        db
          .collection("users")
          .doc(this.$route.params.user)
          .get()
          .then((doc) => {
            const data = doc.data();
            this.shopName = data.shopName;
            this.makerDetails = data.shopDesc
              ? data.shopDesc
              : "The shop owner has yet to upload his details!";
            this.storeDetails = data.address;
            this.convertFullOpeningDetails(data.openingDetails);
            // this.openingHours = data.openingHours;
          })
      )
      .then(() => {
        const storageRef = firebase.storage().ref();
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

  methods: {
    async retrieveUserType(id) {
      const docRef = db.collection("users").doc(id);
      var sellerType = null;
      await docRef.get().then((doc) => {
        sellerType = doc.data().seller;
      });
      return sellerType;
    },
    convertFullOpeningDetails(details) {
      const final = [];
      for (var i in details) {
        var insertion;
        if (i == "Monday") {
          insertion = 0;
        } else if (i == "Tuesday") {
          insertion = 1;
        } else if (i == "Wednesday") {
          insertion = 2;
        } else if (i == "Thursday") {
          insertion = 3;
        } else if (i == "Friday") {
          insertion = 4;
        } else if (i == "Saturday") {
          insertion = 5;
        } else if (i == "Sunday") {
          insertion = 6;
        }
        final[insertion] = this.transformTimeEntry(details[i]);
      }
      this.openingHours = final;
    },
    transformTimeEntry(details) {
      if (details.opening == "" || details.closing == "") {
        return "Closed";
      } else {
        const firstTime = this.convertTime(details.opening);
        const secondTime = this.convertTime(details.closing);
        return firstTime + " - " + secondTime;
      }
    },
    convertTime(time) {
      var H = +time.substr(0, 2);
      var h = H % 12 || 12;
      h = h < 10 ? "0" + h : h;
      var ampm = H < 12 || H === 24 ? "AM" : "PM";
      time = h + time.substr(2, 3) + ampm;
      return time;
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
            x.name + x.storeName === addListing.name + addListing.storeName
          );
        });
        if (duplicateCheck.length > 0) {
          this.snackbar = {
            color: "error",
            show: true,
            msg: "You have already added this item to your cart!",
          };
          return;
        }
        cartRef.push(addListing);
        localStorage.setItem("cart", JSON.stringify(cartRef));
        this.snackbar = {
          color: "success",
          show: true,
          msg: "Added to your cart!",
        };
      } else {
        localStorage.setItem("cart", JSON.stringify([addListing]));
        this.snackbar = {
          color: "success",
          show: true,
          msg: "Added to your cart!",
        };
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
    shopRoute() {
      return "/Profile/" + this.$route.params.user;
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
