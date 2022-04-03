<template>
  <v-container>
    <modal
      name="review"
      transition="pop-out"
      :width="modalWidth"
      :focus-trap="true"
      :height="550"
    >
      <div class="box">
        <div class="partition" id="partition-register">
          <div class="partition-title">
            Hope you enjoyed your bakes from nuttybutterybakery! Do leave a
            review to tell us how we fared.
          </div>
          <div class="partition-form">
            <v-form ref="form" lazy-validation>
              <v-col
                class="pl-2"
                :cols="12"
                v-for="(order, index) in OrderInfo"
                :key="index"
              >
                <v-row
                  dense
                  v-for="(each, index) in order.details"
                  :key="index"
                >
                  <v-col :cols="1">
                    <v-card height="60" width="60" class="order-img">
                      <v-img height="100%" :src="each.fullRef.imageURL"></v-img>
                    </v-card>
                  </v-col>
                  <v-col :cols="3" class="caption">
                    {{ each.name }}
                    <br />
                    {{ each.quantityDesc }}
                    <br />
                    Qty: {{ each.quantity }}
                  </v-col>
                  <v-col :cols="8">
                    <v-container></v-container>
                    <star-rating :star-size="20" v-model="ratingStar[index]" />
                  </v-col>
                  <v-col :cols="12">
                    <v-text-field
                      id="n-title"
                      type="text"
                      placeholder="Summary of Your Review"
                      required
                      :rules="titleRules"
                      counter="30"
                      v-model="reviewDetails[index * 2]"
                    />
                  </v-col>
                  <v-col :cols="12">
                    <v-textarea
                      id="n-review"
                      type="text"
                      placeholder="Write a review"
                      required
                      :rules="contentRules"
                      counter="250"
                      v-model="reviewDetails[index * 2 + 1]"
                    />
                  </v-col>
                  <v-container></v-container>
                </v-row>
              </v-col>
              <div class="button-set">
                <v-btn id="submit-btn" @click="submit"> Submit </v-btn>
                <v-btn id="cancel-btn" @click="cancel">Cancel</v-btn>
                <div style="margin-bottom: 20px"></div>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </modal>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="2000"
      :color="snackbar.color"
      >{{ snackbar.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
const MODAL_WIDTH = 656;
import StarRating from "vue-star-rating";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";
export default {
  components: { StarRating },
  name: "ReviewModal",
  data() {
    return {
      OrderInfo: [],
      titleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 30) || "Title must be less than 30 characters",
      ],
      contentRules: [
        (v) => !!v || "Review is required",
        (v) =>
          (v && v.length <= 250) || "Review must be less than 250 characters",
      ],
      ratingStar: [],
      reviewDetails: [],
      snackbar: {
        show: false,
        msg: null,
        color: null,
      },
    };
  },
  props: {
    reviewRef: Object,
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.ratingStar.length < this.OrderInfo[0].details.length) {
        this.snackbar = {
          color: "error",
          show: true,
          msg: "Please provide a rating to all items!",
        };
        return;
      }
      const user = firebase.auth().currentUser.email;
      db.collection("orders")
        .doc(this.reviewRef.docID)
        .update({ reviewLeft: true })
        .then(() => {
          this.$emit("reviewLeft", this.reviewRef.docID);
        });

      var ref = db
        .collection("listings")
        .where("storeName", "==", this.OrderInfo[0].sellerID);
      for (var i = 0; i < this.OrderInfo[0].details.length; i++) {
        var updateRef = this.OrderInfo[0].details[i];
        await ref
          .where("name", "==", updateRef.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id);
              db.collection("listings")
                .doc(doc.id)
                .update({
                  ReviewScoreCount: doc.data().ReviewScoreCount + 1,
                  ReviewScoreTotal:
                    doc.data().ReviewScoreTotal + this.ratingStar[i],
                  Reviews: doc.data().Reviews
                    ? doc.data().Reviews.concat([
                        {
                          name: user.slice(0, 2),
                          rating: this.ratingStar[i],
                          title: this.reviewDetails[i * 2],
                          description: this.reviewDetails[i * 2 + 1],
                        },
                      ])
                    : [
                        {
                          name: user.slice(0, 2),
                          rating: this.ratingStar[i],
                          title: this.reviewDetails[i * 2],
                          description: this.reviewDetails[i * 2 + 1],
                        },
                      ],
                });
            });
          });
      }
      this.snackbar = {
        color: "success",
        show: true,
        msg: "You have successfully submitted a review!",
      };
      this.$modal.hide("review");
    },
    cancel() {
      this.$modal.hide("review");
    },
  },
  computed: {
    checkReviewUpdate() {
      return this.reviewRef;
    },
  },
  watch: {
    checkReviewUpdate(newVal, oldVal) {
      this.OrderInfo = [this.reviewRef];
      newVal = oldVal;
    },
  },
};
</script>
<style lang="scss">
$background_color: #404142;
.box {
  background: white;
  overflow-y: auto;
  width: 656px;
  height: 550px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: bold;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type="text"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 14px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
  }
  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    //border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .button-set {
    margin-right: 8px;
    float: right;
  }
  #submit-btn,
  #cancel-btn {
    margin-left: 8px;
    width: 150px;
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
#submit-btn {
  background-color: #245923;
  color: white;
}
#cancel-btn {
  background-color: #b4b4b4;
  color: white;
}
#n-review {
  height: 100px;
}
.order-img {
  float: left;
  display: inline-block;
}
</style>
