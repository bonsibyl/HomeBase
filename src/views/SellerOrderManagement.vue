<template>
  <v-app>
    <v-navigation-drawer app absolute color="#f5f5f5" height="100%">
      <v-list  class="pt-0">
        <v-list-item
          v-for="[page, route] in pages"
          :key="page"
          link
          :to="route + checkRoute"
        >
          <v-list-item-content>
            {{ page }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container class="dashboardContainer">
      <h1 style="text-align: left">Order Management</h1>
      <hr />
      <!-- <v-data-table :headers="headers" :items="orders">
        <template v-slot:item.orderid="{ item }">
          <v-chip :to="getLink(item.orderid)">
            {{ item.orderid }}
          </v-chip>
        </template>

        <template v-slot:item.orderstatus="{ item }">
          <v-chip :color="getColor(item.orderstatus)" dark>
            {{ item.orderstatus }}
          </v-chip>
        </template>
      </v-data-table> -->

      <v-data-table :headers="headers" :items="fireorders">
        <template v-slot:[`item.orderid`]="{ item }">
          <v-chip :to="'/ordersummary/' + item.docid">
            {{ item.orderid }}
          </v-chip>
        </template>
        <template v-slot:[`item.earnings`]="{ item }">
          ${{ convertToCurrency(String(item.earnings)) }}
        </template>
        <template v-slot:[`item.orderstatus`]="{ item }">
          <v-chip :color="getColor(item.orderstatus)" dark>
            {{ item.orderstatus }}
          </v-chip>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import db from "../firebase/firebaseInit";
//import firebase from "firebase/app";

export default {
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview/"],
      ["Orders", "/sellerordermanagement/"],
      ["Reviews", "/sellerreviews/"],
      ["Analytics", "/dashboard/"],
    ],
    headers: [
      { text: "Order ID", value: "orderid" },
      { text: "Date", value: "date" },
      { text: "Customer", value: "custname" },
      { text: "Fulfillment Status", value: "orderstatus" },
      { text: "Total Earnings", value: "earnings" },
    ],
    fireorders: [],
  }),
  methods: {
    getColor(orderstatus) {
      if (orderstatus == "Fulfilled") return "green";
      else if (orderstatus == "Processing") return "#ff5500";
      else if (orderstatus == "Payment Pending") return "#dbaa23";
      else if (orderstatus == "Cancelled") return "#ad1313";
    },

    getLink(item) {
      this.$router.push({
        name: "Order Summary",
        params: { id: item.orderid, item: item },
      });
    },

    async retrieveOrders() {
      const docRef = db.collection("orders").where("sellerID", "==", this.$route.params.id);
      var orders = [];

      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), docID: doc.id });
        });
      });

      return orders;
    },

    async retrieveName(buyerID) {
      var docRef = db.collection("users").doc(buyerID);

      var name = "";

      await docRef.get().then((doc) => {
        if (doc.exists) {
          name = doc.data()["firstName"] + " " + doc.data()["lastName"];
        }
      });

      return name;
    },

    convertToCurrency(value) {
      const dollar = value.split(".")[0];
      var cents = value.split(".")[1];
      if (cents) {
        if (cents.length == 1) {
          cents = "." + cents + "0";
        }
      } else {
        cents = ".00";
      }

      return dollar + cents;
    },
  },
  computed: {
    checkRoute() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    const firebaseorders = await this.retrieveOrders();

    console.log(firebaseorders[0].date);
    firebaseorders.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < firebaseorders.length; i++) {
      var dict = {};

      var date = firebaseorders[i]["date"].toDate();
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0");
      var yyyy = date.getFullYear();

      date = dd + "/" + mm + "/" + yyyy;

      var buyer = firebaseorders[i]["buyerID"];
      var buyerDetails = await this.retrieveName(buyer);

      buyer = buyerDetails;
      var status = firebaseorders[i]["status"];
      // var totalearnings =
      //   "$" + this.convertToCurrency(String(firebaseorders[i]["total"]));
      console.log(firebaseorders[i]);
      await db
        .collection("orders")
        .doc(firebaseorders[i].docID)
        .update({ orderID: i + 1001 });
      dict["orderid"] = i + 1001;
      dict["date"] = date;
      dict["custname"] = buyer;
      dict["orderstatus"] = status;
      dict["earnings"] = firebaseorders[i]["total"];
      dict["docid"] = firebaseorders[i].docID;

      this.fireorders.splice(0, 0, dict);
    }

    //console.log(this.fireorders);
  },
};
</script>

<style scoped>
#appcontainer {
  background: url("../assets/SellerBackground.png");
  background-size: cover;
}

hr {
  margin-top: 1%;
}

.dashboardContainer {
  width: 80%;
  margin-top: 2%;
  margin-left: 300px;
}

.v-data-table::v-deep th {
  font-size: 17px !important;
}
.v-data-table::v-deep td {
  font-size: 17px !important;
}
</style>
