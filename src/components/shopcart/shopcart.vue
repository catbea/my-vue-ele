<template lang="html">
  <div class="shopcart">
    <div class="content">
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
  </div>
</template>

<script>
export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return [{
          price:10,
          count:2
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
    }
  }
}
</script>

<style lang="scss">
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
        background: #2B333B;
      }
    }
  }
}
</style>
