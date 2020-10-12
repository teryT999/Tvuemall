<template>
  <nav-bar>
    <div class="left" slot="left" @click="backClick">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item"
            v-for="(item,index) in titles"
            :key="index"
            :class="{isActive : index === currentIndex}"
            @click="itemClick(index)">
            {{item}}
      </div>
    </div>
    </nav-bar>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar'
export default {
  components: {
    NavBar
  },
  props: {

  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.isActive {
  color: var(--color-high-text);
}
.left img {
  vertical-align: middle;
  margin-left: 12px;
}

</style>
