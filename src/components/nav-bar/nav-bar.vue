<template>
  <div class="navbar">
    <div class="navbar-inner navbar-on-center">
      <div class="left sliding" >
        <a @click="onClickLeft" class="back link">
          <slot name="left">
            <i class="icon icon-back"></i>
            <span>{{leftContent}}</span>
          </slot>
        </a>
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
      onLeftClick: Function
    },
    methods: {
      onClickLeft: function () {
        console.log(11);
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
