<style scoped>

.avatar {
    padding-left: 10px;
    padding-top: 10px;
}

#content{

padding-left:10px;
padding-right:10px;
}
#documents
{
  padding-left:10px;
  padding-right:10px;
}

</style>

<template>

<div>

    <div class="viewport">
        <md-toolbar :md-elevation="1">
            <span class="md-title">View User</span>
        </md-toolbar>

        <div>
          <br>
          <md-button class="md-raised md-primary"
           v-on:click='routeBack()'>
            Back </md-button>
            <br>
          <div id="content">
            <div style="width: 30%; float:left">

                <div class="avatar">
      <avatar :username="selectedIdentity.userName" :size="250" :initials="selectedIdentity.userName.substring(0,2)"></avatar>
                </div>
            </div>

        </div>
        <md-list class="md-double-line">
            <md-subheader>Name</md-subheader>
            <md-list-item>
                <md-icon>personal</md-icon>

                <div class="md-list-item-text">
                    <span>{{selectedIdentity.userName}}</span>
                </div>
                <md-button title="open" class="md-icon-button md-list-action">
                    <md-icon class="md-primary">label_outline</md-icon>
                </md-button>
      
            </md-list-item>

            <md-subheader>Geburtsdatum</md-subheader>
            <md-list-item>
                <md-icon>event</md-icon>
                <div class="md-list-item-text">
                    <span>********</span>
                </div>
                <md-button title="verified" class="md-icon-button md-list-action">
                    <md-icon class="md-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> </md-icon>
                </md-button>
                <md-button class="md-raised md-primary"
                         v-on:click="verify('birthday')">
                  Verify </md-button>
            </md-list-item>

            <md-divider></md-divider>
            <md-subheader>Email</md-subheader>

            <md-list-item>
                <md-icon>email</md-icon>

                <div class="md-list-item-text">
                    <span>********</span>
                </div>
                  <md-icon title="verified" class="md-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> </md-icon>
                  <md-button class="md-raised md-primary"
                   v-on:click="verify('email')">
                    Verify </md-button>
            </md-list-item>


        </md-list>
    </div>

  </div>

    <div id="documents">


    </div>
    <md-divider></md-divider>
            <md-subheader>Private Attributes</md-subheader
            <md-divider></md-divider>

    <md-list>
    <md-list-item v-for="attribute in selectedIdentity.attributes.private">
        <div class="md-list-item-text">
            <span>******</span>
        </div>
          <md-icon title="verified" class="md-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> </md-icon>

    </md-list-item>
  </md-list>
<br>

</div>

</template>

<script>

//import * as services from '../services'
import {
    mapGetters, mapActions
}
from 'vuex'
import Avatar from 'vue-avatar'


export default {
    name: 'ViewIdentity',
    components: {
        Avatar
    },


    computed: {

      selectedIdentity(){
        return this.$store.state.selectedIdentity;
      }

    },


    methods: {

      routeBack(){
        this.$store.dispatch('routerTo','search')
      },
      verify(attribute){
          this.$store.dispatch('setVerifyAttributeAction',attribute)
          this.$store.dispatch('routerTo','verify')
      }


    },

    created() {

    },
    data() {
        return {

            initial: "fuu"
        }
    }

}

</script>
