<template>
  <div class="order-checkout">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="loading" />

    <div class="bigDiv">
      <div class="orderSummary">
        <h2>Order Summary</h2>
        <hr />
        <h2 class="orderNumber">#1003</h2>
        <h3 class="status">Fulfilled</h3>

        <table class="listings">
          <tr>
            <th>
              <img
                class="listingImg"
                src="../assets/blogPhotos/financiers.jpeg"
                alt=""
              />
            </th>
            <td>
              <p class="listingName">Almond Financiers</p>
              <p class="listingShop">Box of 8 Financiers</p>
              <p class="listingQuantity">Qty: 1</p>
            </td>
            <td>
              <p class="totalPrice">$13.90</p>
            </td>
          </tr>

          <tr>
            <th>
              <img
                class="listingImg"
                src="../assets/blogPhotos/financiers.jpeg"
                alt=""
              />
            </th>
            <td>
              <p class="listingName">Almond Financiers</p>
              <p class="listingShop">Box of 8 Financiers</p>
              <p class="listingQuantity">Qty: 1</p>
            </td>
            <td>
              <p class="totalPrice">$13.90</p>
            </td>
          </tr>

          <tr>
            <th>
              <img
                class="listingImg"
                src="../assets/blogPhotos/financiers.jpeg"
                alt=""
              />
            </th>
            <td>
              <p class="listingName">Almond Financiers</p>
              <p class="listingShop">Box of 8 Financiers</p>
              <p class="listingQuantity">Qty: 1</p>
            </td>
            <td>
              <p class="totalPrice">$13.90</p>
            </td>
          </tr>
        </table>

        <div class="btns">
          <button @click.prevent="" class="button VerifyPayment" style="background-color:darkgreen">
            <b>Verify Payment</b>
          </button>
          <button @click.prevent="" class="button CompleteOrder" style="background-color:chrome">
            <b>Complete Order</b>
          </button>
          <button @click.prevent="" class="button CancelOrder" style="background-color:darkred">
            <b>Cancel Order</b>
          </button>
        </div>
        <hr />

        <h3 class="totalAmount">Total: $43.50</h3>
      </div>

      <div class="customerDetails">
        <p class="details">
        Deliver to: <br><br>
        Name: Tan Wei Yang <br>
        Email: tan.weiyang@gmail.com <br>
        Contact No: +65 9321 1633 <br>
        Address: 18 Kent Road Singapore 139218
        </p>

        <button class="viewProfile">
          <v-icon>mdi-account-circle</v-icon>
          View Profile
        </button>
        <button class="viewProfile">
          View Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading";
export default {
  name: "OrderSummary",
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
  flex-grow: 1;

  h2 {
    text-align: left;
    margin-top: 2%;
  }

  p {
    margin-top: 4%;
  }
}

.bigDiv {
  display: flex;

}

.orderSummary {
  background-color: white;
  width: 65%;
  margin: 2% 0% 10% 4%;
  padding: 0 2%;
  display: inline-block;
  overflow: auto;
}

.customerDetails {
  background-color: white;
  width: 25%;
  margin: 2% 0% 10% 2%;
  padding: 2% 2%;
  display: inline-block;
  overflow: auto;
}

hr {
  width: 100%;
  text-align: center;
  background-color: lightgray;
  height: 2px;
  border: 0;
  margin-bottom: -1%;
  margin-top: 1%;
}

.btns {
  display: floor($number: 0);
  text-align: right;
  position: absolte;
  bottom: 0;
}

.button {
  transition: 500ms ease all;
  padding: 12px 24px;
  border: none;
  background-color: rgb(206, 137, 81);
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin: 25px 10px 25px 5px;
  width: 180px;
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
  padding: 2% 0.6% 4% 0;
  font-size: 25px;
  text-align: right;
}

.status {
  border-radius: 10px;
  padding: 7px;
  margin-top: 5px;
  background-color: green;
  font-weight: bold;
  color: white;
}

.details {
  font-size: 20px;
}

.viewProfile {
  transition: 500ms ease all;
  padding: 12px 24px;
  border: none;
  background-color: rgb(209, 209, 204);
  border-radius: 20px;
  font-weight: bold;
  width: 180px;
  margin-top: 15px;
  margin-left: 15px;
}
</style>