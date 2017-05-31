<template lang="html">
  <div ref="ratingWrapper" class="ratings">
    <div class="ratingWrapper">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">
            综合评分
          </div>
          <div class="rank">
            高于周边商家{{seller.rankRate}}
          </div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery"></span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend||rating.recommend.length>0">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
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
const ALL=2;
const ERR_OK=0;
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return {
      ratings:[],
      selectType:ALL,
      onlyContent:true
    };
  },
  filters:{
      formatDate(time){
        let data=new Date(time);
        return formatDate(data,'yyyy-MM-dd hh:mm');

      }
  },
  methods:{
    needShow(type,text){
      if(this.onlyContent&&!text){
        return false;
      }
      if(this.selectType===ALL){
        return true;
      }else{
        return type===this.selectType;
      }
    },
    selectRating(type) {
       this.selectType = type;
       this.$nextTick(() => {
         this.scroll.refresh();
       });
     },
     toggleContent() {
       this.onlyContent = !this.onlyContent;
       this.$nextTick(() => {
         this.scroll.refresh();
       });
     }
  },
  created(){
    this.$http.get('/api/ratings').then((response)=>{
      response=response.body;
      if(response.errno===ERR_OK){
        this.ratings=response.data;
        this.$nextTick(()=>{
          this.menuScroll=new BScroll(this.$refs.ratingWrapper,{
            click:true
          });
        });
      }
    });
  },
  events:{
    'ratingtype.select'(type){
      this.selectType=type;
      this.$nextTick(()=>{
        this.scroll.refresh();
      });
    },
    'content.toggle'(onlyContent){
      this.onlyContent=onlyContent;
      this.$nextTick(()=>{
        this.scroll.refresh();
      });
    }
  },
  components:{
    star,
    split,
    ratingselect
  }
}
</script>

<style lang="scss">
@import "../../common/scss/style.scss";
.ratings{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow:hidden;
  .overview{
    display: flex;
    padding: 18px 0;
    .overview-left{
      flex:  0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7,17,27,0.1);
      text-align: center;
      padding: 6px 0;
      @media only screen and (max-width: 320px){
        flex:  0 0 120px;
        width: 120px;
      }
      .score{
        font-size: 24px;
        line-height: 28px;
        color: rgb(255,153,0);
        margin-bottom: 6px;
      }
      .title{
        line-height: 12px;
        font-size: 12px;
        color: rgb(7,17,27);
        margin-bottom: 8px;
      }
      .rank{
        font-size: 10px;
        line-height: 10px;
        color: rgb(147,153,159);

      }
    }
    .overview-right{
      flex: 1;
      padding:6px 0 6px 24px;
      @media only screen and (max-width: 320px){
        padding:6px 0 6px 6px;
      }
      .score-wrapper{
        line-height: 18px;
        margin-bottom: 8px;
        font-size: 0;
        .title{
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .star{
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score{
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(255,153,0);
        }
      }
      .delivery-wrapper{
        font-size: 0;
        .title{
          line-height: 18px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .time{
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }
  .rating-wrapper{
    padding: 0 18px;
    .rating-item{
      display: flex;
      padding: 18px 0;
      @include border-1px(rgba(7,17,27,0.1));
      .avatar{
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img{
          border-radius: 50%;
        }
      }
      .content{
        position: relative;
        flex: 1;
        .name{
          line-height: 12px;
          margin-bottom: 4px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .star-wrapper{
          margin-bottom: 6px;
          font-size: 0;
          .star{
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }
          .delivery{
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            margin-bottom: 4px;
            font-size: 12px;
            color: rgb(147,153,159);
          }
        }
        .text{
          line-height: 18px;
          font-size: 12px;
          color: rgb(7,17,27);
          margin-bottom: 8px;
        }
        .recommend{
            line-height: 16px;
            .icon-thumb_up,.item{
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
              font-size: 0;
            }
            .item{
              padding: 0 6px;
              border: 1px solid rgba(7,17,27,0.1);
              color: rgb(147,153,159);
              line-height: 16px;
              font-size: 9px;
            }
        }
        .time{
          position: absolute;
          right: 18px;
          top: 0;
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 12px;
          font-weight: 200
        }
      }
    }
  }
}
</style>
