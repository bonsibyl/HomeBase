<template>
  <v-app>
    <v-navigation-drawer app absolute>
      <v-list>
        <v-list-item
          v-for="[page, route] in pages"
          :key="page"
          link
          :to="route"
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
      ["Overview", "/sellerorderoverview"],
      ["Orders", "/sellerordermanagement"],
      ["Reviews", "/sellerreviews"],
      ["Analytics", "/dashboard"],
    ],
    headers: [
      { text: "Order ID", value: "orderid" },
      { text: "Date", value: "date" },
      { text: "Customer", value: "custname" },
      { text: "Fulfillment Status", value: "orderstatus" },
      { text: "Total Earnings", value: "earnings" },
    ],
    orders: [
      {
        orderid: "1012",
        date: "01/02/2022",
        custname: "Constance Tang",
        orderstatus: "In Progress",
        earnings: "$44.00",
      },

      {
        orderid: "1005",
        date: "01/02/2022",
        custname: "Elon Musk",
        orderstatus: "Pending Payment",
        earnings: "$12.00",
      },

      {
        orderid: "1003",
        date: "01/02/2022",
        custname: "Tan Ah Mah",
        orderstatus: "Fulfilled",
        earnings: "$12.00",
      },

      {
        orderid: "1002",
        date: "01/02/2022",
        custname: "Tan Wei Yang",
        orderstatus: "Fulfilled",
        earnings: "$34.80",
      },
    ],
    fireorders: [],
  }),
  methods: {
    getColor(orderstatus) {
      if (orderstatus == "Fulfilled") return "green";
      else if (orderstatus == "In Progress") return "#ff5500";
      else if (orderstatus == "Payment Pending") return "#dbaa23";
    },

    getLink(orderid) {
      return "/order" + orderid;
    },

    async retrieveOrders() {
      const docRef = db.collection("orders");
      var orders = [];
      // await docRef.where("status", "==", "Fulfilled").get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     orders.push({ ...doc.data(), docID: doc.id});
      //   });
      // });
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), docID: doc.id});
        });
      });

      return orders;
    },

    convertToCurrency(value) {
      const dollar = value.split(".")[0];
      var cents = value.split(".")[1];
      if (cents) {
        if (cents.length == 1) {
          cents = "." + cents + "0";
        }
      } else {
        cents = ".00"
      }

      return dollar + cents;
    }
  },

  async mounted() {
    const firebaseorders = await this.retrieveOrders();
    console.log("Orders Below");
    console.log(firebaseorders);
    
    for (let i = 0; i < firebaseorders.length; i++) {
      
      var dict = {};

      var date = firebaseorders[i]["date"].toDate();
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0');
      var yyyy = date.getFullYear();
      
      date = dd + '/' + mm + '/' + yyyy;

      var buyer = firebaseorders[i]["buyerID"];
      var status = firebaseorders[i]["status"];
      var totalearnings = "$" + this.convertToCurrency(String(firebaseorders[i]["total"]));

      dict["orderid"] = i + 1;
      dict["date"] = date;
      dict["custname"] = buyer;
      dict["orderstatus"] = status;
      dict["earnings"] = totalearnings;

      this.fireorders.push(dict);
    }

    console.log(this.fireorders);
  }
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
