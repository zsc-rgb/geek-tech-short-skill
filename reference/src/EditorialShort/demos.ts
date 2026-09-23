import type { EditorialVideoConfig } from "./types";

export const DEMO_EDITORIAL_FLOW: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「架构避坑」",
    title: "文档别只写「是什么」",
  },
  badge: "知识库精选",
  widgetType: "flow-step",
  widgetData: {
    from: "写是什么",
    to: "写什么时候用",
    punchline: "而要写什么时候应该用它。",
  },
  subtitles: [
    { startFrame: 0, endFrame: 90, text: "很多人写设计文档只写定义" },
    { startFrame: 90, endFrame: 210, text: "真正值钱的是：什么时候该用" },
    { startFrame: 210, endFrame: 450, text: "边界条件写清楚，协作成本直接下降" },
  ],
  durationInFrames: 450,
};

export const DEMO_EDITORIAL_ICONS: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「网络基础」",
    title: "计算机中常见的\n网络协议有哪些",
  },
  badge: "@知识短视频",
  widgetType: "icon-grid",
  widgetData: [
    { id: "tcp", label: "TCP/IP", color: "#F97316", glyph: "T" },
    { id: "udp", label: "UDP", color: "#EAB308", glyph: "U" },
    { id: "dns", label: "DNS", color: "#22C55E", glyph: "D" },
    { id: "dhcp", label: "DHCP", color: "#06B6D4", glyph: "H" },
    { id: "http", label: "HTTP", color: "#3B82F6", glyph: "h" },
    { id: "ftp", label: "FTP", color: "#38BDF8", glyph: "F" },
    { id: "ssh", label: "SSH", color: "#A855F7", glyph: ">" },
    { id: "smtp", label: "SMTP", color: "#EC4899", glyph: "@" },
    { id: "tls", label: "TLS/SSL", color: "#EF4444", glyph: "🔒" },
    { id: "ws", label: "WebSocket", color: "#D946EF", glyph: "⇄" },
  ],
  subtitles: [
    { startFrame: 0, endFrame: 80, text: "先把这十个协议名字记住" },
    { startFrame: 80, endFrame: 220, text: "面试与排障都会反复碰到它们" },
    { startFrame: 220, endFrame: 450, text: "收藏这份协议速查图" },
  ],
  durationInFrames: 450,
};

export const DEMO_EDITORIAL_TABLE: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「AI 知识库」",
    title: "别再只让 AI\n“做一个表格”了",
  },
  badge: "Sue 的 AI 知识库",
  widgetType: "ui-mockup",
  widgetData: {
    title: "客户管理",
    subtitle: "全程一次生成，非常高级",
    actionLabel: "+ 新建客户",
    columns: ["客户名称", "标签", "金额 / 元", "负责人", "操作"],
    rows: [
      ["星河科技", "重点用户", "128,000", "阿杰", "编辑"],
      ["青柠工作室", "试用中", "12,600", "小雨", "编辑"],
      ["北岛零售", "已成交", "86,400", "老周", "编辑"],
      ["云端教育", "跟进中", "45,200", "Mia", "编辑"],
    ],
    highlight: { row: 2, col: 2 },
  },
  subtitles: [
    { startFrame: 0, endFrame: 90, text: "让 AI 做个表格，数据少点看着挺好" },
    { startFrame: 90, endFrame: 220, text: "数据一旦破百，格式错乱、字段丢失" },
    { startFrame: 220, endFrame: 450, text: "要的是可维护的业务系统，不是一张截图" },
  ],
  durationInFrames: 450,
};

/** LangChain × TypeSafe Jev — release short (Warm Editorial) */
export const DEMO_JEV_HOOK: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「Agent 前沿」",
    title: "Agent 每一步都\n再调一次大模型？",
  },
  badge: "LangChain Blog",
  widgetType: "flow-step",
  widgetData: {
    from: "LLM 决策",
    to: "Jev 判定",
    punchline: "分类不必再烧一整次生成。",
  },
  subtitles: [
    { startFrame: 0, endFrame: 70, text: "Agent 循环：想→调工具→再想，每步都贵" },
    { startFrame: 70, endFrame: 150, text: "工具调用能结构化，但决策仍靠大模型" },
    { startFrame: 150, endFrame: 210, text: "TypeSafe 的 Jev：专做快速结构化判定" },
  ],
  durationInFrames: 210,
};

export const DEMO_JEV_TYPES: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「System One」",
    title: "Jev 不问聊天\n只答结构化问题",
  },
  badge: "TypeSafe AI",
  widgetType: "icon-grid",
  widgetData: [
    { id: "choice", label: "Choice", color: "#2563EB", glyph: "☰" },
    { id: "score", label: "Score", color: "#EA580C", glyph: "≡" },
    { id: "noul", label: "Noul", color: "#16A34A", glyph: "?" },
    { id: "fast", label: "≈200×", color: "#0891B2", glyph: "⚡" },
    { id: "cheap", label: "≈400×$", color: "#CA8A04", glyph: "$" },
    { id: "state", label: "State", color: "#7C3AED", glyph: "Σ" },
    { id: "route", label: "Routing", color: "#DB2777", glyph: "⇄" },
    { id: "auto", label: "AutoMode", color: "#DC2626", glyph: "A" },
  ],
  subtitles: [
    { startFrame: 0, endFrame: 80, text: "喂入 state，并行问 Choice / Score / Noul" },
    { startFrame: 80, endFrame: 160, text: "官方称分类最高约 200× 更快、400× 更省" },
    { startFrame: 160, endFrame: 240, text: "LangChain：路由模型，或拦危险工具调用" },
  ],
  durationInFrames: 240,
};

export const DEMO_JEV_TAKEAWAY: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「怎么用」",
    title: "大模型负责想\nJev 负责判",
  },
  badge: "收藏这套分工",
  widgetType: "flow-step",
  widgetData: {
    from: "LLM 生成",
    to: "Jev 分流",
    punchline: "开放推理留给 LLM，结构化决策交给 System One。",
  },
  subtitles: [
    { startFrame: 0, endFrame: 70, text: "Jev 不写长文，只吐类型化概率" },
    { startFrame: 70, endFrame: 140, text: "简单任务走快模型，高风险走强模型" },
    { startFrame: 140, endFrame: 210, text: "点赞收藏：Agent Harness 里该放 Jev 的位置" },
  ],
  durationInFrames: 210,
};
