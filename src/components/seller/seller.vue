<template lang="html">
  <div class="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">{{seller.sellCount}}</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>

        </div>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import {formatDate} from "../../common/js/date.js";
import star from "../star/star.vue";
import split from "../split/split.vue";
import ratingselect from "../ratings/ratingselect.vue";
export default {
  props:{
    seller:{
      type:Object
    }
  },
  components:{
    star
  }
}
</script>

<style lang="scss">
@import "../../common/scss/style.scss";
.seller{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview{
    padding: 18px;
    .title{
      margin-bottom: 8px;
      color: rgb(7,17,27);
      line-height: 14px;
      font-size: 14px;
    }
    .desc{
      padding-bottom: 18px;
      line-height: 18px;
      font-size: 0;
      @include border-1px(rgba(7,17,27,0.1));
      .star{
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text{
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        color: rgb(7,17,27);
      }
    }
    .remark{
      display:flex;
      padding-top: 18px;
      .block{
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7,17,27,0.1);
      }
      &.last-child{
        border-right:0;
      }
      h2{
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147,153,159);
      }
      .content{
        line-height: 24px;
        font-size: 10px;
        color: rgb(7,17,27);
      }
      .stress{
        font-size: 24px;
      }

    }
  }
}
</style>
