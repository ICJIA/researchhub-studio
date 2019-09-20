<template>
  <div>
    <BaseViewTitle page="Error" />

    <div class="error-page">
      <v-icon x-large color="error">{{
        $options.static.mdiCloseCircle
      }}</v-icon>
      <h1 class="pb-4">Sorry, something went wrong</h1>

      <p>Try refreshing the page or please check back later.</p>
    </div>
  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js'
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  components: {
    BaseViewTitle
  },
  static: {
    mdiCloseCircle
  }
}
</script>
