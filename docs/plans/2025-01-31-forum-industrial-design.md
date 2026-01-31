# Forum Homepage - Industrial/DevTool Design

**Date:** 2025-01-31
**Branch:** suren-frontend
**Designer:** Claude + Suren
**Status:** Design Complete, Ready for Implementation

---

## Executive Summary

A modern discussion forum homepage with an **Industrial/DevTool aesthetic** - designed for developers and creators. The interface resembles an IDE or developer tool rather than a generic social platform.

**Key Differentiator:** The forum looks like a tool developers built themselves - dark-first, code-inspired, terminal-infused, precise.

---

## Design Philosophy

**Aesthetic Direction:** Industrial/DevTool

- **Audience:** Developers, creators, technical users building with Next.js, Convex, etc.
- **Tone:** Technical, precise, functional - like VS Code or JetBrains
- **Bold Choice:** Rejection of generic "clean/minimal" (Inter, purple gradients) for distinctive developer-tool aesthetic

**Core Principles:**
1. **Encourage Writing** - "New Discussion" button is most prominent element
2. **Content-First** - Discussions front and center, minimal distraction
3. **Technical Language** - Terminal paths, CLI syntax, code conventions
4. **Dark-First** - Optimized for developers who prefer dark mode

---

## Visual Language

### Typography

```css
font-display: 'JetBrains Mono', monospace;  /* Headings, numbers, code */
font-body: 'IBM Plex Sans', sans-serif;      /* Body copy */
```

- **Display:** JetBrains Mono - for headings, stats, badges, numbers
- **Body:** IBM Plex Sans - readable, technical, warm
- **Avoid:** Inter, Roboto, system fonts (generic)

### Color Palette - Dark First

```css
/* Core Colors */
--bg-primary: #0a0a0f;      /* Void black */
--bg-secondary: #131318;    /* Panel */
--bg-tertiary: #1a1a22;     /* Card */
--border-subtle: #1f1f2a;   /* Subtle border */
--border-accent: #30303a;   /* Accent border */

/* Text */
--text-primary: #e2e8f0;    /* Primary */
--text-secondary: #94a3b8;   /* Muted */
--text-dim: #64748b;        /* Dim */

/* Accents */
--primary: #6366f1;         /* Indigo - CTA, brand */
--success: #22c55e;         /* Green - upvotes */
--accent-cyan: #06b6d4;      /* Cyan - data, numbers */
```

### Borders & Spacing

- **Borders:** 1px, crisp, #1f1f2a (subtle), #30303a (accent)
- **Radius:** 6px (cards), 8px (buttons), 50% (pills, circles)
- **Shadows:** None - flat design, borders define depth
- **Spacing:** 16px base unit, 12px gap between cards

---

## Layout Architecture

### Desktop (>1024px)

```
┌────────────────────────────────────────────────────────────────┐
│  Navbar (sticky, 64px)                                           │
├──────────┬──────────────────────────────────┬─────────────────┤
│          │                                  │                 │
│  Left    │      Center Feed                  │    Right        │
│  260px   │      (flexible, max 800px)       │    310px        │
│          │                                  │                 │
│  sticky  │                                  │    sticky       │
│          │                                  │                 │
└──────────┴──────────────────────────────────┴─────────────────┘
```

- Grid: `grid-cols-[260px_1fr_310px]`
- Max width: 1600px centered
- 24px gap between columns

### Tablet (768px - 1024px)

- Right sidebar hidden
- Categories: horizontal scroll above feed
- Layout: `grid-cols-[260px_1fr]`

### Mobile (<768px)

- Single column stack
- Sidebars hidden (content becomes horizontal scroll)
- FAB appears for "New Discussion"
- Logo simplifies to icon only

---

## Component Specifications

### 1. Navigation Bar

```tsx
<nav className="sticky top-0 z-50 h-14 bg-[#0a0a0f] border-b border-[#1f1f2a]">
```

**Elements:**
- **Logo:** `createconomy // forum` (code comment style, JetBrains Mono)
- **Search:** 300px width, looks like IDE search
- **Theme Toggle:** 40px circle, sun/moon emoji
- **User Avatar:** 40px circle with gradient

### 2. Left Sidebar

#### CTA Button

```tsx
<Button className="w-full font-['JetBrains_Mono']">
  <PlusIcon /> <>new discussion
</Button>
```

#### Categories Card

- **Header:** `~/categories` (terminal path style)
- **Items:** File tree with 📁/📄 icons
- **Badges:** Monospace numbers, slate bg, indigo text

```
💡 General      [1247]
💼 Startups     [856]
🎨 Design       [432]
💻 Dev          [678]
📈 Marketing    [234]
🚀 Growth       [89]
```

#### My Activity Link

- Style: `~/my-activity` (terminal path)
- Icon: User icon

### 3. Center Feed

#### Sort Tabs

```tsx
<TabsList>
  <TabsTrigger value="hot">Hot</TabsTrigger>
  <TabsTrigger value="new">New</TabsTrigger>
  <TabsTrigger value="top">Top</TabsTrigger>
</TabsList>
```

- Style: Rounded tabs, slate-100 bg
- Active: White bg, shadow

#### Post Card

```tsx
<Card className="bg-[#1a1a22] border border-[#1f1f2a] p-4">
  <div className="flex gap-4">
    {/* Votes */}
    <div className="flex flex-col items-center gap-1">
      <button>▲</button>
      <span className="font-['JetBrains_Mono']">{votes}</span>
      <button>▼</button>
    </div>

    {/* Content */}
    <div className="flex-1">
      <code className="px-2 py-0.5 bg-[#131318] border rounded text-xs font-['JetBrains_Mono'] text-[#6366f1]">
        {category}
      </code>
      <h3>{title}</h3>
      <div className="flex items-center gap-2 text-sm font-['JetBrains_Mono']">
        <span className="text-[#6366f1]">@</span>
        <span>{author}</span>
        <span>•</span>
        <span>{timestamp}</span>
      </div>
      <p className="text-sm text-[#94a3b8]">{summary}</p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <MessageSquare /> <span>{comments}</span>
        <Bookmark />
        <Share2 />
      </div>
    </div>
  </div>
</Card>
```

**Post Card Elements:**
- **Votes:** Arrow characters (▲ ▼) in monospace
- **Category Badge:** `<code>` tag style, cyan text
- **Meta:** `@username` format
- **Actions:** Icons with monospace numbers

### 4. Right Sidebar

#### Campaign Widget

```tsx
<Card className="border border-[#6366f1]/30">
  <CardContent className="p-4">
    <div className="flex items-start gap-3">
      <span>🏆</span>
      <div>
        <h4 className="font-['JetBrains_Mono']">
          <span className="text-[#6366f1]">$</span> win-pro
        </h4>
        <p className="text-xs">Top contributor → Claude Pro</p>
      </div>
    </div>
  </CardContent>
</Card>
```

#### Stats Widget

- **Header:** `system.stats` (API notation)
- **Layout:** 3-column grid
- **Cells:** Deep black bg, cyan numbers

```
┌─────────┬─────────┬─────────┐
│ 12.4k   │ 8.7k    │ 45.2k   │
│ MEMBERS │ THREADS  │ REPLIES  │
└─────────┴─────────┴─────────┘
```

#### Leaderboard

- **Header:** `leaderboard.top()` (function notation)
- **Ranks:** Padded numbers `01`, `02`, `03`
- **Top 3:** Gold, silver, gray backgrounds
- **Others:** Muted slate
- **Names:** `@username` format
- **Points:** Cyan accent color

---

## Mock Data

### Categories

```typescript
const categories = [
  { name: "General", emoji: "💡", count: 1247, slug: "general" },
  { name: "Startups", emoji: "💼", count: 856, slug: "startups" },
  { name: "Design", emoji: "🎨", count: 432, slug: "design" },
  { name: "Dev", emoji: "💻", count: 678, slug: "dev" },
  { name: "Marketing", emoji: "📈", count: 234, slug: "marketing" },
  { name: "Growth", emoji: "🚀", count: 89, slug: "growth" },
];
```

### Posts

```typescript
const posts = [
  {
    id: 1,
    title: "Building scalable multi-tenant applications with Next.js and Convex",
    category: "💡 General",
    author: "Sarah Chen",
    timestamp: "2h ago",
    summary: "Explore strategies for implementing tenant isolation at the database level while maintaining code reuse across multiple applications.",
    votes: 142,
    comments: 34
  },
  // ... 5-8 posts
];
```

### Leaderboard

```typescript
const leaderboard = [
  { name: "Sarah Chen", points: 4520, badge: "TOP" },
  { name: "Jordan Kim", points: 3890, badge: "EXPERT" },
  { name: "Alex Rivera", points: 3245, badge: null },
  // ... 7 more
];
```

---

## Responsive Behavior

### Tablet (768px - 1024px)

- Hide right sidebar
- Categories become horizontal scroll menu
- Maintain left sidebar and CTA

### Mobile (<768px)

**Changes:**
- Logo: Icon only
- Nav links: Hide (Phase 2: hamburger menu)
- Search: Full width modal
- Sidebars: Hidden
- Right widgets: Horizontal scroll cards
- Categories: Horizontal scroll pills
- **FAB:** 60px circle, bottom-right, indigo gradient

---

## Technical Implementation

### Dependencies (Already Available)

```json
{
  "fonts": ["JetBrains Mono", "IBM Plex Sans"],
  "shadcn": ["card", "button", "tabs", "badge", "avatar", "separator"],
  "tailwind": "pre-configured"
}
```

### File Structure

```
apps/forum/app/
├── page.tsx                 # Main layout with grid
├── components/
│   ├── navigation.tsx       # Navbar component
│   ├── left-sidebar.tsx    # Categories + CTA
│   ├── post-card.tsx        # Individual post
│   ├── right-sidebar.tsx   # Widgets
│   └── widgets/
│       ├── campaign.tsx
│       ├── stats.tsx
│       └── leaderboard.tsx
└── lib/
    ├── mock-data.ts         # Posts, categories, leaderboard
    └── constants.ts         # Design tokens
```

### Component Imports

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@createconomy/ui/card"
import { Button } from "@createconomy/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@createconomy/ui/tabs"
import { Badge } from "@createconomy/ui/badge"
import { Avatar, AvatarFallback } from "@createconomy/ui/avatar"
import { Separator } from "@createconomy/ui/separator"
import { PlusIcon, Search, User, MessageSquare, Bookmark, Share2, ChevronUp, ChevronDown } from "lucide-react"
```

---

## Design Checklist

- [x] Dark-first color palette defined
- [x] Typography: JetBrains Mono + IBM Plex Sans
- [x] All components use Shadcn from `packages/ui`
- [x] Terminal/code conventions (`~/`, `@`, `$`, `()`)
- [x] Arrow vote characters (▲ ▼) not icons
- [x] Monospace numbers and stats
- [x] Flat design with borders (no shadows)
- [x] Cyan accent color for data/tech elements
- [x] Responsive breakpoints defined
- [x] Mobile FAB specified
- [x] "New Discussion" as primary CTA

---

## Next Steps

1. **Add Google Fonts** to project
2. **Configure Tailwind** with design tokens
3. **Build components** in `apps/forum/app/components/`
4. **Update `apps/forum/app/page.tsx`** with layout
5. **Test responsive behavior**
6. **Add dark mode toggle** functionality

---

*Design validated with user on branch `suren-frontend`*
