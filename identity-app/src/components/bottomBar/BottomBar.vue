<style scoped>

#bottomBar {
    position: absolute;
    bottom: 0px;
    z-index: 100;
    margin: 0 auto;
    min-width: 18.75em;
    max-width: 62.5rem;
    width: 100%;
}

</style>

<template>

<div id="bottomBar">
    <md-bottom-bar id="bottomBar" v-if="identityLoggedIn">
        <md-bottom-bar-item md-icon="person" id="showIdentityButton" @click.native="showIdentity('identityDialog')">Identity</md-bottom-bar-item>
        <md-bottom-bar-item md-icon="person" @click.native="logout()">Logout</md-bottom-bar-item>
    </md-bottom-bar>
    <md-dialog md-open-from="#showIdentityButton" md-close-to="#showIdentityButton" ref="identityDialog">
        <md-dialog-title>Identity</md-dialog-title>
        <md-dialog-content>
            <md-list class="md-double-line">
                <md-list-item>
                    <md-icon class="md-primary">person</md-icon>

                    <div class="md-list-text-container">
                        <span>{{identityAddress}}</span>
                        <span>Identity Address</span>
                    </div>

                    <md-button class="md-icon-button md-list-action">
                    </md-button>
                    <md-divider class="md-inset"></md-divider>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">home</md-icon>

                    <div class="md-list-text-container">
                        <span>0x{{mainAddress}}</span>
                        <span>Main Address</span>
                    </div>

                    <md-button class="md-icon-button md-list-action">
                    </md-button>
                    <md-divider class="md-inset"></md-divider>
                </md-list-item>


                <md-list-item>
                    <md-icon class="md-primary">menu</md-icon>

                    <div class="md-list-text-container">
                        <span>{{balance}} ETH</span>
                        <span>Balance</span>
                    </div>
                    <md-button class="md-icon-button md-list-action">
                    </md-button>
                </md-list-item>
            </md-list>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click.native="closeDialog('identityDialog')">Close</md-button>
        </md-dialog-actions>
    </md-dialog>

</div>

</template>

<script>

//import * as services from '../services'
import {
    mapGetters, mapActions
}
from "vuex";

export default {
    name: "BottomBar",
    computed: {
        identityLoggedIn: function() {
            let loggedIn = this.$store.state.identity.loggedIn;
            return loggedIn;
        },
        seedPhrase: function() {
            console.log("Seedphrase created");
            return this.$store.state.identity.seedPhrase;
        },
        mainAddress: function() {
            return this.$store.state.identity.mainAddress;
        },
        identityAddress: function() {
            return this.$store.state.userData.identityAddress;
        },
        balance: function() {
            return this.$store.state.identity.balance;
        }
    },
    methods: {
        showIdentity(ref) {
                console.log("BottomBar: Show Identity");
                console.log(ref);
                this.openDialog(ref);
            },
            logout() {
                this.$store.dispatch("logout");
            },
            openDialog(ref) {
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            }
    },
    created() {},
    data() {
        return {};
    }
};

</script>
