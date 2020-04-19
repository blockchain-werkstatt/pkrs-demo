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
            <span class="md-title">Add Atributes</span>
        </md-toolbar>
         <div id="content"  v-if="!status">
            <div>
                 <md-table>
                    <md-table-row>
                        <md-table-head>Attribute Name</md-table-head>
                        <md-table-head></md-table-head>
                        <md-table-head>File</md-table-head>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>
                             <md-input-container>
                                <md-input type="text"  v-model="Attributes.AttributeName"></md-input>
                             </md-input-container>
                        </md-table-cell>
                        <md-table-cell>
                        </md-table-cell>
                        <md-table-cell>
                         <form v-on:submit.prevent="save()" method="POST" enctype="multipart/form-data">
                            <input type="file" name="file" @change="uploadFile($event)">
                            </form>
                </md-table-cell>
                    </md-table-row>
                 </md-table>
            </div>
            <br v-if="!Attributes.ipfsData">
            <p v-if="Attributes.ipfsData"> File Hash on IPFS is : {{Attributes.ipfsData.hash}} </p>
            <center>
            <md-button class="md-raised md-primary" @click.native="AddAttribute()">
                Add</md-button>
            </center>
        </div>
          <div id="content"  v-if="status">
            
               <center>
                   <br>
                    <h3> attribute added succssfully </h3>
                    <br>
                    <br>
                <md-button class="md-raised md-primary" @click="$emit('close',Attributes)">
                    Close</md-button>
                </center>
          </div>

</div>
</div>
</template>

<script>
import faucet  from '../../services/faucet'
import identityService from '../../services/identityService'
export default {

    name: 'AddAttribute',
    computed: {
      userData(){
       return this.$store.state.userData
      }
    },
     data() {
        return{
            Attributes:{
                 AttributeName:"",
                 ipfsData:null
            },
             status:false
        }
    },
    methods:{
        uploadFile(event) {
          this.file = event.target.files[0];
          let formData = new FormData();
          formData.append('file',this.file);
                faucet.uploadIPFS(formData).then((res)=>{
                   this.Attributes.ipfsData = res;
                })          
        },
        AddAttribute(){
            console.log('this.$store.state.userData'+JSON.stringify(this.$store.state.userData));
            console.log('attribute name is :'+this.Attributes.AttributeName);
            identityService.AddAttribute(
                   this.$store.state.userData.seedPhrase,
                   this.$store.state.userData.pin,
                   this.$store.state.userData.identityAddress,
                   this.Attributes.AttributeName,
                   this.Attributes.ipfsData.hash).then((res)=>{
                       if(res){
                           this.status=true;
                       }
                   })
        }
    }
}

</script>
