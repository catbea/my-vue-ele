<template lang="html">
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight':totalCount>0}">
            <i class="icon-shopping-cart" :class="{'highLight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0"> {{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-wrapper">
      <div v-for="(ball,index) in balls">
        <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div v-show="ball.show" :key="index" class="ball">
            <div class="inner inner-hook">
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow" ref="listContent">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol.vue";
export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return [{
          price:10,
          count:1
        }];
      }
    },
    deliveryPrice:{
      type:Number,
      default:0
    },
    minPrice:{
      type:Number,
      default:50
    }
  },
  data(){
    return {
      balls:[
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        }
      ],
      dropBalls:[],
      fold:true
    };
  },
  computed:{
    totalPrice(){
      let total=0;
      this.selectFoods.forEach((food)=>{
        total+=food.price*food.count;
      });
      return total;
    },
    totalCount(){
      let count=0;
      this.selectFoods.forEach((food)=>{
        count+=food.count;
      });
      return count;
    },
    payDesc(){
      if(this.totalPrice===0){
          return `￥{{this.minPrice}}元起送`;
      }else if(this.totalPrice<this.minPrice){
          let diff=this.minPrice-this.totalPrice;
          return `还差￥`+diff+`元起送`;
      }else{
          return "去结算"
      }
    },
    listShow(){
      if(!this.totalCount){
        this.fold=true;
        return false;
      }
      let show=!this.fold;
      if(show){
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll=new BScroll(this.$refs.listContent,{
              click:true
            });
          }else{
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods:{
    drop(el){
      console.log(el);
        for (var i = 0; i < this.balls.length; i++) {
          let ball=this.balls[i];
          if(!ball.show){
            ball.show=true;
            ball.el=el;
            this.dropBalls.push(ball);
            return ;
          }
        }
    },
    beforeEnter(el){
      console.log(beforeDrop);
      let count=this.dropBalls.length;
      while (count--) {
        let ball=this.balls[count];
        if(ball.show){
          let react=ball.el.getBoundingClientRect();
          let x=react.left-32;
          let y=-(window.innerHeight-react.top-22);
          el.style.display="";
          el.style.webkitTransform=`translate3d(0,`+y+`px,0)`;
          el.style.transform=`translate3d(0,`+y+`px,0)`;
          let inner=el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform=`translate3d(`+x+`px,0,0)`;
          inner.style.transform=`translate3d(`+x+`px,0,0)`;
        }
      }
    },
    enter(el){
      let rf=el.offsetHeight;
      this.$nextTick(()=>{
        el.style.webkitTransform=`translate3d(0,0,0)`;
        el.style.transform=`translate3d(0,0,0)`;
        let inner=el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform=`translate3d(0,0,0)`;
        inner.style.transform=`translate3d(0,0,0)`;
        el.addEventListener('transitionend', done);
      });
    },
    afterEnter(el){
      let ball=this.dropBalls.shift();
      if(ball){
        ball.show=false;
        el.style.display="none";
      }
    },
    addFood(target){
      this.drop(target);
      this.$emit("shopcart.drop",event.target);
    },
    toggleList(){
      if(!this.totalCount){
        return;
      }
      this.fold=!this.fold;
    }
  },
  components:{
    cartcontrol
  }
}
</script>

<style lang="scss">
@import "../../common/scss/style.scss";
.shopcart{
  position:fixed;
  width: 100%;
  height:48px;
  bottom: 0;
  left: 0;
  z-index: 50;
  background: #141d27;
  color: rgba(255,255,255,0.4);
  .content{
    display: flex;
    font-size: 0;
    .content-left{
      flex: 1;
      .logo-wrapper{
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background:#141d27;
        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          &.highLight{
            background: rgb(0,160,220);
          }
          .icon-shopping-cart{
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highLight{
              color: #fff;
            }
          }
        }
        .num{
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight:700;
          color: #fff;
          background: rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        }
      }
      .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 700;
        &.highLight{
          color: #fff;
        }
      }
      .desc{
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .content-right{
      flex: 0 0 105px;
      width: 105px;
      .pay{
        font-size: 12px;
        line-height: 48px;
        height: 48px;
        font-weight: 700;
        text-align: center;
        background: #2BB333;
        color: #fff;
      }
    }
  }
  .ball-wrapper{
    .ball{
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 100;
      .inner{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #00ff00;
        transition: all 0.3s linear;
      }
      &.drop-transition{
        transition: all 0.3s cubic-bezier(0.49,-1.29,0.75,0.41);
      }
    }
  }
  .shopcart-list{
    position: absolute;
    top: 0;
    left: 0;
    z-index:-1;
    width: 100%;
    transform: translate3d(0,-100%,0);
    // transition: all 0.3s;
    .list-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .title{
        float: left;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .empty{
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
      }
    }
    .list-content{
      max-height: 217px;
      padding: 0 12px;
      background: #fff;
      overflow: auto;
      .food{
        position:relative;
        padding: 12px 0;
        box-sizing: border-box;
        @include border-1px(rgba(7,17,27,0.1));
        .name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .price{
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          color: rgb(240,20,20);
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
