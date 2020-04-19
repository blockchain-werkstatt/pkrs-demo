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
            <span class="md-title">{{userData.firstName}}  {{userData.sureName}}</span>
        </md-toolbar>

        <div>

          <div id="content">
            <div style="width: 30%; float:left">

                <div class="avatar">
                  <avatar :username='userData.userName' :size="250" :initials="userData.firstName.substring(0,2)"></avatar>
                </div>
            </div>

        </div>
        <md-list class="md-double-line">
            <md-subheader>Name</md-subheader>
            <md-list-item>
                <md-icon>personal</md-icon>

                <div class="md-list-item-text">
                    <span>{{userData.firstName}}  {{userData.sureName}}</span>
                </div>
                <md-button title="open" class="md-icon-button md-list-action">
                    <md-icon class="md-primary">label_outline</md-icon>
                </md-button>
            </md-list-item>

            <md-subheader>Geburtsdatum</md-subheader>
            <md-list-item>
                <md-icon>event</md-icon>
                <div class="md-list-item-text">
                    <span>{{userData.birthday}}</span>
                </div>
                <md-button title="verified" class="md-icon-button md-list-action">
                    <md-icon class="md-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> </md-icon>
                </md-button>
            </md-list-item>

            <md-divider></md-divider>
            <md-subheader>Email</md-subheader>

            <md-list-item>
                <md-icon>email</md-icon>

                <div class="md-list-item-text">
                    <span>{{userData.email}}</span>
                </div>
                  <md-icon title="verified" class="md-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> </md-icon>
            </md-list-item>
        </md-list>
    </div>
  </div>
    <div id="documents">
    </div>
    <md-divider></md-divider>
            <md-subheader>Attributes / Documents</md-subheader>
            <md-divider></md-divider>

<br>
    <md-button class="md-fab md-primary"  v-on:click="show()">
 <md-icon>add</md-icon>
</md-button>
  <md-button class="md-fab md-primary"  v-on:click="getAttributes()">
 <md-icon>add</md-icon>
</md-button>
<div  id="content"  v-if="showAttribute">
    show Attributes
</div>
</div>
</template>
<script>

//import * as services from '../services'
import AddAttribute from './AddAttribute'
import identityService from '../../services/identityService'
import {
    mapGetters, mapActions
}
from 'vuex'
import Avatar from 'vue-avatar'


export default {
    name: 'Personal',
    components: {
        Avatar,AddAttribute
    },
    computed: {
      userData(){
       return this.$store.state.userData
      }
    },
    methods: {
        show () {
             this.$modal.show(AddAttribute);
            },
        getAttributes(){
            console.log('this.$store.state.attributes'+JSON.stringify(this.$store.state.attributes));
        }
    },
    created() {

    },
    data() {
        return {
            initial: "fuu",
            showAttribute : false
        }
    },
    beforeMount() {
        // console.log('working..')
        // console.log('this.$store.state.attributes'+JSON.stringify(this.$store.state.attributes));
        // identityService.getAttribute(this.$store.state.userData.seedPhase,
        // this.$store.state.userData.pin,
        // this.$store.state.userData.identityAddress,
        // 'passport').then((res)=>{
        //     console.log(res);
        // })
    },
}

</script>
