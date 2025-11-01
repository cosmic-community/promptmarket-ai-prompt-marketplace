<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-secondary-900 mb-8">User Dashboard</h1>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="users.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="user in users" :key="user.id" class="card">
          <div class="flex items-start gap-4">
            <img 
              v-if="user.metadata.profile_picture"
              :src="`${user.metadata.profile_picture.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`"
              :alt="user.metadata.full_name"
              class="w-16 h-16 rounded-full"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-lg">{{ user.metadata.full_name }}</h3>
                <span v-if="user.metadata.is_verified" class="text-primary-600 text-sm">✓</span>
              </div>
              <p class="text-sm text-secondary-600 mb-2">{{ user.metadata.role.value }}</p>
              
              <div class="bg-primary-50 px-3 py-2 rounded-lg mb-3">
                <div class="text-xs text-primary-600 mb-1">Wallet Balance</div>
                <div class="text-2xl font-bold text-primary-700">${{ user.metadata.wallet_balance }}</div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div class="text-secondary-600">Sales</div>
                  <div class="font-semibold">{{ user.metadata.total_sales || 0 }}</div>
                </div>
                <div>
                  <div class="text-secondary-600">Purchases</div>
                  <div class="font-semibold">{{ user.metadata.total_purchases || 0 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="topups.length > 0">
        <h2 class="text-2xl font-bold text-secondary-900 mb-6">Recent Top-ups</h2>
        <div class="space-y-4">
          <div v-for="topup in topups" :key="topup.id" class="card">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold">{{ topup.title }}</h3>
                <p class="text-sm text-secondary-600">
                  {{ topup.metadata.payment_method.value }} • {{ topup.metadata.transaction_id }}
                </p>
                <p class="text-xs text-secondary-500 mt-1">{{ topup.metadata.transaction_date }}</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-primary-600">${{ topup.metadata.amount }}</div>
                <span :class="statusClass(topup.metadata.status.key)" class="text-xs px-2 py-1 rounded">
                  {{ topup.metadata.status.value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-secondary-600">No user data available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { safeFind } from '@/lib/cosmic'
import { User, Topup } from '@/types'

const users = ref<User[]>([])
const topups = ref<Topup[]>([])
const loading = ref(true)

const statusClass = (status: string) => {
  const classes: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-secondary-100 text-secondary-700'
}

onMounted(async () => {
  try {
    const [usersData, topupsData] = await Promise.all([
      safeFind<User>({ type: 'users' }),
      safeFind<Topup>({ type: 'topups' })
    ])
    
    users.value = usersData
    topups.value = topupsData
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    loading.value = false
  }
})
</script>