<template>
  <modal
    name="review"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="500"
  >
    <div class="box">
      <div class="partition" id="partition-register">
        <div class="partition-title">
          <v-row align="center">
            <v-col :cols="12" class="review-header" v-if="reviewDetails"
              ><strong>Customer Reviews</strong></v-col>
              <p>{{this.listingID}}</p>

          </v-row>
          <br />
          <br />
        </div>

        <button id="cancel-btn" @click.prevent="cancel">Close</button>
      </div>
    </div>
  </modal>
</template>
<script>
const MODAL_WIDTH = 656;
import db from "../firebase/firebaseInit";

export default {
  data() {
    return {
      reviewDetails: [],
    };
  },

  components: {},
  name: "ReviewPopUp",
  props: ["listingID"],
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },

  mounted() {
    const docRef = db.collection("listings").doc(this.listingID);
    docRef.get().then((doc) => {
      this.reviewDetails = doc.data().Reviews;
    });
  },

  methods: {
    cancel() {
      this.$modal.hide("review");
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
</style>