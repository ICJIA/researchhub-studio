<template>
  <v-app>
    <TheToolbar />

    <router-view></router-view>

    <TheFooter />
  </v-app>
</template>

<script>
const TheToolbar = () => import('./components/TheToolbar')
const TheFooter = () => import('./components/TheFooter')

export default {
  components: {
    TheToolbar,
    TheFooter
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Gentium+Book+Basic');

.application {
  color: #333;
  font-family: 'Gentium Book Basic', serif;
  font-size: 16px;
}
</style>
