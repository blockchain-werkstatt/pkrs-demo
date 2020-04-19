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
  <p>Please enter a secure pin for enrcypting your wallet</p>

  <md-input-container>
      <label>Pin</label>
      <md-input type="password" v-model="userData.pin"></md-input>
  </md-input-container>
  <md-input-container>
    <md-icon class="md-warn" v-if="noPinMatch">
      warning
      <md-tooltip>Pin doesn't match</md-tooltip>
    </md-icon>
      <label>Repeat Pin</label>
      <md-input type="password" @blur="finishedEvent" v-model="pinRepeat"></md-input>
  </md-input-container>
</center>
<br>
<br>
</div>


</template>
<script>

export default {
    name: 'Pin',
    props: ['userData'],
    data() {
        return {
            pinRepeat: "",
            noPinMatch: false
        }
    },
    methods:{
      finishedEvent(){
        if(this.userData !== this.pinRepeat){
          this.noPinMatch = true
        }else{
          this.noPinMatch = false
        }

      }
    }
}

</script>
