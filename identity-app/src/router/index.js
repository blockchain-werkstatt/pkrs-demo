import Vue from 'vue'
import Router from 'vue-router'
import Personal from '@/components/personal/Personal'
import Search from '@/components/search/Search'
import CreateIdentity from '@/components/auth/createIdentity/CreateIdentity'
import Authentication from '@/components/auth/Authentication'
import GenerateProcess from '@/components/auth/createIdentity/GenerateProcess'
import Login from '@/components/auth/Login'
import ViewIdentity from '@/components/search/ViewIdentity'
import Verify from '@/components/search/Verify'
import Waiting from '@/components/search/Waiting'
import forgetSeed from '@/components/auth/forgetSeed'
import qnaRecovery from '@/components/auth/qnarecovery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/recoverseed',
      name: 'recoverSeed',
      component: forgetSeed
    },
    {
      path: '/qnaRecovery',
      name: 'qnaRecovery',
      component: qnaRecovery
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/create',
      name: 'CreateIdentity',
      component: CreateIdentity
    },
    {
      path: '/',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/generate',
      name: 'GenerateProcess',
      component: GenerateProcess
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/view',
      name: 'ViewIdentity',
      component: ViewIdentity
    },
    {
      path: '/verify',
      name: 'Verify',
      component: Verify
    },
    {
      path: '/waiting',
      name: 'Waiting',
      component: Waiting
    }
  ]
})
