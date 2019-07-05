<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <h1><slot name="title"></slot></h1>

        <p class="py-2"><slot name="description"></slot></p>

        <slot></slot>
      </v-flex>
    </v-layout>
  </v-container>
</template>
