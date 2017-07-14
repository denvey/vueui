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
        this.$alert({
          text: "Hello",
          title: "Reui",
          buttons: [{text: "Ok", bold: true}]
        }).then((res) => {
          console.log(res);
        });
      }
    }
  }
</script>
