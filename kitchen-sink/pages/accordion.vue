<template>
  <Accordion active="1" accordion :onChange="test" @click="test">
    <AccordionItem  data-id="a" name="1">
      <div slot="header">你好</div>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
    </AccordionItem>
    <AccordionItem header="hello1" data-id="b">
      <p>content</p>
      <p>content</p>
      <p>content</p>
    </AccordionItem>
  </Accordion>
</template>

<script>
  import { Accordion, AccordionItem }  from '@/components/accordion';
  export default {
    data() {
      return {

      }
    },
    components: {
      Accordion,
      AccordionItem
    },
    methods: {
      test(data) {
        console.log(data);
      }
    }
  }
</script>
