import { mutation } from "./_generated/server";

/**
 * Seed test users for the forum
 * Run this in the Convex dashboard or via npx convex run seedUsers
 */
export const seedUsers = mutation({
  args: {},
  handler: async (ctx) => {
    // Get the forum tenant
    const forumTenant = await ctx.db
      .query("tenants")
      .withIndex("by_slug", (q) => q.eq("slug", "forum"))
      .first();

    if (!forumTenant) {
      throw new Error("Forum tenant not found. Please create the forum tenant first.");
    }

    const now = Date.now();

    // Check if users already exist
    const existingUsers = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tenantId"), forumTenant._id))
      .collect();

    if (existingUsers.length >= 5) {
      console.log("Users already exist, skipping seed.");
      return { message: "Users already exist, skipping seed." };
    }

    // Sample users
    const sampleUsers = [
      {
        tenantId: forumTenant._id,
        name: "Sarah Chen",
        username: "sarahchen",
        email: "sarah.chen@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        role: "customer",
        bio: "Full-stack developer passionate about React and TypeScript",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Marcus Johnson",
        username: "marcusj",
        email: "marcus.j@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
        role: "customer",
        bio: "Startup founder building AI tools",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Elena Rodriguez",
        username: "elenar",
        email: "elena.r@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena",
        role: "customer",
        bio: "UI/UX designer at a Fortune 500 company",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "David Kim",
        username: "davidkim",
        email: "david.k@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        role: "customer",
        bio: "ML engineer exploring the frontiers of AI",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Priya Patel",
        username: "priyap",
        email: "priya.p@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
        role: "customer",
        bio: "Indie game developer and streamer",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Alex Thompson",
        username: "alext",
        email: "alex.t@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        role: "customer",
        bio: "Serial entrepreneur and angel investor",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Yuki Tanaka",
        username: "yukitan",
        email: "yuki.t@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuki",
        role: "customer",
        bio: "Open source maintainer and Rust enthusiast",
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Jordan Lee",
        username: "jordanl",
        email: "jordan.l@example.com",
        emailVerified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
        role: "customer",
        bio: "Product manager at a tech giant",
        createdAt: now,
        updatedAt: now,
      },
    ];

    const userIds = await Promise.all(
      sampleUsers.map((user) => ctx.db.insert("users", user))
    );

    return {
      message: "Users seeded successfully",
      usersCreated: userIds.length,
    };
  },
});

/**
 * Seed forum categories and campaigns for the forum tenant
 * Run this in the Convex dashboard or via npx convex run seedForumData
 */
export const seedForumData = mutation({
  args: {},
  handler: async (ctx) => {
    // Get the forum tenant
    const forumTenant = await ctx.db
      .query("tenants")
      .withIndex("by_slug", (q) => q.eq("slug", "forum"))
      .first();

    if (!forumTenant) {
      throw new Error("Forum tenant not found. Please create the forum tenant first.");
    }

    const now = Date.now();

    // Check if categories already exist
    const existingCategories = await ctx.db
      .query("forumCategories")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    if (existingCategories.length > 0) {
      console.log("Categories already exist, skipping seed.");
      return { message: "Categories already exist, skipping seed." };
    }

    // Seed categories
    const categories = [
      {
        tenantId: forumTenant._id,
        name: "Programming",
        slug: "programming",
        description: "Discuss coding, software development, and best practices",
        icon: "Code",
        color: "bg-blue-500",
        order: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Design",
        slug: "design",
        description: "UI/UX, graphic design, and creative discussions",
        icon: "Palette",
        color: "bg-pink-500",
        order: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Startups",
        slug: "startups",
        description: "Entrepreneurship, funding, and startup growth",
        icon: "Rocket",
        color: "bg-orange-500",
        order: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "AI & ML",
        slug: "ai-ml",
        description: "Artificial intelligence and machine learning discussions",
        icon: "Brain",
        color: "bg-violet-500",
        order: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Gaming",
        slug: "gaming",
        description: "Video games, esports, and gaming industry",
        icon: "Gamepad2",
        color: "bg-green-500",
        order: 5,
        createdAt: now,
        updatedAt: now,
      },
      {
        tenantId: forumTenant._id,
        name: "Learning",
        slug: "learning",
        description: "Educational resources, tutorials, and skill sharing",
        icon: "BookOpen",
        color: "bg-cyan-500",
        order: 6,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const categoryIds = await Promise.all(
      categories.map((category) => ctx.db.insert("forumCategories", category))
    );

    // Seed campaign
    const existingCampaigns = await ctx.db
      .query("forumCampaigns")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    if (existingCampaigns.length === 0) {
      const campaignStart = now;
      const campaignEnd = now + 30 * 24 * 60 * 60 * 1000; // 30 days from now

      await ctx.db.insert("forumCampaigns", {
        tenantId: forumTenant._id,
        title: "Win Claude Pro!",
        description:
          "Top contributors this month win 3 months of Claude Pro subscription. Participate in discussions, create quality posts, and help others to earn points!",
        prize: "3 months of Claude Pro subscription",
        targetPoints: 5000,
        currentProgress: 2450,
        startDate: campaignStart,
        endDate: campaignEnd,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    }

    return {
      message: "Forum data seeded successfully",
      categoriesCreated: categoryIds.length,
    };
  },
});

/**
 * Seed forum posts with sample data
 * Run this in the Convex dashboard or via npx convex run seedForumPosts
 */
export const seedForumPosts = mutation({
  args: {},
  handler: async (ctx) => {
    // Get the forum tenant
    const forumTenant = await ctx.db
      .query("tenants")
      .withIndex("by_slug", (q) => q.eq("slug", "forum"))
      .first();

    if (!forumTenant) {
      throw new Error("Forum tenant not found. Please create the forum tenant first.");
    }

    const now = Date.now();

    // Check if posts already exist
    const existingPosts = await ctx.db
      .query("forumPosts")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    if (existingPosts.length > 0) {
      console.log("Posts already exist, skipping seed.");
      return { message: "Posts already exist, skipping seed." };
    }

    // First, ensure we have users
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tenantId"), forumTenant._id))
      .collect();

    if (users.length === 0) {
      throw new Error("No users found. Please create users first using seedUsers mutation.");
    }

    // Get categories
    const categories = await ctx.db
      .query("forumCategories")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    const categoryMap = new Map(categories.map((c) => [c.name, c._id]));

    // Sample posts data
    const samplePosts = [
      {
        title: "What are the best practices for building scalable React applications in 2025?",
        content: "I've been working on a large-scale React project and I'm looking for advice on architecture patterns, state management, and performance optimization. What are your thoughts on React Server Components? How do you structure your apps for maintainability?",
        category: "Programming",
        tags: ["react", "javascript", "web-development", "architecture"],
        likes: 234,
        views: 1520,
        previewImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=338&fit=crop",
        aiSummary: "Discussion covers React Server Components, state management patterns, and performance optimization techniques for large-scale applications.",
      },
      {
        title: "The future of AI-powered design tools: Are designers being replaced?",
        content: "With tools like Midjourney, DALL-E, and Figma AI becoming more sophisticated, I'm wondering about the future of human designers. Will AI replace us or augment our capabilities? What skills should designers focus on?",
        category: "Design",
        tags: ["ai", "design", "future", "tools"],
        likes: 189,
        views: 980,
        previewImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=338&fit=crop",
        aiSummary: "Explores how AI tools like Midjourney and Figma AI are changing the design landscape and the evolving role of human designers.",
      },
      {
        title: "How I built a $10M ARR SaaS in 18 months with a team of 3",
        content: "After years of failed startups, I finally cracked the code. Here's my complete breakdown: how we found our niche, our tech stack (Next.js + Convex), our growth strategy, and the mistakes that almost killed us.",
        category: "Startups",
        tags: ["saas", "startup", "growth", "nextjs"],
        likes: 567,
        views: 3420,
        previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=338&fit=crop",
        aiSummary: "Detailed breakdown of growth strategies, tech stack choices, and lessons learned from scaling a B2B SaaS company rapidly.",
      },
      {
        title: "GPT-5 leaked benchmarks show unprecedented reasoning capabilities",
        content: "Anonymous sources have shared what appears to be GPT-5 benchmark scores. The results are stunning - 95% on MMLU, 89% on HumanEval, and a new multi-step reasoning test where it scores 92%. Is this AGI?",
        category: "AI & ML",
        tags: ["gpt", "openai", "ai", "llm"],
        likes: 892,
        views: 5680,
        previewImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=338&fit=crop",
        aiSummary: "Analysis of rumored GPT-5 performance metrics showing significant improvements in multi-step reasoning and code generation.",
      },
      {
        title: "The indie game that made $2M in its first week - A postmortem",
        content: "My solo dev journey: 2 years of work, countless rejections, and finally a breakout hit. I'll share the marketing strategies that worked (TikTok was huge), the launch timing, and what I'd do differently.",
        category: "Gaming",
        tags: ["game-dev", "indie", "marketing", "success"],
        likes: 445,
        views: 2890,
        previewImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=338&fit=crop",
        aiSummary: "Solo developer shares marketing strategies, launch timing decisions, and community building tactics that led to viral success.",
      },
      {
        title: "Understanding TypeScript's new satisfies operator",
        content: "TypeScript 5.0 introduced the `satisfies` operator and it's a game-changer for type safety. Unlike `as`, it actually validates your types. Here are practical examples of when and how to use it.",
        category: "Programming",
        tags: ["typescript", "types", "javascript"],
        likes: 321,
        views: 1890,
        aiSummary: "Deep dive into TypeScript's satisfies operator with practical examples and comparisons to type assertions.",
      },
      {
        title: "Design systems at scale: Lessons from 5 years of building one",
        content: "After 5 years maintaining a design system used by 50+ teams, here are my takeaways: start smaller than you think, document everything, and build for the 80% case first. The real challenge isn't technical - it's cultural.",
        category: "Design",
        tags: ["design-systems", "scaling", "teamwork"],
        likes: 276,
        views: 1450,
        aiSummary: "Insights on building and maintaining enterprise design systems with focus on cultural adoption and documentation.",
      },
      {
        title: "Y Combinator application tips from a 3x founder who got rejected twice",
        content: "Finally got into YC on my third try. The difference? I stopped trying to sound impressive and started being honest about our problems. Here's what I learned about crafting a compelling application.",
        category: "Startups",
        tags: ["y-combinator", "startup", "application"],
        likes: 398,
        views: 2100,
        aiSummary: "Authentic advice on YC applications emphasizing honesty over impressiveness, with specific tips for success.",
      },
      {
        title: "Fine-tuning LLaMA 2 for specialized tasks: A complete guide",
        content: "I spent 3 months figuring out how to effectively fine-tune LLaMA 2 for medical diagnosis assistance. This guide covers data preparation, LoRA vs full fine-tuning, evaluation metrics, and deployment.",
        category: "AI & ML",
        tags: ["llama", "fine-tuning", "ml", "tutorial"],
        likes: 678,
        views: 3890,
        previewImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=338&fit=crop",
        aiSummary: "Comprehensive guide to fine-tuning LLaMA 2 with practical tips on data preparation, training methods, and evaluation.",
      },
      {
        title: "Why Unity's new pricing model destroyed my indie game studio",
        content: "We were 6 months from launch when Unity announced the runtime fee. Suddenly our projections didn't work. We had to pivot to Godot, rewrite 30% of our codebase, and delayed launch by 4 months. Here's the full story.",
        category: "Gaming",
        tags: ["unity", "godot", "game-dev", "business"],
        likes: 756,
        views: 4560,
        aiSummary: "Firsthand account of how Unity's pricing changes impacted a small indie studio and the migration to Godot engine.",
      },
      {
        title: "The complete guide to CSS Grid vs Flexbox: When to use which",
        content: "Both are powerful, but they solve different problems. Grid is for 2D layouts, Flexbox for 1D. Here's a visual guide with 20 real-world examples showing when each shines. Hint: you probably need both.",
        category: "Programming",
        tags: ["css", "grid", "flexbox", "web-dev"],
        likes: 234,
        views: 1670,
        previewImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=338&fit=crop",
        aiSummary: "Visual comparison guide between CSS Grid and Flexbox with practical examples for each layout scenario.",
      },
      {
        title: "How to run user interviews when you have no budget",
        content: "Bootstrapping my startup meant zero dollars for research. But I still did 50+ user interviews. Here's how: Reddit communities, Twitter DMs, coffee chats, and the exact script I used that got a 60% response rate.",
        category: "Startups",
        tags: ["ux-research", "bootstrapping", "user-interviews"],
        likes: 345,
        views: 1890,
        aiSummary: "Resourceful strategies for conducting user research on zero budget with specific outreach templates and methods.",
      },
      {
        title: "Building accessible components: A developer's guide",
        content: "Accessibility isn't just a checklist - it's a mindset. This guide covers semantic HTML, ARIA labels, keyboard navigation, screen reader testing, and the tools that make it all easier. Your future self will thank you.",
        category: "Programming",
        tags: ["accessibility", "a11y", "web-dev"],
        likes: 287,
        views: 1540,
        aiSummary: "Comprehensive accessibility guide for developers covering semantic HTML, ARIA, keyboard navigation, and testing.",
      },
      {
        title: "The psychology of color in UI design: What the research says",
        content: "Blue increases trust, red creates urgency, but it's more nuanced than that. Cultural context, industry expectations, and user demographics all matter. Here's what the research actually says about color psychology.",
        category: "Design",
        tags: ["color", "psychology", "ui", "research"],
        likes: 298,
        views: 1620,
        previewImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=338&fit=crop",
        aiSummary: "Research-backed exploration of color psychology in UI design considering cultural and contextual factors.",
      },
      {
        title: "Prompt engineering is dead. Here's what's replacing it.",
        content: "After months of experimenting with LLMs, I've realized that elaborate prompt engineering isn't the future. Instead: structured outputs, function calling, and fine-tuning are what actually matter for production apps.",
        category: "AI & ML",
        tags: ["prompting", "llm", "production", "engineering"],
        likes: 512,
        views: 2870,
        aiSummary: "Argument that structured outputs and function calling are more important than prompt engineering for production LLM apps.",
      },
      {
        title: "Procedural generation in games: From noise to nations",
        content: "I built a game that generates entire continents with ecosystems, civilizations, and histories. This deep dive covers Perlin noise, cellular automata, graph theory for city layouts, and LLM-assisted lore generation.",
        category: "Gaming",
        tags: ["procedural", "game-dev", "algorithms", "llm"],
        likes: 423,
        views: 2340,
        previewImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&h=338&fit=crop",
        aiSummary: "Technical deep dive into procedural generation techniques covering noise, cellular automata, and AI-assisted content creation.",
      },
      {
        title: "Database sharding strategies: When and how to split your data",
        content: "Your startup is growing and the monolithic database is groaning. Here's a practical guide to sharding: key-based vs hash-based, handling cross-shard queries, and how we migrated 10TB of data with zero downtime.",
        category: "Programming",
        tags: ["database", "scaling", "sharding", "architecture"],
        likes: 367,
        views: 1980,
        aiSummary: "Practical guide to database sharding strategies with real-world migration examples and architectural considerations.",
      },
      {
        title: "Cold email frameworks that actually get responses",
        content: "I've sent 10,000+ cold emails and tested dozens of templates. The winners all follow a specific structure. Here are the 5 frameworks that consistently get 30%+ response rates, with examples for different scenarios.",
        category: "Startups",
        tags: ["sales", "email", "outreach", "templates"],
        likes: 289,
        views: 1560,
        aiSummary: "Data-driven cold email frameworks with proven response rates and templates for various sales scenarios.",
      },
      {
        title: "Creating design tokens that scale across your entire product",
        content: "Design tokens shouldn't just be CSS variables. They should be the source of truth for everything: Figma, code, documentation, and third-party tools. Here's the system I built that syncs automatically.",
        category: "Design",
        tags: ["design-tokens", "tools", "automation"],
        likes: 234,
        views: 1320,
        aiSummary: "Comprehensive design token system that syncs across Figma, code, and documentation with automation.",
      },
      {
        title: "Multimodal AI: Building apps that see and hear",
        content: "GPT-4V and Claude 3 can process images. But building products with vision is harder than it looks. This guide covers image preprocessing, context window management, prompt strategies, and production gotchas.",
        category: "AI & ML",
        tags: ["multimodal", "vision", "gpt-4v", "production"],
        likes: 445,
        views: 2560,
        aiSummary: "Production guide for building multimodal AI applications with vision capabilities, covering technical challenges and solutions.",
      },
      {
        title: "The hidden costs of multiplayer game development",
        content: "Single-player to multiplayer seems like a small change, but it affects everything. Server costs, cheating prevention, netcode, match-making, player retention. I learned these lessons the hard way over 3 years.",
        category: "Gaming",
        tags: ["multiplayer", "game-dev", "networking", "lessons"],
        likes: 334,
        views: 1890,
        aiSummary: "Firsthand lessons on the complexities of multiplayer game development from server infrastructure to player experience.",
      },
      {
        title: "Rust for TypeScript developers: A practical comparison",
        content: "I've been writing TypeScript for 5 years and recently learned Rust. The mental model shift is real but rewarding. This guide compares concepts side-by-side: async/await vs async, error handling, memory management, and the ecosystem.",
        category: "Programming",
        tags: ["rust", "typescript", "comparison", "learning"],
        likes: 456,
        views: 2670,
        aiSummary: "Side-by-side comparison of Rust and TypeScript for developers transitioning from TypeScript to Rust.",
      },
      {
        title: "Negotiating your first enterprise B2B sale: A field guide",
        content: "Selling to enterprises is completely different from SMB sales. Longer cycles, legal reviews, procurement battles, security questionnaires. Here's how I navigated my first $100k deal and what I'd do differently.",
        category: "Startups",
        tags: ["sales", "b2b", "enterprise", "negotiation"],
        likes: 378,
        views: 2100,
        aiSummary: "Practical guide to navigating enterprise B2B sales processes from prospecting to closing the deal.",
      },
      {
        title: "Micro-interactions that delight users (and how to build them)",
        content: "The best products feel alive. It's in the small moments: button states, loading animations, success messages. Here's a collection of 30 micro-interactions with code examples and the UX principles behind them.",
        category: "Design",
        tags: ["micro-interactions", "ux", "animation", "examples"],
        likes: 312,
        views: 1780,
        previewImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=338&fit=crop",
        aiSummary: "Collection of micro-interaction examples with code and UX principles for creating delightful user experiences.",
      },
    ];

    // Create posts
    const postIds: import("./_generated/dataModel").Id<"forumPosts">[] = [];
    for (let i = 0; i < samplePosts.length; i++) {
      const postData = samplePosts[i];
      const categoryId = categoryMap.get(postData.category);

      if (!categoryId) {
        console.warn(`Category not found: ${postData.category}`);
        continue;
      }

      // Assign users round-robin
      const authorId = users[i % users.length]._id;

      // Vary timestamps over the past 7 days
      const timestamp = now - i * 6 * 60 * 60 * 1000 - Math.floor(Math.random() * 24 * 60 * 60 * 1000);

      const postId = await ctx.db.insert("forumPosts", {
        tenantId: forumTenant._id,
        authorId,
        title: postData.title,
        content: postData.content,
        category: postData.category,
        tags: postData.tags,
        likes: postData.likes,
        views: postData.views,
        pinned: i === 0, // Pin first post
        locked: false,
        aiSummary: postData.aiSummary,
        previewImage: postData.previewImage,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      postIds.push(postId);

      // Create user reputation for the author
      const existingReputation = await ctx.db
        .query("userReputation")
        .withIndex("by_user", (q) => q.eq("userId", authorId))
        .first();

      if (!existingReputation) {
        // Determine level based on total likes received
        let level = "bronze";
        const totalLikes = postData.likes;
        if (totalLikes > 500) level = "gold";
        else if (totalLikes > 200) level = "silver";

        await ctx.db.insert("userReputation", {
          userId: authorId,
          tenantId: forumTenant._id,
          points: postData.likes * 10 + Math.floor(postData.views / 10),
          level: level as "bronze" | "silver" | "gold" | "platinum",
          postsCreated: 1,
          commentsCreated: 0,
          likesReceived: postData.likes,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
    }

    // Create some sample comments
    const commentCount = Math.min(50, postIds.length * 3);
    for (let i = 0; i < commentCount; i++) {
      const postId = postIds[i % postIds.length];
      const authorId = users[(i + 1) % users.length]._id;
      const timestamp = now - i * 2 * 60 * 60 * 1000;

      await ctx.db.insert("forumComments", {
        postId,
        authorId,
        content: [
          "Great insights! I've been thinking about this too.",
          "This is exactly what I needed to read today. Thanks!",
          "Have you considered looking at this from another angle?",
          "I tried something similar and here's what happened...",
          "Can you elaborate more on this point?",
          "This changed my perspective completely.",
          "Adding this to my reading list.",
        ][i % 7],
        likes: Math.floor(Math.random() * 50),
        parentId: undefined,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    return {
      message: "Forum posts seeded successfully",
      postsCreated: postIds.length,
      commentsCreated: commentCount,
    };
  },
});

/**
 * Clear all forum seed data (use with caution!)
 */
export const clearForumSeedData = mutation({
  args: {},
  handler: async (ctx) => {
    const forumTenant = await ctx.db
      .query("tenants")
      .withIndex("by_slug", (q) => q.eq("slug", "forum"))
      .first();

    if (!forumTenant) {
      throw new Error("Forum tenant not found.");
    }

    // Delete all comments for forum tenant posts
    const posts = await ctx.db
      .query("forumPosts")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    for (const post of posts) {
      const comments = await ctx.db
        .query("forumComments")
        .withIndex("by_post", (q) => q.eq("postId", post._id))
        .collect();

      for (const comment of comments) {
        await ctx.db.delete(comment._id);
      }
    }

    // Delete all posts for forum tenant
    for (const post of posts) {
      await ctx.db.delete(post._id);
    }

    // Delete all reputation for forum tenant
    const reputations = await ctx.db
      .query("userReputation")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    for (const reputation of reputations) {
      await ctx.db.delete(reputation._id);
    }

    // Delete all categories for forum tenant
    const categories = await ctx.db
      .query("forumCategories")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    for (const category of categories) {
      await ctx.db.delete(category._id);
    }

    // Delete all campaigns for forum tenant
    const campaigns = await ctx.db
      .query("forumCampaigns")
      .withIndex("by_tenant", (q) => q.eq("tenantId", forumTenant._id))
      .collect();

    for (const campaign of campaigns) {
      await ctx.db.delete(campaign._id);
    }

    return {
      message: "Forum seed data cleared successfully",
      postsDeleted: posts.length,
      categoriesDeleted: categories.length,
      campaignsDeleted: campaigns.length,
      reputationsDeleted: reputations.length,
    };
  },
});
