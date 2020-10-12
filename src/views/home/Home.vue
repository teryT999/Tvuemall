<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">美丽街</div></nav-bar>
    <tab-control v-show="showtab" :titles="titles" ref="topTabControl" @tabClick="tabClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
        <home-swiper :banners ="banners"></home-swiper>
        <home-recommend :recommends="recommends"/>
        <home-feature/>
        <tab-control :titles="titles" @tabClick="tabClick"/>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" ref="bottomTabControl"></back-top>
  </div>
</template>
<script>
import HomeSwiper from './childcomps/Homeswiper'
import HomeRecommend from './childcomps/HomeRecommend'
import HomeFeature from './childcomps/HomeFeature'

import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../..///components/content/backTop/BackTop'

// import {debounce} from '../../common/utils'
import {itemListenerMixin,backTopMixin} from '../../common/mixin'

import {getHomeMultidata, getHomeGoods} from '../../network/home'
export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends:[],
      titles: ['新款','流行','精品'],
      goods: {
        'pop':{page: 0, list:[]},
        'new':{page: 0, list:[]},
        'sell':{page: 0, list:[]},
      },
      currentType: 'pop',
      // isShowBackTop: false,
      showtab: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求商品数据,这里就是默认将每一种商品数据的第一页都请求好了
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    // 页面回来的时候就以离开时的位置保持着。
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },

  deactivated() {
    this.saveY= this.$refs.scroll.getScrollY()
    // 离开页面的时候取消页面图片加载完成事件的监听。
    this.$bus.$off('itemImageLoad', this.homeImgListener)

  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // this.$refs.scroll.refresh()
        // 告诉better-scroll，完成了上拉加载更多，可以进行下一次上拉操作了。
        this.$refs.scroll.finishPullUp()
     })
   },
   /**
    * 事件监听相关的方法
    */
    tabClick(index) {
     switch (index) {
        case 0: this.currentType = 'pop'
         break;
        case 1: this.currentType = 'new'
         break;
        case 2: this.currentType = 'sell'
         break;
     }
     this.$refs.topTabControl.isActive = index
     this.$refs.bottomTabControl.isActive = index

   },
  //   backClick() {
  //    this.$refs.scroll.scrollTo(0, 0, 500)
  //  },
    contentScroll(position) {
     this.isShowBackTop = -position.y > 1000
     this.showtab = -position.y > 526
   },
    loadMore() {
      this.getHomeGoods(this.currentType)
    }
  }

}
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-high-text);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.content {
  /* height: calc(100% - 44px - 49px);
  overflow: hidden;
  margin-top: 44px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.sticky {
  position: sticky;
  top: 44px;
  left: 0;
  right: 0;
}
</style>
