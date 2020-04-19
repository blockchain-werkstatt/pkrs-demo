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

</style>
<template>
<div>
  <center>
      <p>Please write down your personal seedphrase</p>
      <div id="seedPhraseBox">
      {{seedPhrase}}
    </div>
    <br>
  <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.</p>
  </center>
  <br>
  <br>
</div>
</template>
<script>

export default {
    name: 'SeedPhrase',
    props: ['seedPhrase']
}

</script>
