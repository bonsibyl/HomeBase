<template>
  <div class="landing-container">
    <div v-if="$store.state.seller">
        <div class="landing-rectangle">
        <v-container>
          <strong class="supporting-header">Welcome back to Homebase!</strong>

          <p class="supporting-text">
            How did your shop fare this week? <br />
            Take a look at your analytics dashboard.
          </p>
          <router-link
            :to="{ name: 'Dashboard', params: { id: this.$store.state.profileId }}"
            
            tag="button"
            class="landing-register-button"
          >
            View Shop Analytics
          </router-link>
        </v-container>
      </div>

      <div class="landing-overview">
        <h1 class="overview-title">Today's Orders</h1>
        <v-data-table :headers="headers" :items="fireorders">
        </v-data-table>
        <br>
        <v-card id="graphcard" color="#ffff">
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
      </div>

    </div>

    <div v-else>
      <div class="landing-rectangle">
        <strong class="supporting-header">Welcome back to Homebase!</strong>
        <p class="supporting-text">
          With over 100 reputable small local food businesses on our platform,
          there is sure to be an option for you.
        </p>
        <router-link
          :to="{ name: 'Search' }"
          tag="button"
          class="landing-register-button"
          >View All Available Bakes!</router-link
        >
      </div>

      <v-container class="separator"></v-container>

      <div class="browse-new">
        <div class="content-buyer">
          <br />
          <h1 class="div-title">See what's new</h1>
          <br />
          <v-row>
            <v-col v-for="result in getListings" :key="result.name" cols="3">
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card
                    class="rounded-lg"
                    min-width="150"
                    min-height="100"
                    height="350"
                    :to="'/listing/' + result.storeName + '/' + result.docID"
                    hover
                  >
                    <v-img
                      gradient="to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(132, 131, 131, 0.8) 100%"
                      class="white--text align-end bottom-gradient"
                      height="100%"
                      :src="result.imageURL"
                    >
                      <v-card-title class="font-weight-medium pt-0">{{
                        result.name
                      }}</v-card-title>
                      <v-card-subtitle class="text-left py-0">By {{
                        result.shopName
                      }}</v-card-subtitle>
                      <v-card-subtitle class="text-left pt-0"
                        >{{ result.qtyDesc }}
                        <br />
                        {{ "$" + result.price }}</v-card-subtitle
                      >
                    </v-img>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#fff">
                        <v-btn color="#f5e4d0" class="black--text"
                          >View Listing</v-btn
                        >
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";
export default {
  name: "Landing",
  data: () => ({
    ListingResults: [],
    headers: [
      { text: "Item", value: "item" },
      //{ text: "Batch No.", value: "batchno" },
      //{ text: "Total No. of Pieces", value: "pieceno" },
      { text: "Total no. of Units", value: "unitno" },
      // { text: "Price per Unit", value: "perunitprice" },
      // { text: "Total Earnings", value: "earnings" },
    ],
    fireorders: [],
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
        data: {},
      },
    ],
  }),
  async mounted() {
    console.log("TESTLINE2")
    console.log(this.$store.state.seller);
    const listings = await this.retrieveListings();
    for (let i = 0; i < listings.length; i++) {
      var ref = listings[i];
      var imageURL = await this.retrieveImage(ref.imageRef);
      listings[i]["imageURL"] = imageURL;
    }
    this.ListingResults = listings;
    //this.ListingResults = listings;
    console.log(this.ListingResults);

    const firebaseorders = await this.retrieveOrders();
    //console.log(firebaseorders);

    var itemDict = {}

    for (let i = 0; i < firebaseorders.length; i++) {
      //console.log(i);
      //console.log(firebaseorders[i]["details"][0]);
      for (let j = 0; j < firebaseorders[i]["details"].length; j ++) {

        var itemName = firebaseorders[i]["details"][j]["name"];
        var itemQty = firebaseorders[i]["details"][j]["quantity"];
        var itemPrice = firebaseorders[i]["details"][j]["fullRef"]["price"];

        if (!(itemName in itemDict)) {
          itemDict[itemName] = {}
          itemDict[itemName]["itemQty"] = itemQty;
          itemDict[itemName]["itemPrice"] = itemPrice;
          
        } else {
          itemDict[itemName]["itemQty"] = itemDict[itemName]["itemQty"] + itemQty;
        }
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

    const orders = await this.retrieveOrdersForAnalytics(this.$store.state.profileId);

    //var today = new Date();
    //var todayDate = today.getDate();

     var dateArray = this.makeDateArray();

    for (let i = 0; i < orders.length; i++) {
        var ref2 = orders[i]; //ref2 is each order

        this.totalRev = this.totalRev + ref2.total;

        if (this.compareDate(ref2.date.toDate(), dateArray[6])) {
            this.day7Rev += ref2.total;
          } else if (this.compareDate(ref2.date.toDate(), dateArray[5])) {
            this.day6Rev += ref2.total;
          } else if (this.compareDate(ref2.date.toDate(), dateArray[4])) {
            this.day5Rev += ref2.total;
          } else if (this.compareDate(ref2.date.toDate(), dateArray[3])) {
            this.day4Rev += ref2.total;
          } else if (this.compareDate(ref2.date.toDate(), dateArray[2])) {
            this.day3Rev += ref2.total;
          } else if (this.compareDate(ref2.date.toDate(), dateArray[1])) {
            this.day2Rev += ref2.total;
          } else if (this.compareDate(ref2.date.toDate(), dateArray[0])) {
            this.day1Rev += ref2.total;
          }
      }

    // for (let j = (todayDate - 6); j <= todayDate; j++) {
    //   this.revDates.push(j);
    // }

      

      var days = this.labelArray(dateArray);
      var dayRev = [this.day1Rev, this.day2Rev, this.day3Rev, this.day4Rev, this.day5Rev, this.day6Rev, this.day7Rev];

      this.chartData = [
        {
          name: "Sales ($)",

          data: {},
        }
      ]
      for (let k = 0; k < days.length; k++) {
        this.chartData[0]["data"][days[k]] = dayRev[k];
      }
  },

  computed: {
    isSeller() {
      return this.$store.state.isSeller;
    },
    getListings() {
      return this.ListingResults;
    },
  },
  methods: {
    async retrieveListings() {
      const docRef = db.collection("listings");
      var listings = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listings.push({ ...doc.data(), docID: doc.id });
        });
      });
      return listings;
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
    async retrieveOrders() {
      const docRef = db.collection("orders");
      var temporders = [];
      var orders = [];

      var dayStart = new Date();
      dayStart.setHours(0,0,0,0);
      var dayEnd = new Date();
      dayEnd.setHours(23, 59, 59, 999);

      await docRef.where("sellerID", "==", this.$store.state.profileId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temporders.push({ ...doc.data(), docID: doc.id});
        });
      });

      orders = temporders.filter(orderrecord => (orderrecord["date"].toDate() >= dayStart) && (orderrecord["date"].toDate() <= dayEnd))
      
      return orders;
    },

    async retrieveOrdersForAnalytics(id) {
      const docRef = db.collection("orders").where("sellerID", "==", id);
      var orders = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), docID: doc.id });
        });
      });
      return orders;
    },
    makeDateArray() {
      var dateArray = [];

      for (let i = 0; i < 7; i++) {
        var dateObject = new Date();
        dateObject.setDate(dateObject.getDate() - i);
        dateArray.unshift(dateObject); 
      }
      return dateArray
    },

    compareDate(orderTimestamp, chartTimestamp) {
      var orderDay = orderTimestamp.getDate();
      var orderMonth = orderTimestamp.getMonth();
      var orderYear = orderTimestamp.getFullYear();
      
      var chartDay = chartTimestamp.getDate();
      var chartMonth = chartTimestamp.getMonth();
      var chartYear = chartTimestamp.getFullYear();

      return ((orderDay == chartDay) && (orderMonth == chartMonth) && (orderYear == chartYear));

    },

    labelArray(dateArray) {
      var result = []
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      for (let i = 0; i < 7; i++) {
        var day = String(dateArray[i].getDate());
        var month = months[dateArray[i].getMonth()];
        result.push(day + " " + month)
      }

      return result;
    }
  },
};
</script>

<style lang="scss" scoped>
.landing-container {
  background-image: url("../assets/LandingBackground.png");
  background-size: cover;
  background-attachment: scroll;
  height: 92vh;
  text-align: center;
  display: block;

  .landing-rectangle {
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    display: flex;
    flex-direction: column;
    left: 10%;
    top: 10%;
    width: 30%;
    margin-top: 5%;
    .supporting-header {
      font-size: 25px;
      text-align: center;
    }
  }

  .landing-overview {
    background-color: #fffbf5;
    margin-left: auto;
    margin-right: auto;
    margin-top: 180px;
    border-radius: 20px;
    padding: 2% 10% 4% 10%;
    .overview-title {
      text-align:left;
      margin-bottom: 10px;
    }
  }


  .landing-register-button {
    border-radius: 0px;
    height: 75px;
    background-color: #e89f71;
    color: #ffffff;
    font-weight: 600;
  }
  .div-title {
    text-align: left;
  }
  .separator {
    height: 25vh;
  }
  .browse-new {
    //margin-top: 198px;
    background-color: #fffbf5;
  }
  .content-buyer {
    margin: 0 5vw 0 5vw;
  }
}
</style>
