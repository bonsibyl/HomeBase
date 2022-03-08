<template>
    <v-app id="appcontainer">
        <v-navigation-drawer app class="mt-16">
            <v-list class="mt-5">
                <v-list-item v-for="[page, route] in pages" :key="page" link :to="route">
                    <v-list-item-content>
                        {{ page }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <h1>Order Management</h1>
                <v-data-table :headers="headers" :items="orders">

                    <template v-slot:item.orderid="{ item }">
                        <v-chip :to="getLink(item.orderid)"> 
                            {{ item.orderid }}
                        </v-chip>
                    </template>

                    <template v-slot:item.orderstatus="{ item }">
                        <v-chip :color="getColor(item.orderstatus)" dark> 
                            {{ item.orderstatus }}
                        </v-chip>
                    </template>
                    
                </v-data-table>
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
        headers: [
                {text: 'Order ID', value: 'orderid'},
                {text: 'Date', value: 'date'},
                {text: 'Customer', value: 'custname'},
                {text: 'Fulfillment Status', value: 'orderstatus'},
                {text: 'Total Earnings', value: 'earnings'}
        ],
        orders: [
                {orderid: '1012',
                 date: '01/02/2022',
                 custname: 'Constance Tang',
                 orderstatus: 'In Progress',
                 earnings: '$44.00'},

                {orderid: '1005',
                 date: '01/02/2022',
                 custname: 'Elon Musk',
                 orderstatus: 'Pending Payment',
                 earnings: '$12.00'},

                {orderid: '1003',
                 date: '01/02/2022',
                 custname: 'Tan Ah Mah',
                 orderstatus: 'Fulfilled',
                 earnings: '$12.00'},
                
                {orderid: '1002',
                 date: '01/02/2022',
                 custname: 'Tan Wei Yang',
                 orderstatus: 'Fulfilled',
                 earnings: '$34.80'}
        ]
    }),
    methods: {
        getColor(orderstatus) {
            if (orderstatus == 'Fulfilled') return 'green'
            else if (orderstatus == 'In Progress') return '#dbaa23'
            else if (orderstatus == 'Pending Payment') return '#bf1802'
        },

        getLink(orderid) {
            return ("/order" + orderid)
        }
    }
}
</script>

<style>
#appcontainer {
    background: url("../assets/SellerBackground.png");
    background-size: cover;
}

h1 {
    text-align: center;
    background-color: rgb(255,255,255, 0.75);
    margin-bottom: 10px;
}
</style>