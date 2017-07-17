<template>
  <div>
    <Button @click.native="demoAlert">Alert</Button>
    <Button @click.native="demoConfirm">Confirm</Button>
    <Button @click.native="demoPrompt">Prompt</Button>
    <Button @click.native="demoModal">Modal</Button>
    <Modal ref="modal" :visible="visible" @onClick="demoModal">你好 <input /></Modal>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Modals, Modal }  from '@/components/modal';
  import Button from '@/components/button';
  Vue.use(Modals);
  export default {
    data() {
      return {
        visible: false
      }
    },
    components: {
      Button,
      Modal
    },
    methods: {
      async demoAlert() {
        await this.$alert('你好').then((res) => {
          this.$alert('test1').then(() => {
            this.$alert('test11');
          });
        });
        console.log('alert');
      },
      async demoConfirm() {
        await this.$confirm('你好').then((res) => {
          console.log(res);
        });
        console.log('confirm');
      },
      async demoPrompt() {
        await this.$prompt('你好').then((res) => {
          console.log(res);
        });
        console.log('prompt');
      },
      demoModal(data) {
        this.$refs.modal.open();
//        this.visible = true;
//        this.$alert();
      }
    }
  }
</script>
