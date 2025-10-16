export async function GET(req) {
  try {
    const username = 'iMved2075';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
      return Response.json({ error: 'GitHub token not configured.' }, { status: 500 });
    }

    // Fetch all repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API responded with status ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    // Fetch technologies/languages for each repo
    const reposWithTech = await Promise.all(
      repos.map(async (repo) => {
        try {
          // Fetch languages used in the repo
          const langResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/languages`,
            {
              headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
              },
            }
          );

          const languages = langResponse.ok ? await langResponse.json() : {};
          
          // Convert languages object to array and calculate percentages
          const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
          const languagesArray = Object.entries(languages).map(([lang, bytes]) => ({
            name: lang,
            bytes,
            percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0
          })).sort((a, b) => b.bytes - a.bytes);

          // Fetch README to get more info (optional)
          let readme = null;
          try {
            const readmeResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/readme`,
              {
                headers: {
                  Authorization: `Bearer ${GITHUB_TOKEN}`,
                  Accept: 'application/vnd.github.v3.raw'
                },
              }
            );
            if (readmeResponse.ok) {
              readme = await readmeResponse.text();
            }
          } catch (err) {
            // README not found, skip
          }

          return {
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            watchers: repo.watchers_count,
            openIssues: repo.open_issues_count,
            language: repo.language,
            languages: languagesArray,
            topics: repo.topics || [],
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            size: repo.size,
            defaultBranch: repo.default_branch,
            isPrivate: repo.private,
            isFork: repo.fork,
            isArchived: repo.archived,
            license: repo.license?.name || null,
            hasReadme: readme !== null,
            readmePreview: readme ? readme.substring(0, 200) : null
          };
        } catch (error) {
          console.error(`Error fetching data for ${repo.name}:`, error.message);
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            error: 'Could not fetch complete data'
          };
        }
      })
    );

    // Filter out forks and archived repos (optional)
    const activeRepos = reposWithTech.filter(repo => !repo.isFork && !repo.isArchived);

    // Sort by stars or update date
    const sortedRepos = activeRepos.sort((a, b) => b.stars - a.stars);

    return Response.json({
      totalRepos: repos.length,
      activeRepos: activeRepos.length,
      repositories: sortedRepos,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('GitHub API Error:', error.message);
    return Response.json({ 
      error: 'Failed to fetch GitHub repositories.',
      message: error.message 
    }, { status: 500 });
  }
}