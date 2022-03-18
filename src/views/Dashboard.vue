<template>
  <div class="background">
    <v-app>
      <v-navigation-drawer app absolute color="#f5f5f5">
        <v-list>
          <v-list-item
            v-for="[page, route] in pages"
            :key="page"
            link
            :to="route"
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
          <v-col v-for="[metric, number, icon] in metrics" :key="metric">
            <v-card color="#ffff">
              <v-card-title class="metricTitle">
                {{ metric }}
                <v-icon right>{{ icon }}</v-icon>
              </v-card-title>
              <v-card-text class="metricNumber">{{ number }}</v-card-text>
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
export default {
  data: () => ({
    pages: [
      ["Overview", "/sellerorderoverview"],
      ["Orders", "/sellerordermanagement"],
      ["Reviews", "/sellerreviews"],
      ["Analytics", "/dashboard"],
    ],
    metrics: [
      ["Number of Visits", 100, "mdi-chart-line", "red"],
      ["Revenue", "$2000", "mdi-currency-usd", "green"],
      ["Average Review Score", 3, "mdi-thumb-up", "blue"],
      ["Reviews", 50, "mdi-message-draw", "orange"],
    ],
    value: [423, 446, 675, 510, 590, 750, 850, 905],
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
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
<<<<<<< HEAD
  width: 93%;
  margin-top: 2%;
=======
    width: 80%;
    margin-top: 2%;
    margin-left: 300px;
>>>>>>> main
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
