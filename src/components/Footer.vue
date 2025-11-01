<template>
  <footer class="bg-white border-t border-secondary-200 mt-20">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">✨</span>
            <span class="text-xl font-bold text-primary-600">PromptMarket</span>
          </div>
          <p class="text-secondary-600 text-sm">
            The premier marketplace for AI prompts. Buy and sell high-quality prompts for ChatGPT, Midjourney, DALL-E, and more.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Marketplace</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/prompts" class="text-secondary-600 hover:text-primary-600 text-sm">
                Browse Prompts
              </router-link>
            </li>
            <li>
              <router-link to="/categories" class="text-secondary-600 hover:text-primary-600 text-sm">
                Categories
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Account</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/dashboard" class="text-secondary-600 hover:text-primary-600 text-sm">
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/analytics" class="text-secondary-600 hover:text-primary-600 text-sm">
                Analytics
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <a href="https://www.cosmicjs.com/docs" target="_blank" class="text-secondary-600 hover:text-primary-600 text-sm">
                Documentation
              </a>
            </li>
            <li>
              <a href="https://www.cosmicjs.com" target="_blank" class="text-secondary-600 hover:text-primary-600 text-sm">
                Powered by Cosmic
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-secondary-200 mt-8 pt-8 text-center text-sm text-secondary-600">
        <p>&copy; 2025 PromptMarket. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>