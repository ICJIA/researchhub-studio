<template>
  <v-col class="mx-auto pa-0" cols="2">
    <v-radio-group v-model="selected" @change="updateContentType">
      <v-radio
        v-for="contentType in contentTypes"
        :key="contentType"
        class="text-capitalize"
        :label="contentType"
        :value="contentType"
      ></v-radio>
    </v-radio-group>
  </v-col>
</template>

<script>
export default {
  props: {
    contentTypes: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      selected: this.contentTypes[0]
    }
  },
  methods: {
    updateContentType() {
      this.$emit('update:contentType', this.selected)
    }
  }
}
</script>
