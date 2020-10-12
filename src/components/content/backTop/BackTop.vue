<template>
  <div class="back-top">
    <img src="../../../assets/img/common/top.png" >
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
  }

}
</script>

<style scoped>
  .back-top {
    position:fixed;
    right: 10px;
    bottom: 50px;
    z-index: 100;
  }
  .back-top img {
    width: 50px;
    height: 50px;
  }
</style>
