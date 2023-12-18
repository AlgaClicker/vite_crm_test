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
import DocumentsPage from '@/pages/DocumentsPage.vue'
import layoutReport from '@/pages/reports/layoutReport.vue'
import indexReport from '@/pages/reports/indexReport.vue'
import activeAccountReport from '@/pages/reports/activeAccountReport.vue'
import PartnerPage from '@/pages/PartnerPage.vue'
import AccountsPage from '@/pages/AccountsPage.vue'


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
        redirect: {name: 'cms_index'}, 
        children: [
          {
            path: "",
            name: "cms_index",
            component: CmsindexPage
          },
          {
            path: "partners",
            name: "cms_partners",
            component: PartnerPage
          },
          {
            path: "accounts",
            name: "cms_accounts",
            component: AccountsPage
          },
          {
            path: "object",
            name: "cms_objects",
            component: ObjectPageIndex,
          },
          {
            path: "object",
            name: "cms_object",
            
            component: ObjectPage,
            children: [
              {
                path: '/',
                name: "objectIndex",
                component:ObjectPageIndex
              },
              {
                path:":id",
                name: "objectIndex",
                component:SpecificationPage
              },

            ]
          },
          {
            path: "document",
            name: "cms_documents",
            component: DocumentsPage
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
            redirect: {name: 'cms_buh_invoice'}, 
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
          {
            path: "reports",
            name: "cms_reports",
            component: layoutReport,
            redirect: {name: 'cms_reports_idx'}, 
            children: [
              {
                path: "index",
                name: "cms_reports_idx",
                component: indexReport
              },
              {
                path: "active/accounts",
                name: "cms_reports_active_accounts",
                component: activeAccountReport
              }
            ]
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