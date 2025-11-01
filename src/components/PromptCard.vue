<template>
  <router-link 
    :to="`/prompts/${prompt.slug}`"
    class="card hover:shadow-md transition-shadow duration-200 block"
  >
    <div v-if="prompt.metadata.preview_images && prompt.metadata.preview_images.length > 0" class="mb-4">
      <img 
        :src="`${prompt.metadata.preview_images[0].imgix_url}?w=600&h=400&fit=crop&auto=format,compress`"
        :alt="prompt.title"
        class="w-full h-48 object-cover rounded-lg"
      />
    </div>

    <div class="flex items-start justify-between mb-2">
      <h3 class="text-lg font-semibold text-secondary-900">{{ prompt.metadata.title }}</h3>
      <span v-if="prompt.metadata.is_featured" class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
        Featured
      </span>
    </div>

    <div v-if="prompt.metadata.description" class="text-sm text-secondary-600 mb-4 line-clamp-2" v-html="prompt.metadata.description" />

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold text-primary-600">${{ prompt.metadata.price }}</span>
        <div v-if="prompt.metadata.rating" class="flex items-center gap-1">
          <span class="text-yellow-400">★</span>
          <span class="text-sm text-secondary-600">{{ prompt.metadata.rating }}</span>
        </div>
      </div>

      <div class="flex items-center gap-4 text-sm text-secondary-500">
        <span>{{ prompt.metadata.total_views || 0 }} views</span>
        <span>{{ prompt.metadata.total_sales || 0 }} sales</span>
      </div>
    </div>

    <div v-if="prompt.metadata.seller" class="mt-4 pt-4 border-t border-secondary-200 flex items-center gap-2">
      <img 
        v-if="prompt.metadata.seller.metadata.profile_picture"
        :src="`${prompt.metadata.seller.metadata.profile_picture.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`"
        :alt="prompt.metadata.seller.metadata.full_name"
        class="w-8 h-8 rounded-full"
      />
      <span class="text-sm text-secondary-600">by {{ prompt.metadata.seller.metadata.full_name }}</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { Prompt } from '@/types'

defineProps<{
  prompt: Prompt
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>