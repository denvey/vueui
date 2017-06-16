<template>
  <div class="page">
    <NavBar leftContent="hello">
      <div slot="left">返回</div>
      <span>你好</span>
      title
      <div slot="right" @click="test">right</div>
    </NavBar>
    <Button class="active">你好</Button>
    <Accordion>123</Accordion>
  </div>
</template>

<script>
import Button from '@/components/Button';
import Accordion from '@/components/Accordion';
import NavBar from '@/components/nav-bar';
export default {
  components: {
    Button,
    Accordion,
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

