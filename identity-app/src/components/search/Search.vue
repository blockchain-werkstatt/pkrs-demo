<style scoped>

.avatarContent{

  padding-top:5px;

}


</style>

<template>

<div>
    <md-toolbar :md-elevation="1">
        <span class="md-title">Search</span>
    </md-toolbar>


    <md-input-container>
        <label>Search</label>
        <md-input type="text" v-model="searchQuery"></md-input>
    </md-input-container>
    <md-list-item v-for="user in selectedUser">

      <div class="avatarContent">
      <avatar :username="user.userName" :initials="user.userName.substring(0,2)"></avatar>
    </div>
        <span>{{user.userName}}</span>


              <md-button class="md-raised md-primary"
               v-on:click='viewIdentity(user)'>
                View </md-button>
    </md-list-item>
    </md-list>
</div>

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
    name: 'Search',
    components: {
        Avatar
    },


    computed: {
      selectedUser: function(){
        let selected = []

        let identityList = this.$store.state.identityList
        console.log(identityList[0].userName)

        for(let i = 0;i<identityList.length;i++){
          if(identityList[i].userName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) == 0){
            selected.push(identityList[i])
          }
        }
        return selected
      }
    },


    methods: {
      viewIdentity(user){
        console.log("view identity")
        console.log(user)
            this.$store.dispatch("selectIdentityAction",user)

      }

    },

    created() {
      console.log("load identity list")

    },
    data() {
        return {
            searchQuery: ""
        }
    }

}

</script>
