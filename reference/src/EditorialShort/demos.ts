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
