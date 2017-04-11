<template lang="html">
  <div class="tab">
    <router-link to="/">返回</router-link>
    <router-link to="/tab1">Go to tab1</router-link>
    <router-link to="/tab2">Go to tab2</router-link>
    <router-link to="/data">Go to data</router-link>
  </div>
</template>

<script>

export default {
  name:'tab'
}
</script>

<style lang="scss">
$fontSize: 12px;
$width:25%;
$height:50px;
.tab a{
  float: left;
  font-size:$fontSize;
  display: block;
  width: $width;
  height:$height;
}
</style>
