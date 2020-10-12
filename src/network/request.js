import axios from 'axios';

//拦截器interceptors的使用,这里的request是一个函数
export function request(config) {
  // 1.创建axios的实例
const instance = axios.create({
baseURL: 'http://152.136.185.210:8000/api/w6',
timeout: 3000
})

  //使用拦截器(这里是局部axios 也就是instance),这里使用request,就是拦截请求了
  //使用use就是使用拦截器了，里面传两个函数参数，第一个是config请求拦截的 第二个是bbb请求失败的。
  instance.interceptors.request.use(config => {
    return config
  },err => {
    // console.log(err);
  });


  // 这里是使用response，是响应拦截。
  //响应失败就是err
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })
// 发送真正的网络请求
return instance(config)
}
