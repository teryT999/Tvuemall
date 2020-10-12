<template>
   <tab-bar>
      <!-- 因为<tab-bar-item>里面是两个插槽<slot>，这里就根据对应name的插槽用图片和文本替换掉插槽 -->
      <tab-bar-item path="/home" activeColor="#ff5777">
        <img slot="item-icon" src="../../../assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#ff5777">
      <!-- 使用路径别名的时候，html里面前面必须加~符号 -->
        <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#ff5777">
        <img slot="item-icon" src="../../../assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#ff5777">
        <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
