<template>
  <transition>
    <div v-show="_active" class="modal modal-in" style="display: block; margin-top: -62px;">
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
  </transition>
</template>

<script>
  export default {
    props: {
      active: {
        type: Boolean,
        default: false
      },
      title: String,
      text: String,
      afterText: String,
      verticalButtons: Boolean,
      buttons: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        _active: this.active
      }
    },
    methods:  {

    }
  }
</script>

<style lang="less">
  @import "./modal.less";
</style>
