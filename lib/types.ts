export interface Author {
  name: string;
  avatar: string | null;
  bio: string | null;
  linkedin_url: string | null;
}

export interface Category {
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  meta_title: string | null;
  meta_description: string | null;
  post_count?: number;
}

export interface Tag {
  name: string;
  slug: string;
  post_count?: number;
}

export interface PostCard {
  uuid: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  reading_time: string;
  published_at: string | null;
  published_at_formatted: string;
  published_at_relative: string;
  is_featured: boolean;
  view_count: number;
  category: Category | null;
  tags: Tag[];
  author: Author;
}

export interface Post extends PostCard {
  body_html: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string | null;
  og_image: string | null;
  canonical_url: string;
  noindex: boolean;
  show_author: boolean;
  updated_at: string;
  related_posts: PostCard[];
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export type PostList = PaginatedResponse<PostCard>;

export interface SitemapEntry {
  slug: string;
  updated_at: string;
  published_at: string;
}

export type SortOption = 'latest' | 'popular' | 'oldest';
