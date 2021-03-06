import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  next()
  // determine whether the user has logged in
  const hasToken = sessionStorage.getItem('uid')
//   if (!hasToken) {
//     if(to.path.indexOf('login') === -1){
//         //本地
//         window.location.href= `${window.location.protocol}//${window.location.host}/#/login`
//         //线上
//         // window.location.href= `http://mob.hexntc.com/bydbackend/index.html#/login`
//     }else{
//         next()
//     }
//   }else{
//     next()
//   }
  
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
