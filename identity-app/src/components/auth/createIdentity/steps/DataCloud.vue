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
  <div class = "userInput">
<center>
  <p>Where do you like to store your Data?</p>

  <md-input-container>
      <label>Data Cloud:</label>
      <md-input type="text" v-model="userData.dataCloud"></md-input>
  </md-input-container>

</center>
<br>
<br>
</div>


</template>
<script>

export default {
    name: 'DataCloud',
    props: ['userData'],
    data() {
        return {
            pinRepeat: "",
            noPinMatch: false
        }
    },
    methods:{

    }
}

</script>
