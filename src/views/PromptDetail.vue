<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="prompt" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <router-link to="/prompts" class="text-primary-600 hover:text-primary-700 mb-4 inline-block">
          ← Back to Prompts
        </router-link>
      </div>

      <div class="card">
        <div v-if="prompt.metadata.preview_images && prompt.metadata.preview_images.length > 0" class="mb-6">
          <img 
            :src="`${prompt.metadata.preview_images[0].imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`"
            :alt="prompt.title"
            class="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div class="flex items-start justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-secondary-900 mb-2">{{ prompt.metadata.title }}</h1>
            <div class="flex items-center gap-4">
              <span v-if="prompt.metadata.rating" class="flex items-center gap-1">
                <span class="text-yellow-400 text-xl">★</span>
                <span class="text-lg font-medium">{{ prompt.metadata.rating }}</span>
              </span>
              <span class="text-secondary-600">{{ prompt.metadata.total_views || 0 }} views</span>
              <span class="text-secondary-600">{{ prompt.metadata.total_sales || 0 }} sales</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold text-primary-600 mb-2">${{ prompt.metadata.price }}</div>
            <button class="btn btn-primary">Purchase Prompt</button>
          </div>
        </div>

        <div v-if="prompt.metadata.description" class="mb-6" v-html="prompt.metadata.description" />

        <div v-if="prompt.metadata.preview_content" class="bg-secondary-50 p-6 rounded-lg mb-6">
          <h3 class="font-semibold text-lg mb-3">Preview</h3>
          <p class="text-secondary-700">{{ prompt.metadata.preview_content }}</p>
        </div>

        <div v-if="prompt.metadata.seller" class="border-t border-secondary-200 pt-6">
          <h3 class="font-semibold text-lg mb-4">About the Seller</h3>
          <div class="flex items-start gap-4">
            <img 
              v-if="prompt.metadata.seller.metadata.profile_picture"
              :src="`${prompt.metadata.seller.metadata.profile_picture.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`"
              :alt="prompt.metadata.seller.metadata.full_name"
              class="w-16 h-16 rounded-full"
            />
            <div>
              <div class="font-semibold text-lg">{{ prompt.metadata.seller.metadata.full_name }}</div>
              <p v-if="prompt.metadata.seller.metadata.bio" class="text-secondary-600 mt-1">
                {{ prompt.metadata.seller.metadata.bio }}
              </p>
              <div class="flex gap-4 mt-2 text-sm text-secondary-500">
                <span>{{ prompt.metadata.seller.metadata.total_sales || 0 }} sales</span>
                <span v-if="prompt.metadata.seller.metadata.is_verified" class="text-primary-600">✓ Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-secondary-600">Prompt not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { safeFindOne } from '@/lib/cosmic'
import { Prompt } from '@/types'

const route = useRoute()
const prompt = ref<Prompt | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    const data = await safeFindOne<Prompt>({ type: 'prompts', slug })
    prompt.value = data
  } catch (error) {
    console.error('Error fetching prompt:', error)
  } finally {
    loading.value = false
  }
})
</script>