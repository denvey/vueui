<template>
  <div @click="test">alert</div>
</template>

<script>
  import Vue from 'vue';
  import { Alert }  from '@/components/modal';
  import Button from '@/components/button';
  Vue.use(Alert);
  export default {
    data() {
      return {

      }
    },
    components: {
      Button
    },
    methods: {
      test(data) {
        console.log(1);
        this.$alert({
          text: "Hello",
          title: "Reui",
          buttons: [{text: "Ok", bold: true}]
        });
      }
    }
  }
</script>
