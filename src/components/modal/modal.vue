<template>
  <transition>
    <div v-show="_show" class="modal-wrapper">
      <div class="modal modal-in">
        <div class="modal-inner">
          <div class="modal-title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="modal-text">
            <slot>{{text}}</slot>
          </div>
        </div>
        <div class="modal-buttons modal-buttons-1">
          <span class="modal-button modal-button-bold">OK</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    /*props: {
      show: {
        type: Boolean,
        default: true
      },
      title: String,
      text: String,
      afterText: String,
      verticalButtons: Boolean,
      buttons: {
        type: Array,
        default: []
      }
    },*/
    data() {
      return {
        show: false,
        title: '提示',
        text: '',
        afterText: '',
        verticalButtons: false,
        buttons: []
      }
    },
    mounted() {
      console.log(this.show);
    },
    methods:  {

    }
  }
</script>

<style lang="less">
  @import "./modal.less";
</style>
