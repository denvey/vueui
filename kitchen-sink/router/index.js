import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '../pages/home'
import Accordion from '../pages/accordion'
import Button from '../pages/buttons'
import Calendar from '../pages/calendar'

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
      path: '/accordion',
      name: 'Accordion',
      component: Accordion
    }
  ]
})
