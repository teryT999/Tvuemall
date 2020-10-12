<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
   <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo" ref="params"/>
    <detail-comment :rate="rate" ref="comments"/>
    <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" ref="bottomTabControl"></back-top>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailComment from './childComps/DetailComment'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '../../components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'

import {getDetail,Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'

import {itemListenerMixin, backTopMixin} from '../../common/mixin'
import { debounce } from '../../common/utils'

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      rate: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currenttitleIndex: 0,
      // message:'',
      // show: false
    }
  },
  created() {
    // 保存传入的id
    this.iid = this.$route.params.id
    // 根据id请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取轮播图
      // console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.直接保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取评价
      if(data.rate.cRate !== 0) {
        this.rate = data.rate.list[0]
      }

      // //值不对，模板还没有被挂载
      //   this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      //   console.log(this.themeTopYs)

      //值不对，因为虽然写在$nextTick里面模板被挂载了，但是图片还没有加载完。
      //   this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      //   console.log(this.themeTopYs)

      // })

    }),

    // 请求推荐商品的数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    // 给getThemTopY赋值
    this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    }, 100)

  },

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    // 给scroll绑定监听事件，获取它的position
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
      // 1.获取滚动时的y值p;
      const positionY = -position.y
      // 2.positionY和主题中的值进行对比
      let length = this.themeTopYs.length
      for(let i = 0; i < this.themeTopYs.length; i++) {
        if(this.currenttitleIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
         || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
           this.currenttitleIndex = i
           this.$refs.nav.currentIndex = this.currenttitleIndex
         }
      }
    },
    addToCart() {
      // 先获取商品需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 将商品添加到购物车里
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
      //   this.show = true
      //   this.message = res
      //  setTimeout(() => {
      //    this.show = false
      //    this.message = ''
      //  }, 1000);

      this.$toast.show(res, 2000)
      // console.log(this.$toast)
      })
    }
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.detailimgListener )
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 12;
  background-color: #fff;
}
.content {
 height: calc(100% - 44px - 49px);
}
</style>
