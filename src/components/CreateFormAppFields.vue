<template>
  <v-layout row wrap>
    <v-flex class="px-3" xs12 md6 lg4>
      <v-text-field v-model="item.url" label="URL" :rules="[rules.required]" />
    </v-flex>

    <v-flex class="px-3 pt-3" xs12>
      <slot name="image"></slot>
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.description"
        label="Description"
        auto-grow
        :rules="[rules.required]"
      />
    </v-flex>
  </v-layout>
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
  },
  data() {
    return {
      description: null,
      url: null
    }
  }
}
</script>
