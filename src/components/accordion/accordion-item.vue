<template>
  <div :class="['accordion-item',{expanded: expanded}]">
    <div class="accordion-item-header" @click="onExpand">
      <slot name="header">{{header}}</slot>
    </div>
    <transition
      v-on:appear="appear"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"

      v-on:leave="leave">
      <div v-show="expanded" class="accordion-item-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      header: String,
      index: [String, Number],
      expanded: Boolean
    },
    data() {
      return {
        height: 0
      }
    },
    mounted() {
    },
    methods: {
      onExpand: function () {
//        this.expanded = !this.expanded;
        this.$emit('onClick', this.index)
      },
      appear: function (el) {
        setTimeout(function () {
          el.style.height = el.scrollHeight + 'px';
        }, 100);

      },
      beforeEnter: function (el) {
        el.style.height = 0;
      },
      enter: function (el) {
        el.style.height = el.scrollHeight + 'px';
      },
      leave: function (el) {
        el.style.height = 0;
      }
    }
  }
</script>

<style lang="less">
  @import "./accordion-item";
</style>
