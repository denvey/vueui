<template>
  <div class="accordion-item">
    <div class="accordion-item-header">
      <slot name="header">{{header}}</slot>
    </div>
    <div class="accordion-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>
