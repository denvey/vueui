import Vue from 'vue'
import Router from 'vue-router'
import navConf from '../nav.config.json'

Vue.use(Router)

let routes = []

Object.keys(navConf).forEach((header) => {
  routes = routes.concat(navConf[header])
})

let addComponent = (router) => {
  router.forEach((route) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = r => require.ensure([], () =>
          r(require(`../pages/${route.name}.vue`)))
        return
      }
      route.component = r => require.ensure([], () =>
        r(require(`../../docs/${route.name}.md`)))
    }
  })
}
addComponent(routes)

export default new Router({
  routes: routes /* [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/docs',
      name: 'docs',
      component: r => require.ensure([], () => r(require('../../docs/start.md')))
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
  ] */
})
