<template lang="html">
  <div class="">
  获取数据
    <ul>
      <li v-for="item in newslist">
        <p>{{item.name}}</p>
        <p>{{item.year}}</p>
        <a :href="item.url"><img :src="item.image" alt=""></a>
      </li>
    </ul>
  </div>
  <scroller delegate-id="myScroller"
          :on-refresh="refresh"
          :on-infinite="loadMore"
          v-ref:my_scroller>
  <div v-for="(index, item) in items" @click="onItemClick(index, item)"
       class="row" :class="{'grey-bg': index % 2 == 0}">
    {{ item }}
  </div>
</scroller>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';
import Scroller from 'vue-scroller'
Vue.use(VueResource);
const url="https://mainsite-restapi.ele.me/v2/index_entry?geohash=ws101p3tqsdc&group_type=1&flags[]=F";
export default {
  components:{
    Scroller
  },
  data(){
    return {
      newslist:[]
    }
  },
  created (){
    // this.$emit('viewIn',"购彩资讯");
    // Vue.http.options.xhr = { withCredentials: true }
    // Vue.http.options.emulateJSON = true
    this.$http({
      method:'jsonp',
      url:"https://api.douban.com//v2/movie/top250",
      header:{},
      emulateJSON: true
    }).then(function(response){
        console.log(response.data);
        let d=response.data.subjects;
        for(let i=0;i<d.length;i++){
          let list={
            "name":d[i].title,
            "year":d[i].year,
            "image":d[i].images.medium,
            "url":d[i].alt
          }
          this.newslist.push(list);
          console.log("name:"+d[i].title+"year:"+d[i].year+"image:"+d[i].images.medium);
        }
    },function(response){
        console.log("error");
    });
  }
}
</script>
<style lang="css">
li{
  list-style: none;
}
</style>
