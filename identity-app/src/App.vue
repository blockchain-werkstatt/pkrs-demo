<style>

#logo {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
    width: 5%;
    height: 5%;
}

#app {
    min-width: 19.75em;
    max-width: 80rem;
    margin: 0 auto;
    background-color: white;
    height: 100%;
}

#background {
    background-color: #41464D;
    height: 100%;
    position: absolute;
    width: 100%;
}

.standardCard {
    width: 95%;
    top: 2%;
    margin: 0 auto;
    height: 75%;
}
.toolbar{
  background-color: #388a8e;
}

</style>

<template>

<div id="background">
    <div id="app">
        <md-toolbar>
            <h1 class="md-title">Self Sovereign Identity</h1>
        </md-toolbar>
        <md-tabs v-if="identityLoggedIn" @change="tabChanged">

            <md-tab id="Personal" md-label="Personal" :md-active="isPath('/personal')">
            </md-tab>

            <md-tab id="Search" md-label="Search" :md-active="isPath('/search')">
            </md-tab>


        </md-tabs>
        <md-card class="standardCard">
            <router-view></router-view>

        </md-card>
        <BottomBar></BottomBar>
    </div>
</div>

</template>

<script>

import BottomBar from "./components/bottomBar/BottomBar.vue";
import router from "./router";
const TAB_PERSONAL = 0;
const TAB_SEARCH = 1;

export default {
    components: {
        BottomBar
    },
    name: "app",
    computed: {
        identityLoggedIn: function() {
            let loggedIn = this.$store.state.identity.loggedIn;
            return loggedIn;
        }
    },
    methods: {
        tabChanged(tab) {
                console.log("Tab Create Elections");
                console.log(tab);
                if (tab == TAB_PERSONAL) {
                    router.push("/personal");
                }
                if (tab == TAB_SEARCH) {
                    router.push("/search");
                }
            },
            isPath: function(path) {
                console.log(this.$route.path);
                return this.$route.path.includes(path);
            }
    }
};

</script>
