<template lang="html">
  <div class="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
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
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span :index="index" class="icon" :class="iconMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
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
  created(){
    this.iconMap=["decrease","discount","special","invoice","guarantee"];
  },
  components:{
    star,
    split
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
      font-size: 0;
      @include border-1px(rgba(7,17,27,0.1));
      .star{
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text{
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
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
        &:last-child{
          border-right:0;
        }
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
  .bulletin{
    padding: 18px 18px 0 18px;
    .title{
      margin-bottom: 8px;
      color: rgb(7,17,27);
      line-height: 14px;
      font-size: 14px;
    }
    .content-wrapper{
      padding: 0 12px 16px 12px;
      @include border-1px(rgba(7,17,27,0.1));
      .content{
        line-height: 24px;
        font-size: 12px;
        color: rgb(240,20,20);
      }
    }
  }
}
</style>
