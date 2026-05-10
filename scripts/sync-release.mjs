import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../src/data/releases.generated.json');

const repo = process.env.MAI_REPO || 'Astroite/MAI';
const token = process.env.GITHUB_TOKEN;

function inferPlatform(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('win') || lower.endsWith('.exe') || lower.endsWith('.msi') || lower.includes('x64-setup') || lower.includes('x64_setup'))
    return 'windows';
  if (lower.includes('mac') || lower.includes('darwin') || lower.endsWith('.dmg') || lower.endsWith('.pkg'))
    return 'macos';
  if (lower.includes('linux') || lower.endsWith('.appimage') || lower.endsWith('.deb') || lower.endsWith('.rpm'))
    return 'linux';
  if (lower.endsWith('.tar.gz') || lower.endsWith('.zip') || lower.endsWith('.tar'))
    return 'source';
  return 'unknown';
}

async function main() {
  console.log(`Fetching latest release from ${repo}...`);

  const headers = { Accept: 'application/vnd.github+json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });

  if (!res.ok) {
    const msg = `GitHub API failed: ${res.status} ${res.statusText}`;
    console.error(msg);

    if (existsSync(OUTPUT_PATH)) {
      console.log('Existing release data preserved.');
      process.exit(0);
    }
    throw new Error(msg);
  }

  const release = await res.json();

  const data = {
    version: release.tag_name || '',
    name: release.name || '',
    publishedAt: release.published_at || '',
    htmlUrl: release.html_url || '',
    body: release.body || '',
    assets: (release.assets || []).map((asset) => ({
      name: asset.name,
      size: asset.size,
      downloadCount: asset.download_count,
      githubUrl: asset.browser_download_url,
      mirrorUrl: '',
      platform: inferPlatform(asset.name),
    })),
    syncedAt: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`Release data written to ${OUTPUT_PATH}`);
  console.log(`Version: ${data.version}, Assets: ${data.assets.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
