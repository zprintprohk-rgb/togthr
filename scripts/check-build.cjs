// Check build for c33a3d7
const OWNER = 'zprintprohk-rgb';
const REPO = 'togthr';
(async () => {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/actions/runs?per_page=3`, {
    headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'verify' }
  });
  const data = await r.json();
  for (const run of data.workflow_runs || []) {
    console.log({
      sha: run.head_sha?.substring(0, 7),
      status: run.status,
      conclusion: run.conclusion,
      duration: run.run_started_at ? `${Math.round((new Date(run.updated_at) - new Date(run.run_started_at))/1000)}s` : '-',
      name: run.name,
      url: run.html_url,
    });
  }
})();