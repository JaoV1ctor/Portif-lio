# System Global State (The Law)

# System Global State (The Law)

## JSON Data Schema
To enforce the "Data-First Rule", all dynamic content (Projects, Skills, Social Links) must adhere to this schema. Since the data lives locally, it will be implemented in a central configuration file.

```typescript
type SocialLink = {
  platform: 'Github' | 'Linkedin' | 'Twitter' | 'Mail';
  url: string; // Must be absolute or mailto:
};

type Skill = {
  name: string;
  category: string;
  relatedProjectIds: string[]; // Logic of Evidence constraint: Must refer to actual project
};

type Project = {
  id: string; // e.g. "proj-1"
  date: string; // Used for Recency priority
  title: string; // The Hook
  resultMetric: string; // The Result
  technologies: string[]; // The Tools
  description: string;
  repoUrl?: string;
  liveUrl?: string;
};

type PortfolioData = {
  socials: SocialLink[];
  skills: Skill[];
  projects: Project[]; // Must be sorted by date desc
};
```

## Maintenance Log
- Initialized schema based on Phase 1 Discovery (Blueprint phase).
