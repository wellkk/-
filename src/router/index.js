import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import GoodsList from '@/components/goodslist.vue'
import GoodsAdd from '@/components/goodsadd.vue'

import { Message } from 'element-ui';
Vue.use(Router)
const router = new Router({
  routes: [
   {
      name: 'home',
      path: '/',
      component: Home,
      children:[{
          name: 'users',
          path: '/users',
          component: Users
      },
      {
        name: 'rights',
        path: '/rights',
        component: Rights
      },
      {
        name: 'roles',
        path: '/roles',
        component: Roles
      },
     
      {
        name: 'goodsadd',
        path: '/goodsadd',
        component: GoodsAdd
      }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'goods',
      path: '/goods',
      component: GoodsList
    }
    
  ]
})
router.beforeEach((to,from,next) => {
  console.log('守卫开始执行');
  if(to.name === 'login'){
    next();
  }else{
        const token = localStorage.getItem("token");
    if(!token){
      Message.success('请先登录')
      router.push({
        name:'login'
      })
      return;
    }
    next()
  }
  
})
export default router 
