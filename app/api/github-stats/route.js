export async function GET(req) {
  try {
    const username = 'iMved2075';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
      return Response.json({ error: 'GitHub token not configured.' }, { status: 500 });
    }

    // 1. Fetch user profile info
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });
    const user = await userRes.json();

    // 2. Fetch repositories
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&per_page=100`,
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }
    
    const repos = await response.json();
    
    
    // Get languages used
    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count }));


    // Fetch total commits
    let totalCommits = 0;
    for (const repo of repos) {
      try {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1&author=${username}`,
          {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
          }
        );
        
        if (commitsRes.ok) {
          const linkHeader = commitsRes.headers.get('Link');
          if (linkHeader) {
            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (match) {
              totalCommits += parseInt(match[1]);
            } else {
              totalCommits += 1;
            }
          } else {
            const commits = await commitsRes.json();
            totalCommits += commits.length;
          }
        }
      } catch (err) {
        console.error(`Error fetching commits for ${repo.name}:`, err.message);
      }
    }

    // 3. Fetch contribution data (last year)
    const contributionsRes = await fetch(
      `https://api.github.com/search/commits?q=author:${username}+committer-date:>${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`,
      {
        headers: { 
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.cloak-preview'
        },
      }
    );
    const contributions = contributionsRes.ok ? await contributionsRes.json() : { total_count: 0 };

    return Response.json({ 
      // Basic Stats
      totalRepos: repos.length,
      totalCommits,
      
      // Profile Stats
      followers: user.followers,
      following: user.following,
      publicGists: user.public_gists,
      accountCreated: user.created_at,
      mostUsedLanguage: topLanguages.length > 0 ? topLanguages[0].language : null,
      
      // Language Stats
      topLanguages,
      
      
      // Recent Activity
      contributionsLastYear: contributions.total_count,
    });
    
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    return Response.json({ error: 'Failed to fetch GitHub stats.' }, { status: 500 });
  }
}