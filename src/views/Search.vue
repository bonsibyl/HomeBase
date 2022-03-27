<template>
  <v-app>
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1" min-height="80vh">
        <div id="content">
          <v-row id="searchrow">
            <v-col class="mt-2">
              <h1 class="font-weight-bold">What are you craving today?</h1>
            </v-col>
            <v-col id="searchbar">
              <v-responsive max-width="650" class="pt-1">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  outlined
                  clearable
                  label="Search for..."
                  color="#DD905F"
                  v-model="searchQuery"
                ></v-text-field>
              </v-responsive>
            </v-col>
          </v-row>
          <v-row id="filterrow" align="end">
            <v-col cols="auto">
              <h3 class="text--secondary">Results</h3>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-menu open-on-hover offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">
                    Sort By
                    <v-icon right>mdi-menu-down</v-icon>
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
            <v-col cols="auto">
              <v-menu open-on-hover offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">
                    Price
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-group v-model="ActiveRanges" multiple>
                    <template v-for="(Range, i) in PriceRanges">
                      <v-list-item
                        :key="`Range-${i}`"
                        :value="Range"
                        @click.stop.prevent
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-action>
                            <v-checkbox :input-value="active"></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-if="Range.lower != 41"
                              v-text="`$` + Range.lower + `-` + Range.upper"
                            ></v-list-item-title>
                            <v-list-item-title
                              v-else
                              v-text="`>$`+40"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="auto">
              <v-menu open-on-hover offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">
                    More Filters
                    <v-icon right>mdi-tune</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-group v-model="ActiveFilters" multiple>
                    <template v-for="(Filter, i) in Filters">
                      <v-list-item
                        :key="`Filter-${i}`"
                        :value="Filter"
                        @click.stop.prevent
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-action>
                            <v-checkbox :input-value="active"></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="Filter"
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
          <v-row>
            <v-col v-show="filteredListings.length === 0">
              <h2 class="font-weight-bold">No results found :(</h2>
            </v-col>
            <v-col
              v-for="result in filteredListings"
              :key="result.name"
              cols="4"
            >
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card
                    class="rounded-lg"
                    min-width="150"
                    min-height="100"
                    height="400"
                    :to="'/listing/' + result.storeName + '/' + result.docID"
                    hover
                  >
                    <v-img
                      gradient="to bottom, rgba(255, 255, 255, 0) 10%, rgba(0, 0, 0, 0) 60%, rgba(132, 131, 131, 0.8) 100%"
                      class="white--text align-end bottom-gradient"
                      height="100%"
                      :src="result.imageURL"
                    >
                      <v-card-title class="font-weight-medium pt-0">{{
                        result.name
                      }}</v-card-title>
                      <v-card-subtitle class="py-0"
                        >By {{ result.shopName }}</v-card-subtitle
                      >
                      <v-card-subtitle class="py-0">{{
                        result.qtyDesc
                      }}</v-card-subtitle>
                      <v-card-subtitle class="pt-0">{{
                        "$" + result.price
                      }}</v-card-subtitle>
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
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";
export default {
  name: "Search",

  data: () => ({
    ListingResults: [],
    Sorts: ["Oldest", "Newest", "Price Asc", "Price Desc"],
    ActiveSort: null,
    PriceRanges: [
      {
        lower: 1,
        upper: 10,
      },
      {
        lower: 11,
        upper: 20,
      },
      {
        lower: 21,
        upper: 30,
      },
      {
        lower: 31,
        upper: 40,
      },
      {
        lower: 41,
        upper: Number.MAX_VALUE,
      },
    ],
    ActiveRanges: [],
    Filters: ["Vegan", "Halal", "Gluten-Free"],
    ActiveFilters: [],
    searchQuery: null,
  }),

  async mounted() {
    const listings = await this.retrieveListings();
    for (let i = 0; i < listings.length; i++) {
      var ref = listings[i];
      var imageURL = await this.retrieveImage(ref.imageRef);
      listings[i]["imageURL"] = imageURL;
    }
    this.ListingResults = listings;
  },
  computed: {
    filteredListings() {
      if (
        //default
        this.searchQuery === null &&
        this.ActiveSort === "" &&
        this.ActiveRanges.length === 0 &&
        this.ActiveFilters.length === 0
      ) {
        return this.ListingResults;
      }
      var filteredResults = this.ListingResults;
      if (this.searchQuery != null) {
        //filter by search query
        filteredResults = this.filterBySearch(filteredResults);
      }
      //filter by tags
      if (this.ActiveFilters.length > 0) {
        filteredResults = this.filterByTags(filteredResults);
      }
      //filter by price
      if (this.ActiveRanges.length > 0) {
        filteredResults = this.filterByPrice(filteredResults);
      }
      //apply sort
      if (this.ActiveSort) {
        filteredResults = this.applySort(filteredResults);
      }
      return filteredResults;
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
    filterBySearch(results) {
      return results.filter((listing) => {
        return listing.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    filterByTags(results) {
      return results.filter((listing) =>
        this.ActiveFilters.every((x) => listing.tags.indexOf(x) > -1)
      );
    },
    filterByPrice(results) {
      let ranges = this.ActiveRanges;
      function checkWithinRanges(listing) {
        for (var i = 0; i < ranges.length; i++) {
          if (
            listing.price >= ranges[i].lower &&
            listing.price <= ranges[i].upper
          ) {
            return true;
          }
        }
      }
      return results.filter(checkWithinRanges);
    },
    applySort(results) {
      switch (this.ActiveSort) {
        case "Oldest":
          return results.sort(
            (a, b) => a.dateCreated.toDate() - b.dateCreated.toDate()
          );
        case "Newest":
          return results.sort(
            (a, b) => b.dateCreated.toDate() - a.dateCreated.toDate()
          );
        case "Price Asc":
          return results.sort((a, b) => a.price - b.price);
        case "Price Desc":
          return results.sort((a, b) => b.price - a.price);
      }
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

#divider1 {
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
