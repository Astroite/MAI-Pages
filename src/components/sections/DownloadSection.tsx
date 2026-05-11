import { useState, useEffect, useMemo } from 'react';
import type { ReleaseData, ReleaseAsset, Lang } from '../../lib/release';
import { formatFileSize, formatDate, getPlatformLabel, isInstallerAsset } from '../../lib/release';
import { GITHUB_RELEASES_URL } from '../../lib/constants';

type Source = 'cos' | 'github';

const STRINGS = {
  'zh-CN': {
    title: '下载最新版 MAI',
    subtitle:
      '网站会自动同步 MAI GitHub Release，并优先提供适合大陆访问的镜像下载入口。如果镜像暂不可用，也会保留 GitHub 原始下载链接。',
    loading: '正在检查最新版本...',
    noAssets: '暂无可下载的安装包',
    noData: '暂无 Release 数据',
    viewAll: '查看全部 Release',
    goReleases: '前往 GitHub Releases',
    sourceLabel: '下载源',
    cosTab: '腾讯云镜像',
    cosTabHint: '国内加速',
    githubTab: 'GitHub',
    githubTabHint: '官方源',
    cosBadge: '镜像',
    cosEmpty: '当前版本没有提供腾讯云镜像，请切换到 GitHub 源进行下载。',
  },
  en: {
    title: 'Download the latest MAI',
    subtitle:
      'This site auto-syncs with MAI GitHub Releases and prefers a mirror optimized for mainland-China access. If the mirror is unavailable, the original GitHub link is kept as fallback.',
    loading: 'Checking for the latest version…',
    noAssets: 'No installer packages available',
    noData: 'No release data',
    viewAll: 'View all releases',
    goReleases: 'Go to GitHub Releases',
    sourceLabel: 'Source',
    cosTab: 'Tencent COS mirror',
    cosTabHint: 'Faster in mainland China',
    githubTab: 'GitHub',
    githubTabHint: 'Upstream',
    cosBadge: 'Mirror',
    cosEmpty: 'No Tencent COS mirror is available for this release — switch to the GitHub source to download.',
  },
} as const;

function useLang(): Lang {
  const [lang, setLang] = useState<Lang>('zh-CN');
  useEffect(() => {
    const read = () => (document.documentElement.lang === 'en' ? 'en' : 'zh-CN');
    setLang(read());
    const observer = new MutationObserver(() => setLang(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);
  return lang;
}

function AssetButton({ asset, url, lang, showMirrorBadge, mirrorBadgeText }: { asset: ReleaseAsset; url: string; lang: Lang; showMirrorBadge: boolean; mirrorBadgeText: string }) {
  return (
    <a
      href={url}
      className={`dl-asset ${showMirrorBadge ? 'dl-asset--mirror' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="dl-asset__platform">{getPlatformLabel(asset.platform, lang)}</span>
      <span className="dl-asset__name">{asset.name}</span>
      {asset.size > 0 && <span className="dl-asset__size">{formatFileSize(asset.size)}</span>}
      {showMirrorBadge && <span className="dl-asset__badge">{mirrorBadgeText}</span>}
    </a>
  );
}

export default function DownloadSection() {
  const [release, setRelease] = useState<ReleaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<Source>('cos');
  const lang = useLang();
  const t = STRINGS[lang];

  useEffect(() => {
    import('../../data/releases.generated.json')
      .then((data) => {
        const d = (data as { default?: ReleaseData }).default || (data as unknown as ReleaseData);
        if (d && d.version) {
          setRelease(d as ReleaseData);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const installers = useMemo<ReleaseAsset[]>(() => {
    if (!release?.assets) return [];
    return release.assets.filter(isInstallerAsset);
  }, [release]);

  const visibleAssets = useMemo<ReleaseAsset[]>(() => {
    if (source === 'cos') return installers.filter((a) => !!a.mirrorUrl);
    return installers;
  }, [installers, source]);

  const cosAvailable = installers.some((a) => !!a.mirrorUrl);

  // If COS mode has no assets but GitHub does, default the UI to GitHub
  useEffect(() => {
    if (!loading && installers.length > 0 && !cosAvailable && source === 'cos') {
      setSource('github');
    }
  }, [loading, installers.length, cosAvailable, source]);

  return (
    <section className="dl" id="download">
      <div className="dl__inner">
        <div className="dl__header">
          <h2 className="dl__title">{t.title}</h2>
          <p className="dl__subtitle">{t.subtitle}</p>
        </div>

        {loading ? (
          <div className="dl__status">{t.loading}</div>
        ) : release && release.version ? (
          <div className="dl__content">
            <div className="dl__meta">
              <span className="dl__version">{release.version}</span>
              {release.publishedAt && (
                <span className="dl__date">{formatDate(release.publishedAt, lang)}</span>
              )}
            </div>

            {installers.length > 0 && (
              <div className="dl__source" role="tablist" aria-label={t.sourceLabel}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={source === 'cos'}
                  className={`dl__source-tab ${source === 'cos' ? 'dl__source-tab--active' : ''}`}
                  onClick={() => setSource('cos')}
                  disabled={!cosAvailable}
                  title={!cosAvailable ? t.cosEmpty : undefined}
                >
                  <span className="dl__source-tab-label">{t.cosTab}</span>
                  <span className="dl__source-tab-hint">{t.cosTabHint}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={source === 'github'}
                  className={`dl__source-tab ${source === 'github' ? 'dl__source-tab--active' : ''}`}
                  onClick={() => setSource('github')}
                >
                  <span className="dl__source-tab-label">{t.githubTab}</span>
                  <span className="dl__source-tab-hint">{t.githubTabHint}</span>
                </button>
              </div>
            )}

            {installers.length === 0 ? (
              <div className="dl__status">{t.noAssets}</div>
            ) : visibleAssets.length === 0 ? (
              <div className="dl__status">{t.cosEmpty}</div>
            ) : (
              <div className="dl__assets">
                {visibleAssets.map((asset) => {
                  const url = source === 'cos' ? asset.mirrorUrl : asset.githubUrl;
                  return (
                    <AssetButton
                      key={asset.name}
                      asset={asset}
                      url={url}
                      lang={lang}
                      showMirrorBadge={source === 'cos'}
                      mirrorBadgeText={t.cosBadge}
                    />
                  );
                })}
              </div>
            )}

            <div className="dl__links">
              <a href={release.htmlUrl || GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="dl__github-link">
                {t.viewAll}
              </a>
            </div>
          </div>
        ) : (
          <div className="dl__content">
            <div className="dl__status">{t.noData}</div>
            <div className="dl__links">
              <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="dl__github-link">
                {t.goReleases}
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .dl {
          padding: 5rem 0;
        }
        .dl__inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }
        .dl__header {
          margin-bottom: 2rem;
        }
        .dl__title {
          font-size: 1.8rem;
          color: var(--mai-text);
          margin-bottom: 0.75rem;
        }
        .dl__subtitle {
          font-size: 1.05rem;
          color: var(--mai-text-muted);
          line-height: 1.7;
        }
        .dl__content {
          background: var(--mai-surface);
          border: 1px solid var(--mai-border);
          border-radius: var(--mai-radius-lg);
          padding: 2rem;
        }
        .dl__meta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .dl__version {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--mai-mint);
        }
        .dl__date {
          font-size: 0.9rem;
          color: var(--mai-text-soft);
        }
        .dl__source {
          display: inline-flex;
          padding: 4px;
          background: var(--mai-bg);
          border: 1px solid var(--mai-border);
          border-radius: var(--mai-radius);
          margin-bottom: 1.25rem;
          gap: 4px;
        }
        .dl__source-tab {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0.5rem 1rem;
          border-radius: calc(var(--mai-radius) - 4px);
          background: transparent;
          color: var(--mai-text-muted);
          font-weight: 500;
          font-size: 0.9rem;
          line-height: 1.2;
          transition: background 0.2s, color 0.2s;
        }
        .dl__source-tab:hover:not(:disabled) {
          color: var(--mai-text);
        }
        .dl__source-tab:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .dl__source-tab--active {
          background: var(--mai-mint);
          color: #fff;
        }
        .dl__source-tab--active:hover {
          color: #fff;
        }
        .dl__source-tab-label {
          font-size: 0.9rem;
        }
        .dl__source-tab-hint {
          font-size: 0.7rem;
          opacity: 0.8;
          font-weight: 400;
          margin-top: 2px;
        }
        .dl__assets {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .dl-asset {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--mai-bg);
          border: 1px solid var(--mai-border);
          border-radius: var(--mai-radius);
          text-decoration: none;
          color: var(--mai-text);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .dl-asset:hover {
          border-color: var(--mai-mint);
          box-shadow: var(--mai-shadow-sm);
        }
        .dl-asset__platform {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--mai-mint-strong);
          min-width: 60px;
          text-align: left;
        }
        .dl-asset__name {
          flex: 1;
          font-size: 0.85rem;
          color: var(--mai-text-muted);
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dl-asset__size {
          font-size: 0.8rem;
          color: var(--mai-text-soft);
        }
        .dl-asset__badge {
          font-size: 0.7rem;
          background: var(--mai-mint-soft);
          color: var(--mai-mint-strong);
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          font-weight: 500;
        }
        .dl__status {
          font-size: 0.95rem;
          color: var(--mai-text-muted);
          padding: 1.5rem 0;
        }
        .dl__links {
          margin-top: 1rem;
        }
        .dl__github-link {
          font-size: 0.9rem;
          color: var(--mai-mint);
          text-decoration: none;
        }
        .dl__github-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
