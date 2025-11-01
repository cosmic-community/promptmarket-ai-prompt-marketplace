<template>
  <div>
    <section class="bg-gradient-to-b from-primary-50 to-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold text-secondary-900 mb-6">
          Discover Premium AI Prompts
        </h1>
        <p class="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
          Buy and sell high-quality prompts for ChatGPT, Midjourney, DALL-E, and more. 
          Join our marketplace and monetize your prompt engineering skills.
        </p>
        <div class="flex gap-4 justify-center">
          <router-link to="/prompts" class="btn btn-primary text-lg px-8 py-3">
            Browse Prompts
          </router-link>
          <router-link to="/categories" class="btn btn-secondary text-lg px-8 py-3">
            Explore Categories
          </router-link>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-secondary-900">Featured Prompts</h2>
        <router-link to="/prompts" class="text-primary-600 hover:text-primary-700 font-medium">
          View All →
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="featuredPrompts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PromptCard 
          v-for="prompt in featuredPrompts" 
          :key="prompt.id" 
          :prompt="prompt" 
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-secondary-600">No featured prompts available.</p>
      </div>
    </section>

    <section class="bg-secondary-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-secondary-900 mb-8 text-center">Browse by Category</h2>
        
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="featuredCategories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            v-for="category in featuredCategories" 
            :key="category.id" 
            :category="category" 
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-secondary-600">No categories available.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { safeFind } from '@/lib/cosmic'
import { Prompt, Category } from '@/types'
import PromptCard from '@/components/PromptCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'

const featuredPrompts = ref<Prompt[]>([])
const featuredCategories = ref<Category[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [prompts, categories] = await Promise.all([
      safeFind<Prompt>({ 
        type: 'prompts',
        query: { 'metadata.is_featured': true }
      }),
      safeFind<Category>({ 
        type: 'categories',
        query: { 'metadata.is_featured': true }
      })
    ])
    
    featuredPrompts.value = prompts.slice(0, 6)
    featuredCategories.value = categories
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})
</script>