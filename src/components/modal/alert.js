/**
 * Created by denvey on 2017/7/10.
 */
import Vue from 'vue';
import ModalComponent from './modal.vue';

let instance;

let globalConfig = {};

let ModalConstructor = Vue.extend(ModalComponent);

let initInstance = ()=>{
  instance = new ModalConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

let Modal = (content, options = {}) => {
  initInstance();
  
  options.content = content;
  
  return new Promise((resolve, reject)=>{
    instance.show = true;
  
    Object.assign(instance.$data, globalConfig);
    Object.assign(instance.$data, options.content);
    let success = instance.success;
    
    instance.success = () => {
      success();
      resolve('ok');
    }
  });
};

export default {
  install (Vue, options={}) {
    globalConfig = options;
    Vue.prototype.$alert = Modal;
  }
};
