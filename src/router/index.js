import Vue from 'vue'
import Router from 'vue-router'
import { researchlist } from "@/api/topicGroupManage";


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
let constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/print',
    component: () => import('@/views/print/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/byd',
    children: [{
      path: 'byd',
      name: 'byd',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '多果多贝' ,icon: 'dg'}
    }]
  },
  {
    path: '/accountManage',
    component: Layout,
    redirect: '/account',
    name: 'account',
    meta: { title: '账号管理' },
    children: [
      {
        path: 'accountManage',
        name: 'accountManage',
        component: () => import('@/views/powerManage/account/index'),
        meta: { title: '账号管理' ,icon: 'zh'}
      }
    ]
  },
  {
    path: '/customerManage',
    component: Layout,
    redirect: '/customer',
    name: 'customer',
    meta: { title: '会员管理' },
    children: [
      {
        path: 'customerManage',
        name: 'customerManage',
        component: () => import('@/views/powerManage/customer/index'),
        meta: { title: '会员管理' ,icon: 'kh' }
      }
    ]
  },
  {
    path: '/rechargeRecordManage',
    component: Layout,
    redirect: '/rechargeRecord',
    name: '/rechargeRecord',
    meta: { title: '充值记录' },
    children: [
      {
        path: 'rechargeRecordManage',
        name: 'rechargeRecordManage',
        component: () => import('@/views/powerManage/rechargeRecord/index'),
        meta: { title: '充值记录' ,icon: 'cz2' }
      }
    ]
  },
  {
    path: '/consumeRecord',
    component: Layout,
    redirect: '/consumeRecord',
    name: '/consumeRecord',
    meta: { title: '消费记录' },
    children: [
      {
        path: 'consumeRecord',
        name: 'consumeRecord',
        component: () => import('@/views/powerManage/consumeRecord/index'),
        meta: { title: '消费记录' ,icon: 'xf' }
      }
    ]
  },
  
  {
    path: '/productTypeManage',
    component: Layout,
    redirect: '/productType',
    name: '/productType',
    meta: { title: '产品分类管理' },
    children: [
      {
        path: 'productTypeManage',
        name: 'productTypeManage',
        component: () => import('@/views/productTypeManage/index'),
        meta: { title: '产品分类管理' ,icon: 'yy' }
      }
    ]
  },
  {
    path: '/productManage',
    component: Layout,
    redirect: '/product',
    name: '/product',
    meta: { title: '产品管理' },
    children: [
      {
        path: 'productManage',
        name: 'productManage',
        component: () => import('@/views/productManage/index'),
        meta: { title: '产品管理' ,icon: 'yy' }
      }
    ]
  },
  {
    path: '/consumeCheck',
    component: Layout,
    redirect: '/consumeCheck',
    name: '/consumeCheck',
    meta: { title: '快捷收银' },
    children: [
      {
        path: 'consumeCheck',
        name: 'consumeCheck',
        component: () => import('@/views/consumeCheck/index'),
        meta: { title: '快捷收银' ,icon: 'sy' }
      }
    ]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
    const createRouter = () => new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes 
      })
      const router = createRouter()
export default router
