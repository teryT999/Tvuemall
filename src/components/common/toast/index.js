import Toast from './Toast.vue'
const obj = {}

obj.install = function(Vue) {
  // // 以下部分：当执行Install函数的时候，Toast.$el还没有挂载，所以就为undefined，以至于后面加到body时也是没有
  // console.log(Toast.$el) //undefined
  // // 把Toast组件里的模板加到body上
  // document.body.appendChild(Toast.$el);
  // // 让vue的原型里加一个$toast，并指向Toast组件
  // Vue.prototype.$toast = Toast;


  // 1.创建组件构造器
  const toastControstor = Vue.extend(Toast)
  // 2.通过new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastControstor()
  // 3.将组件对象手动地挂载到某一个div上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是这个div了
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
}
 export default obj
