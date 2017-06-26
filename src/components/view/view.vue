<template>
  <div class="views">
    <div class="view">
      <div class="pages">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{},
    data() {
      return {}
    }
  }
</script>

<style lang="less">
  @import "./view.less";
</style>
