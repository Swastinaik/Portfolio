import type { ProjectItem, BlogPost, PropertyRow } from '../types';

export const PERSONAL_INFO = {
  name: 'Swasti Santosh Naik',
  title: 'Full-stack developer',
  bio: 'Distributed systems engineer specializing in high-throughput backends and instant-feeling user interfaces. Engineering database-driven applications, edge APIs, and developer tools.',
  frontendStack: 'React.js / TypeScript / Next.js / Tailwind CSS',
  backendStack: 'Python / Node.js / FastAPI / REST & GraphQL APIs',
  infraStack: 'PostgreSQL / Redis / Docker / AWS',
  focus: 'High-throughput systems & fast UIs',
  email: 'swastinaik273@gmail.com',
  github: 'https://github.com/swastik',
  sqlQuery: 'SELECT * FROM developer WHERE shipping = true;',
};

export const PROPERTY_TABLE: PropertyRow[] = [
  { key: 'FRONTEND', value: PERSONAL_INFO.frontendStack },
  { key: 'BACKEND', value: PERSONAL_INFO.backendStack },
  { key: 'INFRA', value: PERSONAL_INFO.infraStack },
  { key: 'FOCUS', value: PERSONAL_INFO.focus },
  { key: 'EMAIL', value: PERSONAL_INFO.email, isLink: true, linkHref: `mailto:${PERSONAL_INFO.email}` },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: '01',
    name: 'Docs4all - AI platform for Grant Generation',
    liveUrl: 'https://docs4all.online/',
    githubUrl: 'https://github.com/Swastinaik/grant_project_frontend',
    stack: 'Next.js / Python / AI Agents',
    year: '2025',
    status: 'LIVE',
    isLiveOrange: true,
    descriptionPoints: [
      "Built an Agentic AI platform with multi-agent RAG workflows for intelligent document generation and review.",
      "Engineered secure, asynchronous FastAPI services with JWT authentication and optimized context retrieval."
    ],
    impactPoint2: 'Reduced the manual effort by 80% and accelerating production timelines by 3x to 5x',
    detailsMarkdown: '',
  },
  {
    id: '02',
    name: 'DeployHub – A Monitoring Platform for CI/CD',
    liveUrl: 'https://deployhub-github.vercel.app/',
    githubUrl: 'https://github.com/Swastinaik/Deployhub',
    stack: 'Node.js / Github Actions / PostgreSQL',
    year: '2026',
    status: 'LIVE',
    isLiveOrange: false,
    descriptionPoints: [
      "Built a full-stack DevOps platform with real-time deployment monitoring and secure authentication.",
      "Automated Docker-based CI/CD pipelines on AWS using GitHub Actions for zero-downtime deployments."
    ],
    impactPoint2: 'Significantly Reduces the debug time for CI/CD related errors with Insights.',
    detailsMarkdown: '',
  },
  {
    id: '03',
    name: 'Signalist - AI powered Stock Market Tracker',
    liveUrl: 'https://signalist-stock-track.vercel.app/',
    githubUrl: 'https://github.com/Swastinaik/Siganlist_stock_tracker',
    stack: 'Next.js / BetterAuth / MongoDB',
    year: '2025',
    status: 'OSS',
    isLiveOrange: false,
    descriptionPoints: [
      "Built a real-time AI stock platform with live data, charts, watchlists, and search.",
      "Automated alerts, AI summaries, and notifications using Inngest workflows."
    ],
    impactPoint2: 'Delivered a real-time stock trading experience with AI-powered insights and automated market notifications',
    detailsMarkdown: '',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '01',
    date: '2024.11.02',
    title: 'Postgres at the edge is not Postgres',
    readTime: '5min',
    tag: 'postgres',
    contentMarkdown: `# Postgres at the edge is not Postgres

*Published on November 02, 2024 — 5 min read*

---

Running relational databases at the edge sounds like a dream: sub-10ms response times worldwide, zero network hops, and instantaneous queries. However, physics and consistency bounds quickly break the simple mental model.

## The Latency vs. Consistency Paradox

When you push database replicas to 30 region edges around the globe, every ACID transaction faces a hard choice:

1. **Async Replication:** Reads are immediate, but writes run the risk of dirty reads or split-brain conflicts across edges.
2. **Synchronous Consensus (Raft/Paxos):** Roundtrips between edge nodes negate the speed gains of placing data close to the user.

\`\`\`sql
-- What developers think happens on edge:
SELECT * FROM users WHERE id = 'usr_99' FOR UPDATE;

-- What actually happens behind the scenes:
-- 1. Latency penalty to reach leader node in us-east-1 (90ms)
-- 2. Lock acquire delay across consensus quorum
-- 3. Cache invalidation broadcast to 35 edge regions
\`\`\`

## The Pragmatic Solution: Hybrid Read-Local Architecture

Keep your source-of-truth Postgres cluster in a primary cloud region (e.g. \`us-east-1\`), while exposing read-only transactional caches at the edge using connection pooling and micro-batch invalidations.

> "Don't move the entire database to the edge. Move the query cache and authentication checks to the edge, and keep stateful transactions centralized."

---

*Written by Swastik. Feel free to copy or share this post.*
`,
  },
  {
    id: '02',
    date: '2024.09.18',
    title: 'Why I stopped using ORMs for write-heavy paths',
    readTime: '7min',
    tag: 'databases',
    contentMarkdown: `# Why I stopped using ORMs for write-heavy paths

*Published on September 18, 2024 — 7 min read*

---

Object-Relational Mappers (ORMs) excel at CRUD apps and rapid prototyping. But as transaction rates scale past 5,000 writes per second, standard ORM patterns become performance bottlenecks.

## 1. N+1 Update Queries & Missing Bulk Writes

Most ORMs translate loop modifications into separate \`UPDATE\` queries instead of single CTEs or bulk parameters:

\`\`\`typescript
// Bad: ORM loop generating 1,000 separate network roundtrips
for (const user of activeUsers) {
  await db.user.update({
    where: { id: user.id },
    data: { lastActive: new Date() }
  });
}

// Good: Raw SQL CTE with batch parameter binding
await db.execute(sql\`
  UPDATE users 
  SET last_active = NOW()
  WHERE id = ANY(\${userIds});
\`);
\`\`\`

## 2. Unnecessary Column Selects

ORMs default to selecting all table columns (\`SELECT *\`), fetching heavy JSONB blobs or text columns even when you only need a single boolean flag.

## Recommendation

Use type-safe SQL query builders like Kysely or SQLx, or raw parameterized SQL files for high-throughput write paths while keeping ORMs for simple admin panels.
`,
  },
  {
    id: '03',
    date: '2024.07.04',
    title: 'CRDTs without the headache',
    readTime: '10min',
    tag: 'distributed',
    contentMarkdown: `# CRDTs without the headache

*Published on July 04, 2024 — 10 min read*

---

Conflict-Free Replicated Data Types (CRDTs) enable multi-user collaborative editing and offline-first client sync without central locking.

## Understanding State-Based vs Operation-Based CRDTs

- **State-based (CvRDT):** Replicas exchange their entire state payload and merge via a monotonic join operator.
- **Operation-based (CmRDT):** Replicas stream fine-grained mutation operations over a reliable causal broadcast channel.

\`\`\`rust
// Simple LWW (Last-Write-Wins) Element Register in Rust
pub struct LWWRegister<T> {
    pub value: T,
    pub timestamp: u64,
    pub peer_id: String,
}

impl<T: Clone> LWWRegister<T> {
    pub fn merge(&mut self, incoming: LWWRegister<T>) {
        if incoming.timestamp > self.timestamp 
           || (incoming.timestamp == self.timestamp && incoming.peer_id > self.peer_id) {
            self.value = incoming.value;
            self.timestamp = incoming.timestamp;
            self.peer_id = incoming.peer_id;
        }
    }
}
\`\`\`

By structuring your application state around commutative and associative merge rules, offline conflicts vanish naturally.
`,
  },
  {
    id: '04',
    date: '2024.04.12',
    title: 'Edge billing is a database problem',
    readTime: '6min',
    tag: 'systems',
    contentMarkdown: `# Edge billing is a database problem

*Published on April 12, 2024 — 6 min read*

---

Calculating usage metrics for millions of API calls in real time requires guaranteed delivery without adding latency to customer requests.

## The Architecture of High-Scale Metering

1. **Fire-and-Forget Ingestion:** Edge API gateways emit lightweight telemetry events to zero-allocation memory rings.
2. **Time-Bucket Aggregation:** Events are grouped in 1-second windows at the regional edge node.
3. **Database Sink:** Aggregates are flushed to time-series Postgres hyper-tables using parallel \`COPY\` streams.

This keeps customer API response times strictly unaffected while maintaining sub-penny precision billing records.
`,
  },
  {
    id: '05',
    date: '2024.01.29',
    title: 'The 100ms backend checklist',
    readTime: '4min',
    tag: 'performance',
    contentMarkdown: `# The 100ms backend checklist

*Published on January 29, 2024 — 4 min read*

---

A practical checklist for ensuring API endpoints respond consistently under 100ms globally:

- [x] **Connection Pooling:** Use HTTP/2 or HTTP/3 keep-alive + PgBouncer for DB connections.
- [x] **Index Tuning:** Ensure no sequential scans on foreign key relationships.
- [x] **Zero Cold-Starts:** Keep serverless workers warm or deploy to edge container runtimes.
- [x] **Response Compression:** Enable Brotli (level 4) for payloads over 1KB.
- [x] **Cache Control:** Use \`stale-while-revalidate\` header directives for read paths.
- [x] **Query Caching:** Store pre-serialized JSON in Redis for ultra-frequent reads.
`,
  },
];
