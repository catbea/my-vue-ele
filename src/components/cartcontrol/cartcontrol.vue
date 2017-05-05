<template lang="html">
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">-</div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">+</div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    addCart(event){
      // console.log(event);
      if(!event._constructed){
        return;
      }
      if(!this.food.count){
        Vue.set(this.food,"count",1);
      }else {
        this.food.count++;
      }
      this.$emit("cart.add",event.target);
    },
    decreaseCart(event){
      if(!event._constructed){
        return;
      }
      if(this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<style lang="scss">
.cartcontrol{
  font-size: 0;
  .cart-decrease,.cart-add{
    display: inline-block;
    font-size:24px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    background:rgb(0,160,220);
    color: #fff;
    border-radius: 50%;
    text-align: center;
    vertical-align: top;
  }
  .cart-decrease{
    transform: translate3d(0,0,0);
    transition: all 0.3s linear;
    &.move-transition{
      opacity: 1;
    }
    &.move-enter-active,&.move-leave-active{
      opacity: 0;
      transform: translate3d(24px,0,0);
    }
  }
  .cart-count{
    display: inline-block;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 24px;
    padding: 0 6px;
  }
}
</style>
