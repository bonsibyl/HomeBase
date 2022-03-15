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
    <v-main>
      <v-container class="dashboardContainer">
        <h1 style="text-align: left">Overview</h1>
        <hr />
        <v-data-table :headers="headers" :items="orders"> </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview"],
      ["Orders", "/sellerordermanagement"],
      ["Reviews", "/"],
      ["Analytics", "/dashboard"],
    ],
    headers: [
      { text: "Item", value: "item" },
      { text: "Batch No.", value: "batchno" },
      { text: "Total No. of Pieces", value: "pieceno" },
      { text: "Total no. of Units", value: "unitno" },
      { text: "Price per Unit", value: "perunitprice" },
      { text: "Total Earnings", value: "earnings" },
    ],
    orders: [
      {
        item: "Almond Financiers",
        batchno: "1",
        pieceno: "40",
        unitno: "5",
        perunitprice: "$13.90",
        earnings: "$69.50",
      },

      {
        item: "Chocolate Macarons",
        batchno: "1",
        pieceno: "36",
        unitno: "2",
        perunitprice: "$20.90",
        earnings: "$41.80",
      },

      {
        item: "Almond Financiers",
        batchno: "2",
        pieceno: "16",
        unitno: "2",
        perunitprice: "$13.90",
        earnings: "$27.80",
      },

      {
        item: "Blueberry Muffins",
        batchno: "1",
        pieceno: "6",
        unitno: "2",
        perunitprice: "$12.90",
        earnings: "$25.80",
      },
    ],
  }),
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
    width: 93%;
    margin-top: 2%;
}

.v-data-table::v-deep th {
  font-size: 17px !important;
}
.v-data-table::v-deep td {
  font-size: 17px !important;
}

</style>