<template>
  <div>
    <snake></snake>
    <doubleBounce :size="1"></doubleBounce>
    <tab></tab>
    <transition><router-view></router-view></transition>
  </div>
</template>

<script>
import snake from './components/zk-spinner/src/snake.vue';
import doubleBounce from './components/zk-spinner/src/double-bounce.vue';
import tab from './components/zk-spinner/src/tab.vue';
// 创建一个 Counter 组件

export default {
  components:{
    snake,
    doubleBounce,
    tab
  }
}
</script>
<style>
</style>
