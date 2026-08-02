export interface PostMetaData {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  author: string;
  summary: string;
  isMdx: boolean;
  contentMarkdown: string;
  filePath: string;
}

// Dynamically discover all .md and .mdx files inside @content/posts (src/content/posts)
const postModules = import.meta.glob<string>(
  [
    '/src/content/posts/*.md',
    '/src/content/posts/*.mdx',
    '../content/posts/*.md',
    '../content/posts/*.mdx',
  ],
  { query: '?raw', eager: true, import: 'default' }
);

export function parseFrontmatter(rawContent: string, filePath: string): PostMetaData {
  const isMdx = filePath.endsWith('.mdx');
  const filename = filePath.split('/').pop() || '';
  const defaultSlug = filename.replace(/\.(md|mdx)$/, '');

  const metadata: Record<string, string> = {};
  let body = rawContent;

  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = rawContent.match(frontmatterRegex);

  if (match) {
    const yamlBlock = match[1];
    body = rawContent.slice(match[0].length);

    yamlBlock.split('\n').forEach((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        metadata[key] = value;
      }
    });
  }

  let title = metadata.title;
  if (!title) {
    const h1Match = body.match(/^#\s+(.+)$/m);
    title = h1Match ? h1Match[1] : defaultSlug;
  }

  return {
    id: metadata.slug || defaultSlug,
    slug: metadata.slug || defaultSlug,
    title: title,
    date: metadata.date || '2025.01.01',
    readTime: metadata.readTime || '5min',
    tag: metadata.tag || 'tech',
    author: metadata.author || 'Swastik',
    summary:
      metadata.summary ||
      body
        .slice(0, 160)
        .replace(/[#*`>-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim() + '...',
    isMdx,
    contentMarkdown: body,
    filePath,
  };
}

export function getAllPostsFromFolder(): PostMetaData[] {
  const posts: PostMetaData[] = [];
  const processedSlugs = new Set<string>();

  for (const [path, rawContent] of Object.entries(postModules)) {
    if (typeof rawContent === 'string' && rawContent.trim()) {
      const parsed = parseFrontmatter(rawContent, path);
      if (!processedSlugs.has(parsed.slug)) {
        processedSlugs.add(parsed.slug);
        posts.push(parsed);
      }
    }
  }

  // Sort by date descending (YYYY.MM.DD or standard date format)
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): PostMetaData | undefined {
  const allPosts = getAllPostsFromFolder();
  return allPosts.find((p) => p.slug === slug || p.id === slug);
}
