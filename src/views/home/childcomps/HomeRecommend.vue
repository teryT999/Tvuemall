<template>
  <div class="recommend">
    <div class="recommendItem" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommends:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    padding: 10px 0 20px 0;
    display: flex;
    width: 100%;
    border-bottom: 8px solid #eee;
  }
  .recommendItem {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
   .recommendItem img {
     width: 60px;
     height: 60px;
     margin-bottom: 5px;
   }
</style>
