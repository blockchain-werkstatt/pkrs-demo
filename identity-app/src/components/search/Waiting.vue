<style scoped>

p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
}

#content {
    width: 80%;
    margin: auto;
}

#loadingImg {
    width: 80%;
    margin: auto;
}

</style>

<template>

<div>

    <md-toolbar class="toolbar" :md-elevation="1">
        <span class="md-title">Generate</span>
    </md-toolbar>
    <br>
    <md-button class="md-raised md-primary" v-on:click='routeBack()'>
        Back </md-button>
    <br>
    <div id="content">
        <br>
        <br>
        <center>
            <p>{{waiting.text}}</p>
            <p>TxHash:{{waiting.txHash}}:</p>
        </center>
        <br>
        <center>
            <img src="https://cdn3.scrvt.com/fokus/20dc0a21b3114106/afae6bb56041/FOKUS_Hund_Heyde_DSF8778_1600px_sRGB.jpg" id="loadingImg">
        </center>
        <br>
        <br>
        <br>
        <md-progress :md-progress="actualProgress"></md-progress>
        <center>
            <p>{{actualProgress}} % </p>
        </center>

        <br>
        <br>
    </div>

</div>

</template>

<script>

export default {
    name: 'Waiting',

    data() {
        return {
            progress: 100
        }
    },
    computed: {
        actualProgressText() {
                return "Waiting for Transaction to be Mined..."
            },
            actualProgress() {
                return this.progress
            },
        waiting() {
            return this.$store.state.waiting
        }

    },

    methods: {
      routeBack() {
              this.$store.dispatch('routerTo', 'view')
          }
    }


}

</script>
