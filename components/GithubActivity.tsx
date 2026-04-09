import GithubActivityClient from './GithubActivityClient';

// ISR Cache Configuration
export const revalidate = 3600; // 1 hour

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
};

type GithubProfile = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string;
};

async function getGithubData() {
  try {
    const profileRes = await fetch('https://api.github.com/users/JaoV1ctor', {
      next: { revalidate: 3600 }
    });
    
    const reposRes = await fetch('https://api.github.com/users/JaoV1ctor/repos?sort=updated&per_page=2', {
      next: { revalidate: 3600 }
    });

    if (!profileRes.ok || !reposRes.ok) {
      return null;
    }

    const profile: GithubProfile = await profileRes.json();
    const repos: Repo[] = await reposRes.json();

    return { profile, repos };
  } catch (error) {
    console.error('Error fetching github data:', error);
    return null;
  }
}

export default async function GithubActivity() {
  const data = await getGithubData();

  if (!data) {
    return null; // Silent fail if API limit is reached
  }

  const { profile, repos } = data;

  return <GithubActivityClient profile={profile} repos={repos} />;
}
