<template>
  <div class="item"  @click="ItemClick">
    <img :src="showImage" @load="imageLoad" alt="">
    <div class="goods-info">
      <p>{{goodItem.title}}</p>
      <span class="price">{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    goodItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      // 这里是使用路由跳转的页面来发出不同的事件，让它们接收不同的事件，刷新不同的滚动页面。
      // if (this.$route.path.indexOf('/home')) {
      //    this.$bus.$emit('HomeitemImageLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('DetailitemImageLoad')
      // }

      this.$bus.$emit('itemImageLoad')

    },
    ItemClick() {
      this.$router.push('/detail/' + this.goodItem.iid)
    }
  },
  computed: {
    showImage() {
      return  this.goodItem.image || this.goodItem.show.img
    }
  }
}
</script>

<style scoped>
.item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.item img {
  width: 100%;
  border-radius:  5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
