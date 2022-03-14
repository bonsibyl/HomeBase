<template>
  <div class="order-checkout">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    
    <div class="form-wrap">
      <form class="summary">
        <h2>Payment</h2>
        <hr>

        <img class="paylahQR" src="../assets/blogPhotos/paylah.jpeg" alt="">

        <h3 class="totalAmount">
          Grand Total: ${{totalCost}}
        </h3>
        
        <div class="btns">
            <button @click.prevent="$router.push({name: 'Checkout'})" class="back"><b>Go back</b></button>
            <button @click.prevent="uploadScreenshot" class="screenshot"><b>Upload Screenshot</b></button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading";
export default {
  name: "Payment",
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
    text-align: center;
    position: absolte;
    bottom: 0;
}

.back, .screenshot {
  margin: 25px 5px 35px 5px;
  width: 200px !important;
}

button:hover {
  background-color: rgb(150, 150, 150);
}

.screenshot {
    background-color: rgb(111, 138, 90);
}

.screenshot:hover, .back:hover {
    background-color: rgb(153, 153, 153);
}

.totalAmount {
  padding: 1% 0.6% 1% 0;
  font-size: 25px;
  text-align: center;
}

.paylahQR {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}



</style>