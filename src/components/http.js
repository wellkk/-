// 这是一个用来封装好的设置请求头的插件  为什么不直接放在main.js中呢，
// 因为那样太乱了 main.js中放的是已经封装好的公共插件 所以我们在此处自己定义一个插件
import axios from 'axios'
// 设置一个空对象，以此来给该对象添加一个方法
const HttpServer = {};
HttpServer.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 设置头部  除了登录页面其他才需要设置
  axios.interceptors.request.use(function(config){
    console.log("拦截器被触发---");
    if(config.url !== 'login'){
        const AUTH_TOKEN = localStorage.getItem("token");
        // 给当前请求设置请求头
        config.headers["Authorization"] = AUTH_TOKEN;
    }
    return config;
    
  },function(error){
      return Promise.reject(error);
  });
  
//   设置基本路径
  Vue.prototype.$http = axios
}
export default HttpServer;