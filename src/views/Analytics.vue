<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-secondary-900 mb-8">Analytics Dashboard</h1>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="analytics.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="card bg-gradient-to-br from-primary-50 to-primary-100">
          <div class="text-sm text-primary-700 mb-2">Total Revenue</div>
          <div class="text-3xl font-bold text-primary-900">${{ totalRevenue }}</div>
        </div>

        <div class="card bg-gradient-to-br from-green-50 to-green-100">
          <div class="text-sm text-green-700 mb-2">Total Purchases</div>
          <div class="text-3xl font-bold text-green-900">{{ totalPurchases }}</div>
        </div>

        <div class="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div class="text-sm text-blue-700 mb-2">Total Views</div>
          <div class="text-3xl font-bold text-blue-900">{{ totalViews }}</div>
        </div>

        <div class="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div class="text-sm text-purple-700 mb-2">Total Top-ups</div>
          <div class="text-3xl font-bold text-purple-900">{{ totalTopups }}</div>
        </div>
      </div>

      <div class="card mb-8">
        <h2 class="text-2xl font-bold text-secondary-900 mb-6">Event Breakdown</h2>
        <div class="space-y-4">
          <div v-for="type in eventTypes" :key="type.key" class="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
            <div>
              <div class="font-semibold">{{ type.label }}</div>
              <div class="text-sm text-secondary-600">{{ type.count }} events</div>
            </div>
            <div v-if="type.revenue > 0" class="text-xl font-bold text-primary-600">
              ${{ type.revenue }}
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold text-secondary-900 mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div v-for="event in analytics.slice(0, 10)" :key="event.id" class="flex items-start gap-4 p-4 border border-secondary-200 rounded-lg">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold">{{ event.metadata.event_type.value }}</span>
                <span class="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                  {{ event.metadata.event_date }}
                </span>
              </div>
              <p class="text-sm text-secondary-600">{{ event.title }}</p>
              <div v-if="event.metadata.user" class="text-xs text-secondary-500 mt-1">
                User: {{ event.metadata.user.metadata.full_name }}
              </div>
            </div>
            <div v-if="event.metadata.revenue > 0" class="text-lg font-bold text-green-600">
              ${{ event.metadata.revenue }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-secondary-600">No analytics data available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { safeFind } from '@/lib/cosmic'
import { Analytics } from '@/types'

const analytics = ref<Analytics[]>([])
const loading = ref(true)

const totalRevenue = computed(() => {
  return analytics.value.reduce((sum, event) => sum + (event.metadata.revenue || 0), 0)
})

const totalPurchases = computed(() => {
  return analytics.value.filter(e => e.metadata.event_type.key === 'purchase').length
})

const totalViews = computed(() => {
  return analytics.value.filter(e => e.metadata.event_type.key === 'view').length
})

const totalTopups = computed(() => {
  return analytics.value.filter(e => e.metadata.event_type.key === 'topup').length
})

const eventTypes = computed(() => {
  const types = [
    { key: 'purchase', label: 'Purchases', count: 0, revenue: 0 },
    { key: 'view', label: 'Views', count: 0, revenue: 0 },
    { key: 'topup', label: 'Top-ups', count: 0, revenue: 0 },
    { key: 'search', label: 'Searches', count: 0, revenue: 0 }
  ]
  
  analytics.value.forEach(event => {
    const type = types.find(t => t.key === event.metadata.event_type.key)
    if (type) {
      type.count++
      type.revenue += event.metadata.revenue || 0
    }
  })
  
  return types.filter(t => t.count > 0)
})

onMounted(async () => {
  try {
    const data = await safeFind<Analytics>({ type: 'analytics' })
    analytics.value = data
  } catch (error) {
    console.error('Error fetching analytics:', error)
  } finally {
    loading.value = false
  }
})
</script>