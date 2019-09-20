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
        <span class="font-lato">Use existing tags</span>
      </v-tooltip>
    </template>
    <v-card class="font-lato">
      <div class="py-4 text-center large">Select from existing tags</div>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-checkbox
          v-for="tag in tagOptions"
          :key="tag"
          v-model="tags"
          hide-details
          :label="tag"
          :value="tag"
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
  },
  static: {
    mdiMagnifyPlusOutline
  }
}
</script>
