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
    let onClick = instance.onClick;
    instance.onClick = (name, index) => {
      onClick(name, index);
      if (content.type === 'prompt') {
        const value = instance.promptValue;
        resolve({name, index, value});
      } else {
        resolve({name, index});
      }
    }
  });
};

let Alert = (text, options = {}) => {
  return Modal({
    text: text,
    title: options.title ? options.title : "提示",
    buttons: options.buttons ? options.buttons : [{text: "确定", name: 'ok',bold: true}]
  });
};

let Confirm = (text, options = {}) => {
  return Modal({
    text: text,
    title: options.title ? options.title : "提示",
    buttons: options.buttons ? options.buttons : [{text: "取消", name: 'cancel'}, {text: "确定", name: 'ok',bold: true}]
  })
};

let Prompt =  (text, options = {}) => {
  return Modal({
    text: text,
    type: 'prompt',
    title: options.title ? options.title : "提示",
    buttons: options.buttons ? options.buttons : [{text: "取消", name: 'cancel'}, {text: "确定", name: 'ok',bold: true}]
  })
};

export default {
  install (Vue, options={}) {
    globalConfig = options;
    Vue.prototype.$modal = Modal;
    Vue.prototype.$alert = Alert;
    Vue.prototype.$confirm = Confirm;
    Vue.prototype.$prompt = Prompt;
  }
};
