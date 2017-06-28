<template>
  <div class="accordion-item">
    <div class="accordion-item-header" @click="clickShow">
      <slot name="header">{{header}}</slot>
    </div>
    <transition name="fade">
      <div v-show="show" class="accordion-item-content" :style="{height: getHeight()}">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      header: String
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      clickShow: function () {

        this.show = !this.show;
      },
      getHeight: function () {
        console.log(this);
      }
    }
  }
</script>

<style lang="less">
  @import "./accordion-item";
</style>
