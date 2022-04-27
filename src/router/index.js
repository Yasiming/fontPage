import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/container/Home'
import Particles from '@/views/container/Log/Entry/Particles'
import Login from '@/views/container/Log/Login'
import Register from '@/views/container/Log/Register'

import First from '@/views/container/Home/component/Center/List/Item/First'
import Second from '@/views/container/Home/component/Center/List/Item/Second'
import Third from '@/views/container/Home/component/Center/List/Item/Third'
import Fourth from '@/views/container/Home/component/Center/List/Item/Fourth'

import PersonalCenter from '@/views/container/PersonalCenter/Entry/PersonalCenter'

import SuperUser from '@/views/container/SuperUser/Entry'

import { CHECKTOKEN, getCache } from '@/config/store2'
import Search from '@/views/container/Home/component/Search/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/page1',
    children: [
      { path: 'page1', component: First },
      { path: 'page2', component: Second },
      { path: 'page3', component: Third },
      { path: 'page4', component: Fourth }
    ]
  },
  {
    path: '/user',
    component: Particles,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'reg',
        component: Register
      }
    ]
  },
  { path: '/superUser', component: SuperUser },
  {
    path: '/PersonalCenter',
    component: PersonalCenter,
    redirect: '/PersonalCenter/myInfomation',
    children: [
      {
        path: 'myInfomation',
        component: () =>
          import(
            '../views/container/PersonalCenter/component/MyInfomation/MyInfomation'
          )
      },
      {
        path: 'uploadFile',
        component: () =>
          import(
            '../views/container/PersonalCenter/component/UploadFile/UploadFile'
          )
      },
      {
        path: 'myFiles',
        component: () =>
          import('../views/container/PersonalCenter/component/MyFiles/MyFiles')
      },
      {
        path: 'editPassword',
        component: () =>
          import(
            '../views/container/PersonalCenter/component/EditPassword/EditPassword'
          )
      },
      {
        path: 'safeExit',
        component: () =>
          import(
            '../views/container/PersonalCenter/component/SafeExit/SafeExit'
          )
      }
    ]
  },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

router.beforeEach(async (to, form, next) => {
  const { token } = getCache(CHECKTOKEN)
  if (to.path === '/user/login' || to.path === '/user/reg') {
    if (to.path === '/user/login') {
      if (!token) {
        return next()
      }
      return next('/PersonalCenter')
    }
    return next()
  }
  if (to.path.includes('/page')) {
    return next()
  }
  if (!token) return next('/user/login')

  next()
})

export default router
