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

/** LangChain × TypeSafe Jev — longer release beats (Warm Editorial) */
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
  subtitles: [],
  durationInFrames: 300,
};

export const DEMO_JEV_WHAT: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「是什么」",
    title: "Jev：不做聊天\n只做结构化判定",
  },
  badge: "TypeSafe AI",
  widgetType: "flow-step",
  widgetData: {
    from: "State 上下文",
    to: "类型化概率",
    punchline: "System One：快、准、\n给软件直接用的答案。",
  },
  subtitles: [],
  durationInFrames: 300,
};

export const DEMO_JEV_TYPES: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「System One」",
    title: "三种题型\n一次并行问完",
  },
  badge: "Choice · Score · Noul",
  widgetType: "icon-grid",
  widgetData: [
    { id: "choice", label: "Choice", color: "#2563EB", glyph: "C" },
    { id: "score", label: "Score", color: "#EA580C", glyph: "S" },
    { id: "noul", label: "Noul", color: "#16A34A", glyph: "?" },
    { id: "fast", label: "≈200×", color: "#0891B2", glyph: "F" },
    { id: "cheap", label: "≈400×$", color: "#CA8A04", glyph: "$" },
    { id: "state", label: "State", color: "#7C3AED", glyph: "Σ" },
    { id: "route", label: "Routing", color: "#DB2777", glyph: "R" },
    { id: "auto", label: "AutoMode", color: "#DC2626", glyph: "A" },
  ],
  subtitles: [],
  durationInFrames: 300,
};

export const DEMO_JEV_USECASE: EditorialVideoConfig = {
  theme: "warm-ivory",
  layout: "letterbox-card",
  header: {
    category: "「接到 LangChain」",
    title: "路由模型\n或先拦危险工具",
  },
  badge: "ModelRouter · AutoMode",
  widgetType: "ui-mockup",
  widgetData: {
    title: "Support Ticket · Jev",
    subtitle: "state → questions → noul / choice",
    actionLabel: "判定紧急",
    columns: ["字段", "问题类型", "结果", "置信", "动作"],
    rows: [
      ["is_urgent", "Noul", "0.999", "高", "插队"],
      ["route", "Choice", "powerful", "中", "换强模型"],
      ["bash_ok", "Noul", "0.12", "高", "拦截"],
      ["lookup", "Choice", "fast", "高", "走轻量"],
    ],
    highlight: { row: 0, col: 2 },
  },
  subtitles: [],
  durationInFrames: 300,
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
  subtitles: [],
  durationInFrames: 300,
};

/** Visual configs keyed by tts-jev beat id */
export const JEV_VISUAL_BY_ID: Record<string, EditorialVideoConfig> = {
  hook: DEMO_JEV_HOOK,
  what: DEMO_JEV_WHAT,
  types: DEMO_JEV_TYPES,
  usecase: DEMO_JEV_USECASE,
  cta: DEMO_JEV_TAKEAWAY,
};

/** Split narration into subtitle lines across local frames — never truncate with … */
export function subtitlesFromNarration(
  narration: string,
  durationInFrames: number,
): EditorialVideoConfig["subtitles"] {
  const softSplit = (s: string): string[] => {
    if (s.length <= 24) return [s];
    const byPause = s
      .split(/[，、：:]/)
      .map((x) => x.trim())
      .filter(Boolean);
    if (byPause.length >= 2) {
      return byPause.flatMap((x) => softSplit(x));
    }
    // Prefer break at space (keep English words intact)
    if (s.includes(" ")) {
      const words = s.split(/\s+/);
      const lines: string[] = [];
      let buf = "";
      for (const w of words) {
        const next = buf ? `${buf} ${w}` : w;
        if (next.length > 24 && buf) {
          lines.push(buf);
          buf = w;
        } else {
          buf = next;
        }
      }
      if (buf) lines.push(buf);
      return lines.length ? lines : [s];
    }
    // CJK-only: break near 20 without mid-run of ASCII
    const lines: string[] = [];
    let i = 0;
    while (i < s.length) {
      let end = Math.min(i + 20, s.length);
      if (end < s.length) {
        // avoid splitting ASCII token
        while (end > i + 8 && /[A-Za-z0-9]/.test(s[end - 1]!)) end--;
      }
      lines.push(s.slice(i, end));
      i = end;
    }
    return lines;
  };

  const parts = narration
    .split(/[。！？；]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .flatMap(softSplit);

  const chunks = parts.length >= 1 ? parts : [narration];
  const step = Math.max(1, Math.floor(durationInFrames / chunks.length));
  return chunks.map((text, i) => ({
    text,
    startFrame: i * step,
    endFrame: i === chunks.length - 1 ? durationInFrames : (i + 1) * step,
  }));
}
