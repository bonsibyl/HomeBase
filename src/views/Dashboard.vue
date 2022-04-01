<template>
  <div v-if="seller" class="background">
    <v-app>
      <v-navigation-drawer app absolute color="#f5f5f5" height="100%">
        <v-list class="pt-0">
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
              <v-card-text class="metricNumber"
                >${{ totalRev.toFixed(2) }}</v-card-text
              >
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
                Weekly Sales Trends
              </v-card-title>
              <v-card-text>
                <line-chart
                  :data="chartData"
                  :colors="['green']"
                  :legend="false"
                ></line-chart>
                <p id="graphlabel">Day</p>
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
    // janRev: 0,
    // febRev: 0,
    // marRev: 0,
    // aprRev: 0,
    // mayRev: 0,
    // junRev: 0,
    // julRev: 0,
    // augRev: 0,
    // sepRev: 0,
    // octRev: 0,
    // novRev: 0,
    // decRev: 0,
    day1Rev: 0,
    day2Rev: 0,
    day3Rev: 0,
    day4Rev: 0,
    day5Rev: 0,
    day6Rev: 0,
    day7Rev: 0,
    revDates: [],

    chartData: [
      {
        name: "Sales ($)",

        // data: {
        //   'Jan':0,
        //   'Feb': 0,
        //   'Mar':0,
        //   'Apr': 0,
        //   'May':0,
        //   'Jun': 0,
        //   'Jul':0,
        //   'Aug': 0,
        //   'Sep':0,
        //   'Oct': 0,
        //   'Nov':0,
        //   'Dec': 0,
        // },
        data: {},
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
          this.numVisits = doc.data().viewCount ? doc.data().viewCount : 0;
        });

      var today = new Date();
      var todayDate = today.getDate();

      for (let i = 0; i < orders.length; i++) {
        var ref2 = orders[i]; //ref2 is each order

        this.totalRev = this.totalRev + ref2.total;
        if (ref2.date.toDate().getDate() == todayDate) {
          this.day7Rev += ref2.total;
        } else if (ref2.date.toDate().getDate() == todayDate - 1) {
          this.day6Rev += ref2.total;
        } else if (ref2.date.toDate().getDate() == todayDate - 2) {
          this.day5Rev += ref2.total;
        } else if (ref2.date.toDate().getDate() == todayDate - 3) {
          this.day4Rev += ref2.total;
        } else if (ref2.date.toDate().getDate() == todayDate - 4) {
          this.day3Rev += ref2.total;
        } else if (ref2.date.toDate().getDate() == todayDate - 5) {
          this.day2Rev += ref2.total;
        } else if (ref2.date.toDate().getDate() == todayDate - 6) {
          this.day1Rev += ref2.total;
        }
        //console.log(ref2.date.toDate().getMonth());
        //  if (ref2.date.toDate().getMonth() == 0) {
        //   this.janRev = this.janRev + ref2.total;
        // }
        //  if (ref2.date.toDate().getMonth() == 1) {
        //   this.febRev = this.febRev + ref2.total;
        // }
        // if (ref2.date.toDate().getMonth() == 2) {
        //   this.marRev = this.marRev + ref2.total;
        // }
        //  if (ref2.date.toDate().getMonth() == 3) {
        //   this.aprRev = this.aprRev + ref2.total;
        // }
        // if (ref2.date.toDate().getMonth() == 4) {
        //   this.mayRev = this.mayRev + ref2.total;
        // }
        //  if (ref2.date.toDate().getMonth() == 5) {
        //   this.junRev = this.junRev + ref2.total;
        // }
        // if (ref2.date.toDate().getMonth() == 6) {
        //   this.julRev = this.julRev + ref2.total;
        // }
        //  if (ref2.date.toDate().getMonth() == 7) {
        //   this.augRev = this.augRev + ref2.total;
        // }
        // if (ref2.date.toDate().getMonth() == 8) {
        //   this.sepRev = this.sepRev + ref2.total;
        // }
        //  if (ref2.date.toDate().getMonth() == 9) {
        //   this.octRev = this.octRev + ref2.total;
        // }
        // if (ref2.date.toDate().getMonth() == 10) {
        //   this.novRev = this.novRev + ref2.total;
        // }
        //  if (ref2.date.toDate().getMonth() == 11) {
        //   this.decRev = this.decRev + ref2.total;
        // }
      }

      for (let j = todayDate - 6; j <= todayDate; j++) {
        this.revDates.push(j);
      }

      this.ListingResults = listings;
      console.log(this.ListingResults);
      this.chartData = [
        {
          name: "Sales ($)",

          data: {
            // 'Jan':this.janRev,
            // 'Feb': this.febRev,
            // 'Mar':this.marRev,
            // 'Apr': this.aprRev,
            // 'May':this.mayRev,
            // 'Jun': this.junRev,
            // 'Jul':this.julRev,
            // 'Aug': this.augRev,
            // 'Sep':this.sepRev,
            // 'Oct': this.octRev,
            // 'Nov':this.novRev,
            // 'Dec': this.decRev,
            "Day 1": this.day1Rev,
            "Day 2": this.day2Rev,
            "Day 3": this.day3Rev,
            "Day 4": this.day4Rev,
            "Day 5": this.day5Rev,
            "Day 6": this.day6Rev,
            "Day 7": this.day7Rev,
          },
        },
      ];
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
