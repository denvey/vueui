
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
      loading: '',
      container: options.container || null,
      direction: options.direction || 'vertical',
      threshold: options.threshold || '0px',
      timeout: options.timeout || 0,
      type: options.type,
      className: options.className || 'lazy',
      attr: options.attr || '',
      webp: options.webp || '',
      status: ['loading', 'loaded', 'error'],
      event: ['scroll', 'resize'],
      selector: options.selector || [],
      before (el) { // 图片加载之前，执行钩子函数
    
      },
      success (el) { // 图片加载成功，执行钩子函数
    
      },
      error (el) { // 图片加载失败，执行的钩子函数
    
      }
    };
    let rootMargin;
    if (this.options.direction == 'vertical') {
      rootMargin = `${this.options.threshold} 0px`;
    } else {
      rootMargin = `0px ${this.options.threshold}`;
    }
  
    console.log(rootMargin);
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
        console.log(item);
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
      this.io.observe(item);
    })
  }
  
  load (el) {
    let { options } = this;
    let eleType = el.nodeName.toLowerCase(),
      dataSrc = el.getAttribute('data-src'),
      type = options.type || 'background';
    if (!dataSrc) {
      return;
    }
    
    if (eleType === 'img' || eleType === 'video') {
      type = 'src';
    }
    options.before.call(this, el);
    if (type === 'src' || type === 'background') {
      let img = new Image();
      if (options.webp) {
      
      }
      img.src = dataSrc;
      img.addEventListener('load', () => {
        if (type === 'src') {
          el.setAttribute('src', dataSrc);
        } else {
          el.style.backgroundImage = dataSrc;
        }
        // el.classList.remove('lazy');
        this.io.unobserve(el);
        return options.success.call(this, el);
      }, false);
  
      img.addEventListener('error', () => {
        options.error.call(this, el);
      }, false)
    } else if (type === 'component') {
    
    }
  }
}
