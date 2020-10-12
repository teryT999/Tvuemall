<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.png" alt="">
    <div>首页</div> -->

    <!-- 这里使用插槽<slot>，就可以在此小块里面自定义要放置什么元素了，这是的name属性是方便别人在使用本组件时，容易定位到具体位置 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>

    <!-- 这里用div包裹slot是为了动态加入类，如果直接中在slot上，会被替换掉 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name:"TabBarItem",
  props: {
    path: String,
    activeColor: {
      default: 'red'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive?{color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path).catch(() => {})
    }
  }

}
</script>
<style scoped>
    .tab-bar-item {
    flex: 1;
    text-align: center;
    /* tab-bar的高度一般都设置为49px */
    height: 49px;
    font-size: 13px;
    /* line-height: 49px; */
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 0px;
    margin-top: 2px;
  }
</style>
