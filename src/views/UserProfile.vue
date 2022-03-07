<template>
  <v-app>
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1">
        <div id="content">
          <v-row id="searchrow">
            <v-col :cols="4">
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
              <v-col cols="12" class="col-btn">
                <v-btn>
                  Edit Details
                  <v-icon right>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="ml-3">
                  <v-icon>mdi-dots-horizontal</v-icon>
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
              <v-btn
                v-if="!isOrder"
                class="green--text text--darken-4"
                text
                disabled
              >
                <strong>Your Recommendations</strong>
              </v-btn>
              <v-btn
                v-else
                class="grey--text text--darken-4"
                text
                @click="toggleOrder"
              >
                <strong>Your Recommendations</strong>
              </v-btn>
              <v-btn
                v-if="isOrder"
                class="green--text text--darken-4"
                text
                disabled
              >
                <strong>Your Orders</strong>
              </v-btn>
              <v-btn
                v-else
                class="grey--text text--darken-4"
                text
                @click="toggleOrder"
              >
                <strong>Your Orders</strong>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
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
                    Filter By
                    <v-icon right>mdi-tune</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-group v-model="ActiveFilters" multiple>
                    <template
                      v-for="(Filter, i) in !isOrder
                        ? RecFilters
                        : OrderFilters"
                    >
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
          <v-row v-if="!isOrder">
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
          <v-row v-else>
            <v-col :cols="12">
              <v-row class="order-headers ml-4 mt-4">
                <v-col>Date</v-col>
                <v-col>Bakery</v-col>
                <v-col>Order Details</v-col>
                <v-col>Order Status</v-col>
                <v-col>Order Total</v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
            <v-col
              class="pl-5"
              :cols="12"
              v-for="order in OrderInformation"
              :key="order"
            >
              <v-row>
                <v-col>{{ order.date }}</v-col>
                <v-col
                  ><u
                    ><strong>{{ order.bakery }}</strong></u
                  ></v-col
                >
                <v-col>
                  <v-row dense v-for="each in order.details" :key="each">
                    <v-col :cols="12">
                      <u>{{ each.name }}</u>
                    </v-col>
                    <v-col class="caption" :cols="12">
                      {{ each.quantityDesc }}
                    </v-col>
                    <v-col class="caption" :cols="12">
                      Qty: {{ each.quantity }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row>
                    <v-btn
                      v-if="order.status == 'fulfilled'"
                      color="green lighten-1"
                      >Fulfilled
                    </v-btn>
                    <v-btn v-else color="orange lighten-1">Processing</v-btn>
                  </v-row>
                  <v-row class="pt-4" v-if="order.status == 'fulfilled'">
                    <v-btn color="yellow darken-2">Leave a review!</v-btn>
                  </v-row>
                </v-col>
                <v-col>{{ order.total }}</v-col>
              </v-row>
              <br />
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "UserProfile",
  data: () => ({
    isOrder: false,
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
    RecFilters: ["Vegan", "Halal", "Gluten-Free"],
    OrderFilters: ["Price", "Date", "Completed"],
    ActiveFilters: [],
    OrderInformation: [
      {
        date: "01/02/2022",
        bakery: "nuttybutterybakery",
        details: [
          { name: "Almond Financiers", quantityDesc: "Box of 8", quantity: 1 },
          {
            name: "Chocolate Macarons",
            quantityDesc: "Box of 12",
            quantity: 1,
          },
        ],
        status: "fulfilled",
        total: "$34.80",
      },
      {
        date: "01/02/2022",
        bakery: "nuttybutterybakery",
        details: [
          { name: "Almond Financiers", quantityDesc: "Box of 8", quantity: 1 },
          {
            name: "Chocolate Macarons",
            quantityDesc: "Box of 12",
            quantity: 1,
          },
        ],
        status: "processing",
        total: "$34.80",
      },
      {
        date: "01/02/2022",
        bakery: "nuttybutterybakery",
        details: [
          { name: "Almond Financiers", quantityDesc: "Box of 8", quantity: 1 },
          {
            name: "Chocolate Macarons",
            quantityDesc: "Box of 12",
            quantity: 1,
          },
        ],
        status: "processing",
        total: "$34.80",
      },
      {
        date: "01/02/2022",
        bakery: "nuttybutterybakery",
        details: [
          { name: "Almond Financiers", quantityDesc: "Box of 8", quantity: 1 },
          {
            name: "Chocolate Macarons",
            quantityDesc: "Box of 12",
            quantity: 1,
          },
        ],
        status: "fulfilled",
        total: "$34.80",
      },
    ],
  }),
  methods: {
    toggleOrder() {
      this.isOrder = !this.isOrder;
      this.ActiveFilters = [];
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
</style>
