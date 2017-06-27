<template>
    <vui-view>
      <router-view></router-view>
    </vui-view>
</template>

<script>
  import View from '@/components/view';
export default {
  name: 'app',
  components: {
    "vui-view": View
  }
}
</script>

<style>
  @import "../src/styles/intro.less";
</style>
