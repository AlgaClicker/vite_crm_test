import { createRouter, createWebHashHistory  } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CmsLayout from '@/pages/CmsLayout.vue'
import ObjectPage from '@/pages/ObjectPage.vue'
import ObjectPageIndex from '@/pages/ObjectPageIndex.vue'
import ChatPage from '@/pages/ChatPage.vue'
import CmsindexPage from '@/pages/CmsindexPage.vue'
import SpecificationPage from '@/pages/SpecificationPage.vue'
import tabelPage from '@/pages/tabelPage.vue'
import BrigadePage from '@/pages/BrigadePage.vue'
import BuhLayoutPage from '@/pages/BuhLayoutPage.vue'
import InvoicePage from '@/pages/buh/InvoicePage.vue'
import kadryLayoutPage from '@/pages/kadry/kadryLayoutPage.vue'
import kadryPayBrigade from '@/pages/kadry/kadryPayBrigade.vue'

import store from "@/store";

const routes = [
    {
      path: '/',
      name: 'Home',
      component: IndexPage,
      meta: { 
        requiresAuth: true
      },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { 
          requiresAuth: false
        },
    },
    {
        path: '/cms',
        name: 'CMS',
        component: CmsLayout,
        meta: { 
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "cms_index",
            component: CmsindexPage
          },
          {
            path: "object",
            name: "cms_objects",
            component: ObjectPageIndex,
          },
          {
            path: "object/:id/",
            name: "cms_object",
            component: ObjectPage,
            children: [
              {
                path: '',
                name: "objectIndex",
                component:ObjectPageIndex
              },
              {
                path:"spec",
                name: "objectIndex",
                component:SpecificationPage
              },

            ]
          },
          {
            path: "tabel",
            name: "cms_tabel",
            component: tabelPage,
          },
          {
            path: "brigade",
            name: "cms_brigade",
            component: BrigadePage,
            meta: { 
              requiresAuth: true,
            },
          },
          {
            path: "kadry",
            name: "cms_kadry",
            component: kadryLayoutPage,
            meta: { 
              requiresAuth: true,
            },
            children: [
              {
                path: "payments/brigade",
                name: "cms_kadry_payments_b",
                component: kadryPayBrigade,
              }
            ]

          },
          {
            path: "buh",
            name: "cms_buh",
            BuhLayoutPage,
            meta: { 
              requiresAuth: true,
            },
            children: [
              {
                path: 'invoice',
                name: "cms_buh_invoice",
                component: InvoicePage
              }
            ]
          },           
          {
            path: "chat",
            name: "cms_chat",
            component: ChatPage
          },

        ]
    },
  

]

const router = new createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes
})


router.beforeEach(async (to, from, next) => {
    console.log("router.beforeEach  Next()")
    
    if (to.name == 'Login' && store.getters.isAuthenticated  && to.meta.requiresAuth) {
      return next('/cms')
    } 
    

    if (!to.meta.requiresAuth) {
        next()
        return
    } 
    await store.dispatch('getMe')

    if (store.getters.isAuthenticated && to.meta.requiresAuth) {
      next()
    } else {
      store.dispatch('logout')
        next('/login')
    }
})

export default router  