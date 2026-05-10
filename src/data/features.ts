export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: 'globe',
    title: '故事世界',
    description: '创建持久的世界观，承载设定、背景、时间线和跨场景记忆。',
  },
  {
    icon: 'brain',
    title: '角色记忆',
    description: '每一幕结束后，关键事件和关系变化被整理为角色的长期记忆。',
  },
  {
    icon: 'users',
    title: 'AI 角色群演',
    description: '多个 AI 角色各自保持身份，持续接力演出，不替他人发言。',
  },
  {
    icon: 'messages-square',
    title: '多模型讨论室',
    description: '多个人设进入同一问题现场，共享上下文，按阶段结构化讨论。',
  },
  {
    icon: 'layers',
    title: '阶段与赛制',
    description: '用阶段模板和赛制驱动讨论流程，支持发散、收敛、质询和总结。',
  },
  {
    icon: 'clipboard-list',
    title: '书记官与主持',
    description: '书记官记录要点，主持控制节奏，裁决给出最终判断。',
  },
  {
    icon: 'hard-drive',
    title: '本地优先',
    description: '数据默认存储在本地 SQLite，用户掌控 API Key 和模型配置。',
  },
  {
    icon: 'puzzle',
    title: 'MCP 工具扩展',
    description: '通过 MCP 协议接入外部工具，扩展讨论和创作的能力边界。',
  },
];
