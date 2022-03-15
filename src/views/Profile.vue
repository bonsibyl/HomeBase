<template>
  <v-app>
    <delete-listing-modal
      :listingID="this.deleteRef"
      @deleteInfo="removeListing"
    />
    <div v-if="seller" id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1">
        <div id="content">
          <v-row id="searchrow">
            <v-col>
              <h1 class="font-weight-bold">
                @{{ this.$store.state.profileUsername }}
              </h1>
              <v-col v-if="this.$store.state.seller" class="col-info">
                <h4 class="text--secondary">
                  Store Name: {{ this.$store.state.profileFirstName }}
                </h4>
                <h4 class="text--secondary">
                  Business Email: {{ this.$store.state.profileEmail }}
                </h4>
                <h4 class="text--secondary">
                  Contact Number: {{ this.$store.state.number }}
                </h4>
                <h4 class="text--secondary">
                  Address: {{ this.$store.state.address }}
                </h4>
              </v-col>
              <v-col v-else class="col-info">
                <h4 class="text--secondary">
                  Name: {{ this.$store.state.profileFirstName }}
                </h4>
                <h4 class="text--secondary">
                  Email: {{ this.$store.state.profileEmail }}
                </h4>
                <h4 class="text--secondary">
                  Contact Number: {{ this.$store.state.number }}
                </h4>
                <h4 class="text--secondary">
                  Address: {{ this.$store.state.address }}
                </h4>
              </v-col>
              <v-col cols="auto" class="col-btn">
                <v-btn @click="toggleEditMode" v-if="userMatch">
                  Edit Details
                  <v-icon right>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-col>
            <v-spacer></v-spacer>
            <v-col id="img">
              <v-card height="400" width="650">
                <v-img
                  height="100%"
                  src="https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_e0c99cb9-6dbf-427a-91b0-de7a3e115026_900x.jpg?v=1596376378"
                >
                </v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-row id="filterrow" align="end">
            <v-col cols="auto">
              <h4 class="text--secondary">Listings</h4>
            </v-col>
            <v-col class="pl-0" v-if="editMode">
              <v-btn plain x-small :to="createListing"
                ><v-icon>mdi-plus</v-icon></v-btn
              ></v-col
            >
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-menu open-on-hover offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">
                    Filter By
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
            <v-col v-for="result in ListingResults" :key="result.name" cols="4">
              <v-card
                class="rounded-lg test"
                min-width="150"
                min-height="100"
                height="400"
                :to="listingRoute + result.docID"
                hover
              >
                <v-img
                  gradient="to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(132, 131, 131, 0.8) 100%"
                  class="white--text align-end bottom-gradient test"
                  height="100%"
                  :src="result.imageURL"
                >
                  <v-btn
                    v-if="editMode"
                    class="edit-listing-buttons"
                    @click="triggerDeletePopup(result.docID)"
                    text
                    plain
                    small
                  >
                    <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="editMode"
                    :to="editRoute + 'Ba9xA09iA0TQWxne3YBU'"
                    class="edit-listing-buttons"
                    text
                    plain
                    small
                  >
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                  <v-card-title>{{ result.name }}</v-card-title>
                </v-img></v-card
              >
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </div>
    <div v-else id="user-page">
      <UserProfile />
    </div>
  </v-app>
</template>

<script>
import UserProfile from "../views/UserProfile.vue";
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";
import DeleteListingModal from "../components/DeleteListingModal.vue";

export default {
  name: "Profile",
  components: {
    UserProfile,
    DeleteListingModal,
  },
  data: () => ({
    deleteRef: "",
    ListingResults: [],
    ListingURLS: [],
    Sorts: ["Price Asc", "Price Desc", "Newest", "Oldest"],
    ActiveSort: "",
    PriceRanges: ["$1-$10", "$11-$20", "$21-$30", ">$30"],
    ActiveRanges: [],
    Filters: ["Vegan", "Halal", "Gluten-Free"],
    ActiveFilters: [],
    seller: null,
    editMode: false,
    userMatch: false,
  }),

  async mounted() {
    const user = firebase.auth().currentUser.uid;
    this.userMatch = this.$route.params.id === user;
    // const information = await this.retrieveUserType(this.$route.params.id);
    // this.seller = information;
    if (this.seller) {
      const listings = await this.retrieveSellerListings(this.$route.params.id);
      for (let i = 0; i < listings.length; i++) {
        var ref = listings[i];
        var imageURL = await this.retrieveImage(ref.name);
        listings[i]["imageURL"] = imageURL;
        listings[i]["docID"] = this.ListingURLS[i];
      }
      this.ListingResults = listings;
      console.log(this.ListingResults);
    } else {
      console.log("test");
    }
  },
  methods: {
    async retrieveUserType(id) {
      const docRef = db.collection("users").doc(id);
      var sellerType = null;
      await docRef.get().then((doc) => {
        sellerType = doc.data().seller;
      });
      return sellerType;
    },
    async retrieveSellerListings(id) {
      const docRef = db.collection("listings").where("storeName", "==", id);
      var listings = [];
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listings.push(doc.data());
          this.ListingURLS.push(doc.id);
        });
      });
      return listings;
    },
    async retrieveImage(productName) {
      const storageRef = firebase.storage().ref();
      var imageURL = "";
      await storageRef
        .child("listings/" + productName + this.$route.params.id)
        .getDownloadURL()
        .then((url) => {
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
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    triggerDeletePopup(docID) {
      this.deleteRef = docID;
      this.$modal.show("delete-listing");
    },
    removeListing(deletedListing) {
      this.ListingResults = this.ListingResults.filter((listing) => {
        if (listing["docID"] === deletedListing) {
          this.removeListingImage(listing);
        }
        return listing["docID"] !== deletedListing;
      });
    },
    removeListingImage(listing) {
      var storageRef = firebase.storage().ref();
      storageRef.child(listing.imageRef).delete();
    },
  },
  computed: {
    checkRoute() {
      return this.$route.params.id;
    },
    createListing() {
      return "/CreateListing/" + this.$route.params.id;
    },
    editRoute() {
      return "/EditListing/" + this.$route.params.id + "/";
    },
    listingRoute() {
      return "/listing/" + this.$route.params.id + "/";
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
.edit-listing-buttons {
  position: relative;
  top: -330px;
  right: 10px;
  float: right;
}
</style>
