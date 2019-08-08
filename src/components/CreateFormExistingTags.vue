<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="300px">
    <template v-slot:activator="{ on: onDialog }">
      <v-tooltip top>
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn class="mx-0 mt-3" flat icon v-on="onDialog">
            <v-icon v-on="onTooltip">zoom_in</v-icon>
          </v-btn>
        </template>
        <span class="font-lato">Use existing tags</span>
      </v-tooltip>
    </template>
    <v-card class="font-lato">
      <v-card-title>
        <h4>Select from existing tags</h4>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-checkbox
          v-model="tags"
          v-for="tag in tagOptions"
          :key="tag"
          :label="tag"
          :value="tag"
          hide-details
        >
        </v-checkbox>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat @click="closeDialog">Back</v-btn>
        <v-btn color="primary" flat @click="onUse">Use</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { fetchItemsList as fetchTagsList } from '@/services/client.tags'

export default {
  data() {
    return {
      dialog: false,
      tagOptions: [],
      tags: []
    }
  },
  async created() {
    this.tagOptions = (await fetchTagsList()).data.sort()
  },
  methods: {
    closeDialog() {
      this.tags = []
      this.dialog = false
    },
    onUse() {
      this.$emit('useExistingTags', this.tags.join(', '))
      this.closeDialog()
    }
  }
}
</script>
