<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="SelectClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算 ({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkbutton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥'+ this.cartList.filter((item) => {
        return item.checked
      }).reduce((proValue, item) => {
        return proValue + item.price * item.count
      },0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length === 0) return false
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    SelectClick() {
      if (this.isSelectAll) {
        //如果商品都是选中的，点击一次，全部不选中
        this.cartList.forEach(item => item.checked = false)
      } else {
        // 如果商品都是不选中或某些不选中，则点击一次，全部选中。
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择商品',1500)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.check-content {
  display: flex;
 align-items: center;
 margin-left: 10px;
 width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
   flex: 1;
  margin-left: 15px;
}
.calculate {
  width: 110px;
  background-color: red;
  color: #fff;
  text-align: center;
}

</style>
