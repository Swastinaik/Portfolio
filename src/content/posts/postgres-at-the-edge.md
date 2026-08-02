---
title: "Postgres at the edge is not Postgres"
date: "2024.11.02"
readTime: "5min"
tag: "postgres"
author: "Swastik"
summary: "Why edge replication breaks traditional ACID guarantees and how to architect hybrid read-local caches."
---

# Postgres at the edge is not Postgres

*Published on November 02, 2024 — 5 min read · Category: postgres*

---

Running relational databases at the edge sounds like a dream: sub-10ms response times worldwide, zero network hops, and instantaneous queries. However, physics and consistency bounds quickly break the simple mental model.

> "Don't move the entire database to the edge. Move the query cache and authentication checks to the edge, and keep stateful transactions centralized."

## The Latency vs. Consistency Paradox

When you push database replicas to 30 region edges around the globe, every ACID transaction faces a hard choice:

1. **Async Replication:** Reads are immediate, but writes run the risk of dirty reads or split-brain conflicts across edges.
2. **Synchronous Consensus (Raft/Paxos):** Roundtrips between edge nodes negate the speed gains of placing data close to the user.

```sql
-- What developers think happens on edge:
SELECT * FROM users WHERE id = 'usr_99' FOR UPDATE;

-- What actually happens behind the scenes:
-- 1. Latency penalty to reach leader node in us-east-1 (90ms)
-- 2. Lock acquire delay across consensus quorum
-- 3. Cache invalidation broadcast to 35 edge regions
```

### Benchmark Latency Comparison

| Region | Direct Edge Read | Edge-to-Origin Write | Raft Quorum Latency |
| :--- | :--- | :--- | :--- |
| **us-east-1 (N. Virginia)** | 1.2ms | 2.4ms | 12ms |
| **ap-south-1 (Mumbai)** | 1.8ms | 184ms | 210ms |
| **eu-central-1 (Frankfurt)** | 1.4ms | 94ms | 115ms |

## The Pragmatic Solution: Hybrid Read-Local Architecture

Keep your source-of-truth Postgres cluster in a primary cloud region (e.g. `us-east-1`), while exposing read-only transactional caches at the edge using connection pooling and micro-batch invalidations.

```typescript
import { ConnectionPool } from '@planetscale/edge';

export const db = new ConnectionPool({
  url: process.env.DATABASE_URL,
  cacheMode: 'stale-while-revalidate',
  maxCacheAgeMs: 5000,
});
```

- [x] Connection Pooling with HTTP/3 keep-alive
- [x] Micro-batch invalidation headers
- [x] Read-replica routing rules

---

*Written by Swastik. Feel free to copy or reference this architecture note.*
