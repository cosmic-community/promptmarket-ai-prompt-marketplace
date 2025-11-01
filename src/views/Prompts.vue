<template>
  <div class="container mx-auto px-4 py-12">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-secondary-900 mb-4">Browse All Prompts</h1>
      <p class="text-lg text-secondary-600">
        Discover high-quality AI prompts for your next project
      </p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="prompts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PromptCard 
        v-for="prompt in prompts" 
        :key="prompt.id" 
        :prompt="prompt" 
      />
    </div>

    <div v-else class="text-center py-12">
      <p class="text-secondary-600">No prompts available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { safeFind } from '@/lib/cosmic'
import { Prompt } from '@/types'
import PromptCard from '@/components/PromptCard.vue'

const prompts = ref<Prompt[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await safeFind<Prompt>({ type: 'prompts' })
    prompts.value = data
  } catch (error) {
    console.error('Error fetching prompts:', error)
  } finally {
    loading.value = false
  }
})
</script>