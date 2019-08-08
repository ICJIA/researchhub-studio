<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="300px">
    <template v-slot:activator="{ on: onDialog }">
      <v-tooltip top>
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn class="mx-0 mt-3" flat icon v-on="onDialog">
            <v-icon v-on="onTooltip">zoom_in</v-icon>
          </v-btn>
        </template>
        <span class="font-lato">Use existing authors</span>
      </v-tooltip>
    </template>
    <v-card class="font-lato">
      <v-card-title>
        <h4>Select from existing authors</h4>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-checkbox
          v-model="authors"
          v-for="author in authorOptions"
          :key="author"
          :label="author"
          :value="author"
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
import { fetchItemsList as fetchAuthorsList } from '@/services/client.authors'

export default {
  data() {
    return {
      dialog: false,
      authorOptions: [],
      authors: []
    }
  },
  async created() {
    this.authorOptions = (await fetchAuthorsList()).data.sort()
  },
  methods: {
    closeDialog() {
      this.authors = []
      this.dialog = false
    },
    onUse() {
      if (this.authors.length)
        this.$emit(
          'useExistingAuthors',
          this.authors.map(el => `${el} | ${el} is ...`).join('\n')
        )
      this.closeDialog()
    }
  }
}
</script>
