<template>
  <v-dialog v-model="dialog" width="500" :disabled="!btnCondition">
    <v-btn outline slot="activator" :color="btnType" :disabled="!btnCondition">
      <template>{{ btnName }}</template>
    </v-btn>

    <v-card>
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>

      <v-card-text>
        <slot name="main"></slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">back</v-btn>
        <v-btn :color="btnType" flat @click="onClick">{{ btnName }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    btnName: String,
    btnType: String,
    btnCondition: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    onClick() {
      this.$emit('base-event')
      this.dialog = false
    }
  }
}
</script>

<style></style>
