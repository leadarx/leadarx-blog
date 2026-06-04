# NIOXERA BLOG — AI RULES
# Read this before touching ANY file in nioxera-blog.

## PROJECT IDENTITY
- This is ONLY the blog frontend
- It fetches ALL data from the Laravel API (nioxera-app)
- It has NO database connection
- It has NO authentication
- Deployed on Vercel — NOT Hostinger
- Subdomain: blog.nioxera.com

## ABSOLUTE RULES
1. NEVER add a database to this project — it is frontend only
2. NEVER add authentication — blog is fully public
3. ALWAYS use getStaticProps or generateStaticParams for blog posts (SEO)
4. NEVER use useEffect to fetch post data — it kills SEO
5. ALWAYS handle API errors gracefully — show fallback UI
6. NEVER hardcode the API URL — use NEXT_PUBLIC_API_URL env variable
7. ALWAYS follow BRANDING.md color rules — dark theme, neon green CTAs

## DATA FETCHING PATTERN
```js
// lib/api.js — all API calls live here
const API_URL = process.env.NEXT_PUBLIC_API_URL // https://nioxera.com/api

export async function getPosts(page = 1) {
    const res = await fetch(`${API_URL}/posts?page=${page}`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
}

export async function getPost(slug) {
    const res = await fetch(`${API_URL}/posts/${slug}`)
    if (!res.ok) return null
    return res.json()
}

export async function getCategories() {
    const res = await fetch(`${API_URL}/categories`)
    if (!res.ok) return []
    return res.json()
}
```

## PAGE PATTERN — STATIC GENERATION
```js
// app/blog/[slug]/page.js
import { getPost, getPosts } from '@/lib/api'

// Generate all post paths at build time
export async function generateStaticParams() {
    const { data: posts } = await getPosts()
    return posts.map(post => ({ slug: post.slug }))
}

// Fetch post data at build time
export default async function PostPage({ params }) {
    const post = await getPost(params.slug)

    if (!post) notFound()

    return (
        <article className="min-h-screen bg-[#0D0D0D]">
            <h1 className="text-3xl font-bold text-white">{post.title}</h1>
            <div className="text-[#A0A0A0]" dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
    )
}
```

## COPY & WRITING RULES
- NEVER use em-dashes (—) in any UI copy, labels, headings, or text content
- Replace with the contextually correct punctuation:
  - Introducing a clause or example → colon `:`
  - Parenthetical or aside → comma `,`
  - Two-sentence break → period `.`
  - Section header separator → forward slash `/`
- Note: the title format below uses a colon, not an em-dash

## SEO RULES — CRITICAL
- Every page must export generateMetadata()
- Title format: "Post Title — Nioxera Blog"
- Always include: description, og:image, og:title, canonical URL
- Blog post URLs: /blog/[slug] — no IDs in URLs
- Sitemap: generate via next-sitemap package

## BRANDING IN NEXT.JS
- Same colors as Laravel app — see nioxera-app BRANDING.md
- Use Tailwind CSS
- Dark background: bg-[#0D0D0D]
- Text: text-white and text-[#A0A0A0]
- Links + CTAs: text-[#39FF14] or bg-[#39FF14]
- Typography: generous line-height, max-w-2xl for post body

## ENV VARIABLES
NEXT_PUBLIC_API_URL=https://nioxera.com/api
(locally: http://localhost:8000/api)

## DEPLOYMENT
- Push to GitHub → Vercel auto-deploys
- Set NEXT_PUBLIC_API_URL in Vercel environment variables
- Domain: add blog.nioxera.com as custom domain in Vercel
- DNS: add CNAME record in Hostinger pointing to Vercel
