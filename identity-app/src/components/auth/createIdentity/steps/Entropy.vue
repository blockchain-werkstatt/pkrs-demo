<style scoped>
p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
}
</style>

<template>

<div class="createStep" v-on:mousemove="trackMouse">
    <br>
    <br>
    <center>
        <p>{{entropyText}}</p>
    </center>
    <br>
    <md-progress :md-progress="entropyProgress"></md-progress>
    <center>
        <p>{{entropyProgress}} % </p>
    </center>

    <br>
    <br>
</div>

</template>

<script>
const MAX_PERCENT = 100
import SHA256 from "crypto-js/sha256"
export default {
    name: 'Entropy',
    props: ['entropy'],
    methods: {
        trackMouse(event) {
            if (this.entropy.length <= 100) {
                let x = event.pageX;
                let y = event.pageY;
                let hash = SHA256("" + x + y)
                this.entropy.push(hash)

            }

        }
    },

    data() {
        return {
            entropyText: "Move your mouse for some random data ... ",
        }
    },
    computed: {

        entropyProgress() {
            if (this.entropy.length == MAX_PERCENT) {
                this.entropyText = "Finished"
            }
            if (this.entropy.length > MAX_PERCENT) {
                return MAX_PERCENT
            }
            return this.entropy.length
        }
    }

}

</script>
