<template>
  <v-app>
    <v-navigation-drawer app absolute color="#f5f5f5" height="100%">
      <v-list class="pt-0">
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
      <h1 style="text-align: left">Today's Overview</h1>
      <hr />
      <v-data-table :headers="headers" :items="fireorders"> </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview/"],
      ["Orders", "/sellerordermanagement/"],
      ["Reviews", "/sellerreviews/"],
      ["Analytics", "/dashboard/"],
    ],
    headers: [
      { text: "Item", value: "item" },
      //{ text: "Batch No.", value: "batchno" },
      //{ text: "Total No. of Pieces", value: "pieceno" },
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

    fireorders: [],
  }),
  computed: {
    checkRoute() {
      return this.$route.params.id;
    },
  },

  methods: {
    async retrieveOrders() {

      const docRef = db.collection("orders");
      var temporders = [];
      var orders = [];

      var dayStart = new Date();
      dayStart.setHours(0,0,0,0);
      var dayEnd = new Date();
      dayEnd.setHours(23, 59, 59, 999);

      await docRef.where("sellerID", "==", this.$route.params.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temporders.push({ ...doc.data(), docID: doc.id});
        });
      });

      orders = temporders.filter(orderrecord => (orderrecord["date"].toDate() >= dayStart) && (orderrecord["date"].toDate() <= dayEnd))
      
      return orders;
    }


  },

  async mounted() {
    const firebaseorders = await this.retrieveOrders();
    //console.log(firebaseorders);

    var itemDict = {}

    for (let i = 0; i < firebaseorders.length; i++) {
      //console.log(i);
      console.log(firebaseorders[i]);

      if (firebaseorders[i]["sellerID"] != this.$route.params.id) {
        continue;
      }

      var itemName = firebaseorders[i]["details"][0]["name"];
      var itemQty = firebaseorders[i]["details"][0]["quantity"];
      var itemPrice = firebaseorders[i]["details"][0]["fullRef"]["price"];

      if (!(itemName in itemDict)) {
        itemDict[itemName] = {}
        itemDict[itemName]["itemQty"] = itemQty;
        itemDict[itemName]["itemPrice"] = itemPrice;
        
      } else {
        itemDict[itemName]["itemQty"] = itemDict[itemName]["itemQty"] + itemQty;
      }
    }

    for (let key in itemDict) {
      var dict = {}
      dict["item"] = key;
      dict["unitno"] = itemDict[key]["itemQty"];
      dict["perunitprice"] = "$" + itemDict[key]["itemPrice"];
      //dict["earnings"] = parseFloat(itemDict[key]["itemQty"]) * parseFloat(itemDict[key]["itemPrice"]);
      dict["earnings"] = "$" + (itemDict[key]["itemQty"] * itemDict[key]["itemPrice"]);
    
      this.fireorders.push(dict);
    
    }

    //console.log(this.fireorders);
    


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
