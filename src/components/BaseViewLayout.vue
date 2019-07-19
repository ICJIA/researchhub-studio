<template>
  <v-layout justify-center ma-4>
    <v-flex xs12 md10 md9 lg8 xl6>
      <h1><slot name="title"></slot></h1>

      <p class="py-2"><slot name="description"></slot></p>

      <slot></slot>
    </v-flex>
  </v-layout>
</template>
