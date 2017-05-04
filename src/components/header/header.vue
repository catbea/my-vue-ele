<template lang="html">
  <div class="header">
     <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="" width="64" height="64">
        </div>
        <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
            </div>
            <div class="support" v-if="seller.supports">
              <span class="icon" :class="iconMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail()">
          <span class="count">{{seller.supports.length}}个
            <i class="icon-keyboard_arrow_right">&gt;</i>
          </span>
        </div>
     </div>
     <div class="bulletin-wrapper" @click="showDetail()">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right">&gt;</i>
     </div>
     <div class="background">
       <img :src="seller.avatar" width="100%" height="100%">
     </div>
     <transition name="slide-fade">
       <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line">
                </div>
                <div class="text">优惠信息
                </div>
                <div class="line">
                </div>
              </div>
              <ul v-if="seller.supports" class="supports">
                  <li class="support-item" v-for="(item,index) in seller.supports">
                    <span :index="index" class="icon" :class="iconMap[seller.supports[index].type]"></span>
                    <span class="text">{{seller.supports[index].description}}</span>
                  </li>
              </ul>
              <div class="title">
                <div class="line">
                </div>
                <div class="text">商家公告
                </div>
                <div class="line">
                </div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
        </div>
        <div class="detail-close">
            <i class="icon-close" @click="hideDetail()">X</i>
        </div>
     </div>
     </transition>
  </div>
</template>

<script>
import star from "../star/star.vue";

export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return {
      detailShow:false
    }
  },
  methods:{
    showDetail(){
      this.detailShow=true;
    },
    hideDetail(){
      this.detailShow=false;
    }
  },
  created(){
    this.iconMap=["decrease","discount","special","invoice","guarantee"];
  },
  components:{
    star
  }
}
</script>
<style lang="scss">
@import "../../common/scss/style.scss";

  .header{
    color: #fff;
    background: rgba(7,17,27,0.5);
    position: relative;
    overflow: hidden;
    .content-wrapper{
      padding: 24px 12px 18px 24px;
      position: relative;
      font-size: 0;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img{
          border-radius: 2px;
        }
      }
      .content{
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
        .title{
          margin-top: 2px;
          .brand{
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            @include bg_image("brand");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
          }
          .name{
            margin-left: 6px;
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
          }
        }
        .description{
          font-size: 12px;
          line-height: 12px;
          margin-top: 8px;
          margin-bottom: 10px;
        }
        .support{
          font-size: 0;
          .icon{
            vertical-align: top;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            // background-position: center;
            &.decrease{
              @include bg_image("decrease_1");
            }
            &.discount{
              @include bg_image("discount_1");
            }
            &.special{
              @include bg_image("special_1");
            }
            &.guarantee{
              @include bg_image("guarantee_1");
            }
            &.invoice{
              @include bg_image("invoice_1");
            }
          }
          .text{
            line-height: 12px;
            font-size: 10px;
          }
        }
      }
      .support-count{
        position: absolute;
        display: block;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          font-size: 10px;
          .icon-keyboard_arrow_right{
            font-size: 10px;
          }
        }
      }

    }
    .bulletin-wrapper{
      height: 28px;
      line-height: 28px;
      background: rgba(7,17,27,0.1);
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      // font-size: 0;
      .bulletin-title{
        display: inline-block;
        vertical-align: top;
        width: 22px;
        height: 12px;
        margin-top: 8px;
        @include bg_image("bulletin");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        vertical-align: top;
        font-size: 10px;
        margin:0 4px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        right: 12px;
        top: 0px;
        font-size: 10px;
      }
    }
    .background{
      position: absolute;
      left: 0;
      top: 0;
      z-index:-1;
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
    .detail{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7,17,27,0.8);
      backdrop-filter:(10px);
      // filter: blur(10px);
      .detail-wrapper{
        min-height: 100%;
        width: 100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom:64px;
          .name{
            line-height: 16px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          }
          .star-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title{
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line{
              flex: 1;
              position: relative;
              top:-6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text{
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }

          }
          .supports{
            width: 80%;
            margin: 0 auto;
            .support-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease{
                  @include bg_image("decrease_2");
                }
                &.discount{
                  @include bg_image("discount_2");
                }
                &.special{
                  @include bg_image("special_2");
                }
                &.guarantee{
                  @include bg_image("guarantee_2");
                }
                &.invoice{
                  @include bg_image("invoice_2");
                }
              }
              .text{
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin:  0 auto;
            .content{
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
        z-index: 200;
        .icon-close{
          font-size: 20px;
        }
      }
    }
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(10px);
      opacity: 0;
    }
  }
</style>
