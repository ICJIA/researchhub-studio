<template>
  <v-dialog v-model="dialog" width="500" :disabled="!btnCondition">
    <template #activator="{ on }">
      <v-btn
        outlined
        class="mx-2"
        :color="btnType"
        :disabled="!btnCondition"
        v-on="on"
      >
        <template>{{ btnName }}</template>
      </v-btn>
    </template>

    <v-card class="font-lato">
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>

      <v-card-text style="font-size: 1em;">
        <slot name="main"></slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">back</v-btn>
        <v-btn :color="btnType" text @click="onClick">{{ btnName }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      default: ''
    },
    btnType: {
      type: String,
      default: ''
    },
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
