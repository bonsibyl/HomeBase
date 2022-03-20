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
        <h1 style="text-align: left">Review Overview</h1>
        <hr />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Review Overview",
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview"],
      ["Orders", "/sellerordermanagement"],
      ["Reviews", "/reviewoverview"],
      ["Analytics", "/dashboard"],
    ],
  }),

  methods: {
    test() {
      return;
    },
  },
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
</style>
