<template>
  <div class="listing-container">
    <div class="listing-buttons">
      <div class="back-button">
        <BackButton backButtonText="Back to your listings" />
      </div>
      <div v-if="isSeller" class="edit-button">
        <EditListingButton :route="test" />
      </div>
    </div>
    <br />
    <br />
    <div class="listing-info">
      <div class="listing-image">
        <img src="../assets/background.png" />
      </div>
      <div class="listing-details">
        <h3>{{ shopName }}</h3>
        <h1>{{ productName }}</h1>
        <h4 class="product-details">{{ productDetails }}</h4>
        <br />
        <RatingStars :numReviews="numReviews" :rating="rating" />
        <br />
        <h2 v-if="price % 1 == 0">${{ price }}.00</h2>
        <h2 v-else>${{ price }}0</h2>
        <br />
        <AddToCart />
        <br />
        <div class="item-desc-text">
          {{ productDescription }}
        </div>
        <br />
        <div>
          <!-- <ListingTags v-for="tag in tags" :key="tag" :tag="tag" /> -->
          <v-row justify="space-around">
            <v-col cols="12" sm="10" md="8">
              <v-sheet elevation="10" class="py-4 px-1">
                <v-chip-group mandatory active-class="primary--text">
                  <v-chip v-for="tag in tags" :key="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <div class="seller-info">
      <div class="opening-hours">
        <OpeningHours :OpeningHours="openingHours" />
      </div>
      <div class="seller-details">
        <div class="maker-details">
          <strong><u>The Maker</u></strong>
          <p>{{ makerDetails }}</p>
        </div>
        <br />
        <div class="store-details">
          <strong><u>Store Details</u></strong>
          <p>{{ storeDetails }}</p>
        </div>
      </div>
    </div>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <div class="review-info"></div>
  </div>
</template>

<script>
import BackButton from "../components/BackButton.vue";
import EditListingButton from "../components/EditListingButton.vue";
// import ListingTags from "../components/ListingTags.vue";
import AddToCart from "../components/AddToCart.vue";
import RatingStars from "../components/RatingStars.vue";
import OpeningHours from "../components/OpeningHours.vue";

export default {
  name: "Listing",
  data() {
    return {
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
    };
  },
  props: {},
  components: {
    BackButton,
    EditListingButton,
    // ListingTags,
    AddToCart,
    RatingStars,
    OpeningHours,
  },
  computed: {
    isSeller() {
      return this.$store.state.isSeller;
    },
  },
};
</script>

<style lang="scss" scoped>
.listing-container {
  .listing-buttons {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 0 0;
    .back-button {
      display: inline-block;
      position: relative;
      left: 9%;
    }
    .edit-button {
      display: inline-block;
      position: relative;
      right: 11%;
    }
  }
  .listing-info {
    display: flex;
    .listing-image {
      width: 50%;
      height: auto;

      img {
        position: relative;
        left: 20%;
        height: auto;
        width: 70%;
      }
    }
    .listing-details {
      width: 50%;
      .product-details {
        color: #797979;
      }
    }

    .item-desc-text {
      color: #797979;
      width: 80%;
    }
    .listing-tags {
      display: flex;
      flex-direction: row;

      background-color: #f4f4f4;
      padding: 17px;
      border-radius: 10px;
      margin: 0;
      width: 77%;
      min-width: 55%;
    }
  }
  .seller-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .opening-hours {
      color: #797979;
      position: relative;
      left: 5%;
      width: 50%;
    }
    .seller-details {
      color: #797979;
      display: flex;
      width: 50%;
      flex-direction: column;
      .maker-details {
        width: 80%;
      }
      .store-details {
        width: 80%;
      }
    }
  }
}
</style>
