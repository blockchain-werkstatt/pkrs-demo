<style scoped>

p {
    font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
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
          <span class="md-title">Login</span>
      </md-toolbar>



            <div id="content">
              <p>

              </p>
              <form>
                <md-input-container>
                  <md-icon class="md-warn" v-if="loginError">
                    warning
                    <md-tooltip>Your seedPhrase has an error.</md-tooltip>
                  </md-icon>
                  <label>Enter your 12 word seed phrase</label>
                  <md-textarea id="seedPhraseTextarea" v-model = 'seedPhrase'></md-textarea>
                </md-input-container>
              </form>
              <form novalidate @submit.stop.prevent="submit">
          <md-input-container md-has-password>
            <label>Password</label>
            <md-input type="password" v-model='password'></md-input>
          </md-input-container>
          </form>
            <md-button class="md-raised md-primary" @click.native="login('loginDialog')">
                Login</md-button>
                   <md-button class="md-raised md-primary" style="float: right" @click.native="forgetSeed()">
                Forget Seed Phase?</md-button>
                <md-button class="md-raised md-primary" style="float: right" @click.native="qnaRecovery()">
                Secret Recover using QnA ?</md-button>
          </div>


</div>

</template>

<script>

export default {
    computed: {
      loginError(){
        return this.$store.state.identity.loginError
      }
    },
    methods: {
      login(){
        this.$store.dispatch('loginIdentity',{seedPhrase:this.seedPhrase,password:this.password})

      },
      forgetSeed(){
       this.$store.dispatch("routerTo", "/recoverseed")
      },
       qnaRecovery(){
       this.$store.dispatch("routerTo", "/qnaRecovery")
      }
    },
    data() {
        return {
          password: '1111',
          seedPhrase: 'bid increase dish buffalo option broccoli bench good add valve zone parrot'
        }
    }
}

</script>
