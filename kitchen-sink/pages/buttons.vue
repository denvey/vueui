<template>
  <div class="page">
    <NavBar leftContent="hello">
      <template slot="left" @click="test">
        <i class="icon icon-back"></i>
        <span>返回</span>
      </template>
      <span>你好</span>
      title
      <div slot="right" @click="test">right</div>
    </NavBar>
    <Button class="active">你好</Button>
    <Accordion>123</Accordion>
  </div>
</template>

<script>
import Button from '@/components/button';
import NavBar from '@/components/nav-bar';
export default {
  components: {
    Button,
    NavBar
  },
  methods: {
    test: function () {
      console.log(1);
    }
  }
}
</script>

<style>

</style>

