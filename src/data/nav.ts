export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { label: '故事世界', href: '#story-world' },
  { label: '讨论室', href: '#discussion-room' },
  { label: '特性', href: '#features' },
  { label: '下载', href: '#download' },
  { label: 'GitHub', href: 'https://github.com/Astroite/MAI', external: true },
];
