import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.VITE_COSMIC_BUCKET_SLUG as string,
  readKey: import.meta.env.VITE_COSMIC_READ_KEY as string,
  writeKey: import.meta.env.VITE_COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function safeFind<T>(params: { type: string; query?: Record<string, any> }) {
  try {
    const response = await cosmic.objects
      .find(params.query ? { ...params.query, type: params.type } : { type: params.type })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as T[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [] as T[];
    }
    throw error;
  }
}

export async function safeFindOne<T>(params: { type: string; slug: string }) {
  try {
    const response = await cosmic.objects
      .findOne({ type: params.type, slug: params.slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.object as T;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}