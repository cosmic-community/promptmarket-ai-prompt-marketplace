<template>
  <div class="card hover:shadow-md transition-shadow duration-200">
    <div v-if="category.metadata.cover_image" class="mb-4 -mx-6 -mt-6">
      <img 
        :src="`${category.metadata.cover_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`"
        :alt="category.metadata.name"
        class="w-full h-32 object-cover rounded-t-lg"
      />
    </div>

    <div class="flex items-start gap-3">
      <span v-if="category.metadata.icon" class="text-3xl">{{ category.metadata.icon }}</span>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-secondary-900 mb-2">{{ category.metadata.name }}</h3>
        <p v-if="category.metadata.description" class="text-sm text-secondary-600">
          {{ category.metadata.description }}
        </p>
      </div>
    </div>

    <button class="btn btn-primary w-full mt-4">
      Browse Category
    </button>
  </div>
</template>

<script setup lang="ts">
import { Category } from '@/types'

defineProps<{
  category: Category
}>()
</script>