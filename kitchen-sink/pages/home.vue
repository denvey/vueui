<template>
  <Page>
    <NavBar>首页</NavBar>
    <div class="page-content">
      <ul>
        <li><router-link to="/accordion">Accordion</router-link></li>
      </ul>
    </div>
  </Page>
</template>

<script>

import Page from '@/components/page';
import NavBar from '@/components/nav-bar';
export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    Page,
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
