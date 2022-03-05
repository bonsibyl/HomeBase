<template>
    <v-app>
        <v-navigation-drawer app>
            <v-list>
                <v-list-item v-for="page in pages" :key="page" link>
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
                        <h2> {{ metric }} </h2>
                        <p class="stats"> {{ number }} </p>
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
            "Overview",
            "Orders",
            "Reviews",
            "Analytics",
        ],
        metrics: [
            ["Number of Visits", 1],
            ["Revenue", 2],
            ["Average Review Score", 3],
            ["Reviews", 4],
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