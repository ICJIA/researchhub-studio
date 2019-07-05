<template>
  <p class="greycolor">
    <slot></slot>
    <span v-if="update">(No change if not provided)</span>
  </p>
</template>

<script>
export default {
  props: {
    update: Boolean
  }
}
</script>
