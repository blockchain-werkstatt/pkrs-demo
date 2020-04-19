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

<div v-if="obj">
      <md-toolbar class="toolbar" :md-elevation="1">
          <span class="md-title">Recover your secret by answer some questions</span>
      </md-toolbar>
            <div id="content" v-if="!recoveryKey">
                 <md-icon class="md-warn">
                  <p>
                        * Currently Library working with the answers of first 3 questions because of parsing issue (will be solve soon)
                    </p>
                  </md-icon>
              <form>
                 <md-input-container>
                  <label>Please enter your email address</label>
                     <md-textarea id="seedPhraseTextarea" v-model="publicAddress"></md-textarea>
                </md-input-container>
                     <md-input-container>
                  <label>Enter your public share</label>
                     <md-textarea id="seedPhraseTextarea" v-model="publicShare"></md-textarea>
                </md-input-container>
                <md-input-container>
                  <label>{{obj[0]}} ?</label>
                     <md-textarea id="seedPhraseTextarea" v-model="input1"></md-textarea>
                </md-input-container>
                 <md-input-container>
                  <label>{{obj[1]}} ?</label>
                     <md-textarea id="seedPhraseTextarea" v-model="input2"></md-textarea>
                </md-input-container>
                 <md-input-container>
                  <label>{{obj[2]}} ?</label>
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
    name: 'qnaRecovery',
    data() {
      return {
          obj: null,
          publicShare: null,
          recoveryKey: null,
          publicAddress: null,
          input1 : "",
          input2 : "",
          input3 : "",
      }
    },
    mounted() {
      this.getQuestions();
    },
    methods: {
      getQuestions : function () {
        secretSharingService.getQuestions()
        .then(result => {
          this.obj = result.data;
        }).catch(err => {
          console.log('error is :'+JSON.stringify(err));
        })
      },
      recover(){
        const answer = [this.input1, this.input2, this.input3];
        const question = [
          {i: 0, q: this.obj[0]},
          {i: 1, q: this.obj[1]},
          {i: 2, q: this.obj[2]}
        ];
              secretSharingService.encodeString(this.publicAddress).then((res) => {
                return {publicaddress: res.data}}
              ).then((encode) => {
                encode.type = 'mnemonic';
                encode.questions = question;
                encode.answers = answer;
                encode.publicshare = this.publicShare;
                console.log('data is :' + JSON.stringify(encode));
                secretSharingService.recoverQnA(encode).then((result) => {
                  secretSharingService.decodeString(result.data.secret).then((res) => {
                    console.log('result is: ' + JSON.stringify(result));
                    this.recoveryKey = res.data;
                  })
                })
              })
      }
    },
}

</script>
