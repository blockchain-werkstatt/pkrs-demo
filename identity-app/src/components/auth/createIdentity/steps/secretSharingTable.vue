  <style scoped>
   #tableBox{
  background-color: #fff;
  color:white;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
  font-size: 20px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 20px;
  border: 2px solid green;
  border-radius: 3px;
  table-layout:fixed;
}

th {
  background-color: green;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #41464D;
  font-size: 15px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
  word-break: break-all;
  white-space: normal;
}
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
<div>
   <table id=tableBox>
    <thead>
      <tr>
        <th>
          <span>#</span>
        </th>
        <th>
          <span>Secret Key</span>
        </th>
        <th>
          <span>Share</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="obj in keysharingdata">
      <tr>
        <td>
        {{obj.x}}
        </td>
         <td>
        {{obj.y}}{{obj.x}}
        </td>
         <td>
       <md-button class="md-raised md-primary" v-on:click='share(obj.x)'>Share </md-button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
      name: 'keysharingdata',
    props: ['keysharingdata'],
    methods :{
        share : function(id){
           console.log('shared id:'+id);
        }
    }
}

</script>
