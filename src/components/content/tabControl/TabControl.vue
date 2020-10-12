<template>
<div class="tab-control">
  <div @click="itemclick(index)" :class="{active:isActive === index}" class="tab-item" v-for="(item,index) in titles" :key="index">
    <span>{{item}}</span>
  </div>


</div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    itemclick(index) {
      this.isActive = index
      this.$emit('tabClick',index)

    }
  }

}
</script>
<style scoped>
  .tab-control {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    text-align: center;
    line-height: 40px;
    position: sticky;
    top: 40px;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgb(231, 230, 230);
  }
  .tab-item {
    flex: 1;
    font-size: 14px;
  }
  .tab-item span {
    padding-bottom: 5px;
  }
  .active>span {
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
