<template>
  <modal
    name="screenshot"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="500"
  >
    <div class="box">
      <div class="partition" id="partition-register">
        <div class="partition-title" v-if="this.paymentURL">
          <br>
          <v-img class="paylahQR" :src="this.paymentURL"></v-img>
          <br />
          The customer's payment screenshot is attached above for your verification!
        </div>

        <div class="partition-title" v-else>
          <br>
          <v-icon size="200">mdi-emoticon-sad-outline</v-icon>
          <br>
          <br>
          The customer has yet to make payment. <br>
          Feel free to reach out to the customer via the profile details provided!
        </div>

        <button id="cancel-btn" @click.prevent="cancel">Exit</button>
      </div>
    </div>
  </modal>
</template>
<script>
const MODAL_WIDTH = 656;
export default {
  props: ["paymentURL"],
  components: {},
  name: "ScreenshotVerification",
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    submit() {
      alert("You have successfully submitted your payment screenshot");
    },
    cancel() {
      this.$modal.hide("screenshot");
    },
  },
};
</script>
<style scoped lang="scss">

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}

#cancel-btn {
  background-color: #7a7a7a;
  color: white;
  font-size: 12px;
  width: 30%;
}

.form {
    width: 70%;
    margin: auto;
}

.paylahQR {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
</style>
