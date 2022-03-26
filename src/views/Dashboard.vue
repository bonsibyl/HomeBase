<template>
  <div v-if="seller" class="background">
    <v-app>
      <v-navigation-drawer app absolute color="#f5f5f5">
        <v-list  class="pt-0">
          <v-list-item
            v-for="[page, route] in pages"
            :key="page"
            link
            :to="route + checkRoute"
            height="400"
          >
            <v-list-item-content>
              {{ page }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container class="dashboardContainer">
        <v-row id="headerrow">
          <v-col>
            <h1 style="text-align: left">Analytics</h1>
            <hr />
          </v-col>
        </v-row>
        <v-row id="summrow">
          <v-col>
            <v-card color="#ffff">
              <v-card-title class="metricTitle">
                Number of Visits
                <v-icon right color="red">mdi-chart-line</v-icon>
              </v-card-title>
              <v-card-text class="metricNumber">{{ numVisits }}</v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="#ffff">
              <v-card-title class="metricTitle">
                Revenue
                <v-icon right color="green">mdi-currency-usd</v-icon>
              </v-card-title>
              <v-card-text class="metricNumber">{{ totalRev }}</v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="#ffff">
              <v-card-title class="metricTitle">
                Average Review Score
                <v-icon right color="blue">mdi-thumb-up</v-icon>
              </v-card-title>
              <v-card-text class="metricNumber">{{ avgRating }}</v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="#ffff">
              <v-card-title class="metricTitle">
                Number of Reviews
                <v-icon right color="orange">mdi-message-draw</v-icon>
              </v-card-title>
              <v-card-text class="metricNumber">{{ numReviews }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card width="1980" height="500px" id="graphcard" color="#ffff">
              <v-card-title id="graphcardtitle" class="text-h5 justify-center">
                Monthly Sales Trends
              </v-card-title>
              <v-card-text>
                <line-chart
                  :data="chartData"
                  :colors="['#m02']"
                  :legend="false"
                ></line-chart>
                <p id="graphlabel">Month</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {
  name: "Dashboard",
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview/"],
      ["Orders", "/sellerordermanagement/"],
      ["Reviews", "/sellerreviews/"],
      ["Analytics", "/dashboard/"],
    ],
    ListingResults: [],
    numReviews: 0,
    numVisits: 0,
    totalRev: 0,
    totalRating: 0,
    avgRating: 0,
    seller: null,
    //Populating profile fields
    shopUsername: "",
    storeName: "",
    buyerName: "",
    email: "",
    contactNo: "",
    address: "",
    chartData: [
      {
        name: "Sales ($)",
        data: {
          1: 423,
          2: 446,
          3: 675,
          4: 510,
          5: 590,
          6: 750,
          7: 850,
          8: 905,
        },
      },
    ],
  }),
  async mounted() {
    const user = firebase.auth().currentUser.uid;
    console.log(this.$route.params.id);
    this.userMatch = this.$route.params.id === user;
    const information = await this.retrieveUserType(this.$route.params.id);
    this.seller = information;
    if (this.seller) {
      const listings = await this.retrieveSellerListings(this.$route.params.id);
      const orders = await this.retrieveOrders(this.$route.params.id);
      for (let i = 0; i < listings.length; i++) {
        var ref = listings[i];
        this.totalRating = this.totalRating + ref.ReviewScoreTotal;
        this.numReviews = this.numReviews + ref.ReviewScoreCount;
      }
      db.collection("users")
        .doc(user)
        .get()
        .then((doc) => {
          this.numVisits = doc.data().viewCount;
        });
      for (let i = 0; i < orders.length; i++) {
        var ref2 = orders[i];
        this.totalRev = this.totalRev + ref2.total;
      }
      this.ListingResults = listings;
      console.log(this.ListingResults);
    }
    this.avgRating = Math.round(this.totalRating / this.numReviews);
  },
  methods: {
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
    async retrieveSellerListings(id) {
      const docRef = db.collection("listings").where("storeName", "==", id);
      var listings = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listings.push({ ...doc.data(), docID: doc.id });
        });
      });
      return listings;
    },
    async retrieveOrders(id) {
      const docRef = db.collection("orders").where("sellerID", "==", id);
      var orders = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), docID: doc.id });
        });
      });
      return orders;
    },
  },
  computed: {
    checkRoute() {
      return this.$route.params.id;
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

.stats {
  font-size: 20px;
  text-align: right;
}

h1 {
  text-align: center;
  background-color: rgb(255, 255, 255, 0.75);
}

h2 {
  text-align: right;
}

#graphheader {
  text-align: center;
}

#graphcardtitle {
  text-align: center;
}

#graphcardtext {
  margin: 10px;
}

#graphlabel {
  text-align: center;
  font-weight: bold;
}

.dashboardContainer {
  width: 80%;
  margin-top: 2%;
  margin-left: 300px;
}

.metricNumber {
  font-size: 20px;
  font-weight: bold;
  margin-top: -2%;
}

.metricTitle {
  font-size: 17px;
  color: rgb(92, 92, 92);
  font-weight: bold;
}

hr {
  margin-top: 1%;
}
</style>
