# PromptMarket - AI Prompt Marketplace

![App Preview](https://imgix.cosmicjs.com/a97b65e0-b718-11f0-ac0f-f7b89d2a648e-photo-1547826039-bfc35e0f1ea8-1761997697360.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A full-featured Vue.js marketplace for buying and selling AI prompts with integrated wallet functionality, analytics tracking, and user management.

## Features

- 🛒 **Prompt Marketplace**: Browse and purchase AI prompts for ChatGPT, Midjourney, DALL-E, and more
- 👥 **Multi-Role System**: Admin, Seller, and Buyer roles with appropriate permissions
- 💰 **Wallet Integration**: Built-in wallet system for seamless transactions
- 📊 **Analytics Dashboard**: Track views, purchases, and revenue with visual charts
- 🏷️ **Category Management**: Organize prompts with custom categories and emoji icons
- 🔍 **Search & Filter**: Find prompts by category, price, rating, and more
- 📱 **Responsive Design**: Optimized for all device sizes
- ✨ **Featured Prompts**: Highlight top-performing and featured prompts

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6905f228271316ad9f4cfe7a&clone_repository=6905f585271316ad9f4cfee0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an cms e-commerce store  about sell promt with manager user, category, prompt, topup, dashboard  analytics"

### Code Generation Prompt

> "Develop a Vue.js application that uses my existing object types and objects"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Vue.js 3**: Progressive JavaScript framework with Composition API
- **Vue Router**: Official router for Vue.js applications
- **Cosmic CMS**: Headless CMS for content management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript development

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket with the required object types

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd promptmarket
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file in the root directory:
```env
VITE_COSMIC_BUCKET_SLUG=your-bucket-slug
VITE_COSMIC_READ_KEY=your-read-key
VITE_COSMIC_WRITE_KEY=your-write-key
```

4. Start the development server:
```bash
bun run dev
```

5. Open your browser to `http://localhost:5173`

## Cosmic SDK Examples

### Fetching Prompts with Categories

```typescript
// Fetch all prompts with category and seller data
const response = await cosmic.objects
  .find({ type: 'prompts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include nested category and seller objects

const prompts = response.objects
```

### Filtering by Category

```typescript
// Get prompts in a specific category
const response = await cosmic.objects
  .find({ 
    type: 'prompts',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Recording Analytics Events

```typescript
// Record a prompt view
await cosmic.objects.insertOne({
  type: 'analytics',
  title: `Prompt View - ${prompt.title}`,
  metadata: {
    event_type: 'view',
    related_prompt: promptId,
    user: userId,
    revenue: 0,
    event_date: new Date().toISOString().split('T')[0],
    additional_data: {
      session_duration: 120,
      referral_source: 'direct',
      device_type: 'desktop'
    }
  }
})
```

### Processing Top-ups

```typescript
// Create a wallet top-up transaction
await cosmic.objects.insertOne({
  type: 'topups',
  title: `Wallet Top-up - $${amount}`,
  metadata: {
    user: userId,
    amount: amount,
    payment_method: 'credit_card',
    transaction_id: `TXN-${Date.now()}`,
    status: 'completed',
    transaction_date: new Date().toISOString().split('T')[0]
  }
})
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

- **Users**: Manages user profiles with roles (Admin, Seller, Buyer), wallet balances, and verification status
- **Categories**: Organizes prompts with descriptions, icons, and featured status
- **Prompts**: Stores AI prompt details including pricing, previews, full content, and sales metrics
- **Top-ups**: Tracks wallet transactions with payment methods and statuses
- **Analytics**: Records user events (views, purchases, searches, top-ups) with revenue tracking

All content is managed through your Cosmic dashboard and dynamically rendered in the application.

## Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_COSMIC_BUCKET_SLUG`
   - `VITE_COSMIC_READ_KEY`
   - `VITE_COSMIC_WRITE_KEY`
3. Deploy with default settings (Vite framework preset)

### Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy

### Environment Variables

For production deployment, set these environment variables in your hosting platform:

- `VITE_COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `VITE_COSMIC_READ_KEY`: Your Cosmic read key
- `VITE_COSMIC_WRITE_KEY`: Your Cosmic write key (for mutations)

<!-- README_END -->