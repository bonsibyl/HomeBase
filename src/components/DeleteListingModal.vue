<template>
  <modal
    name="delete-listing"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="200"
  >
    <div class="box">
      <v-row class="pt-7">
        <div class="partition" id="partition-register">
          <div class="partition-title">
            Are you sure you want to delete this listing?
          </div>
        </div>
      </v-row>
      <v-row align="center" justify="center">
        <v-col :cols="7">
          <v-btn block id="submit-btn" color="#AE1E1E" @click="deleteListing"
            >Yes, Delete this listing</v-btn
          >
        </v-col>
        <v-col :cols="3">
          <v-btn block id="cancel-btn" @click="cancel">Cancel</v-btn>
        </v-col>
      </v-row>
    </div>
  </modal>
</template>
<script>
const MODAL_WIDTH = 656;
import db from "../firebase/firebaseInit";

export default {
  name: "DeleteListingModal",
  data: () => ({}),
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  props: {
    listingID: String,
  },
  methods: {
    deleteListing() {
      db.collection("listings")
        .doc(this.listingID)
        .delete()
        .then(() => {
          console.log(this.listingID + " successfully deleted!");
          this.$modal.hide("delete-listing");
          this.$emit("deleteInfo", this.listingID);
        })
        .catch((error) => {
          alert("Error in deleting!");
          console.error("Error removing document: ", error);
        });
    },
    cancel() {
      this.$modal.hide("delete-listing");
    },
  },
};
</script>
<style lang="scss">
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
