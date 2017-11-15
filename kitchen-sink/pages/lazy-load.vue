<template>
  <div class="page">
    <NavBar leftContent="hello">
      <template slot="left" @click="test">
        <i class="icon icon-back"></i>
        <span>返回</span>
      </template>
      <span>LazyLoad</span>
      <div slot="right" @click="test">right</div>
    </NavBar>
    <div class="page-content">
      <ul class="lazy-load">
        <li ><img class="lazy" data-src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1724337809,3334736965&fm=26&gp=0.jpg" alt=""></li>
        <li ><img class="lazy" data-src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=662156188,367416869&fm=26&gp=0.jpg" alt=""></li>
        <li ><img class="lazy" data-src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=499210839,609795368&fm=26&gp=0.jpg" alt=""></li>
        <li ><img class="lazy" data-src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1072993694,4090632546&fm=26&gp=0.jpg" alt=""></li>
        <li ><img class="lazy" data-src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2310884729,3185776489&fm=26&gp=0.jpg" alt=""></li>
        <li class="lazy" data-src="http://lzxb.name/lazy-load-img/examples/images/61.jpg"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
import LazyLoad from '@/components/lazy-load'
import Vue from 'vue';
// Vue.use(LazyLoad);
export default {
  components: {
    NavBar
  },
  mounted: function () {
    let lazyLoad = new LazyLoad({
      threshold: '100px',
      before: (el) => {
        return el.dataSrc + '.webp';
      }
    });

    /*new LazyLoad({
      className: "lazy1",
      type: "component",
      before: (el) => {
      }
    })*/
  },
  methods: {
    test: function () {
      console.log(1);
    }
  }
}
</script>

<style lang="less">
  .pages,.page,.page-content {
    height: 100%;
  }
.page-content {
  overflow: auto;
}
.lazy1 {
  height: 100px;
}
  .lazy-load {
    li {
      height: 300px;
    }
  }
</style>

