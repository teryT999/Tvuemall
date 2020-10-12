<template>
  <div class="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{Length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './cartcomp/CartList.'
import CartBottomBar from './cartcomp/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters([
    //   'cartLength'
    // ])
    ...mapGetters({
      Length:'cartLength'
    })
  }
}
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav {
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 16px;
}

</style>
