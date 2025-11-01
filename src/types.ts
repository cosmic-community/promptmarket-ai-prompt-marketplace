export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name: string;
    email: string;
    role: {
      key: 'admin' | 'seller' | 'buyer';
      value: 'Admin' | 'Seller' | 'Buyer';
    };
    profile_picture?: {
      url: string;
      imgix_url: string;
    };
    bio?: string;
    wallet_balance: number;
    total_sales?: number;
    total_purchases?: number;
    is_verified: boolean;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    icon?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    is_featured: boolean;
  };
}

export interface Prompt extends CosmicObject {
  type: 'prompts';
  metadata: {
    title: string;
    description: string;
    price: number;
    preview_content?: string;
    full_prompt: string;
    category?: Category;
    seller?: User;
    preview_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    tags?: string;
    total_sales?: number;
    total_views?: number;
    rating?: number;
    is_featured: boolean;
  };
}

export interface Topup extends CosmicObject {
  type: 'topups';
  metadata: {
    user?: User;
    amount: number;
    payment_method: {
      key: 'credit_card' | 'paypal' | 'crypto' | 'bank_transfer';
      value: string;
    };
    transaction_id: string;
    status: {
      key: 'pending' | 'completed' | 'failed';
      value: string;
    };
    transaction_date: string;
  };
}

export interface Analytics extends CosmicObject {
  type: 'analytics';
  metadata: {
    event_type: {
      key: 'view' | 'purchase' | 'search' | 'topup';
      value: string;
    };
    related_prompt?: Prompt;
    user?: User;
    revenue: number;
    event_date: string;
    additional_data?: Record<string, any>;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
}

export type UserRole = 'admin' | 'seller' | 'buyer';
export type EventType = 'view' | 'purchase' | 'search' | 'topup';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto' | 'bank_transfer';
export type TransactionStatus = 'pending' | 'completed' | 'failed';