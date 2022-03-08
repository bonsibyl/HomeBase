<template>
    <v-app>
        <v-navigation-drawer app class="mt-16">
            <v-list class="mt-5">
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
                    <v-img src="https://i.stack.imgur.com/mHu9f.jpg" contain height="500px"></v-img>
                </v-row>         
            </v-container>
        </v-main>
        
    </v-app>
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
        ]
    })

}
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
}

h2 {
    text-align: right;
}

#graphheader {
    text-align: center;
}
</style>