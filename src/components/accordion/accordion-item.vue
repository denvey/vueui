<template>
  <div :class="['accordion-item',{expanded: expanded}]">
    <div class="accordion-item-header" @click="clickShow">
      <slot name="header">{{header}}</slot>
    </div>
    <transition name="fade"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterActive"


                v-on:leave="leave"
                v-on:after-leave="afterLeave"
                >
      <div v-show="expanded" ref="accordion" class="accordion-item-content">
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
        expanded: false,
        height: 0
      }
    },
    methods: {
      clickShow: function () {

        this.expanded = !this.expanded;
        /*if (this.expanded) {
          this.height = this.$refs.accordion.scrollHeight;
        } else {
          this.height = 0;
        }*/
      },
      beforeEnter: function (el) {
        el.style.height = 0;
      },
      enter: function(el, done) {
        el.style.height = el.scrollHeight + 'px';
        done()
      },
      afterActive: function(el) {
//        el.style.height = 'auto'
      },
      beforeLeave: function (el) {
        el.style.height = el.scrollHeight + 'px';
      },
      leave: function(el, done) {
        el.style.height = 0;
        done()
      },
      afterLeave: function(el) {
//        el.style.height = 0;
      }
    }
  }
</script>

<style lang="less">
  @import "./accordion-item";
</style>
