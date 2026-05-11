export interface ReleaseAsset {
  name: string;
  size: number;
  downloadCount?: number;
  githubUrl: string;
  mirrorUrl: string;
  platform: string;
  sha256?: string;
}

export interface ReleaseData {
  version: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  body: string;
  assets: ReleaseAsset[];
  syncedAt: string;
}

export type Lang = 'zh-CN' | 'en';

export function inferPlatform(filename: string): string {
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

const INSTALLER_EXT = /\.(exe|msi|dmg|pkg|deb|rpm|appimage)$/i;

export function isInstallerAsset(asset: ReleaseAsset): boolean {
  return INSTALLER_EXT.test(asset.name);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function formatDate(dateStr: string, lang: Lang = 'zh-CN'): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const locale = lang === 'en' ? 'en-US' : 'zh-CN';
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getPlatformLabel(platform: string, lang: Lang = 'zh-CN'): string {
  switch (platform) {
    case 'windows': return 'Windows';
    case 'macos': return 'macOS';
    case 'linux': return 'Linux';
    case 'source': return lang === 'en' ? 'Source' : '源码';
    default: return lang === 'en' ? 'Other' : '其他';
  }
}
