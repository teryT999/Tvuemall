// 先将request.js中定义好的request方法导入
import {request} from './request'

// 这里是给home组件和request.js做一个整理的使用，如果直接让组件去request.js请求数据，那么就会比较乱，而且首页使用的数据也存放在数据中的不同位置，如果有一个东西可以帮助组件先把数据路径整理好，让组件直接面向它拿数据，让组件用的时候就直接调用对应函数，就非常简洁了。
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
