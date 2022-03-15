<template>
  <div class="order-checkout">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    
    <div class="form-wrap">
      <form class="summary">
        <h2>Order Summary</h2>
        <hr>
            <template v-for="(listing, index) in cart">
              <v-divider v-show="index !== 0" :key="`${index}-divider`" />
              <v-list-item :key="index" class="pl-0 pr-10">
                <v-row>
                  <v-col id="btns" cols="1" align="center">
                    <v-btn icon @click="incrementQty(listing)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <h5>{{ listing.qty }}</h5>
                    <v-btn
                      icon
                      @click="decrementQty(listing)"
                      :disabled="listing.qty === 1"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <img class="listingImg" src="../assets/blogPhotos/financiers.jpeg" alt="">
                  </v-col>
                  <v-col id="desc" cols="7">
                    <h4 class="grey--text">@{{ listing.store }}</h4>
                    <h3>{{ listing.title }}</h3>
                    <h3>({{ listing.desc }})</h3>
                    <h3>${{ listing.price }}</h3>
                  </v-col>
                  <v-col id="total" align="left">
                    <h3>${{ listing.price * listing.qty }}</h3>
                  </v-col>
                  <v-col align="left">
                    <v-btn
                      width="130px"
                      medium
                      depressed
                      color="#800000"
                      class="white--text"
                      @click="deleteCartItem(listing)"
                      >Delete
                      </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </template>

        <hr>
        <h3 class="totalAmount">
          Grand Total: ${{totalCost}}
        </h3>
        
        <div class="btns">
            <button @click.prevent="$router.push({name: 'Search'})" class="addItems"><b>Add More Items</b></button>
            <button @click.prevent="$router.push({name: 'Payment'})" class="payment"><b>Make Payment</b></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading";
export default {
  name: "Checkout",
  data() {
    return {
      modalActive: false, //toggle pop-up on & off
      modalMessage: "", //pop-up message shown
      loading: null,
    };
  },
  components: {
    Modal,
    Loading,
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
    },
    deleteCartItem(listing) {
      this.$store.commit("removeCartItem", listing);
    },
    incrementQty(listing) {
      this.$store.commit("incrementQty", listing);
    },
    decrementQty(listing) {
      this.$store.commit("decrementQty", listing);
    },
  },
  computed: {
    cart() {
      return this.$store.state.cartItems;
    },
    totalCost: function() {
      let sum = 0;
      for (let i=0; i < this.$store.state.cartItems.length; i++) {
        sum += this.$store.state.cartItems[i].price * this.$store.state.cartItems[i].qty
      }
      return sum;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-checkout {
  background-color: rgb(255, 245, 228);
  position: relative;
  flex-grow:1;

  h2 {
      text-align: left;
      margin-top: 2%;
  }

  p {
    margin-top: 4%;
  }
}

.summary {
    background-color: white;
    width: 200px;
    margin: 2% 5% 10% 5%;
    padding: 0 2%;
    display: inline-block;
    overflow: auto;
}

hr {
    width: 100%;
    text-align: center;
    background-color: lightgray; 
    height: 2px; 
    border: 0;
    margin-bottom: 4%;
}

.btns {
    display: floor($number: 0);
    text-align: right;
    position: absolte;
    bottom: 0;
}

.addItems, .payment {
  margin: 25px 5px 25px 5px;
  width: 200px !important;
}

button:hover {
  background-color: rgb(150, 150, 150);
}

.payment {
    background-color: rgb(111, 138, 90);
}

.payment:hover, .addItems:hover {
    background-color: rgb(153, 153, 153);
}

.listingImg {
  width: 110px;
}

.totalAmount {
  padding: 0 0.6% 0 0;
  font-size: 25px;
  text-align: right;
  margin-top: -2%;
}

#btns {
  margin-top: -25px;
  button {
    background-color: rgb(235, 235, 235) !important;
  }
}

#total {
  margin-top: 20px;
}

</style>