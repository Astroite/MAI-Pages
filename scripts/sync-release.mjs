import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../src/data/releases.generated.json');
const DOWNLOADS_DIR = resolve(__dirname, '../public/downloads');
const SITE_URL = process.env.SITE_URL || 'https://mai.astroite.com';

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

function isDownloadableBinary(name) {
  const lower = name.toLowerCase();
  return lower.endsWith('.exe') || lower.endsWith('.msi') || lower.endsWith('.dmg')
    || lower.endsWith('.pkg') || lower.endsWith('.appimage') || lower.endsWith('.deb')
    || lower.endsWith('.rpm');
}

async function downloadFile(url, destPath) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers, redirect: 'follow' });
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);

  const fileStream = (await import('node:fs')).createWriteStream(destPath);
  await pipeline(res.body, fileStream);
  console.log(`  Downloaded: ${destPath}`);
}

async function main() {
  console.log(`Fetching latest release from ${repo}...`);

  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

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

  // Clean old downloads
  if (existsSync(DOWNLOADS_DIR)) {
    for (const f of readdirSync(DOWNLOADS_DIR)) {
      unlinkSync(resolve(DOWNLOADS_DIR, f));
    }
  } else {
    mkdirSync(DOWNLOADS_DIR, { recursive: true });
  }

  // Download binaries to public/downloads/
  const downloadable = (release.assets || []).filter(a => isDownloadableBinary(a.name));
  console.log(`Downloading ${downloadable.length} binary asset(s)...`);

  for (const asset of downloadable) {
    const destPath = resolve(DOWNLOADS_DIR, asset.name);
    try {
      await downloadFile(asset.browser_download_url, destPath);
    } catch (err) {
      console.error(`  Failed to download ${asset.name}: ${err.message}`);
    }
  }

  // Build release data with mirrorUrl pointing to Pages CDN
  const data = {
    version: release.tag_name || '',
    name: release.name || '',
    publishedAt: release.published_at || '',
    htmlUrl: release.html_url || '',
    body: release.body || '',
    assets: (release.assets || []).map((asset) => {
      const platform = inferPlatform(asset.name);
      const isBinary = isDownloadableBinary(asset.name);
      return {
        name: asset.name,
        size: asset.size,
        downloadCount: asset.download_count,
        githubUrl: asset.browser_download_url,
        mirrorUrl: isBinary ? `${SITE_URL}/downloads/${asset.name}` : '',
        platform,
      };
    }),
    syncedAt: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`Release data written to ${OUTPUT_PATH}`);
  console.log(`Version: ${data.version}, Assets: ${data.assets.length}`);
  console.log(`Mirror base: ${SITE_URL}/downloads/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
