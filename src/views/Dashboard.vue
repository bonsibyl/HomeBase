<template>
    <v-app>
        <div id="sheet">
            <v-sheet width="95vw">
                <v-row id="headerrow">
                    <v-col>
                        <h1>Analytics</h1>
                    </v-col>
                </v-row>
                <v-row id="summaryrow">
                    <v-col>
                        <h2>Number of Visits</h2>
                        <p class="stats">100</p>
                    </v-col>
                    <v-col>
                        <h2>Revenue</h2>
                        <p class="stats">$1000</p>
                    </v-col>
                    <v-col>
                        <h2>Average Review Score</h2>
                        <p class="stats">4.3</p>
                    </v-col>
                    <v-col>
                        <h2>Reviews</h2>
                        <p class="stats">42</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h1 id="graphheader">Graph</h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-img src="https://i.stack.imgur.com/mHu9f.jpg" contain height="500px"></v-img>
                </v-row>
            </v-sheet>
        </div>
    </v-app>
</template>

<script>
export default {

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