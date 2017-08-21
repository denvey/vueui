import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '../pages/home'
import Accordion from '../pages/accordion'
import Button from '../pages/buttons'
import Calendar from '../pages/calendar'
import Modal from '../pages/modal.vue'
import LazyLoad from '../pages/lazy-load.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/button',
      name: 'Button',
      component: Button
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/lazyload',
      name: 'LazyLoad',
      component: LazyLoad
    },
    {
      path: '/accordion',
      name: 'Accordion',
      component: Accordion
    }
  ]
})
