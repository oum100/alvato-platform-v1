<template>
  <div>
    You just signed out!
  </div>

  <div>
    <nuxt-link to="/login">
      ->Login
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({ auth: false })
</script>
