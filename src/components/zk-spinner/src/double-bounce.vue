<template>
  <div class="double-bounce" :style="{
    'width':spinnerSize,
    'height':spinnerSize
    }">
  <div class="double-bounce1" :style="{'backgroundColor':spinnerColor}"></div>
  <div class="double-bounce2" :style="{'backgroundColor':spinnerColor}"></div>
</div>
</template>

<script>
export default {
  name : 'double-bounce',
  computed : {
    spinnerColor () {
      return this.color || this.$parent.color || 'red'
    },
    spinnerSize () {
      console.log(this.size || this.$parent.size || .44);
      return (this.size || this.$parent.size || .44)+'rem'
    }
  },
  props : {
    color : String,
    size : Number
  }
}
</script>

<style>
.double-bounce {
  position: relative;
}
.double-bounce1, .double-bounce2{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #67cf22;
  opacity: 0.6;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-animation:bounce 2.0s infinite ease-in-out;
  animation:bounce 2.0s infinite ease-in-out;
}
.double-bounce2{
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}


</style>
