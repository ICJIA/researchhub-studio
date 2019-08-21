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
        label="Description"
        auto-grow
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: Object,
    rules: Object
  },
  model: {
    prop: 'item',
    event: 'change'
  }
}
</script>
