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
    <div id="content">
        <br>
        <br>
        <center>
            <p>{{actualProgressText}}</p>
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
    name: 'GenerateProcess',

    data() {
        return {
            progress: 10
        }
    },
    computed: {
        actualProgressText() {
                return "Generate Identity Smart Contract ..."
            },
            actualProgress() {
                return this.progress
            }

    },

    methods: {
      /*  updateProgress() {
            const self = this;
            this.update = setInterval(function() {
                if (this.progress < 95) {
                    this.progress += 1
                }
            }, 1000);
        } */



    }


}

</script>
