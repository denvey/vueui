<template>
  <div id="app">
    <View>
      <router-view></router-view>
    </View>
  </div>
</template>

<script>
  import View from '@/components/view';
export default {
  name: 'app',
  components: {
    View
  }
}
</script>

<style>
  @import "../src/styles/intro.less";
</style>
