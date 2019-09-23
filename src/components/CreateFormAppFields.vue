<template>
  <v-row>
    <v-col class="px-4" cols="10" sm="8" lg="4">
      <v-text-field v-model="item.url" label="URL" :rules="[rules.required]" />
    </v-col>

    <v-col class="px-4 pt-4" cols="10">
      <slot name="image"></slot>
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.description"
        auto-grow
        label="Description"
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  model: {
    prop: 'item',
    event: 'change'
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    }
  }
}
</script>
