<style scoped>

.createSteps {
    padding-left: 100px;
    padding-right: 100px;
}

p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
}

.createStep {
    position: relative;
}

.userInput {
    max-width: 500px;
    width: 70%;
    margin: 0 auto;
}

#createToolbar {
    background-color: #388a8e;
}

</style>

<template>

<div>
    <md-toolbar id="createToolbar" :md-elevation="1">
        <span class="md-title">Create your Digital Identity</span>
    </md-toolbar>
    <md-stepper @completed="generateIdentity" @change="stepChange">
        <md-step class="createStep" md-label="Personal Data">
            <UserData :userData="userData"> </UserData>
        </md-step>
        <md-step md-label="Entropy">
            <Entropy :entropy="entropy"> </Entropy>
        </md-step>
        <md-step md-label="Pin">
            <Pin :userData="userData"> </Pin>
        </md-step>
        <md-step md-label="Seedphrase">
            <SeedPhrase :seedPhrase="getSeedPhrase"> </SeedPhrase>
        </md-step>
           <md-step md-label="Key Sharing">
            <secretSharing :keysharing="getSeedPhrase"></secretSharing>
        </md-step>
         </md-step>
           <md-step md-label="Secure Key using QnA">
            <secretSharingQnA :keysharing="getSeedPhrase"></secretSharingQnA>
        </md-step>
        <md-step md-label="Data Cloud">
            <DataCloud :userData="userData"> </DataCloud>
        </md-step>
        <md-step md-button-continue="Generate Identity" md-label="Summary">
            <Summary :userData="userData"> </Summary>
        </md-step>

    </md-stepper>

</div>

</template>

<script>

import UserData from "./steps/UserData"
import Entropy from "./steps/Entropy"
import Pin from "./steps/Pin"
import SeedPhrase from "./steps/Seedphrase"
import Summary from "./steps/Summary"
import DataCloud from "./steps/DataCloud"
import secretSharing from "./steps/secretSharing"
import secretSharingQnA from "./steps/secretSharingQnA"

const MAX_PERCENT = 100
const STEP = {
    USER_DATA: 0,
    ENTROPY: 1,
    PIN: 2,
    SEEDPHRASE: 3,
    SUMMARY: 4
}
export default {
    name: 'CreateIdentity',
    components: {
        UserData, Entropy, Pin, SeedPhrase,secretSharing, secretSharingQnA, Summary,DataCloud
    },
    data() {
        return {

            entropy: [],
            userData: {
                firstName: "",
                sureName: "",
                userName: "",
                email: "",
                seedPhrase: "",
                pin: "",
                birthday: "",
                dataCloud: "https://my-datacloud.fokus.fraunhofer.de"
            },

        }
    },

    computed: {
        getSeedPhrase() {
            return this.$store.state.identity.seedPhrase;
        }
    },

    methods: {
        generateIdentity() {
                this.userData.userName = this.userData.firstName.toLowerCase() +
                    "." + this.userData.sureName.toLowerCase()
                this.userData.seedPhrase = this.$store.state.identity.seedPhrase;
                this.$store.dispatch("createDigitalIdentity", this.userData)
            },
            doneUserData() {
                console.log("done user data")

            },
            doneEntropy() {
                console.log("done entropy")
                if (this.entropy.length > MAX_PERCENT) {
                    this.$store.dispatch("generateRandomSeed", {
                        entropy: this.entropy.toString()
                    });

                }
            },
            stepChange(step) {
                console.log("step Change " + step)
                switch (step) {
                    case STEP.ENTROPY:
                        {
                            this.doneUserData();
                            break;
                        }
                    case STEP.PIN:
                        {
                            this.doneEntropy();
                            break;
                        }
                    case STEP.SEEPHRASE:
                        {

                        }
                    default:
                        break;
                }
            },


    }


}

</script>
