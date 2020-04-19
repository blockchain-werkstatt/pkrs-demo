<style scoped>
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
  <div class = "userInput">
    <md-input-container>
        <label>First Name</label>
        <md-input type="text" v-model="userData.firstName"></md-input>
    </md-input-container>
    <md-input-container>
        <label>Sure Name</label>
        <md-input type="text" v-model="userData.sureName"></md-input>
    </md-input-container>
<br>
    <md-input-container>
        <label>Email</label>
        <md-input type="text" v-model="userData.email"></md-input>
    </md-input-container>
    <md-input-container>
        <label>Geburtsdatum</label>
        <md-input type="text" v-model="userData.birthday"></md-input>
    </md-input-container>
  </div>
</div>

</template>
<script>

export default {
    name: 'UserData',
    props: ['userData']
}

</script>
