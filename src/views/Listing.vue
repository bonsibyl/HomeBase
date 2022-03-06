<template>
  <v-container>
    <v-row>
      <!-- add route return to listing -->
      <v-col :cols="2">
        <v-btn block color="#B4B4B4" class="mr-4 black--text" text>
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
            <v-btn block color="#A76E2A" class="mr-4 white--text">
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
      <v-col :cols="12" class="review-header"
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

export default {
  name: "Listing",
  data() {
    return {
      image: image,
      shopName: "@nuttybutterybakery",
      productName: "Almond Financiers",
      productDetails: "Box of 8 Bite-Sized Financiers",
      rating: 3,
      numReviews: 5,
      price: 10.0,
      productDescription:
        "These delicate almond financiers are made fresh to-order, using premium ingredients imported from Brittany, France. They are buttery and fluffy, pairing exceptionally well with a warm cup of earl grey tea.",
      tags: ["NorthEast", "Serangoon", "Dessert", "Cake"],
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
      storeDetails: "14 Serangoon Drive, Singapore 340214",
      test: this.$route.params.id,
      reviewDetails: [
        {
          name: "XY",
          rating: 3,
          title: "Rich and Nutty Goodness",
          description:
            "Their shop name reflects their bakes accurately - they are nutty and buttery in all the right ratios. The box is also extremely value for money!",
        },
        {
          name: "XY",
          rating: 3,
          title: "Rich and Nutty Goodness",
          description:
            "Their shop name reflects their bakes accurately - they are nutty and buttery in all the right ratios. The box is also extremely value for money!",
        },
        {
          name: "XY",
          rating: 3,
          title: "Rich and Nutty Goodness",
          description:
            "Their shop name reflects their bakes accurately - they are nutty and buttery in all the right ratios. The box is also extremely value for money!",
        },
      ],
    };
  },
  props: {},
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
