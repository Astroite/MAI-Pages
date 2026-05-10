import { useState, useEffect } from 'react';
import type { ReleaseData, ReleaseAsset } from '../../lib/release';
import { formatFileSize, formatDate, getPlatformLabel } from '../../lib/release';
import { GITHUB_RELEASES_URL } from '../../lib/constants';

function AssetButton({ asset }: { asset: ReleaseAsset }) {
  const url = asset.mirrorUrl || asset.githubUrl;
  const isMirror = !!asset.mirrorUrl;

  return (
    <a
      href={url}
      className={`dl-asset ${isMirror ? 'dl-asset--mirror' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="dl-asset__platform">{getPlatformLabel(asset.platform)}</span>
      <span className="dl-asset__name">{asset.name}</span>
      {asset.size > 0 && <span className="dl-asset__size">{formatFileSize(asset.size)}</span>}
      {isMirror && <span className="dl-asset__badge">镜像</span>}
    </a>
  );
}

export default function DownloadSection() {
  const [release, setRelease] = useState<ReleaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../../data/releases.generated.json')
      .then((data) => {
        const d = data.default || data;
        if (d && d.version) {
          setRelease(d as ReleaseData);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="dl" id="download">
      <div className="dl__inner">
        <div className="dl__header">
          <h2 className="dl__title">下载最新版 MAI</h2>
          <p className="dl__subtitle">
            网站会自动同步 MAI GitHub Release，并优先提供适合大陆访问的镜像下载入口。如果镜像暂不可用，也会保留 GitHub 原始下载链接。
          </p>
        </div>

        {loading ? (
          <div className="dl__status">正在检查最新版本...</div>
        ) : release && release.version ? (
          <div className="dl__content">
            <div className="dl__meta">
              <span className="dl__version">{release.version}</span>
              {release.publishedAt && (
                <span className="dl__date">{formatDate(release.publishedAt)}</span>
              )}
            </div>

            {release.assets && release.assets.length > 0 ? (
              <div className="dl__assets">
                {release.assets.map((asset) => (
                  <AssetButton key={asset.name} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="dl__status">暂无可下载资产</div>
            )}

            <div className="dl__links">
              <a href={release.htmlUrl || GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="dl__github-link">
                查看全部 Release
              </a>
            </div>
          </div>
        ) : (
          <div className="dl__content">
            <div className="dl__status">暂无 Release 数据</div>
            <div className="dl__links">
              <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="dl__github-link">
                前往 GitHub Releases
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
          margin-bottom: 1.5rem;
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
          padding: 2rem 0;
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
