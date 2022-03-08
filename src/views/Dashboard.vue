<template>
    <div class="background">
    <v-app id="appcontainer">
        <v-navigation-drawer app>
            <v-list>
                <v-list-item></v-list-item>
                <v-list-item></v-list-item>
                <v-list-item v-for="[page, route] in pages" :key="page" link :to="route" height="400">
                    <v-list-item-content>
                        {{ page }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <v-row id="headerrow">
                    <v-col>
                        <h1>Analytics</h1>
                    </v-col>
                </v-row>
                <v-row id="summrow">
                    <v-col v-for="[metric, number] in metrics" :key="metric">
                        <v-card color=#f5e4d0>
                            <v-card-title class="font-weight-bold">{{ metric }} </v-card-title>
                            <v-card-text class="text-subtitle-1"> {{ number }} </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card width="1980" id="graphcard">
                            <v-card-title id="graphcardtitle" class="justify-center"> Monthly Sales Trends </v-card-title>
                            <v-card-text>
                                <v-sparkline :value="value" height="100" line-width="1">  
                                </v-sparkline>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                         
            </v-container>
        </v-main> 
    </v-app>
    </div>
</template>

<script>
export default {
    data: () => ({
        pages: [
            ["Overview", "/sellerorderoverview"],
            ["Orders", "/sellerordermanagement"],
            ["Reviews", "/"],
            ["Analytics", "/dashboard"]
        ],
        metrics: [
            ["Number of Visits", 100],
            ["Revenue", "$2000"],
            ["Average Review Score", 3],
            ["Reviews", 50],
        ],
        value: [
            423,
            446,
            675,
            510,
            590,
            750,
            850,
            905,
        ],
    })

}
</script>

<style scoped>
#appcontainer {
    background: url("../assets/SellerBackground.png");
    background-size: cover;
}

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
    background-color: rgb(255,255,255, 0.75)
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
</style>