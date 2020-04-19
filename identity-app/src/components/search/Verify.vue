<style scoped>

.avatar {
    padding-left: 10px;
    padding-top: 10px;
}

#documents {
    padding-left: 10px;
    padding-right: 10px;
}

p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
}

#content {
    padding-left: 75px;
    position: relative;
}

#attributeData {
    width: 400px;
}
#confirmDialogContent{
  padding-left: 10px;
  padding-top: 10px;
}

</style>

<template>

<div>

    <div class="viewport">
        <md-toolbar :md-elevation="1">
            <span class="md-title">Verify Attribute Email</span>
        </md-toolbar>
        <br>
        <md-button class="md-raised md-primary" v-on:click='routeBack()'>
            Back </md-button>
        <br>
        <div id="content">
            <br>
            <h2>Attribute Verification </h2>
            <p><b>Username:</b>{{selectedIdentity.userName}}</p>

            <p><b>{{verifyAttribute.name}}:</b>*********</p>

            <p><b>{{verifyAttribute.name.charAt(0).toUpperCase() + verifyAttribute.name.slice(1)}}-Hash:</b>{{verifyAttribute.hash}}</p>

            <md-button class="md-raised md-accent" v-on:click="">
                Request Data</md-button>


            <br>
            <br>
            <br>

            <h2>Enter Data</h2>
            <md-input-container id="attributeData">
                <label>Enter Data</label>
                <md-input type="text" v-model="enteredData"></md-input>
                <md-icon title="hashvalue doesn't match" v-if="!match" class="md-primary">error</md-icon>
                <md-icon title="hashvalue are the same" v-if="match" class="md-primary">check</md-icon>
            </md-input-container>





            <md-button class="md-raised md-primary" v-on:click="verify()">
                Sign</md-button>


        </div>





    </div>

    <md-dialog id="confirmDialog" md-open-from="#Button" md-close-to="#Button" ref="confirmDialog">
        <md-dialog-title>Confirm Action</md-dialog-title>
        <div id="confirmDialogContent">
            Please confirm with your Pin
            <md-input-container md-has-password>
                <label>Pin</label>
                <md-input type="password" v-model='password'></md-input>
            </md-input-container>
            <md-dialog-actions>
                <md-button class="md-primary" @click.native="closeDialog('confirmDialog')">Cancel</md-button>
                <md-button class="md-primary" @click.native="confirmedSign('confirmedSign')">Confirm </md-button>
            </md-dialog-actions>
        </div>
    </md-dialog>
</div>

</template>

<script>

//import * as services from '../services'
import {
    mapGetters, mapActions
}
from 'vuex'

import WalletCrypto from  'identity-contracts/lib/wallet-crypto'
let walletCrypto = new WalletCrypto();

export default {
    name: 'Verify',
    components: {},
    computed: {
        match() {
                let enteredDataHash = walletCrypto.calculateDataHash(this.enteredData)
                if (enteredDataHash=== this.$store.state.verifyAttribute.hash) {
                    console.log("MATCH TRUE")
                    return true
                }
                console.log("MATCH FALSE")
                return false

            },
            selectedIdentity() {
                return this.$store.state.selectedIdentity;
            },
            verifyAttribute() {
                return this.$store.state.verifyAttribute;
            }

    },
    methods: {
        routeBack() {
                this.$store.dispatch('routerTo', 'view')
            },
            verify(attribute) {
                console.log(attribute)
                this.openDialog('confirmDialog')
            },
            openDialog(ref) {
                this.$refs[ref].open()

            },
            closeDialog(ref) {
                this.$refs[ref].close()

            },
            confirmedSign() {
              //confirmed sign
              this.closeDialog('confirmDialog')
              this.$store.dispatch('addVerificationToContractAction', {pin: this.password})
            }
    },

    created() {},
    data() {
        return {
            enteredData: "",
            test: "test",
            password: ""
        }
    }
}

</script>
