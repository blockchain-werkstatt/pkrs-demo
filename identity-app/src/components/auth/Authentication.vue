<style scoped>

.authButton {}

.content {
    padding: 20px;
}

#left-card {
    width: 550px;
}

</style>

<template>

<div class="overview">

    <div id="identityView" v-if="!authenticationDone">

        <md-card-header>
            <div class="md-title"> Digital Identity</div>
            <div class="md-subhead">Manage your personal data and attributes </div>
        </md-card-header>
        <md-card-content>

            <div class="content">
                <md-layout md-gutter>
                    <md-layout md-flex="50">
                        <md-card id="left-card">
                            <md-card-media>
                                <img src="https://cdn3.scrvt.com/fokus/9e465c2835f4e66f/ebe7577359fa/Vernetzte-Sicherheit_Festival_Heyde_DSF3773_1600px_sRGB.jpg" alt="People">
                            </md-card-media>


                            <md-card-content>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
                                <br>
                                <br>
                                <md-button class="md-raised md-primary authButton" @click.native="createIdentity()">Create Digital Identity</md-button>
                            </md-card-content>
                        </md-card>
                    </md-layout>
                    <md-layout>

                        <md-card>

                            <md-card-media>
                                <img src="https://cdn1.scrvt.com/fokus/61c9ae4ef047f1ea/2de260f0b317/VISCOM_Brille_Heyde_DSF7039_1600px_sRGB.jpg
" alt="People">
                            </md-card-media>



                            <md-card-content>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
                                <br>
                                <br>
                                <md-button class="md-raised md-primary authButton" @click.native="login()">Login</md-button>

                            </md-card-content>
                        </md-card>

                    </md-layout>
                </md-layout>


            </div>
            <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            <br>
            <div>
            </div>
        </md-card-content>


    </div>
</div>

</template>

<script>

import {
    mapGetters, mapActions
}
from "vuex";


export default {
    name: "Authentication",
    components: {

    },
    computed: {
        authenticationDone: function() {
            console.log("Authentication: authentication finished");
            return this.$store.state.identity.authenticationDone;
        },
        identityLoggedIn: function() {
            let loggedIn = this.$store.state.identity.loggedIn;
            if (loggedIn == true) {
                this.noIdentity = false;
            }

            return loggedIn;
        }
    },

    methods: {
        createIdentity(ref) {

                this.$store.dispatch("routerTo", "/create")

            },
            login(ref) {

                this.$store.dispatch("routerTo", "/login")

            },

    },
    created() {},
    data() {
        return {
            noIdentity: true,
            identityCreatedSuccessfull: true
        };
    }
};

</script>
