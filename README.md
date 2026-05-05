# My Online Store

![App Preview](https://imgix.cosmicjs.com/https://imgix.cosmicjs.com/f833e780-a455-11ed-81f2-f50e185dd248-vaPoJZB9Mzg.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive e-commerce store built with Next.js 16 and Cosmic CMS, featuring product catalogs, categories, and customer reviews.

## Features

- 🛍️ Product catalog with detailed product pages
- 🏷️ Category-based browsing
- ⭐ Customer reviews with star ratings
- 🎯 Featured products showcase
- 💰 Sale pricing display
- 📦 Real-time inventory status
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69fa26e5904b25270dbf0ff7&clone_repository=69fa27e7904b25270dbf102b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.

User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Cosmic CMS** - Content management
- **Bun** - Package manager and runtime

## Getting Started

### Prerequisites

- Bun or Node.js 18+
- A Cosmic account with content set up

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables (see `.env.example`)
4. Run the development server:
   ```bash
   bun run dev
   ```

## Cosmic SDK Examples

### Fetching Products
```typescript
const response = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching by Category
```typescript
const response = await cosmic.objects
  .find({ type: 'products', 'metadata.category': categoryId })
  .depth(1);
```

## Cosmic CMS Integration

This app integrates with three Cosmic object types:
- **Products**: Full product information with images and pricing
- **Categories**: Product categorization
- **Reviews**: Customer feedback and ratings

## Deployment

Deploy to Vercel or Netlify with environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->