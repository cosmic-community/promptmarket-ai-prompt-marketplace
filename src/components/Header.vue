<template>
  <header class="bg-white border-b border-secondary-200 sticky top-0 z-40">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          <span class="text-2xl">✨</span>
          <span class="text-xl font-bold text-primary-600">PromptMarket</span>
        </router-link>
        
        <nav class="hidden md:flex items-center gap-6">
          <router-link to="/" class="text-secondary-600 hover:text-primary-600 transition-colors">
            Home
          </router-link>
          <router-link to="/prompts" class="text-secondary-600 hover:text-primary-600 transition-colors">
            Browse Prompts
          </router-link>
          <router-link to="/categories" class="text-secondary-600 hover:text-primary-600 transition-colors">
            Categories
          </router-link>
          <router-link to="/dashboard" class="text-secondary-600 hover:text-primary-600 transition-colors">
            Dashboard
          </router-link>
          <router-link to="/analytics" class="text-secondary-600 hover:text-primary-600 transition-colors">
            Analytics
          </router-link>
          <router-link to="/admin" class="text-secondary-600 hover:text-primary-600 transition-colors">
            Admin CMS
          </router-link>
        </nav>

        <div class="flex items-center gap-4">
          <button class="btn btn-primary">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </header>
</template>