<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
  components: {

  }
}
</script>

<style scoped>
#tab-bar {
    background-color: #f6f6f6;
    box-shadow: 0 -3px 1px rgba(140, 129, 129, 0.1);
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
</style>
