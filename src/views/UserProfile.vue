<template>
  <v-app>
    <review-form
      :reviewRef="this.reviewRef"
      :orderRef="this.orderRef"
      @reviewLeft="handleReviewLeft"
    />
    <screenshot-upload
      :orderRef="this.orderRef"
      :qrRoute="this.qrRef"
      @changeProcessing="handlePaymentMade"
    />
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1" min-height="80vh">
        <div id="content">
          <v-row id="searchrow">
            <v-col :cols="4">
              <h1 class="font-weight-bold">@{{ shopUsername }}</h1>
              <v-col class="col-info">
                <h4 class="text--secondary">Name: {{ buyerName }}</h4>
                <h4 class="text--secondary">Email: {{ email }}</h4>
                <h4 class="text--secondary">Contact Number: {{ contactNo }}</h4>
                <h4 class="text--secondary">Address: {{ address }}</h4>
              </v-col>
              <v-col cols="12" class="col-btn">
                <v-btn v-if="userMatch" to="/editaccount">
                  Edit Details
                  <v-icon right>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="ml-3" v-if="userMatch">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </v-col>
            </v-col>
            <v-spacer></v-spacer>
            <v-col id="img">
              <v-card height="400" width="650">
                <v-img height="100%" :src="profilePic"> </v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-row id="filterrow" align="end">
            <v-col cols="auto" class="pl-0">
              <v-btn
                :color="PastOrder === false ? 'primary' : 'grey'"
                text
                @click="toggleCurrentOrder"
              >
                <strong>Current Orders</strong>
              </v-btn>
              <v-btn
                :color="PastOrder === true ? 'primary' : 'grey'"
                text
                @click="togglePastOrder"
              >
                <strong>Past Orders</strong>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-menu
                :close-on-click="false"
                :close-on-content-click="false"
                open-on-hover
                offset-y
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">
                    Sort By
                    <v-icon right>mdi-tune</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-group v-model="ActiveSort">
                    <template v-for="(Sort, i) in Sorts">
                      <v-list-item
                        :key="`Sort-${i}`"
                        :value="Sort"
                        @click.stop.prevent
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-action>
                            <v-checkbox :input-value="active"></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="Sort"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
          <v-divider id="divider1"></v-divider>
          <v-row id="orderheaders">
            <v-col>Date</v-col>
            <v-col>Bakery</v-col>
            <v-col>Order Details</v-col>
            <v-col>Order Status</v-col>
            <v-col>Order Total</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col v-show="filteredOrders.length === 0">
              <h2 class="font-weight-bold">No orders yet :(</h2>
            </v-col>
            <v-col
              :cols="12"
              v-for="(order, index) in filteredOrders"
              :key="`Order-${index}`"
            >
              <v-row>
                <v-col>{{ order.date.toDate().toLocaleDateString() }}</v-col>
                <v-col
                  ><u
                    ><strong>{{ order.bakery }}</strong></u
                  ></v-col
                >
                <v-col>
                  <v-row
                    dense
                    v-for="(each, index) in order.details"
                    :key="index"
                    no-gutters
                  >
                    <v-col :cols="12">
                      <u>{{ each.name }}</u>
                    </v-col>
                    <v-col class="caption" :cols="12">
                      {{ each.quantityDesc }}
                    </v-col>
                    <v-col class="caption" :cols="12">
                      Qty: {{ each.quantity }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-btn min-width="12vw" :color="btnColor(order.status)"
                    >{{ order.status }}
                  </v-btn>
                  <v-btn
                    class="mt-4"
                    min-width="12vw"
                    color="light-blue lighten-3"
                    @click="showModal(order)"
                    v-if="!order.reviewLeft && order.status == 'Fulfilled'"
                    >Leave a review!</v-btn
                  >
                  <v-btn
                    class="mt-4"
                    min-width="12vw"
                    v-if="order.status == 'Payment Pending'"
                    color="light-blue lighten-3"
                    @click="showPayment(order)"
                  >
                    Click to Pay!
                  </v-btn>
                </v-col>
                <v-col>{{ `$` + order.total }}</v-col>
              </v-row>
              <br />
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
import ReviewForm from "./ReviewForm.vue";
import ScreenshotUpload from "./ScreenshotUpload.vue";
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";

export default {
  components: { ReviewForm, ScreenshotUpload },
  name: "UserProfile",
  data: () => ({
    PastOrder: false,
    Sorts: ["Newest", "Oldest"],
    ActiveSort: "Newest",
    Orders: [],
    userMatch: false,
    //Populating profile fields
    shopUsername: "",
    storeName: "",
    buyerName: "",
    email: "",
    contactNo: "",
    address: "",
    reviewRef: null,
    orderRef: null,
    qrRef: null,
    profilePic: "",
  }),
  async mounted() {
    //const user = firebase.auth().currentUser.uid;
    const information = await this.retrieveUserType(this.$route.params.id);
    this.seller = information;
    if (!this.seller) {
      const orders = await this.retrieveOrders();
      this.Orders = orders;
    }
    console.log(firebase.storage());
    await firebase
      .storage()
      .ref()
      .child("/user/profile/" + this.$route.params.id)
      .getDownloadURL()
      .then((url) => {
        this.profilePic = url;
      })
      .catch((error) => {
        console.log(error);
        this.profilePic =
          "https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_e0c99cb9-6dbf-427a-91b0-de7a3e115026_900x.jpg?v=1596376378";
      });
  },
  computed: {
    filteredOrders() {
      var filteredOrders = this.Orders;
      //console.log(filteredOrders)
      if (this.PastOrder) {
        filteredOrders = this.filterByPast(filteredOrders);
      } else {
        filteredOrders = this.filterByCurrent(filteredOrders);
      }
      filteredOrders = this.applySort(filteredOrders);
      return filteredOrders;
    },
  },
  methods: {
    btnColor(status) {
      switch (status) {
        case "Fulfilled":
          return "green";
        case "Payment Pending":
          return "#dbaa23";
        case "Processing":
          return "#ff5500";
        case "Cancelled":
          return "#FF5A5F";
      }
    },
    handleReviewLeft(value) {
      this.Orders = this.Orders.map((x) => {
        if (x.docID == value) {
          return { ...x, reviewLeft: true };
        } else {
          return x;
        }
      });
    },
    handlePaymentMade(value) {
      this.Orders = this.Orders.map((x) => {
        if (x.docID == value) {
          return { ...x, status: "Processing" };
        } else {
          return x;
        }
      });
    },
    togglePastOrder() {
      this.PastOrder = true;
      this.ActiveSort = "Newest";
    },
    toggleCurrentOrder() {
      this.PastOrder = false;
      this.ActiveSort = "Newest";
    },
    async retrieveUserType(id) {
      const docRef = db.collection("users").doc(id);
      var sellerType = null;
      await docRef.get().then((doc) => {
        sellerType = doc.data().seller;
        if (sellerType) {
          this.storeName = doc.data().shopName;
        } else {
          this.buyerName = doc.data().firstName + " " + doc.data().lastName;
        }
        this.shopUsername = doc.data().username;
        this.email = doc.data().email;
        this.contactNo = doc.data().number;
        this.address = doc.data().address;
      });
      return sellerType;
    },
    async retrieveOrders() {
      console.log("retrieving orders");
      const docRef = db
        .collection("orders")
        .where("buyerID", "==", this.$route.params.id);
      var orders = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), docID: doc.id });
        });
      });
      return orders;
    },
    async retrieveImage(imageRef) {
      const storageRef = firebase.storage().ref();
      var imageURL = "";
      await storageRef
        .child(imageRef)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          if (url) {
            imageURL = url;
          } else {
            imageURL =
              "https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_e0c99cb9-6dbf-427a-91b0-de7a3e115026_900x.jpg?v=1596376378";
          }
        })
        .catch((error) => {
          console.log(error);
          imageURL =
            "https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_e0c99cb9-6dbf-427a-91b0-de7a3e115026_900x.jpg?v=1596376378";
        });
      return imageURL;
    },
    showModal(details) {
      this.orderRef = details;
      this.reviewRef = details;
      this.$modal.show("review");
    },
    showPayment(details) {
      this.orderRef = details;
      this.qrRef = details.sellerID;
      console.log(this.qrRef);
      this.$modal.show("screenshot");
      this.$store.commit("checkQRUpdateFunc");
      this.$store.commit("checkOrderUpdateFunc");
    },
    applySort(results) {
      switch (this.ActiveSort) {
        case "Oldest":
          return results.sort((a, b) => a.date.toDate() - b.date.toDate());
        case "Newest":
          return results.sort((a, b) => b.date.toDate() - a.date.toDate());
      }
    },
    filterByCurrent(orders) {
      return orders.filter((order) => {
        if (order.status == "Payment Pending" || order.status == "Processing") {
          return true;
        }
      });
    },
    filterByPast(orders) {
      return orders.filter((order) => {
        if (order.status === "Fulfilled" || order.status === "Cancelled") {
          return true;
        }
      });
    },
  },
};
</script>

<style scoped>
#sheet {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
}
#content {
  margin: 0 5vw 0 5vw;
}
#searchrow {
  padding-top: 5vh;
}

.col-info {
  padding: 0px;
  margin-top: 3px;
}
.col-btn {
  padding: 0px;
  margin-top: 20px;
}
.v-divider {
  margin: 2vh 0 2vh 0;
}
#searchbar {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
#btngrp {
  position: relative;
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
</style>
