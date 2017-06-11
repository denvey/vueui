<template>
  <a href="#" class="button">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    props: {
      active: Boolean,
      className: String,
      size: String,
      disabled: Boolean,
      onClick: Function
    }
  }
</script>

<style lang="less">

</style>
