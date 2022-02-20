<template>
  <v-app>
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1">
        <div id="content">
          <v-row id="header">
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
          <v-row id="subheader" align="end">
            <v-col cols="auto">
              <h4 class="text--secondary">Results</h4>
            </v-col>
            <v-col cols="auto">
              <h4 class="text--secondary">Stores</h4>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn outlined>
                Sort By
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn outlined>
                Price
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn outlined>
                More Filters
                <v-icon right>mdi-tune</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider id="divider1"></v-divider>
          <v-row>
            <v-col
              v-for="n in 9"
              :key="n"
              cols="4"
              class="d-flex justify-center"
            >
              <v-card
                class="rounded-lg"
                height="350"
                width="500"
                min-width="150"
                min-height="100"
                :to="'/'"
              >
                <v-img
                  class="white--text align-end"
                  height="350"
                  src="https://cdn.shopify.com/s/files/1/0017/4699/3227/products/image_360x.jpg?v=1632976135"
                >
                  <v-card-title>Cake</v-card-title>
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
export default {};
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

#header {
  padding-top: 5vh;
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
