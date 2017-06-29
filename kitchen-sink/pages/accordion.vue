<template>
  <Accordion>
    <AccordionItem header="hello">
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
    </AccordionItem>
    <AccordionItem>
      <div slot="header">
        slot-header
      </div>
      content
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
    }
  }
</script>
