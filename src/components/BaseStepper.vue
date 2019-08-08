<template>
  <v-stepper v-model="stepNum" class="font-lato mb-5">
    <v-stepper-header>
      <template v-for="step in stepNumTotal">
        <v-stepper-step
          :key="`step${step}`"
          :complete="stepNum > step"
          :step="step"
        >
          <slot :name="`stepHeader${step}`"></slot>
        </v-stepper-step>

        <v-divider
          :key="`divider${step}`"
          v-if="step < stepNumTotal"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <template v-for="step in stepNumTotal">
        <v-stepper-content :key="`content${step}`" :step="step">
          <v-layout align-center>
            <v-btn v-if="stepNum > 1" icon @click="navigateBefore">
              <v-icon>navigate_before</v-icon>
            </v-btn>

            <v-flex class="no-shadow mx-3">
              <slot :name="`stepItem${step}`"></slot>
            </v-flex>

            <v-btn
              v-if="stepNum < stepNumTotal"
              icon
              @click="navigateNext"
              :disabled="itemNotSelected"
            >
              <v-icon>navigate_next</v-icon>
            </v-btn>
          </v-layout>
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  props: {
    stepNumTotal: Number
  },
  data() {
    return {
      stepNum: 1
    }
  },
  computed: {
    itemNotSelected() {
      const item = this.$store.state.content.item
      return (
        this.stepNumTotal === 3 &&
        this.stepNum == 2 &&
        !Object.keys(item).length
      )
    }
  },
  methods: {
    navigateBefore() {
      const from = this.stepNum
      this.stepNum--
      const to = this.stepNum

      this.$emit('stepper-navigate-before', {
        from,
        to
      })
    },
    navigateNext() {
      const from = this.stepNum
      this.stepNum++
      const to = this.stepNum

      this.$emit('stepper-navigate-next', {
        from,
        to
      })
    }
  }
}
</script>

<style scoped>
.no-shadow >>> div {
  --webkit-box-shadow: None !important;
  box-shadow: None !important;
}
</style>
