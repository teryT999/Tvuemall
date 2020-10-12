<template>
  <div class="shop-Info">
    <div class="shop-top">
      <img :src="shop.logo"/>
      <div>{{shop.name}}</div>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left">
      <div class="left-left">
        <div class="num">{{shop.sells | sellCountFilter}}</div>
        <div>总销量</div>
      </div>
      <div class="left-right">
        <div class="num">{{shop.goodsCount}}</div>
        <div>全部宝贝</div>
      </div>
    </div>
    <div class="shop-middle-right">
      <div class="right-score" v-for="(item, index) in shop.score" :key="index">
        <span>{{shop.score[index].name}}</span>
        <span class="score" :class="{redcolor:isactive(index)}">{{shop.score[index].score}}</span>
        <span v-if="isactive(index)" class="red">{{high}}</span>
        <span class="green" v-else >{{low}}</span>
      </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop"><span>进店逛逛</span></div>
    </div>
    </div>
</template>
<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      low: '低',
      high: '高',
    }
  },
 methods: {
    isactive(index) {
      return this.shop.score[index].isBetter

    }
  },
  filters: {
    sellCountFilter: function (value) {
      if(value < 10000) return value
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>
<style scoped>
  .shop-Info {
    background-color: #fff;
    border-bottom: 5px solid #f2f5f8;
  }
  .shop-top {
    height: 30px;
    overflow: hidden;
    margin: 20px 0;
  }
  .shop-top img {
    float: left;
    margin: 5px 10px;
    width: 25px;
    height: 25px;
  }
  .shop-top div {
    widows: 30px;
    height: 50px;
    float: left;
    top: 30px;
    font-size: 14px;
    color: rgb(153, 150, 150);
    line-height: 40px;
  }
  .shop-middle {
    display: flex;
    overflow: hidden;
    color: #000;
  }
  .shop-middle-left, .shop-middle-right {
    flex: 1;
    height: 80px;
    /* outline: 1px solid red; */
    font-size: 12px;
  }
   .shop-middle-left {
     display: flex;
   }
   .shop-middle-left::after {
     content: '';
     display: block;
     width: 1px;
     height: 40px;
     margin: 15px 0;
     background-color: rgb(161, 160, 160);
     /* position: absolute;
     left:80px */
   }
  .shop-middle-left>div {
    flex: 1;
    margin-top: 15px;
  }
  .shop-middle-left .left-left>div {
    height: 25px;
    text-align: center;
  }
  .shop-middle-left .left-left>div:first-child {
    margin-bottom: 0px;
  }
  .shop-middle-left .left-right>div {
    height: 25px;
    text-align: center;
  }
  .shop-middle-right div {
    padding-left: 20px;
    margin-top: 10px;
  }
  .shop-middle-right div>span {
    margin-right: 10px;
  }
  .shop-middle-right div>span:nth-of-type(2) {
    color: green;
  }
  .shop-middle-right div>span.redcolor  {
    color: red;
  }
  .right-score {
    display: flex;
  }
  .right-score span:first-child {
    flex: 3;
  }
  .right-score span.score {
    flex: 2;
  }
  .green {
    flex: 1;
    color: #fff;
    background-color: green;
  }
  .red {
    flex: 1;
    color: #fff;
    background-color: red;
  }
  .shop-bottom {
    height: 60px;
    width: 100%;
  }
  .shop-bottom .enter-shop {
    width: 30%;
    height: 70%;
    line-height: 60px;
    margin: 10px auto;
    text-align: center;
  }
  .shop-bottom .enter-shop span {
    display: block;
    height: 40px;
    width: 100%;
    line-height: 40px;
    background-color:rgb(224, 223, 223);
    border-radius: 8px;
  }
</style>
