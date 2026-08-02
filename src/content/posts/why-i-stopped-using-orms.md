---
title: "Why I stopped using ORMs for write-heavy paths"
date: "2024.09.18"
readTime: "7min"
tag: "databases"
author: "Swastik"
summary: "Analyzing N+1 update query bottlenecks and why raw SQL / CTEs outperform heavy object mappers."
---

# Why I stopped using ORMs for write-heavy paths

*Published on September 18, 2024 — 7 min read · Category: databases*

---

Object-Relational Mappers (ORMs) excel at CRUD apps and rapid prototyping. But as transaction rates scale past 5,000 writes per second, standard ORM patterns become performance bottlenecks.

> "ORMs obscure SQL performance characteristics. For high-throughput paths, control over raw SQL parameters is mandatory."

## 1. N+1 Update Queries & Missing Bulk Writes

Most ORMs translate loop modifications into separate `UPDATE` queries instead of single CTEs or bulk parameters:

```typescript
// Bad: ORM loop generating 1,000 separate network roundtrips
for (const user of activeUsers) {
  await db.user.update({
    where: { id: user.id },
    data: { lastActive: new Date() }
  });
}

// Good: Raw SQL CTE with batch parameter binding
await db.execute(sql`
  UPDATE users 
  SET last_active = NOW()
  WHERE id = ANY(${userIds});
`);
```

## 2. Unnecessary Column Selects

ORMs default to selecting all table columns (`SELECT *`), fetching heavy JSONB blobs or text columns even when you only need a single boolean flag.

```sql
-- Optimal query written explicitly:
SELECT id, is_active FROM users WHERE tenant_id = $1 AND last_login > $2;
```

---

*Written by Swastik. Feel free to copy or share this post.*
