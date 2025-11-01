<template>
  <div class="min-h-screen bg-secondary-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-secondary-900 mb-2">Content Management System</h1>
        <p class="text-secondary-600">Manage all content stored in Cosmic CMS</p>
      </div>

      <!-- Object Type Selector -->
      <div class="card mb-6">
        <div class="flex items-center gap-4 mb-4">
          <label class="text-sm font-semibold text-secondary-700">Content Type:</label>
          <select 
            v-model="selectedType" 
            @change="loadObjects"
            class="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="prompts">Prompts</option>
            <option value="categories">Categories</option>
            <option value="users">Users</option>
            <option value="analytics">Analytics</option>
            <option value="topups">Top-ups</option>
          </select>
          <button 
            @click="showCreateModal = true"
            class="btn btn-primary ml-auto"
          >
            + Create New
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-secondary-600">Loading content...</p>
      </div>

      <!-- Content Table -->
      <div v-else-if="objects.length > 0" class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-secondary-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Title
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Slug
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Modified
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-secondary-200">
              <tr v-for="obj in objects" :key="obj.id" class="hover:bg-secondary-50">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img 
                      v-if="obj.thumbnail" 
                      :src="`${obj.thumbnail}?w=80&h=80&fit=crop&auto=format,compress`"
                      :alt="obj.title"
                      class="w-10 h-10 rounded object-cover"
                    />
                    <span class="font-medium text-secondary-900">{{ obj.title }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-secondary-600">
                  {{ obj.slug }}
                </td>
                <td class="px-6 py-4 text-sm text-secondary-600">
                  {{ formatDate(obj.modified_at) }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="editObject(obj)"
                      class="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteObject(obj)"
                      class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center py-12">
        <p class="text-secondary-600 mb-4">No {{ selectedType }} found</p>
        <button @click="showCreateModal = true" class="btn btn-primary">
          Create First {{ selectedType.slice(0, -1) }}
        </button>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || editingObject" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-secondary-900">
                {{ editingObject ? 'Edit' : 'Create' }} {{ selectedType.slice(0, -1) }}
              </h2>
              <button @click="closeModal" class="text-secondary-400 hover:text-secondary-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-2">Title *</label>
                <input 
                  v-model="formData.title"
                  type="text"
                  class="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-2">Slug</label>
                <input 
                  v-model="formData.slug"
                  type="text"
                  class="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Auto-generated if empty"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-2">Metadata (JSON)</label>
                <textarea 
                  v-model="formData.metadata"
                  rows="10"
                  class="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                  placeholder='{"key": "value"}'
                ></textarea>
                <p class="text-xs text-secondary-500 mt-1">Enter valid JSON for metadata fields</p>
              </div>
            </div>

            <div class="flex items-center gap-3 mt-6">
              <button 
                @click="saveObject"
                :disabled="saving"
                class="btn btn-primary flex-1"
              >
                {{ saving ? 'Saving...' : 'Save' }}
              </button>
              <button 
                @click="closeModal"
                class="px-6 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50"
              >
                Cancel
              </button>
            </div>

            <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="deletingObject" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-secondary-900 mb-4">Confirm Delete</h3>
          <p class="text-secondary-600 mb-6">
            Are you sure you want to delete "{{ deletingObject.title }}"? This action cannot be undone.
          </p>
          <div class="flex items-center gap-3">
            <button 
              @click="confirmDelete"
              :disabled="saving"
              class="btn bg-red-600 text-white hover:bg-red-700 flex-1"
            >
              {{ saving ? 'Deleting...' : 'Delete' }}
            </button>
            <button 
              @click="deletingObject = null"
              class="px-6 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cosmic } from '@/lib/cosmic'
import { CosmicObject } from '@/types'

const selectedType = ref('prompts')
const objects = ref<CosmicObject[]>([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')

const showCreateModal = ref(false)
const editingObject = ref<CosmicObject | null>(null)
const deletingObject = ref<CosmicObject | null>(null)

const formData = ref({
  title: '',
  slug: '',
  metadata: '{}'
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadObjects = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await cosmic.objects
      .find({ type: selectedType.value })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail', 'modified_at'])
      .depth(0)
    objects.value = response.objects
  } catch (err: any) {
    if (err.status === 404) {
      objects.value = []
    } else {
      error.value = 'Failed to load content'
      console.error('Error loading objects:', err)
    }
  } finally {
    loading.value = false
  }
}

const editObject = (obj: CosmicObject) => {
  editingObject.value = obj
  formData.value = {
    title: obj.title,
    slug: obj.slug,
    metadata: JSON.stringify(obj.metadata, null, 2)
  }
}

const deleteObject = (obj: CosmicObject) => {
  deletingObject.value = obj
}

const closeModal = () => {
  showCreateModal.value = false
  editingObject.value = null
  formData.value = {
    title: '',
    slug: '',
    metadata: '{}'
  }
  error.value = ''
}

const saveObject = async () => {
  error.value = ''
  
  // Validate
  if (!formData.value.title.trim()) {
    error.value = 'Title is required'
    return
  }

  let metadata
  try {
    metadata = JSON.parse(formData.value.metadata)
  } catch (err) {
    error.value = 'Invalid JSON in metadata field'
    return
  }

  saving.value = true
  try {
    const payload: any = {
      title: formData.value.title,
      type: selectedType.value,
      metadata
    }

    if (formData.value.slug) {
      payload.slug = formData.value.slug
    }

    if (editingObject.value) {
      await cosmic.objects.updateOne(editingObject.value.id, payload)
    } else {
      await cosmic.objects.insertOne(payload)
    }

    await loadObjects()
    closeModal()
  } catch (err: any) {
    error.value = err.message || 'Failed to save object'
    console.error('Error saving object:', err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = async () => {
  if (!deletingObject.value) return

  saving.value = true
  error.value = ''
  try {
    await cosmic.objects.deleteOne(deletingObject.value.id)
    await loadObjects()
    deletingObject.value = null
  } catch (err: any) {
    error.value = err.message || 'Failed to delete object'
    console.error('Error deleting object:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadObjects()
})
</script>