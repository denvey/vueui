/**
 * Created by denvey on 2017/8/16.
 */

class LazyLoad {
  /**
   * @param options
   */
  constructor(options) {
    this.options = {
      loading: '',
      container: options.container || window,
      callback: options.callback || function () {
      },
      threshold: options.threshold || 0,
      webp: options.webp || '',
      status: ['loading', 'loaded', 'error'],
      event: ['scroll', 'resize']
    };
  }
  
  isVisible (ele) {
    let visible = false,
      rect = ele.getBoundingClientRect(),
      parentRect = this.options.container == window ? {left: 0, top: 0} : this.options.container.getBoundingClientRect(),
      viewWidth = this.options.container == window ? window.innerWidth : this.options.container.clientWidth,
      viewHeight = this.options.container == window ? window.innerHeight : this.options.container.clientHeight;
    if (rect.bottom > this.options.threshold + parentRect.top && rect.top + this.options.threshold < viewHeight + parentRect.top && rect.right > this.threshold + parentRect.left && rect.left + this.threshold < viewWidth + parentRect.left) {
      visible = true
    }
    return visible
  }
  
  render () {
  
  }
}

export default {
  install(Vue, option = {}) {
    Vue.directive('lazy', {
    
    })
  }
}
