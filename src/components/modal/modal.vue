<template>
  <transition name="modal">
    <div v-if="show" class="modal-wrapper">
      <div class="overlay"></div>
      <span v-if="closeIcon" class="close" >{{closeIcon}}</span>
      <div class="modal">
        <div class="modal-inner">
          <div class="modal-title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="modal-text">
            <slot>{{text}}</slot>
          </div>
          <div v-if="type == 'prompt'" class="input-field">
            <input type="text" class="modal-text-input" v-model="promptValue">
          </div>
        </div>
        <div class="modal-buttons modal-buttons-1">
          <slot name="footer">
            <span v-for="(item, index) in buttons" :class="['modal-button', {'modal-button-bold' : item.bold}]" @click="onClick(item.name, index)">{{item.text}}</span>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Overlay from '../overlay';
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      /* title: String,
      text: String,
      afterText: String,
      verticalButtons: Boolean,
      buttons: {
        type: Array,
        default: []
      }*/
    },
    data() {
      return {
        show: this.visible || false,
        title: '提示',
        text: '',
        type: '',
        afterText: '',
        verticalButtons: false,
        buttons: [{text: "确定", name: 'ok',bold: true}],
        closeIcon: '',
        promptValue: ''
      }
    },
    mounted() {
      console.log(this.visible);
    },
    components:  {
      Overlay
    },
    methods:  {
      onClick (name, index) {
        this.show = false;
        this.$emit('onClick',{name, index})
      },
      open () {
        console.log(this.show);
        this.show = true;
      }
    }
  }
</script>

<style lang="less">
  @import "./modal.less";
</style>
