# CommerceOS

**The AI Operating System for Modern Commerce**

> Upload Once. AI Runs Your Commerce.

---

## Architecture

```
Workspace → Commerce Memory → Product/Brand Center
    → Knowledge Engine → AI Intelligence (Decision Engine)
    → Workflow Orchestrator → Content Hub → Publish Center
    → Commerce Intelligence → Learning Engine → (loop)
```

### Core Modules

| Module | Path | Description |
|---|---|---|
| Workspace | `/workspace` | Dashboard with stats, recent works, AI recommendations |
| Product Center | `/products` | Product profiles, AI attribute detection, SKU management |
| Brand Center | `/brands` | Brand profiles, color palettes, fonts, tone, style guides |
| Skill Engine | `/skills` | 130+ skills across 9 categories × 16 platforms |
| AI Models | `/models` | 15 AI models, auto-routing to best model per task |
| Workflow Orchestrator | `/workflow` | 6-step AI pipeline: Image → Video → Copy → SEO → Translate → Publish |
| Content Hub | `/assets` | Asset gallery with search, filter, batch operations |
| Publish Center | `/publish` | 12 platforms, manual/scheduled/auto publish |
| Commerce Intelligence | `/analytics` | CTR, CVR, ROI, A/B testing, predictions, competitor analysis |
| AI Agents | `/agents` | 6 autonomous agents (Amazon, TikTok, Shopee, Temu, Taobao, General) |
| Ecosystem | `/marketplace` | Skills, Workflows, Plugins, Agents, API, SDK, Partner Apps |
| Settings | `/settings` | Account, Organization, Billing, API Keys, Team, Integrations |

### AI Architecture

```
Commerce Assistant → Decision Engine → Skill Registry + Workflow Engine
    → Prompt Builder + AI Orchestrator → Model Router
    → GPT/Claude/Gemini | FLUX/Imagen/Veo | Kling/Runway/Pika
    → Commerce Memory → Asset Library
```

| Engine | File | Role |
|---|---|---|
| Decision Engine | `src/ai/decision-engine.ts` | Parses intent, selects skills, assigns models |
| Model Router | `src/ai/model-router.ts` | Auto-selects best model per task category |
| Prompt Builder | `src/ai/prompt-builder.ts` | Dynamic prompt from brand + platform + product + memory |
| Commerce Memory | `src/ai/memory.ts` | Persistent memory of products, brands, preferences |
| Commerce Assistant | `src/ai/assistant.ts` | Single AI interface, natural language requests |
| Amazon Listing Agent | `src/ai/agents/amazon-listing-agent.ts` | Complete autonomous Amazon listing workflow |

### Skill System (V2)

```
src/skills-v2/
├── types.ts, registry.ts, helpers.ts
├── image/        3 demo skills
├── video/        2 demo skills
├── copywriting/  2 demo skills
├── seo/          2 demo skills
├── translation/  2 demo skills
├── publishing/   2 demo skills
├── analytics/    2 demo skills
├── automation/   2 demo skills
└── platform/     16 platform packages (110 skills)
    ├── amazon/   30 skills (Image, Video, Copy, SEO, Publish, Intl)
    ├── shopify/  8, tiktok/ 8, taobao/ 8, douyin/ 8, shopee/ 7
    ├── lazada/ 6, temu/ 5, ebay/ 4, etsy/ 4, walmart/ 4
    └── jd/ 4, aliexpress/ 4, xiaohongshu/ 4, pinduoduo/ 3, 1688/ 3
```

## MVP Closed Loop

`/workspace/new` — 4-step end-to-end flow:

1. **Upload** — Product photo + name
2. **Select** — Choose target platform(s) from 12 options
3. **Generate** — AI generates 9 assets (4 images + 1 video + 4 copy)
4. **Download** — Review, download ZIP, save to Content Hub

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM (28 models)
- **Auth:** Supabase Auth (email/password)
- **Styling:** Tailwind CSS (Apple/Linear/Vercel design)
- **Design System:** #7C3AED primary, DM Sans, 12px radius

## Getting Started

```bash
# Install
npm install

# Environment
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Dev server
npm run dev
# → http://localhost:3456

# Build
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── (app)/           # Authenticated app (sidebar + 12 modules)
│   ├── auth/            # Login, Register, Callback
│   ├── legal/           # Terms of Service, Privacy Policy
│   └── page.tsx         # Landing page
├── ai/                  # AI Architecture (6 engines + agents)
├── skills-v2/           # Skill Registry (130 skills)
├── components/          # Shared UI (AppSidebar, Navbar, Footer, Hero, etc.)
├── lib/                 # Utilities (auth, i18n, supabase)
└── prisma/
    └── schema.prisma    # 28 models
```

## Database

Prisma schema at `prisma/schema.prisma` — 28 models covering:
Users, Workspaces, Products, Brands, Skills, Workflows, AI Models,
Assets, Publish Tasks, Analytics, Learning Records, Ecosystem, and Billing.

```bash
npx prisma validate    # Validate schema
npx prisma generate    # Generate client
npx prisma db push     # Push to database
```
