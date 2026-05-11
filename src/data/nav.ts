export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { label: '故事世界', labelEn: 'Story World', href: '#story-world' },
  { label: '讨论室', labelEn: 'Discussion Room', href: '#discussion-room' },
  { label: '特性', labelEn: 'Features', href: '#features' },
  { label: '下载', labelEn: 'Download', href: '#download' },
  { label: 'GitHub', labelEn: 'GitHub', href: 'https://github.com/Astroite/MAI', external: true },
];
