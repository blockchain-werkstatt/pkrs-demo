<style scoped>
p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
}

#secretSharingBox{
  background-color:#858585;
  color:black;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
  font-size: 25px;
  font-style: bold;
  font-variant: normal;
  font-weight: 100px;
  line-height: 50px;
  padding: 10px;
}

</style>
<template>
<div>
     <p> <i>* For Demonstration We will be generating 6 Number of Share. </i></p>
  <center v-if="!obj">
        <br>
      <p> Do you want to secure your Personal Seedphrase using secret sharing?</p>
      <md-button class="md-raised md-primary" v-on:click='secretSharing()'>Yes </md-button>
        <br>
  </center>
    <secretSharingTable v-if="obj" :keysharingdata=obj ></secretSharingTable>
</div>
</template>


<script>
import secretSharingService from '../../../../services/secretSharingService'
import secretSharingTable from './secretSharingTable'
export default {
    components : {secretSharingTable},
    name: 'keysharing',
    props: ['keysharing'],
     data() {
        return {
            obj: null
        }
    },
    methods : {
        secretSharing : function (){
            if(this.$store.state.identity.seedPhrase){
            secretSharingService.split(this.$store.state.identity.seedPhrase,6,3)
            .then(result=>{
                this.obj = result.data;
                console.log('result is :'+JSON.stringify(result));
            }).catch(err=>{
                console.log('error is :'+JSON.stringify(err));
            })
        }else{
            console.log('No Seed Pharse Found');
        }
    }
    }
}

</script>
