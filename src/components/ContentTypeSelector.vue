<template>
  <v-col class="mx-auto pa-0" cols="2">
    <v-radio-group v-model="selected" @change="updateContentType">
      <v-radio
        class="text-capitalize"
        v-for="contentType in contentTypes"
        :key="contentType"
        :label="contentType"
        :value="contentType"
      ></v-radio>
    </v-radio-group>
  </v-col>
</template>

<script>
export default {
  props: {
    contentTypes: Array
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
