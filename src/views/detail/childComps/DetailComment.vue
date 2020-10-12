<template>
  <div class="comment" v-if="Object.keys(rate).length !== 0">
    <div class="comment-top">
      <span>用户评价</span><span>更多</span>
    </div>
    <div class="user">
      <img :src="rate.user.avatar" alt="">
      <span>{{rate.user.uname}}</span>
    </div>
    <div class="content">{{rate.content}}</div>
    <span>{{rate.created | showDate}}</span>
    <span>{{rate.style}}</span>
    <div class="info-imgs">
      <img :src="item" v-for="(item,index) in rate.images" :key="index" alt="">
    </div>
  </div>
</template>
<script>
import {formatDate} from '../../../common/utils'
export default {
  name: 'DetailComment',
  props: {
    rate: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    ShowDate(value) {
      // 1.将时间戳转成Date对象
      const date = new Date(value * 1000)
      // 2.将data进行格式化
      return formatDate(date, 'yyyy-MM-dd')

    }
  }
}
</script>
<style scoped>
.comment {
  width: 100%;
  border-bottom: 5px solid #f2f5f8;
  font-size: 13px;
  color: #333;
}
.comment-top {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #f2f5f8;
  /* overflow: hidden; */
}
.comment-top span:first-child {
  display: block;
  margin-left: 12px;
  width: 60px;
  float: left;
}
.comment-top span:last-child {
  display: block;
  width: 30px;
  margin-right: 12px;
  float: right;
}
.user {
  margin: 10px 0;
  width: 100%;
  height: 30px;
}
.user img {
  float: left;
  width: 28px;
  height: 28px;
  margin: 0 15px;
}
.user span {
  float: left;
  line-height: 30px;
}
.content {
  margin: 10px 3px;
  color: rgb(97, 95, 95);
}
.comment>span {
  margin-right: 5px;
  color: rgb(165, 161, 161);
}
.info-imgs {
  margin: 10px 0;
}
.info-imgs img {
  width: 30px;
  height: 30px;
}
</style>
