
import 'intersection-observer';

/**
 * lazy load
 */
export default class LazyLoad {
  /**
   * @param options
   */
  constructor(options = {}) {
    this.options = {
      loading: '' || 'http://temp.im/300x300/4CD964/fff',
      container: options.container || null,
      direction: options.direction || 'vertical',
      threshold: options.threshold || '0px',
      timeout: options.timeout || 0,
      type: options.type,
      className: options.className || 'lazy',
      attr: options.attr || 'data-src',
      isWebp: options.isWebp || '',
      status: ['loading', 'loaded', 'error'],
      selector: options.selector || [],
      before: options.before || function() {}, // 图片加载之前，执行钩子函数
      success: options.success || function() {}, // 图片加载成功，执行钩子函数
      error: options.error || function() {}, // 图片加载失败，执行的钩子函数
    };
    let rootMargin;
    if (this.options.direction == 'vertical') {
      rootMargin = `${this.options.threshold} 0px`;
    } else {
      rootMargin = `0px ${this.options.threshold}`;
    }
    
    if (this.options.isWebp === '') {
      this.webp().then((res) => {
        this.options.isWebp = res;
      });
    }
    
    this.on(rootMargin);
  }
  
  isVisible (el) {
    const { options } = this;
    let visible = false,
      rect = el.getBoundingClientRect(),
      parentRect = options.container == window ? {left: 0, top: 0} : options.container.getBoundingClientRect(),
      viewWidth = options.container == window ? window.innerWidth : options.container.clientWidth,
      viewHeight = options.container == window ? window.innerHeight : options.container.clientHeight;
    if (rect.bottom > options.threshold + parentRect.top
      && rect.top + options.threshold < viewHeight + parentRect.top
      && rect.right > options.threshold + parentRect.left
      && rect.left + options.threshold < viewWidth + parentRect.left) {
      visible = true;
    }
    return visible;
  }
  
  on (rootMargin) {
    this.io = new IntersectionObserver((selector) => {
      selector.forEach((item) => {
        const intersectionRatio = item.intersectionRatio;
        if(intersectionRatio > 0 && intersectionRatio <= 1) {
          this.load(item.target);
        }
      })
    }, {
      rootMargin,
      root: this.options.container,
      threshold: [ 0, Number.MIN_VALUE, 0.01]
    });
    this.render();
  }
  
  off () {
  
  }
  
  refresh () {
    document.querySelectorAll('.' + this.options.className).forEach((item) => {
      item.setAttribute('data-load-status', '');
    });
  }
  
  webp () {
    return new Promise(function(resolve, reject) {
      const WebP = new Image();
      WebP.onload = WebP.onerror = function () {
        if (WebP.height === 2) {
          resolve(true);
        } else {
          reject(false);
        }
      };
      WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
  
  render () {
    this.options.selector = document.querySelectorAll('.' + this.options.className);
    this.options.selector.forEach((item) => {
      if (item.dataset.loadStatus !== this.options.status[1]) {
        this.io.observe(item);
        const type = this.getType(item);
        if (type === 'src') {
          if (!item.src) {
            item.setAttribute('src', this.options.loading);
          }
        } else if (type === 'background') {
          if (!item.style.backgroundImage) {
            item.style.backgroundImage = `url(${this.options.loading})`;
          }
        }
      }
    })
  }
  
  /**
   * 获取 dom 类型
   * @param el
   * @returns {string}
   */
  getType(el) {
    let { options } = this;
    let eleType = el.nodeName.toLowerCase(),
      type = options.type || 'background';
    if (eleType === 'img' || eleType === 'video') {
      type = 'src';
    }
    return type;
  };
  
  load (el) {
    const { options } = this;
    const type = this.getType(el);
    el.dataset.loadStatus = options.status[0];
    
    if (type === 'src' || type === 'background') {
      
      let dataSrc = el.getAttribute(options.attr);
      if (!dataSrc) {
        return;
      }
  
      const retDataSrc = options.before.call(this, {el, dataSrc, isWebp: options.isWebp});
      if (retDataSrc) {
        dataSrc = retDataSrc;
      }
      let img = new Image();
      img.src = dataSrc;
      img.addEventListener('load', () => {
        if (type === 'src') {
          el.setAttribute('src', dataSrc);
        } else {
          el.style.backgroundImage = `url(${dataSrc})`;
        }
        el.dataset.loadStatus = options.status[1];
        this.io.unobserve(el);
        return options.success.call(this, el);
      }, false);
  
      img.addEventListener('error', () => {
        el.dataset.loadStatus = options.status[2];
        options.error.call(this, el);
      }, false)
    } else if (type === 'component') {
      options.before.call(this, el);
      options.success.call(this, el);
    }
  }
}
