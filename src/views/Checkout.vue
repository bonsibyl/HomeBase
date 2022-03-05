<template>
  <div class="order-checkout">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    
    <div class="form-wrap">
      <form class="summary">
        <h2>Order Summary</h2>
        <hr>

        <table class="listings">
            <tr>
                <th>
                  <img class="listingImg" src="../assets/blogPhotos/financiers.jpeg" alt="">
                </th>
                <td>
                  <p class="listingName">Almond Financiers</p>
                  <p class="listingShop">@nuttybutterybakery</p>
                  <p class="listingQuantity">Box of 8 Financiers</p>
                  </td>
                <td>
                  <p class="listingPrice">
                    $13.90
                  </p>
                </td>
                <td>
                  <p class="buyQuantity">
                    1
                  </p>
                </td>
                <td>
                  <p class="totalPrice">
                    $13.90
                  </p>
                </td>
                <td>
                  <button @click.prevent="removeItem" class="removeItem">Remove</button>
                </td>
            </tr>

            <tr>
                <th>
                  <img class="listingImg" src="../assets/blogPhotos/financiers.jpeg" alt="">
                </th>
                <td>
                  <p class="listingName">Almond Financiers</p>
                  <p class="listingShop">@nuttybutterybakery</p>
                  <p class="listingQuantity">Box of 8 Financiers</p>
                  </td>
                <td>
                  <p class="listingPrice">
                    $13.90
                  </p>
                </td>
                <td>
                  <p class="buyQuantity">
                    1
                  </p>
                </td>
                <td>
                  <p class="totalPrice">
                    $13.90
                  </p>
                </td>
                <td>
                  <button @click.prevent="removeItem" class="removeItem">Remove</button>
                </td>
            </tr>

            <tr>
                <th>
                  <img class="listingImg" src="../assets/blogPhotos/financiers.jpeg" alt="">
                </th>
                <td>
                  <p class="listingName">Almond Financiers</p>
                  <p class="listingShop">@nuttybutterybakery</p>
                  <p class="listingQuantity">Box of 8 Financiers</p>
                  </td>
                <td>
                  <p class="listingPrice">
                    $13.90
                  </p>
                </td>
                <td>
                  <p class="buyQuantity">
                    1
                  </p>
                </td>
                <td>
                  <p class="totalPrice">
                    $13.90
                  </p>
                </td>
                <td>
                  <button @click.prevent="removeItem" class="removeItem">Remove</button>
                </td>
            </tr>
        </table>

        <h3 class="totalAmount">
          Grand Total: $43.50
        </h3>
        
        <div class="btns">
            <button @click.prevent="addItems" class="addItems"><b>Add More Items</b></button>
            <button @click.prevent="makePayment" class="payment"><b>Make Payment</b></button>
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

table {
  position: relative;
}

td {
  width: 100%;
  padding: 0px 30px;
}

.listingImg {
  width: 100px;
}

.listingName {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: -4%;
}

.listingShop {
  margin-bottom: -3%;
  font-weight: bold;
  color: grey;
}

.listingQuantity {
  margin-bottom: 5%;
  font-weight: bold;
  color: grey;
}

.removeItem {
  width: 100% !important;
  background-color: darkred;
}

.removeItem:hover {
    background-color: rgb(173, 61, 61);
}

.totalAmount {
  padding: 2% 0.6% 0 0;
  font-size: 25px;
  text-align: right;
}

</style>