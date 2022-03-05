<template>
  <v-app>
    <div id="sheet">
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
                <v-btn>
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
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-menu
                open-on-hover
                offset-y
                transition="slide-y-transition"
              >
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
            <v-col v-for="result in results" :key="result" cols="4">
              <v-card
                class="rounded-lg"
                min-width="150"
                min-height="100"
                height="400"
                :to="'/'"
                hover
              >
                <v-img
                  gradient="to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(132, 131, 131, 0.8) 100%"
                  class="white--text align-end bottom-gradient"
                  height="100%"
                  src="https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_360x.jpg?v=1632976135"
                >
                  <v-card-title>{{ result }}</v-card-title>
                </v-img></v-card
              >
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    results: [
      "Blueberry",
      "Strawberry",
      "Macarons",
      "Cupcake",
      "Brownie",
      "Cookie",
      "Tart",
    ],
    Sorts: ["Price Asc", "Price Desc", "Newest", "Oldest"],
    ActiveSort: "",
    PriceRanges: ["$1-$10", "$11-$20", "$21-$30", ">$30"],
    ActiveRanges: [],
    Filters: ["Vegan", "Halal", "Gluten-Free"],
    ActiveFilters: [],
  }),
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
</style>
