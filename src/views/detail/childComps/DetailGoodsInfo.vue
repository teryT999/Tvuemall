<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="ininfo">
      <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: Object,
    default() {
      return {}
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    // counter自加，然后不断和图片个数做比较，只有相等时，说明所以图片加载完成再发出事件，
      //detail收到事件再对scroll进行刷新，这时，scroll里面的高度scrollHeight才是正确的。
    imgLoad() {
      if(++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>
<style scoped>
  .goods-info {
    width: 100%;
    border-bottom: 5px solid #f2f5f8;
  }
  .ininfo {
    margin-top: 40px;
  }
  .info-list img {
    width: 100%;
    height: 100%;
  }
</style>
