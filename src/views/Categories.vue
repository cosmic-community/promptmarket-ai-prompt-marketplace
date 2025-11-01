<template>
  <div class="container mx-auto px-4 py-12">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-secondary-900 mb-4">Browse Categories</h1>
      <p class="text-lg text-secondary-600">
        Explore prompts organized by category
      </p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard 
        v-for="category in categories" 
        :key="category.id" 
        :category="category" 
      />
    </div>

    <div v-else class="text-center py-12">
      <p class="text-secondary-600">No categories available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { safeFind } from '@/lib/cosmic'
import { Category } from '@/types'
import CategoryCard from '@/components/CategoryCard.vue'

const categories = ref<Category[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await safeFind<Category>({ type: 'categories' })
    categories.value = data
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    loading.value = false
  }
})
</script>