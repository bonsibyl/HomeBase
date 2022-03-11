<template>
  <v-app>
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1">
        <div id="content">
          <v-row id="searchrow">
            <v-col>
              <h1 class="font-weight-bold">What are you craving today?</h1>
            </v-col>
            <v-col id="searchbar">
              <v-responsive max-width="650">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  outlined
                  clearable
                  label="Search for..."
                  color="#DD905F"
                ></v-text-field>
              </v-responsive>
            </v-col>
          </v-row>
          <v-row id="filterrow" align="end">
            <v-col cols="auto">
              <h4 class="text--secondary">Results</h4>
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
              <v-menu
                close-on-click="false"
                close-on-content-click="false"
                open-on-hover
                offset-y
                transition="slide-y-transition"
              >
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
                              v-text="Range"
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
              <v-menu
                close-on-click="false"
                close-on-content-click="false"
                open-on-hover
                offset-y
                transition="slide-y-transition"
              >
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
            <v-col v-for="result in results" :key="result" cols="4">
              <v-hover>
                <template v-slot:default="{ hover }">
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
                    </v-img>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#fff">
                        <v-btn color="#f5e4d0" class="black--text">View Listing</v-btn>
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
export default {
  name: "Search",

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
