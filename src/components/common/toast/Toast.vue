<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  methods: {
    show(message='默认文字',duration=1500) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, 2000);
    }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  }

}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 6px 8px;
    transform: translate(-50%);
    color: #fff;
    background-color: rgba(0,0,0,.7);
    z-index: 99;
  }
</style>
