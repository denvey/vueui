/**
 * Created by denvey on 2017/8/16.
 */
import LazyLoad from './lazy-load';

const vueLazyLoad = {
  install(Vue, options) {
    Vue.component(LazyLoad.name, LazyLoad)
  },
  component: LazyLoad
};
/*
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueLazyLoad)
}*/

export default vueLazyLoad;
