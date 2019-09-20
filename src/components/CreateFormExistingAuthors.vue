<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="300px">
    <template #activator="{ on: onDialog }">
      <v-tooltip top>
        <template #activator="{ on: onTooltip }">
          <v-btn class="mx-0 mt-4" text icon v-on="onDialog">
            <v-icon v-on="onTooltip">{{
              $options.static.mdiMagnifyPlusOutline
            }}</v-icon>
          </v-btn>
        </template>
        <span class="font-lato">Use existing authors</span>
      </v-tooltip>
    </template>
    <v-card class="font-lato">
      <div class="py-4 text-center large">Select from existing authors</div>
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
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Back</v-btn>
        <v-btn color="primary" text @click="onUse">Use</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiMagnifyPlusOutline } from '@mdi/js'
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
  },
  static: {
    mdiMagnifyPlusOutline
  }
}
</script>
