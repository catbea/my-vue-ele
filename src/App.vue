<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
           <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from "./components/header/header.vue"
import {urlParse} from "./common/js/util.js";
const ERR_OK=0;
export default {
  data() {
    return {
      seller:{
        id:(()=>{
          let queryParam=urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  created(){
    this.$http.get("/api/seller?id="+this.seller.id).then((res) => {
        res=res.body;
        if(res.errno===ERR_OK){
            this.seller=res.data;
            this.seller=Object.assign({},this.seller, res.data);
            // console.log(this.seller);
        }
    });
  },
  components:{
    "v-header":header
  }
}
</script>
<style lang="scss">
    @import "./common/scss/style.scss";
    #app .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      @include border-1px(rgba(7,17,21,0.1));
      .tab-item{
        flex: 1;
        a{
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
          color: rgb(77,85,93);
          font-size: 14px;
          &.router-link-active{
              color: red;
            }
        }
      }
    }
</style>
