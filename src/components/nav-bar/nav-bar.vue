<template>
  <div class="navbar">
    <div class="navbar-inner navbar-on-center">
      <div class="left sliding" >
        <a v-if="leftContent" @click="onClickLeft" class="back link">
          <i class="icon icon-back"></i>
          <span>{{leftContent}}</span>
        </a>
        <slot v-else name="left"></slot>
      </div>
      <div class="center sliding"><slot></slot></div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      leftContent: String,
      rightContent: String,
      onLeftClick: Function,
    },
    methods: {
      onClickLeft: function () {
        if (this.onLeftClick) {
          this.onLeftClick();
        }
      }
    }
  }
</script>

<style lang="less">
@import "./nav-bar.less";
</style>
