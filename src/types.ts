export interface ProjectItem {
  id: string;
  name: string;
  liveUrl?: string;
  githubUrl?: string;
  stack: string;
  year: string;
  status: 'LIVE' | 'OSS' | 'BETA';
  isLiveOrange?: boolean;
  descriptionPoints?: string[];
  descriptionPoint1?: string;
  descriptionPoint2?: string;
  impactPoint2?: string;
  detailsMarkdown: string;
}

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  readTime: string;
  tag: string;
  contentMarkdown: string;
}

export interface PropertyRow {
  key: string;
  value: string;
  isLink?: boolean;
  linkHref?: string;
}
