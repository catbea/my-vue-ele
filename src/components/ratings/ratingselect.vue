<template lang="html">
<div class="ratingselect">
  <div class="rating-type">
    <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
    <span @click="select(0,$event)"  class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
    <span @click="select(1,$event)"  class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  </div>
  <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
    <span class="icon-check-circle"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script>
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
export default {
  props:{
    ratings:{
      type:Array,
      default(){
        return [];
      }
    },
    selectType:{
      type:Number,
      default:ALL
    },
    onlyContent:{
      type:Boolean,
      default:false
    },
    desc:{
      type:Object,
      default(){
        return {
          all:"全部",
          positive:'满意',
          negative:'不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods:{
    select(type,event){
      if(!event._constructed){
        return ;
      }
      this.selectType=type;
      this.$emit('ratingtype.select',type);
      console.log(this.selectType);
    },
    toggleContent(event) {
       if (!event._constructed) {
         return;
       }
       this.onlyContent=!this.onlyContent;
       this.$emit('content.toggle',this.onlyContent);
     }
  }
}
</script>

<style lang="scss">
@import "../../common/scss/style.scss";
.ratingselect{
  .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    @include border-1px(rgba(7,17,27,0.1));
    .block{
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      color: rgb(77,85,93);
      font-size: 12px;
      line-height: 8px;
      line-height: 16px;
      .count{
        font-size: 8px;
        margin-left: 2px;

      }
      &.active{
        color: #fff;
      }
      &.positive{
        background: rgba(0,160,220,0.2);
        &.active{
          background: rgb(0,160,220);
        }
      }
      &.negative{
        background: rgba(77,85,93,.2);
        &.active{
          background: rgb(77,85,93);
        }
      }
    }
  }
  .switch{
    margin-left: 18px;
    padding: 12px 0;
    line-height: 24px;
    font-size: 0;
    color: rgb(147,153,159);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .icon-check-circle{

    }
    &.on{
      color: green;
    }
    .text{
      display: inline-block;
      font-size: 12px;
      vertical-align: top;
    }
  }
}
</style>
