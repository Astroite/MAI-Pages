export interface Feature {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export const features: Feature[] = [
  {
    icon: 'globe',
    title: '故事世界',
    titleEn: 'Story World',
    description: '创建持久的世界观，承载设定、背景、时间线和跨场景记忆。',
    descriptionEn: 'Build a persistent world that holds settings, lore, timelines and cross-scene memory.',
  },
  {
    icon: 'brain',
    title: '角色记忆',
    titleEn: 'Character Memory',
    description: '每一幕结束后，关键事件和关系变化被整理为角色的长期记忆。',
    descriptionEn: 'When a scene closes, key events and relationship shifts are distilled into long-term character memory.',
  },
  {
    icon: 'users',
    title: 'AI 角色群演',
    titleEn: 'AI Ensemble Cast',
    description: '多个 AI 角色各自保持身份，持续接力演出，不替他人发言。',
    descriptionEn: 'Multiple AI characters keep their own identities and take turns on stage — none speaks for the others.',
  },
  {
    icon: 'messages-square',
    title: '多模型讨论室',
    titleEn: 'Multi-Model Discussion Room',
    description: '多个人设进入同一问题现场，共享上下文，按阶段结构化讨论。',
    descriptionEn: 'Several personas enter the same problem space, share context, and run a structured staged discussion.',
  },
  {
    icon: 'layers',
    title: '阶段与赛制',
    titleEn: 'Phases & Formats',
    description: '用阶段模板和赛制驱动讨论流程，支持发散、收敛、质询和总结。',
    descriptionEn: 'Drive the discussion with phase templates and tournament formats: diverge, converge, challenge, conclude.',
  },
  {
    icon: 'clipboard-list',
    title: '书记官与主持',
    titleEn: 'Scribe & Facilitator',
    description: '书记官记录要点，主持控制节奏，裁决给出最终判断。',
    descriptionEn: 'The scribe captures key points, the facilitator paces the room, and the judge calls the verdict.',
  },
  {
    icon: 'hard-drive',
    title: '本地优先',
    titleEn: 'Local-First',
    description: '数据默认存储在本地 SQLite，用户掌控 API Key 和模型配置。',
    descriptionEn: 'Data lives in a local SQLite by default; you stay in control of API keys and model configuration.',
  },
  {
    icon: 'puzzle',
    title: 'MCP 工具扩展',
    titleEn: 'MCP Tool Extensions',
    description: '通过 MCP 协议接入外部工具，扩展讨论和创作的能力边界。',
    descriptionEn: 'Plug external tools in through the MCP protocol to widen what discussion and writing can reach.',
  },
];
