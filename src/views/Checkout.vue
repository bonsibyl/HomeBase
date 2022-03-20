<template>
  <div class="order-checkout">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="loading" />

    <div class="form-wrap">
      <form class="summary">
        <h2>Order Summary</h2>
        <hr />
        <template v-for="(listing, index) in cartDetails">
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
                <img class="listingImg" :src="listing.imageURL" alt="" />
              </v-col>
              <v-col id="desc" cols="7">
                <h4 class="grey--text">@{{ listing.shopName }}</h4>
                <h3>{{ listing.name }}</h3>
                <h3>({{ listing.qtyDesc }})</h3>
                <h3>${{ listing.price }}</h3>
              </v-col>
              <v-col id="total" align="left">
                <h3>${{ parseFloat(listing.price) * listing.qty }}</h3>
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

        <hr />
        <h3 class="totalAmount">Grand Total: ${{ totalCost }}</h3>

        <div class="btns">
          <button
            @click.prevent="$router.push({ name: 'Search' })"
            class="addItems"
          >
            <b>Add More Items</b>
          </button>
          <button class="payment" @click="handleOrders">
            <b>Make Payment</b>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";
export default {
  name: "Checkout",
  data() {
    return {
      modalActive: false, //toggle pop-up on & off
      modalMessage: "", //pop-up message shown
      loading: null,
      cartDetails: [],
      snackbar: {
        color: null,
        show: false,
        msg: null,
      },
    };
  },
  async mounted() {
    this.cartDetails = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    var finalCart = [];
    for (var i = 0; i < this.cartDetails.length; i++) {
      var ref = await this.checkoutURLS(this.cartDetails[i]);
      finalCart.push({ ...this.cartDetails[i], imageURL: ref });
    }
    this.cartDetails = finalCart;
    console.log(this.cartDetails);
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
      var index = this.cartDetails.indexOf(listing);
      this.$store.commit("checkCartUpdateFunc");
      const arrRef = this.cartDetails;
      if (index > -1) {
        arrRef.splice(index, 1);
        this.cartDetails = arrRef;
        localStorage.setItem("cart", JSON.stringify(arrRef));
      }
    },
    incrementQty(listing) {
      var index = this.cartDetails.indexOf(listing);
      this.$store.commit("checkCartUpdateFunc");
      const arrRef = this.cartDetails;
      if (index > -1) {
        listing.qty = listing.qty + 1;
        arrRef.splice(index, 1);
        arrRef.push(listing);
        this.cartDetails = arrRef;
        localStorage.setItem("cart", JSON.stringify(arrRef));
      }
    },
    decrementQty(listing) {
      var index = this.cartDetails.indexOf(listing);
      this.$store.commit("checkCartUpdateFunc");
      const arrRef = this.cartDetails;
      if (index > -1) {
        listing.qty = listing.qty - 1;
        arrRef.splice(index, 1);
        arrRef.push(listing);
        this.cartDetails = arrRef;
        localStorage.setItem("cart", JSON.stringify(arrRef));
      }
    },
    async checkoutURLS(listing) {
      var finalURL = "";
      const storageRef = await firebase.storage().ref();
      await storageRef
        .child(listing.imageRef)
        .getDownloadURL()
        .then((url) => {
          finalURL = url;
        })
        .catch((error) => {
          console.log(error);
        });
      return finalURL;
    },
    async handleOrders(event) {
      event.preventDefault();
      console.log(this.cartDetails);
      console.log("asdasdas");
      const finalOrders = this.cartDetails;
      finalOrders.sort((a, b) => {
        if (a.storeName > b.storeName) {
          return -1;
        }
        if (a.storeName < b.storeName) {
          return 1;
        }
        return 0;
      });
      var refDate = new Date();
      const ans = [];
      console.log(this.$store.state.profileId);
      // initialisation
      var storeRef = finalOrders[0].storeName;
      var storeRefCounter = 0;
      var obj = {
        bakery: finalOrders[0].shopName,
        buyerID: this.$store.state.profileId,
        date: refDate,
        details: [
          {
            name: finalOrders[0].name,
            quantity: finalOrders[0].qty,
            quantityDesc: finalOrders[0].qtyDesc,
            fullRef: finalOrders[0],
          },
        ],
        sellerID: finalOrders[0].storeName,
        status: "Payment Pending",
        total: finalOrders[0].price * finalOrders[0].qty,
      };
      ans.push(obj);
      //segment by store
      for (var i = 1; i < finalOrders.length; i++) {
        var ref = finalOrders[i];
        if (storeRef === ref.storeName) {
          var addItem = {
            name: ref.name,
            quantity: ref.qty,
            quantityDesc: ref.qtyDesc,
            fullRef: ref,
          };
          ans[storeRefCounter].details.push(addItem);
          ans[storeRefCounter].total =
            ans[storeRefCounter].total + ref.qty * ref.price;
        } else {
          var addNewOrder = {
            bakery: ref.shopName,
            buyerID: this.$store.state.profileId,
            date: refDate,
            details: [
              {
                name: ref.name,
                quantity: ref.qty,
                quantityDesc: ref.qtyDesc,
                fullRef: ref,
              },
            ],
            sellerID: ref.storeName,
            status: "Payment Pending",
            total: ref.price * ref.qty,
          };
          ans.push(addNewOrder);
          storeRefCounter += 1;
        }
      }
      //creation of order entries in firebase
      for (var j = 0; j < ans.length; j++) {
        var orderRef = ans[j];
        await db.collection("orders").add(orderRef, { merge: true });
      }
      this.snackbar = {
        show: true,
        color: "success",
        msg: "Order has been successfully created!",
      };
      localStorage.setItem("cart", JSON.stringify([]));
      this.$router.push({
        name: "Profile",
        params: { id: this.$store.state.profileId },
      });
    },
  },
  computed: {
    cart() {
      return this.$store.state.cartItems;
    },
    totalCost: function () {
      let sum = 0;
      for (let i = 0; i < this.cartDetails.length; i++) {
        sum += this.cartDetails[i].price * this.cartDetails[i].qty;
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
  flex-grow: 1;

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

.addItems,
.payment {
  margin: 25px 5px 25px 5px;
  width: 200px !important;
}

button:hover {
  background-color: rgb(150, 150, 150);
}

.payment {
  background-color: rgb(111, 138, 90);
}

.payment:hover,
.addItems:hover {
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
