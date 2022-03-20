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
        <div class="partition-title">
          <br>
          <img class="paylahQR" src="../assets/blogPhotos/paylah.jpeg" alt="">
          <br />
          The customer's payment screenshot is attached above for your verification!
        </div>

        <button id="cancel-btn" @click.prevent="cancel">Exit</button>
      </div>
    </div>
  </modal>
</template>
<script>
const MODAL_WIDTH = 656;
export default {
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
