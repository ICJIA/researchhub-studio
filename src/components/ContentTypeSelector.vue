<template>
  <v-layout justify-center>
    <v-flex xs2>
      <v-radio-group v-model="selected" @change="updateContentType">
        <v-radio
          class="capitalize"
          v-for="contentType in contentTypes"
          :key="contentType"
          :label="contentType"
          :value="contentType"
        ></v-radio>
      </v-radio-group>
    </v-flex>
  </v-layout>
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
