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
      container: options.container || window,
      threshold: options.threshold || 0,
      type: options.type,
      className: options.className || '.lazy',
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
  
    this.render();
    this.on();
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
  
  on () {
    this.options.event.forEach((eventType) => {
      this.options.container.addEventListener(eventType, this.render, false);
    });
  }
  
  off () {
  
  }
  
  refresh () {
  
  }
  
  render () {
    this.options.selector = document.querySelectorAll(this.options.className);
    this.options.selector.forEach((item) => {
      this.load(item);
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
    
    if (!this.isVisible(el)) {
      return;
    }
    
    if (eleType === 'img' || eleType === 'video') {
      type = 'src';
    }
    options.before.call(this, el);
    if (type === 'src' || type === 'background') {
      let img = new Image();
      img.src = dataSrc;
      img.addEventListener('load', () => {
        if (type === 'src') {
          el.setAttribute('src', dataSrc);
        } else {
          el.style.backgroundImage = dataSrc;
        }
        return options.success.call(this, el);
      }, false);
  
      img.addEventListener('error', () => {
        options.error.call(this, el);
      }, false)
    } else if (type === 'component') {
    
    }
  }
}
