import {debounce} from './utils'
import BackTop from '../components/content/backTop/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      ItemimgListener: null
    }
  },
  mounted() {
    const derefresh = debounce(this.$refs.scroll.refresh, 500)
    this.ItemimgListener = () => {
      derefresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemimgListener )

  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

  }
}
