<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart" >加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  /* position: fixed;
  left: 0;
  right: 0;
  bottom: 0; */
  background-color: #fff;
  position: relative;
  display: flex;
  text-align: center;
}
.bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 12px;
  }
  .bar-left i.icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 3px auto 1px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left i.service {
    background-position: 0 -53px;
  }
  .bar-left i.shop {
    background-position: 0 -98px;
  }
  .bar-right {
    font-size: 14px;
    color: #fff;
    line-height: 46px;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }
</style>
