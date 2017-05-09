<template lang="html">
<transition name="move">
  <div class="food" v-show="showFlag" ref="food">
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back" @click="backhide">
          <i class="icon-arrow-left">&lt;</i>
        </div>
      </div>
      <div class="contetn">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice>0">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" @click="addFirst" v-show="!food.count||food.count===0">
            加入购物车
          </div>
        </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
import Vue from "vue";
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol.vue";
import split from "../split/split.vue";
import ratingselect from "../ratings/ratingselect.vue";
export default {
  props:{
    food:{
      type:Object
    }
  },
  data(){
    return {
      showFlag:false,
      selectType:ALL,
      onlyContent:true,
      desc:{
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      }
    };
  },
  methods:{
    show(){
      this.showFlag=true;
      this.selectType=ALL;
      this.onlyContent=true;
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll=new BScroll(this.$refs.food,{
            click:true
          });
        }else{
          this.scroll.refresh();
        }
      });
    },
    backhide(){
      this.showFlag=false;
    },
    addFirst(event){
      if(!event._constructed){
        return;
      }
      this.$emit("cart.add",event.target);
      Vue.set(this.food,'count',1);
    }
  },
  components:{
    cartcontrol,
    split,
    ratingselect
  }
}
</script>

<style lang="scss">
.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #FFF;
  &.move-transition{
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
  }
  &.move-enter,&.move-leave{
    transform: translate3d(100%,0,0);
  }
  .img-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back{
      position: absolute;
      top:10px;
      left: 10px;
      .icon-arrow-left{
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .contetn{
    padding: 18px;
    position: relative;
    .title{
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7,17,27);
    }
    .detail{
      margin-bottom: 18px;
      line-height: 10px;
      font-size: 0;
      .sell-count,.rating{
        font-size: 10px;
        display: inline-block;
        color: rgb(147,153,159);
      }
      .sell-count{
        margin-right: 6px;
      }
    }
    .price{
      font-weight: 700;
      line-height: 24px;
      .now{
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240,20,20);
      }
      .old{
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147,153,159);
      }
    }
    .cartcontrol-wrapper{
      position: absolute;
      right: 18px;
      bottom: 18px;
    }
    .buy{
      position: absolute;
      right: 18px;
      bottom: 18px;
      height: 24px;
      width: 72;
      line-height: 24px;
      text-align: center;
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 10px;
      color: #fff;
      background: rgb(0,160,220);
      border-radius: 12px;
      &.fade-transition{
        transition: all 0.2s;
        opacity: 1;
      }
      &.fade-enter,&.fade-leave{
        opacity: 0;
      }
    }
  }
  .info{
    padding: 18px;
    .title{
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .text{
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77,85,93);
    }
  }
  .rating{
    padding-top: 18px;
    .title{
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
  }
}
</style>
