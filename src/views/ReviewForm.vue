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
          Hope you enjoyed your bakes from nuttybutterybakery! Do leave a review
          to tell us how we fared.
        </div>
        <div class="partition-form">
          <form autocomplete="false">
            <v-col
              class="pl-2"
              :cols="12"
              v-for="order in OrderInformation"
              :key="order"
            >
              <v-row dense v-for="each in order.details" :key="each">
                <v-col :cols="1">
                  <v-card height="60" width="60" class="order-img">
                    <v-img
                      height="100%"
                      src="../assets/listing-pic.jpg"
                    ></v-img>
                  </v-card>
                </v-col>
                <v-col :cols="3" class="caption">
                  {{ each.name }}
                  <br />
                  {{ each.quantityDesc }}
                  <br />
                  Qty: {{ each.quantity }}
                </v-col>
                <v-col>
                  <v-container></v-container> <star-rating star-size="20" />
                </v-col>
                <input
                  id="n-title"
                  type="text"
                  placeholder="Summary of Your Review"
                />
                <input id="n-review" type="text" placeholder="Write a review" />
                <v-container></v-container>
              </v-row>
            </v-col>
          </form>

          <div class="button-set">
            <button id="submit-btn" @click="submit">Submit Review</button>
            <button id="cancel-btn" @click="cancel">Cancel</button>
            <div style="margin-bottom: 20px"></div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
const MODAL_WIDTH = 656;
import StarRating from "vue-star-rating";
export default {
  components: { StarRating },
  name: "ReviewModal",
  data: () => ({
    OrderInformation: [
      {
        date: "01/02/2022",
        bakery: "nuttybutterybakery",
        details: [
          { name: "Almond Financiers", quantityDesc: "Box of 8", quantity: 1 },
          {
            name: "Chocolate Macarons",
            quantityDesc: "Box of 12",
            quantity: 1,
          },
        ],
      },
    ],
  }),
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    submit() {
      alert("Submit Review");
    },
    cancel() {
      this.$modal.hide("review");
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
  height: 500px;
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
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .button-set {
    //margin-bottom: 8px;
    float: right;
  }
  #submit-btn,
  #cancel-btn {
    margin-left: 8px;
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
