<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <CosmicBadge :bucketSlug="bucketSlug" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CosmicBadge from '@/components/CosmicBadge.vue'

const bucketSlug = ref(import.meta.env.VITE_COSMIC_BUCKET_SLUG as string)
</script>