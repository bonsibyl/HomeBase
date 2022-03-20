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
      <v-data-table :headers="headers" :items="orders">
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
  }),
  methods: {
    getColor(orderstatus) {
      if (orderstatus == "Fulfilled") return "green";
      else if (orderstatus == "In Progress") return "#dbaa23";
      else if (orderstatus == "Pending Payment") return "#bf1802";
    },

    getLink(orderid) {
      return "/order" + orderid;
    },
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
