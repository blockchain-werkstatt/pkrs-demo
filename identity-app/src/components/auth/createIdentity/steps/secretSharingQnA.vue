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

.input {
    width: 300px;
    height: 30px;
}

#seedPhraseBox{
     white-space: pre-wrap;      /* CSS3 */   
   white-space: -moz-pre-wrap; /* Firefox */    
   white-space: -pre-wrap;     /* Opera <7 */   
   white-space: -o-pre-wrap;   /* Opera 7 */    
   word-wrap: break-word;
}

</style>
<template>
<div>
     <p> <i>* Secure your private key with your personal question and answers </i></p>
  <center v-if="obj">
        <md-input-container>
                    <label>Your Email Address (or any public ID which you never forget)(don't use HEX validation not added yet)</label>
                    <md-input type="text" v-model="publicAddress"></md-input>
        </md-input-container>  
        <div v-for="(question, index) in obj" v-bind:key="question">
                <md-input-container>
                    <label>{{ question }}</label>
                    <md-input type="text" v-model="answers[index]"></md-input>
                </md-input-container>            
        </div>
      <md-button class="md-raised md-primary" v-on:click='secure()'>Secure</md-button>
  </center>
  <div v-if="!obj">
      <br>
      <h2>publicShare.txt generated, Check your download </h2>
        <br>
  </div>
</div>
</template>


<script>
import secretSharingService from '../../../../services/secretSharingService'
import { saveAs } from 'file-saver'
export default {
    components : {},
    name: 'keysharingqna',
    props: ['keysharingqna'],
     data() {
        return {
            answers: [],
            obj: null,
            share: null,
            publicAddress: '',
        }
    },
    mounted() {
        this.getQuestions();
        this.publicAddress = this.$store.state.userData.email;
    },
    methods : {
        getQuestions : function () {
            secretSharingService.getQuestions()
            .then(result => {
                this.obj = result.data;
                console.log('result is :'+JSON.stringify(result));
            }).catch(err => {
                console.log('error is :'+JSON.stringify(err));
            })
        },
        secure: function() {
            secretSharingService.encodeString(this.$store.state.identity.seedPhrase)
            .then(result => { 
                return result.data
            })
            .then(secret => {
            secretSharingService.encodeString(this.publicAddress)
            .then(result => {
                return { secret: secret, publicaddress: result.data}
            }).then(data => {
                data.questions = this.obj;
                data.answers = this.answers;
                data.type = 'mnemonic';
                secretSharingService.secureQnA(data)
                .then((result) => {
                    this.share = result.data.publicshare;
                    let blob = new Blob([result.data.publicshare], {type : "text/plain;charset=utf-8"});
                    saveAs(blob, 'publicShare.txt');
                    this.obj = null;
                });
            })
        })
        },
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
