<style scoped>

p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
}

#seedPhraseBox{
  background-color:#41464D;
  color:white;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
  font-size: 20px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 20px;

}

#content{
  width:80%;
  margin: auto;
}
#loadingImg{
  width:80%;
  margin: auto;
}
</style>

<template>

<div>
      <md-toolbar class="toolbar" :md-elevation="1">
          <span class="md-title">Forget Seed</span>
      </md-toolbar>
            <div id="content" v-if="!recoveryKey">
                 <md-icon class="md-warn" v-if="incorrectEntry">
                     warning
                <md-tooltip>Your seedPhrase has an error.</md-tooltip>
                  <p>
                        * Minimum 3 Keys required to recover the seed Phrase
                    </p>
                  </md-icon>
              <form>
                <md-input-container>
                  <label>Enter your Secret Key To Recover your Seed Phrase</label>
                     <md-textarea id="seedPhraseTextarea" v-model="input1"></md-textarea>
                </md-input-container>
                 <md-input-container>
                  <label>Enter your Secret Key To Recover your Seed Phrase</label>
                     <md-textarea id="seedPhraseTextarea" v-model="input2"></md-textarea>
                </md-input-container>
                 <md-input-container>
                  <label>Enter your Secret Key To Recover your Seed Phrase</label>
                     <md-textarea id="seedPhraseTextarea" v-model="input3"></md-textarea>
                </md-input-container>
              </form>
              <form novalidate @submit.stop.prevent="submit">
          </form>
        <md-button class="md-raised md-primary" style="float: right" @click.native="recover()">
                Recover</md-button>
          </div>
          <div v-if="recoveryKey">
               <center>
                  <p> Your Seed Phrase Is : </p>
                        <div id="seedPhraseBox">
                        {{recoveryKey}}
                        </div>
                        <br><br>
                        <router-link :to="{name: 'Login'}">
                            <md-button class="md-raised md-primary"  @click.native="recover()">
                             Go Back</md-button>
                     </router-link>   
               </center>
          </div>
</div>
</template>

<script>
import secretSharingService from '../../services/secretSharingService'
export default {
    name: 'forgetSeed',
    computed: {
      incorrectEntry(){
          var allowedLastcharacter = [1,2,3,4,5,6];
        if(this.input1=="" || this.input2 =="" || this.input3 ==""){
            return true
        }else {
            if(allowedLastcharacter.includes(parseInt(this.input1.slice(-1)))){
                 return false
            }else{
                return true
            }
        }
      }
    },
    methods: {
      recover(){
            if(!this.incorrectEntry){
            let data = {
                    shares : [{x: this.input1.slice(-1) , y : this.input1.slice(0,-1)},
                             {x: this.input2.slice(-1) , y : this.input2.slice(0,-1)},
                             {x: this.input3.slice(-1) , y : this.input3.slice(0,-1)}]
                }
             secretSharingService.combine(data)
             .then(res=>{
                 this.recoveryKey = res.data;
             }).catch((err)=>{
                 console.log("error is:"+JSON.stringify(err));
             })
            }
      }
    },
    data() {
        return {
            input1 : "",
            input2 : "",
            input3 : "",
            recoveryKey: null
        }
    }
}

</script>
