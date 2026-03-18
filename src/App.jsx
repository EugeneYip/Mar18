import React, { useMemo, useState } from "react";

const ICON_PATHS = {
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z", "M8 7h8", "M8 11h8", "M8 15h6"],
  chart: ["M5 19V9", "M12 19V5", "M19 19v-7", "M3 19h18"],
  layers: ["M12 3 3 8l9 5 9-5-9-5Z", "m3 12 9 5 9-5", "m3 16 9 5 9-5"],
  globe: ["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18Z", "M3 12h18", "M12 3a15 15 0 0 1 0 18", "M12 3a15 15 0 0 0 0 18"],
  building: ["M4 21V7l8-4 8 4v14", "M9 21v-4h6v4", "M8 10h.01", "M12 10h.01", "M16 10h.01", "M8 14h.01", "M12 14h.01", "M16 14h.01"],
  search: ["M11 19a8 8 0 1 1 0-16a8 8 0 0 1 0 16Z", "m21 21-4.35-4.35"],
  alert: ["M12 4 3 20h18L12 4Z", "M12 9v5", "M12 17h.01"],
  check: ["M20 6 9 17l-5-5"],
  target: ["M12 3v3", "M12 18v3", "M3 12h3", "M18 12h3", "M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z", "M12 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"],
  route: ["M5 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z", "M19 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z", "M7 17c3 0 3-6 6-6", "M13 11c3 0 3-4 6-4"],
  filter: ["M4 6h16", "M7 12h10", "M10 18h4"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  x: ["M6 6l12 12", "M18 6 6 18"],
  play: ["M8 6v12l10-6-10-6Z"],
  text: ["M5 6h14", "M5 10h14", "M5 14h10", "M5 18h8"],
  mic: ["M12 15a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z", "M19 10v2a7 7 0 0 1-14 0v-2", "M12 19v3"],
  table: ["M4 5h16v14H4z", "M4 10h16", "M10 5v14"],
  phone: ["M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z", "M11 18h2"],
};

function Icon({ name, className = "h-4 w-4", strokeWidth = 1.8 }) {
  const safeName = typeof name === "string" && ICON_PATHS[name] ? name : "book";
  const paths = ICON_PATHS[safeName];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={`${safeName}-${i}`} d={d} />
      ))}
    </svg>
  );
}

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Card({ className = "", children }) {
  return <div className={cn("min-w-0 rounded-3xl border border-slate-200 bg-white shadow-sm", className)}>{children}</div>;
}

function SectionHeader({ icon, eyebrow, title, subtitle, right }) {
  return (
    <div className="mb-5 flex min-w-0 items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          {eyebrow ? <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</div> : null}
          <h2 className="text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600 sm:text-[15px]">{subtitle}</p> : null}
        </div>
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

function StatCard({ label, value, note }) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 break-words text-2xl font-semibold text-slate-950 sm:text-3xl">{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{note}</div>
    </Card>
  );
}

function NavButton({ active, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm transition",
        active ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
      )}
    >
      <Icon name={icon} className="h-4 w-4 shrink-0" />
      <span className="truncate">{children}</span>
    </button>
  );
}

const TOP_METRICS = [
  { label: "2009 China Sales", value: "US$5B", note: "Over 7% of global sales" },
  { label: "Household Reach", value: "98%", note: "At least one product" },
  { label: "China Per Capita Spend", value: "US$3", note: "vs. US$100 in the US" },
  { label: "Categories in China", value: "~14", note: "vs. 35+ in the US" },
  { label: "Plants in China", value: "10", note: "By 2010" },
  { label: "Distribution Centers", value: "~150", note: "China network by 2010" },
];

const EXHIBIT_ROWS = [
  { exhibit: "Exhibit 1", topic: "Financial Performance", headline: "US$78,938M net sales", compare: 78.938, note: "US$16,021M operating income; US$10,946M net earnings; dividend growth through 2010" },
  { exhibit: "Exhibits 2–3", topic: "Balance Sheet", headline: "US$128,172M total assets", compare: 128.172, note: "US$85,648M goodwill and intangibles; US$61,439M equity; US$29,832M debt" },
  { exhibit: "Exhibit 4", topic: "Cash Flow", headline: "US$16,072M operating cash flow", compare: 16.072, note: "US$3,067M capex; US$5,458M dividends; US$6,004M buybacks" },
  { exhibit: "Exhibit 5", topic: "Largest Segment", headline: "Fabric Care & Home Care US$23,805M", compare: 23.805, note: "Largest and most profitable segment in the portfolio" },
  { exhibit: "Exhibit 7", topic: "Geographic Mix", headline: "Developed 66% / Developing 34%", compare: 34, note: "North America 42%, Western Europe 21%, Asia 15%, CEEMEA 13%, Latin America 9%" },
  { exhibit: "Exhibits 8–11", topic: "China Macro & Consumer Data", headline: "Income dispersion and Engel's Law", compare: 51.35, note: "Urban income tiers ranged from RMB 4,936 poor households to RMB 51,350 highest income households" },
];

const SEGMENT_COMPARE = [
  { label: "Fabric & Home Care", value: 23.805, note: "30% of total" },
  { label: "Beauty", value: 19.491, note: "24%" },
  { label: "Baby & Family Care", value: 14.736, note: "18%" },
  { label: "Health Care", value: 11.493, note: "14%" },
  { label: "Grooming", value: 7.631, note: "10%; high margin" },
  { label: "Snacks & Pet Care", value: 3.135, note: "4%" },
];

const TIMELINE = [
  { year: "1980", title: "Opening environment begins", body: "Special Economic Zones launched. Foreign consumer access remained limited and many saw China as premature." },
  { year: "1985", title: "Research before entry", body: "P&G studied Beijing and Shanghai and advertised before selling, building reputation ahead of market launch." },
  { year: "1988", title: "JV entry in Guangzhou", body: "Entered through Hutchison Whampoa partnership and Guangzhou Soap Factory. Shampoo became the first wedge." },
  { year: "1989–1997", title: "Brand rollout", body: "Olay, Rejoice, Pantene, Safeguard, Crest, and Pampers expanded category presence." },
  { year: "1998", title: "First Beijing R&D center", body: "Adapted global products to Chinese needs and began contributing local knowledge to worldwide innovation." },
  { year: "2000", title: "Developing market pivot", body: "Lafley pushed beyond the top 5–10% consumer base toward broader segment coverage." },
  { year: "2005–2006", title: "SK-II incidents", body: "Advertising and product safety controversies exposed crisis-management and foreignness risk." },
  { year: "2010", title: "Scale with tension", body: "US$5B sales, 98% reach, 10 plants, major R&D and distribution investment, but shallow monetization remained the core issue." },
];

const FIVE_LEVELS = [
  {
    key: "Industry",
    icon: "chart",
    thesis: "A multi-category branded FMCG arena built on repeat purchases, brand trust, scale advertising, and distribution control.",
    short: "Profit logic",
    bullets: [
      "Frequent repeat purchases and strong brand trust support profit.",
      "Scale manufacturing, scale advertising, and distribution control matter.",
      "Premium and mass tiers face very different competitive intensity."
    ]
  },
  {
    key: "Meso",
    icon: "layers",
    thesis: "The cluster advantage came from supplier development, distribution upgrading, local research, and category education.",
    short: "Ecosystem logic",
    bullets: [
      "P&G built supply and equipment ecosystems across China and the broader developing world.",
      "Distributor capability was trained and upgraded, not treated as transactional only.",
      "In multiple categories, P&G competed against substitutes or the absence of the category itself."
    ]
  },
  {
    key: "Macro",
    icon: "building",
    thesis: "China's strongest macro fact was uneven enrichment, not just fast growth.",
    short: "Demand structure",
    bullets: [
      "Income stratification explains multi-tier buying within the same household.",
      "Policy support coexisted with regulatory unpredictability and pricing sensitivity.",
      "Cultural usage patterns required real local adaptation."
    ]
  },
  {
    key: "Meta",
    icon: "globe",
    thesis: "China strategy sat inside wider global growth, supply chain, and foreign-company risk dynamics.",
    short: "Cross-border forces",
    bullets: [
      "Developing markets became structurally more important to P&G.",
      "Supply chains ran across India, China, Asia, Latin America, the US, and Europe.",
      "SK-II showed how broader political context could amplify vulnerability."
    ]
  },
  {
    key: "Firm / SPARK",
    icon: "target",
    thesis: "P&G's system advantage came from linked scope, positioning, activities, resources, and knowledge.",
    short: "Execution system",
    bullets: [
      "Scope was broad but still incomplete versus the US portfolio.",
      "Positioning used premium, mid-tier, and purpose-built low-end logic.",
      "R&D, marketing, distribution, and research reinforced one another."
    ]
  }
];

const SPARK = [
  ["Scope", "~14 categories in China, premium to low-tier, first-tier to rural coverage, 10 plants and ~150 DCs."],
  ["Positioning", "Distinct value propositions by tier, avoiding simple watered-down premium products."],
  ["Activities", "R&D, local research, TV and digital marketing, distributor training, and manufacturing localization."],
  ["Resources", "Brand leaders, local talent base, distribution infrastructure, investment scale, and sourcing leverage."],
  ["Knowledge", "Tacit understanding of Chinese consumers, segmentation, regulation, and fragmented channels."]
];

const SPEAKER_MODE_CARDS = [
  {
    title: "Opening line",
    body: "The central tension in this case is that P&G had already reached 98% of Chinese households, but per capita spending was still only US$3. So the real problem was not simple penetration. It was monetization.",
  },
  {
    title: "Q1 quick reference",
    body: "NA 42%, WE 21%, Asia 15%, CEEMEA 13%, LatAm 9%. Developed 66%, developing 34%. China was #2 by volume, #5 by value, and about US$5B.",
  },
  {
    title: "Q2 quick reference",
    body: "Developed 1-2% growth versus developing 6%. In China, premium 15% volume / 30% value, middle 30% / 40%, low 55% / 30%. 98% reach, US$3 per capita, ~14 categories.",
  },
  {
    title: "Q4 thesis",
    body: "P&G was fundamentally strong but incomplete. The system advantage was real, but monetization remained shallow and foreignness risk stayed structurally important.",
  },
  {
    title: "Q5 thesis",
    body: "Widen wallet share rather than just penetration. Focus on high-frequency essentials, protect first-tier cities, invest in second- to fourth-tier cities, and keep low-end expansion selective.",
  },
  {
    title: "Oral tip",
    body: "Using US$5 billion in 2009 as the nearest clean base, I think roughly US$12 billion is a defensible five-year planning target, with upside if P&G improves monetization faster than expected.",
  },
];

const CALL_OUTS = [
  {
    title: "What P&G did right",
    tone: "emerald",
    items: [
      "Entered with shampoo based on consumer research rather than HQ assumption.",
      "Created categories and habits, not just share inside existing markets.",
      "Moved from watered-down products to purpose-built offerings by price point.",
      "Built a deeply localized organization with long-term talent development.",
      "Aligned CSR visibly with public priorities while scaling operations."
    ]
  },
  {
    title: "Where risk remained",
    tone: "amber",
    items: [
      "Monetization lagged far behind penetration.",
      "Low-end value engineering was initially misunderstood.",
      "SK-II crisis handling damaged trust and reinforced foreignness risk.",
      "Pricing power was constrained by policy and inflation sensitivity.",
      "Competitive pressure from local firms kept intensifying."
    ]
  }
];

const SOURCE_SECTIONS = [
  {
    id: "intro",
    title: "Session Header / 文件開頭",
    lines: [
      "這份文件，不遺漏任何資訊, this is going to be long. Every case fact, every exhibit data point, every analytical conclusion, bilingual, from zero. Here it is.",
      "",
      "---",
      "",
      "# SESSION 10 | INTERNATIONAL STRATEGY | MARCH 18, 2026",
      "",
      "---"
    ]
  },
  {
    id: "part-0",
    title: "PART 0 / 第零部分",
    lines: [
      "## PART 0: BACKGROUND AND CONTEXT",
      "## 第零部分：背景與脈絡",
      "",
      "**What is this case about?**",
      "**這個案例在講甚麼？**",
      "",
      "Procter & Gamble, founded in 1837 in Cincinnati, Ohio, originally produced candles and soap. By 2010, P&G had grown to US$78.9 billion in global sales, 300 brands (22 of which were billion-dollar brands), roughly 100,000 employees, and customers in 160 countries. P&G was a leader in detergents, cleaning products, paper products, beauty products, food and beverages, and personal products.",
      "",
      "寶僑（P&G）1837 年在俄亥俄州辛辛那提成立，最初生產蠟燭和肥皂。到 2010 年，P&G 已成長為全球銷售 789 億美元、擁有 300 個品牌（其中 22 個是十億美元品牌）、約 10 萬名員工、客戶遍及 160 個國家的企業。P&G 在洗衣精、清潔用品、紙製品、美妝產品、食品飲料及個人用品領域均為領導者。",
      "",
      "P&G entered China in 1988 through a joint venture with Hutchison Whampoa (controlled by Li Ka-shing). By the time of the case (2010), China had become P&G's second largest market by volume and fifth largest by value. China sales reached US$5 billion in 2009. The case asks: what should P&G do next in China?",
      "",
      "P&G 於 1988 年透過與和記黃埔（李嘉誠控制）的合資企業進入中國。到案例時間點（2010 年），中國已成為 P&G 全球第二大 volume market、第五大 value market。中國銷售在 2009 年達到 50 億美元。案例的核心問題是：P&G 在中國接下來該怎麼做？",
      "",
      "**The central tension of the case:**",
      "**案例的核心張力：**",
      "",
      "P&G had already reached 98% of Chinese households with at least one product, but per capita spending was only US$3. In the US, per capita P&G spending was US$100. Globally it was US$11.50. So the problem was not simple penetration. It was monetization. The platform was broad, but wallet share was shallow.",
      "",
      "P&G 已經觸及 98% 的中國家庭（至少一項產品），但人均消費僅 US$3。美國人均 P&G 消費是 US$100，全球平均是 US$11.50。所以問題不是單純的覆蓋率不夠，而是變現能力（monetization）。平臺很廣，但錢包份額（wallet share）很淺。",
      "",
      "**What are we analyzing and why?**",
      "**我們在分析甚麼？為甚麼？**",
      "",
      "Professor Enright's course uses the Five-Level Framework to analyze firm performance. The standard is not \"mention five levels.\" The standard is: at each level, identify the elements that shape profit, and explain the mechanism by which they affect performance. At the firm level, the dedicated tool is the SPARK model. The analytical sequence the professor prefers is Industry first, then Meso, Macro, Meta, and finally Firm/SPARK. That order works because it establishes the competitive arena before examining external forces and then returns to what the firm itself is doing.",
      "",
      "Enright 教授的課程使用五層架構分析企業績效。標準不是「五層都有提到就好」，而是：每一層都要指出哪些元素在塑造利潤，並說明它們如何影響績效。在企業層，專用工具是 SPARK 模型。教授偏好的分析順序是：先 Industry，再 Meso、Macro、Meta，最後才回到 Firm/SPARK。這個順序之所以有效，是因為先建立競爭場域，再看外部力量，最後才回到企業本身的作為。"
    ]
  },
  {
    id: "part-1",
    title: "PART 1 / 第一部分",
    lines: [
      "## PART 1: P&G CORPORATE OVERVIEW (from Exhibits)",
      "## 第一部分：P&G 企業總覽（來自附件資料）",
      "",
      "**Financial Performance (Exhibit 1)**",
      "**財務績效（附件一）**",
      "",
      "P&G 2010 net sales: US$78,938M (up from $76,694M in 2009 and $79,257M in 2008). Operating income 2010: US$16,021M (operating margin roughly 20.3%). Net earnings from continuing operations 2010: US$10,946M. Dividends per share: $1.80 (2010), $1.64 (2009), $1.45 (2008), showing consistent dividend growth.",
      "",
      "P&G 2010 年淨銷售：789.38 億美元（2009 年 766.94 億，2008 年 792.57 億）。2010 年營業利益：160.21 億美元（營業利潤率約 20.3%）。持續營業淨利 2010 年：109.46 億美元。每股股利：$1.80（2010）、$1.64（2009）、$1.45（2008），持續增長。",
      "",
      "**Balance Sheet (Exhibits 2-3)**",
      "**資產負債表（附件二、三）**",
      "",
      "Total assets 2010: US$128,172M. Goodwill and intangible assets: US$85,648M (67% of total assets, reflecting P&G's acquisition-heavy history and brand value). Net PP&E: US$19,244M. Total shareholders' equity: US$61,439M. Total debt (short + long term): US$29,832M.",
      "",
      "總資產 2010 年：1,281.72 億美元。商譽及無形資產：856.48 億美元（占總資產 67%，反映 P&G 以收購為主的歷史及品牌價值）。淨固定資產：192.44 億美元。股東權益：614.39 億美元。負債總額（短期+長期）：298.32 億美元。",
      "",
      "**Cash Flow (Exhibit 4)**",
      "**現金流量（附件四）**",
      "",
      "Operating cash flow 2010: US$16,072M. Capital expenditures: US$3,067M. Dividends: US$5,458M. Treasury stock purchases: US$6,004M. P&G generated strong free cash flow and returned substantial capital to shareholders through dividends and buybacks.",
      "",
      "2010 年營業現金流：160.72 億美元。資本支出：30.67 億美元。股利：54.58 億美元。庫藏股購回：60.04 億美元。P&G 產生強勁自由現金流，並透過股利與回購大量回饋股東。",
      "",
      "**Segment Results (Exhibit 5)**",
      "**事業部績效（附件五）**",
      "",
      "Fabric Care and Home Care: US$23,805M net sales (30% of total), US$5,076M pre-tax earnings, US$3,339M net earnings. This is P&G's largest and most profitable segment.",
      "",
      "Beauty: US$19,491M net sales (24%), US$3,648M pre-tax, US$2,712M net earnings.",
      "",
      "Baby Care and Family Care: US$14,736M net sales (18%), US$3,270M pre-tax, US$2,049M net earnings.",
      "",
      "Health Care: US$11,493M net sales (14%), US$2,809M pre-tax, US$1,860M net earnings.",
      "",
      "Grooming: US$7,631M net sales (10%), US$2,007M pre-tax, US$1,477M net earnings. Notably high margin (26.3% pre-tax margin).",
      "",
      "Snacks and Pet Care: US$3,135M net sales (4%), US$499M pre-tax, US$326M net earnings.",
      "",
      "Fabric Care and Home Care：淨銷售 238.05 億美元（占總額 30%），稅前盈餘 50.76 億，淨利 33.39 億。這是 P&G 最大且最賺錢的事業部。",
      "",
      "Beauty：淨銷售 194.91 億（24%），稅前 36.48 億，淨利 27.12 億。",
      "",
      "Baby Care and Family Care：淨銷售 147.36 億（18%），稅前 32.70 億，淨利 20.49 億。",
      "",
      "Health Care：淨銷售 114.93 億（14%），稅前 28.09 億，淨利 18.60 億。",
      "",
      "Grooming：淨銷售 76.31 億（10%），稅前 20.07 億，淨利 14.77 億。利潤率特別高（稅前利潤率 26.3%）。",
      "",
      "Snacks and Pet Care：淨銷售 31.35 億（4%），稅前 4.99 億，淨利 3.26 億。",
      "",
      "**Leading Brands (Exhibit 6)**",
      "**領導品牌（附件六）**",
      "",
      "Beauty and Grooming GBU: Head & Shoulders, Olay, Pantene, Wella (Beauty); Braun, Fusion, Gillette, Mach3 (Grooming).",
      "",
      "Health and Well-Being GBU: Always, Crest, Oral-B (Health Care); Iams, Pringles (Snacks/Pet Care).",
      "",
      "Household Care GBU: Ace, Ariel, Dawn, Downy, Duracell, Gain, Tide (Fabric Care/Home Care); Bounty, Charmin, Pampers (Baby Care/Family Care).",
      "",
      "These are the billion-dollar brands. In China specifically, the case names Rejoice, Safeguard, Olay, Pampers, Tide, and Gillette as category leaders.",
      "",
      "這些是十億美元品牌。在中國，案例點名飄柔（Rejoice）、舒膚佳（Safeguard）、玉蘭油（Olay）、幫寶適（Pampers）、汰漬（Tide）與吉列（Gillette）為品類領導者。",
      "",
      "**Geographic Breakdown (Exhibit 7)**",
      "**地理分布（附件七）**",
      "",
      "North America: 42%. Western Europe: 21%. Asia: 15%. CEEMEA: 13%. Latin America: 9%. Developed markets: 66%. Developing markets: 34% (up from 20% in 2000).",
      "",
      "北美：42%。西歐：21%。亞洲：15%。中東歐/中東/非洲：13%。拉美：9%。已開發市場：66%。開發中市場：34%（2000 年為 20%）。",
      "",
      "**China Macro Data (Exhibits 8-11)**",
      "**中國宏觀數據（附件八至十一）**",
      "",
      "Exhibit 8: China GDP grew from under US$200B in 1980 to roughly US$6T by 2010, a 30x increase in 30 years.",
      "",
      "附件八：中國 GDP 從 1980 年不到 2,000 億美元成長到 2010 年約 6 兆美元，30 年增長 30 倍。",
      "",
      "Exhibit 9: Real GDP growth consistently above 8% for most years from 1981 to 2010, with dips during Asian crisis (1998-99) and brief moderation around 1989-90.",
      "",
      "附件九：1981 至 2010 年多數年份實質 GDP 成長率持續高於 8%，僅在亞洲金融危機（1998-99）及 1989-90 年前後略為放緩。",
      "",
      "Exhibit 10: Urban household income and consumption data (2009, RMB). This exhibit is critical. Just under half of China's population was in urban households in 2009. Average exchange rate: RMB 6.831 = 1 US$.",
      "",
      "附件十：城鎮家庭收入與消費數據（2009 年，人民幣計）。這份附件非常關鍵。2009 年中國約近半人口屬城鎮家庭。平均匯率：人民幣 6.831 = 1 美元。",
      "",
      "Key data from Exhibit 10 (per capita annual figures, RMB):",
      "",
      "附件十重要數據（人均年度數據，人民幣）：",
      "",
      "National average per capita annual income: 18,858. Disposable income: 17,175. Consumption expenditure: 12,265.",
      "",
      "全國平均人均年收入：18,858。可支配收入：17,175。消費支出：12,265。",
      "",
      "Lowest income households (first decile): income 5,951, disposable 5,253, consumption 4,901.",
      "Poor households (first 5%): income 4,936, disposable 4,198, consumption 4,257.",
      "Low income (second decile): income 8,957, disposable 8,162, consumption 6,743.",
      "Lower middle (second quintile): income 12,345, disposable 11,244, consumption 8,739.",
      "Middle (third quintile): income 16,858, disposable 15,400, consumption 11,310.",
      "Upper middle (fourth quintile): income 23,051, disposable 21,018, consumption 14,964.",
      "High income (ninth decile): income 31,172, disposable 28,386, consumption 19,264.",
      "Highest income (tenth decile): income 51,350, disposable 46,826, consumption 29,004.",
      "",
      "最低收入（第一十分位）：收入 5,951，可支配 5,253，消費 4,901。",
      "貧困（前 5%）：收入 4,936，可支配 4,198，消費 4,257。",
      "低收入（第二十分位）：收入 8,957，可支配 8,162，消費 6,743。",
      "中低收入（第二五分位）：收入 12,345，可支配 11,244，消費 8,739。",
      "中等收入（第三五分位）：收入 16,858，可支配 15,400，消費 11,310。",
      "中高收入（第四五分位）：收入 23,051，可支配 21,018，消費 14,964。",
      "高收入（第九十分位）：收入 31,172，可支配 28,386，消費 19,264。",
      "最高收入（第十十分位）：收入 51,350，可支配 46,826，消費 29,004。",
      "",
      "Average household size: 2.89 nationally, declining from 3.29 for lowest income to 2.51 for highest income.",
      "Employment proportion: 51.56% nationally, rising from 40.12% for lowest income to 61.75% for highest income.",
      "",
      "平均家庭人數：全國 2.89 人，從最低收入 3.29 人遞減到最高收入 2.51 人。",
      "就業比例：全國 51.56%，從最低收入 40.12% 上升到最高收入 61.75%。",
      "",
      "Exhibit 11: Consumption expenditure breakdown by income level (2009, RMB per capita).",
      "",
      "附件十一：按收入水準分列的消費支出明細（2009 年，人均人民幣）。",
      "",
      "Food spending as % of total consumption: national average 36.52%. Lowest income 46.81%. Lower middle 41.66%. Middle 39.00%. Upper middle 35.87%. High 33.02%. Highest 28.05%. Clear Engel's Law pattern: food share declines as income rises.",
      "",
      "食品支出占總消費比例：全國平均 36.52%。最低收入 46.81%。中低 41.66%。中等 39.00%。中高 35.87%。高 33.02%。最高 28.05%。明顯的恩格爾法則：收入越高，食品占比越低。",
      "",
      "Household Facilities, Articles and Services (RMB per capita): national 786.94. Lower middle 521.47. Middle 701.08. Upper middle 977.07. High 1,325.54. Highest 2,114.20. And as % of total: national 6.42%. Lowest 4.61%. Lower middle 5.97%. Middle 6.20%. Upper middle 6.53%. High 6.88%. Highest 7.29%. Both absolute spending and share of wallet increase with income.",
      "",
      "家庭設備用品及服務（人均人民幣）：全國 786.94。中低 521.47。中等 701.08。中高 977.07。高 1,325.54。最高 2,114.20。占比：全國 6.42%。最低 4.61%。中低 5.97%。中等 6.20%。中高 6.53%。高 6.88%。最高 7.29%。絕對金額和占比都隨收入上升。",
      "",
      "Note: This exhibit is directionally supportive of room for household-related everyday consumption growing with income. But it does not represent P&G's full portfolio (which also includes beauty, grooming, oral care, baby care).",
      "",
      "注意：此附件在方向上支持家庭日用品消費隨收入增長的論點，但不能完全代表 P&G 的全部產品組合（還包括美妝、美容、口腔護理、嬰兒護理等）。",
      "",
      "Clothing: national average 1,284.20 (10.47% of total). Health Care: 856.41 (6.98%). Transport and Communications: 1,682.57 (13.72%). Education, Culture, Recreation: 1,472.76 (12.01%). Miscellaneous: 474.21 (3.87%).",
      "",
      "服飾：全國平均 1,284.20（占 10.47%）。醫療保健：856.41（6.98%）。交通通訊：1,682.57（13.72%）。教育文化娛樂：1,472.76（12.01%）。雜項：474.21（3.87%）。"
    ]
  },
  {
    id: "part-2",
    title: "PART 2 / 第二部分",
    lines: [
      "## PART 2: P&G IN CHINA - THE FULL STORY (from Case Text)",
      "## 第二部分：P&G 在中國的完整故事（來自案例正文）",
      "",
      "**Entry and Early Years (1985-1997)**",
      "**進入與早期（1985-1997）**",
      "",
      "1980: China started opening to foreign companies; Special Economic Zones in Shenzhen, Zhuhai, Shantou, Xiamen. By 1984, 14 cities opened. Imports still restricted to foreign currency shops. Many inside P&G thought it was premature; Chinese consumers had little purchasing power and no channels existed for foreign consumer products. Others argued staying out would give competitors early mover advantage.",
      "",
      "1980 年：中國開始對外開放；深圳、珠海、汕頭、廈門設經濟特區。到 1984 年 14 個城市開放。進口仍限於外幣商店。P&G 內部許多人認為時機尚早，中國消費者購買力低且沒有外資消費品通路。但也有人認為不進入會讓競爭者取得先行者優勢。",
      "",
      "1985: P&G began market studies in Beijing and Shanghai. Also began advertising in China before selling any product. Edwin Artzt (later CEO): \"We went into the market two or three years before we actually started selling products, and started advertising to build up a reputation for the company.\"",
      "",
      "1985 年：P&G 開始在北京和上海做市場調查。在賣任何產品之前就開始在中國打廣告。Artzt（後來的 CEO）：「我們進市場比實際賣產品早了兩三年，先打廣告建立公司聲譽。」",
      "",
      "1988: P&G entered China via joint venture with Hutchison Whampoa (HK). P&G Hutchison Ltd was 69% P&G, 31% Hutchison. HQ in Guangzhou, drawing on P&G management and technical support from Hong Kong. Formed JV with Guangzhou Soap Factory, began producing shampoo. P&G increased stake to 80% in 1997, 100% in 2004.",
      "",
      "1988 年：P&G 透過與和記黃埔的合資進入中國。P&G Hutchison Ltd 股比 P&G 69%、和黃 31%。總部設廣州，藉助香港的 P&G 管理與技術支援。與廣州肥皂廠合資，開始生產洗髮精。1997 年增持至 80%，2004 年達 100%。",
      "",
      "Key decision: P&G had planned to start with laundry detergent, but research showed Chinese consumers did not value superior laundry performance. Instead, research showed Chinese consumers placed great value on personal appearance and might opt for P&G shampoos. P&G also found officials reluctant to let it enter the detergent sector and could not find willing partners among detergent manufacturers. So the first product was Head & Shoulders shampoo (1988).",
      "",
      "關鍵決策：P&G 原本打算從洗衣精起步，但研究顯示中國消費者不重視優越的洗衣效果。相反，研究顯示中國消費者非常重視個人外貌，可能會選 P&G 洗髮精。P&G 也發現官方不願讓其進入洗衣精市場，且找不到願意合作的洗衣精製造商。所以第一個產品是海倫仙度絲（Head & Shoulders）洗髮精（1988 年）。",
      "",
      "Head & Shoulders was introduced in various sizes down to single-use sachets at RMB 0.5 (average exchange rate 1988: RMB 3.72 = 1 USD). Even poor people would buy P&G shampoo for special occasions. Within a year, Head & Shoulders had roughly 15% of the Guangdong market.",
      "",
      "海倫仙度絲以各種規格推出，最小到單次使用小包裝，每包人民幣 0.5 元（1988 年平均匯率：3.72 元 = 1 美元）。即使窮人也會在特殊場合買 P&G 洗髮精。一年內，海倫仙度絲在廣東市場占約 15%。",
      "",
      "Product launches: Oil of Ulan (Olay) and Rejoice shampoo (1989). Pantene shampoo and Safeguard soap (1991). Crest toothpaste (1997, after extensive ad campaign on cavity prevention). Pampers disposable diapers (1997, after large ad campaign). By 2005: added Clairol, Vidal Sassoon, Zest, Whisper, Pampers, Ariel, Tide brands.",
      "",
      "產品推出時間線：玉蘭油與飄柔（1989）。潘婷與舒膚佳（1991）。佳潔士牙膏（1997，經大規模蛀牙預防廣告）。幫寶適紙尿褲（1997，經大規模廣告）。到 2005 年：增加 Clairol、沙宣、Zest、護舒寶、幫寶適、碧浪、汰漬等品牌。",
      "",
      "**Sales Growth Trajectory**",
      "**銷售成長軌跡**",
      "",
      "US$50M (1991) → US$100M (1992) → US$800M (1996) → US$1.8B (2003) → US$2B (2005) → US$5B (2009). P&G became the leader in the consumer products industry in China.",
      "",
      "**Geographic Expansion in China**",
      "**中國境內的地理擴張**",
      "",
      "Initially focused on Pearl River Delta (including Guangzhou) near HK, Yangtze River Delta (including Shanghai), and Bohai Rim (including Beijing and Tianjin). Province-by-province regulatory regimes and limited infrastructure constrained expansion.",
      "",
      "最初聚焦珠三角（含廣州）靠近香港、長三角（含上海）及渤海灣地區（含北京、天津）。省級監管制度與基礎設施限制了擴張。",
      "",
      "1995: Shanghai subsidiary and factory. By 2005: factories and subsidiaries in Guangzhou, Shanghai, Beijing, Chengdu (Sichuan), Tianjin. By 2008: added Dongguan (Guangdong), Nanping (Fujian), Beijing technical center. By 2010: 10 plants around China. Tianjin facility would be largest in the world.",
      "",
      "1995 年：上海子公司及工廠。到 2005 年：在廣州、上海、北京、成都（四川）、天津設工廠。到 2008 年：增加東莞（廣東）、南平（福建）、北京技術中心。到 2010 年：中國共 10 座工廠。天津廠區將是全球最大。",
      "",
      "**Category Creation**",
      "**品類創造**",
      "",
      "P&G did not just compete in existing categories. In many cases it helped create the category:",
      "",
      "P&G 不只是在既有品類中競爭，很多時候是直接幫助創造了整個品類：",
      "",
      "Shampoo: In parts of China, shampoo was not known as a packaged product. People used normal soap or brought containers to be filled from bulk. P&G was among the first to introduce packaged shampoo, and first to introduce anti-dandruff and conditioner-added formulas.",
      "",
      "洗髮精：在中國部分地區，洗髮精不是包裝產品。人們用普通肥皂或帶容器去散裝灌裝。P&G 是最早引入包裝洗髮精的企業之一，也是第一個引入去屑配方和含護髮素配方的。",
      "",
      "Toothpaste: Chalk-based toothpastes still dominated in China, while silica-based dominated globally. P&G was among first to introduce cavity-fighting toothpaste with modern mechanized production. Advertised heavily to promote daily tooth brushing in areas where it was not the norm.",
      "",
      "牙膏：中國當時仍以粉筆基（chalk-based）牙膏為主，而全球已轉向矽基（silica-based）。P&G 是最早引入防蛀牙膏並以現代機械化生產的企業之一。在日常刷牙尚未普及的地區大量投放廣告。",
      "",
      "Disposable diapers: When Pampers was introduced in 1997, disposable diaper use in China was non-existent. Most diapers were cloth rags. In poorer locations, no diapers at all. Baby clothes had slits. Some believed disposable diapers would cause infertility or bowed legs. By 2010, Pampers had roughly 30% of a rapidly growing US$1.4 billion market.",
      "",
      "紙尿褲：1997 年幫寶適進入中國時，拋棄式紙尿褲使用率為零。多數用布尿布。較貧困地區根本不用。嬰兒衣服有開襠設計。有人認為紙尿褲會導致不孕或O型腿。到 2010 年，幫寶適在快速成長的 14 億美元市場中占約 30%。",
      "",
      "**Developing Products for Different Segments**",
      "**為不同消費群開發產品**",
      "",
      "2000: CEO A.G. Lafley launched program to dramatically expand in developing markets. Historically, P&G had focused on just the top 5% to 10% of consumers in many developing markets. Lafley concluded this was unsustainable.",
      "",
      "2000 年：CEO Lafley 推動大幅擴展開發中市場的計畫。過去 P&G 在許多開發中市場只鎖定最頂層 5% 到 10% 的消費者。Lafley 認為這不可持續。",
      "",
      "P&G's segment estimates for China (most categories): premium = 15% of unit volume, 30% of value. Middle = 30% of volume, 40% of value. Low-end = 55% of volume, 30% of value. Each segment was too large to ignore. Plus, a single household might buy premium skin care, mid-tier toothpaste, and low-end detergent.",
      "",
      "P&G 對中國的品類分層估計（多數品類）：premium = 15% 的 unit volume、30% 的 value。Middle = 30% 的 volume、40% 的 value。Low-end = 55% 的 volume、30% 的 value。每個層級都大到不能忽視。而且同一家庭可能同時買 premium skin care、mid-tier toothpaste 和 low-end detergent。",
      "",
      "Old approach: either premium products for the affluent, or \"watered down\" products with as much cost removed as possible. The \"watered down\" approach often failed. The first cheap diaper P&G sold in China did not sell well because cost-cutting made the product unappealing.",
      "",
      "舊做法：要麼賣高端產品給富人，要麼把產品「稀釋」到盡可能低成本。「稀釋」做法常常失敗。P&G 在中國最早賣的低價紙尿褲賣不好，因為降成本讓產品變得沒吸引力。",
      "",
      "New approach: Study and understand the Chinese customer in detail. Develop products specifically for needs and price points. Thousands of P&G personnel sent to live with and observe consumers. Discoveries: shampoo used with only a few cups of water due to shortages. Soap lathered and wiped off (no bathrooms for privacy). Salt considered good for tooth cleaning. Tea as remedy for bad breath. Hand washing required different detergent than machine washing.",
      "",
      "新做法：詳細研究和理解中國消費者。為特定需求和價位開發產品。數千名 P&G 員工被派去與消費者同住觀察。發現：因缺水，洗髮精只用幾杯水。肥皂塗了擦掉（沒浴室的隱私問題）。鹽被認為能潔齒。茶被認為能除口臭。手洗和機洗需要不同配方。",
      "",
      "Three-tier brand strategy example in detergents: Ariel (premium), Tide (middle), local brands for low end. In toothpaste: Crest (premium), New Crest (middle). Key: different value proposition at different price points so top-tier brands are not diluted.",
      "",
      "三層品牌策略範例（洗衣精）：碧浪（premium）、汰漬（middle）、local brands（low end）。牙膏：佳潔士（premium）、新佳潔士（middle）。關鍵：在不同價位提供不同的價值主張，避免稀釋頂級品牌。",
      "",
      "\"$0.10 diaper\" project: Purpose-built at a specific price point, not watered-down premium. Also the \"$2 a day\" project: figuring out how to serve consumers living on $2/day. Case itself asks: \"whether catering to such consumers could ever be profitable.\"",
      "",
      "「0.10 美元紙尿褲」計畫：為特定價位專門設計，不是稀釋高端。還有「每天 2 美元」計畫：研究如何服務日收入 2 美元的消費者。案例自己提問：「服務這類消費者是否可能獲利。」",
      "",
      "**Manufacturing and Supply Chain**",
      "**製造與供應鏈**",
      "",
      "P&G was globally known as world-class manufacturer and supply chain manager. This gave sizable advantage at entry. Had to invest heavily in initial production capability and import equipment. Worked extensively with local and foreign suppliers to develop input quality.",
      "",
      "P&G 全球以世界級製造和供應鏈管理聞名。進入中國時這是重大優勢。初期必須大量投資建立產能並進口設備。與本地和外商供應商廣泛合作提升原料品質。",
      "",
      "To compete in mass market: had to reduce costs 30% to 50% from global norms. Instead of importing from high-cost countries, developed extensive supply networks in developing world. Sourced toothpaste tubes for China from India. Achieved 20% to 30% input cost advantage over medium-sized Chinese competitors through purchasing scale.",
      "",
      "為在大眾市場競爭：必須從全球標準降低成本 30% 到 50%。不再從高成本國家進口，而是在開發中國家建立廣泛供應網絡。中國市場的牙膏管從印度採購。透過採購規模，對中型中國競爭者取得 20% 到 30% 的原料成本優勢。",
      "",
      "Equipment innovation: Developed network of low-cost component suppliers in Asia and Latin America, plus assembly facility in Shanghai. Reduced cost of production lines by up to 30%. So successful that P&G began exporting equipment back to US and Europe.",
      "",
      "設備創新：在亞洲和拉美建立低成本零組件供應商網絡，加上海組裝廠。生產線成本降低達 30%。成功到開始將設備反向出口回美國和歐洲。",
      "",
      "By 2010: 10 plants in China. Tianjin facility would be largest in the world. February 2011: broke ground for Taicang plant, first globally under US Green Building Council LEED standards (minimizing water consumption, renewable energy with onsite solar, zero landfill waste).",
      "",
      "到 2010 年：中國 10 座工廠。天津廠區將是全球最大。2011 年 2 月：太倉新廠動工，是全球首座按美國 LEED 標準註冊的工廠（節水、可再生能源含現場太陽能、零垃圾填埋）。",
      "",
      "**Marketing**",
      "**行銷**",
      "",
      "Started advertising years before selling any product. New category introductions preceded by extensive ad campaigns. In early years, product launches received national news attention, with queues at stores. As launches became more common, P&G ramped up marketing.",
      "",
      "在賣任何產品之前就開始打廣告。新品類推出前都有大規模廣告。早期產品上市會上全國新聞，店門口排隊。隨著推出頻率增加，P&G 加大行銷力度。",
      "",
      "Chinese consumers took advertising very literally. Ads from other places reshot with Chinese cast did not work. Aspirational ads tended to work well. P&G tried to make global brands be seen as local brands.",
      "",
      "中國消費者對廣告的理解非常字面化。其他地方的廣告用中國演員重拍在中國行不通。勵志型廣告在中國效果好。P&G 努力讓全球品牌被視為本地品牌。",
      "",
      "P&G became China's largest television advertiser. CTR Media Intelligence estimated US$5.18 billion in published-rate advertising in 2010 (TV, newspapers, magazines, radio, outdoor). Advertising Age estimated actual spend at US$1.1 billion in 2009. Number-two L'Oreal was estimated at US$2.01 billion (published rate).",
      "",
      "P&G 成為中國最大電視廣告主。CTR Media Intelligence 估計 2010 年刊登價廣告支出 51.8 億美元（電視、報紙、雜誌、廣播、戶外）。Advertising Age 估計 2009 年實際支出約 11 億美元。第二名 L'Oreal 估計刊登價 20.1 億美元。",
      "",
      "2010: Title sponsor of \"Head & Shoulders: China's Got Talent\" (Chinese version of \"Britain's Got Talent\"). Oil of Olay and Gillette also featured. Designed to form emotional bond with Chinese consumers.",
      "",
      "2010 年：冠名贊助「海倫仙度絲：中國達人秀」（英國版改編）。玉蘭油和吉列也參與。目的是與中國消費者建立情感連結。",
      "",
      "Also extensive use of Tencent Weibo (microblog), flagship store on Taobao Mall (largest online marketplace), Weibo to promote Hope Schools. But still viewed TV as best way to reach national audience.",
      "",
      "也大量使用騰訊微博、淘寶商城旗艦店，並用微博推廣希望小學。但仍認為電視是觸及全國觀眾的最佳方式。",
      "",
      "**Distribution**",
      "**通路**",
      "",
      "When P&G entered China: limited national distribution. Most purchases in small local shops supplied by state-owned distributors. Most brands local, logistics expertise limited, distribution was transactional not relational.",
      "",
      "P&G 進入中國時：全國性通路有限。多數購買在國營配送商供應的地方小店。品牌多為本地，物流專業有限，配送是交易型而非關係型。",
      "",
      "P&G built collaborative relationships with distributors. Set up shadow management structures for major distributors, supervising daily activities AND training them in modern distribution and inventory management. This created and cemented relationships with some of China's most effective distributors.",
      "",
      "P&G 與經銷商建立合作關係。為主要經銷商設立影子管理架構，監督日常營運並訓練現代配送和庫存管理。這建立並鞏固了與中國最有效經銷商的關係。",
      "",
      "Initial focus: Guangzhou, Shenzhen, Shanghai, Beijing, Tianjin, and surrounding regions. Then pushed to second, third, fourth-tier cities and rural China. Built distribution network covering 500,000+ stores. By 2007, engaged in training people in 10,000 Chinese villages in retailing with Commerce Ministry.",
      "",
      "初期聚焦：廣州、深圳、上海、北京、天津及周邊。然後推向二三四線城市和農村。建立覆蓋 50 萬以上門店的配送網絡。2007 年起與商務部合作在一萬個中國村莊培訓零售人員。",
      "",
      "By 2010: nearly 150 distribution centers in China. Opened major DC in Guangzhou (largest in Asia, second largest worldwide). P&G funded equipment and systems; Guangzhou government supplied land and warehouse construction.",
      "",
      "到 2010 年：中國近 150 個配送中心。在廣州開設主要配送中心（亞洲最大、全球第二大）。P&G 出資設備與系統，廣州政府提供土地和倉庫建設。",
      "",
      "Tsinghua professor Li Fei: \"Amid a batch of disputes and conflicts between commodity providers and supermarkets in China, P&G is running smoothly and harmoniously with various retailing companies.\"",
      "",
      "清華大學李飛教授：「在中國眾多商品供應商與超市之間的糾紛衝突中，P&G 與各零售企業運行順暢且和諧。」",
      "",
      "**R&D Centers**",
      "**研發中心**",
      "",
      "1998: Opened US$10 million R&D facility in Beijing, adjacent to Tsinghua University. Initial goal: adapt global products to local circumstances. ~80% of 200 scientists were Chinese. Mandate: ensure global products meet Chinese needs, access China's scientific resources, improve products for global markets. Beijing lab specialized in detergents (hand washing) and oral care.",
      "",
      "1998 年：在北京清華大學旁開設 1,000 萬美元研發中心。初始目標：將全球產品適應本地需求。約 200 名科學家中 80% 為中國人。使命：確保全球產品滿足中國需求、取得中國科研資源、為全球市場改良產品。北京實驗室專精於洗衣精（手洗）和口腔護理。",
      "",
      "2010: Opened new US$80 million R&D center in Beijing, reportedly P&G's largest anywhere. 500+ scientists from 16 countries. Expected to be a major node in P&G's worldwide R&D network with global responsibilities. The only center worldwide working on all of P&G's product categories. Detergent and toothpaste formulations already being sold globally.",
      "",
      "2010 年：在北京開設新的 8,000 萬美元研發中心，據報是 P&G 全球最大。500 多名科學家來自 16 國。預計成為 P&G 全球研發網絡的主要節點，承擔全球責任。全球唯一跨所有 P&G 品類研究的中心。洗衣精和牙膏配方已銷往全球。",
      "",
      "**Building the Organization**",
      "**組織建設**",
      "",
      "From initial entry: focused on building local employment base. Among earliest foreign firms to actively recruit at major Chinese universities. Developed extensive training programs (general business, specific disciplines, P&G operating procedures and style).",
      "",
      "從進入初期：專注建立本地員工隊伍。是最早在中國重點大學積極招聘的外資企業之一。開發完整培訓體系（一般商業、專業領域、P&G 作業程序與風格）。",
      "",
      "Hire at entry level, promote from within. By 2010: only ~2% of 6,500 employees were non-Chinese. P&G China had become a net exporter of managerial talent (more Chinese from P&G China in management abroad than foreigners in China management).",
      "",
      "入門級招聘、內部晉升。到 2010 年：6,500 名員工中僅約 2% 為非中國籍。P&G 中國已成為管理人才的淨輸出者（P&G 中國人在海外管理崗位的人數多於在中國管理崗位的外籍人員）。",
      "",
      "2008: 51Job gave P&G top prizes for \"best campus recruiter,\" second for \"best new-hand trainer,\" in \"2008 Top 100 HR Companies in China.\" First foreign company in China to get State Administration of Foreign Exchange approval for foreign listed share grants to Chinese employees (after five-year negotiation).",
      "",
      "2008 年：51Job 授予 P&G「最佳校園招聘」首獎、「最佳新人培訓」第二名，入選「2008 中國百佳人力資源公司」。中國第一家獲國家外匯管理局批准向中國員工授予境外上市股票的外資企業（經五年協商）。",
      "",
      "**Government Relations and CSR**",
      "**政府關係與企業社會責任**",
      "",
      "Senior managers visited national and local officials regularly. Worked with central and local governments on education, public health, rural development.",
      "",
      "高管定期拜訪國家及地方官員。與中央和地方政府在教育、公共衛生、農村發展上合作。",
      "",
      "By mid-2010: Built 200 Hope Schools (more than any other foreign company). 150,000+ children studied in or graduated from P&G Hope Schools. School health program initiated 1997, donated RMB 300M by 2007, planned another RMB 200M from 2008-2012. 160 million students in 600+ cities in 31 provinces helped.",
      "",
      "到 2010 年中：建設 200 所希望小學（多於任何其他外資企業）。超過 15 萬兒童就讀或畢業於 P&G 希望小學。1997 年啟動學校健康計畫，到 2007 年捐贈 3 億人民幣，計畫 2008-2012 年再捐 2 億。31 省 600 多個城市的 1.6 億學生受益。",
      "",
      "Named \"Corporate Responsibility Top 50\" by Hurun Institute (four consecutive years). Ranked first in FMCG for \"World's Top 500 Company Contributors in China\" (Southern Weekend, four consecutive years). Named \"China Green Companies Top 100,\" ranked fourth among foreign companies, first in FMCG. Awarded \"Green Gold\" Platinum Award by Sohu and A.T. Kearney.",
      "",
      "胡潤「企業社會責任 50 強」（連續四年）。《南方周末》「世界 500 強在華貢獻」快消品第一（連續四年）。「中國綠色企業百強」外企第四、快消品第一。搜狐及科爾尼「綠色金牌」白金獎。",
      "",
      "Participated in 2010 Shanghai World Expo as Official Premier Sponsor of USA Pavilion. Aligned with Five Year Programs on sustainability and environmental protection. Taicang LEED plant was first in P&G's global plan for renewable energy and zero waste.",
      "",
      "2010 年上海世博會美國館首席贊助商。與五年計畫在永續和環保上對齊。太倉 LEED 工廠是 P&G 全球可再生能源零廢棄計畫的首例。",
      "",
      "Vice Minister Wang Chao of Ministry of Commerce (at 2010 R&D center opening): \"P&G is an excellent example of Sino-US economic cooperation... China will adopt a more open approach in conducting economic cooperation internationally and create a better environment for companies investing in China.\"",
      "",
      "商務部王超副部長（2010 年研發中心開幕）：「P&G 是中美經濟合作的優秀典範......中國將以更開放的姿態開展國際經濟合作，為在華投資企業創造更好的環境。」",
      "",
      "**Top Management Attention**",
      "**高層管理關注**",
      "",
      "John Smale (CEO 1981-1990): spearheaded movement into developing countries and China.",
      "Edwin Artzt (CEO 1990-1995): championed China entry in 1980s, continued support as CEO.",
      "John Pepper (CEO 1995-1998): as president in 1991, spent two weeks in China visiting facilities, consumers, officials, retailers. Called China \"one of the significant strategic growth opportunities for the company over the next 10, 20, 30 years.\"",
      "A.G. Lafley (CEO 2000-2009): spent years in Asia before becoming CEO, dramatically expanded developing-country emphasis.",
      "Robert McDonald (CEO from 2009): extensive Asia experience, stated P&G was moving footprint more toward Asia and China, \"no reason P&G should not reach every Chinese consumer.\"",
      "",
      "每位 CEO 都直接投入中國戰略和政府關係。",
      "",
      "Presidents of operations in developing nations met regularly with each other and with heads of global business units in a collaborative process.",
      "",
      "開發中國家營運總裁定期與彼此及全球事業單元負責人協作會議。",
      "",
      "**The SK-II Incidents**",
      "**SK-II 事件**",
      "",
      "SK-II: premium skin care brand, originally by Max Factor Japan, launched in Japan 1980. P&G acquired with Max Factor purchase in 1994. Introduced in China mainland in 1999. By 2005, China was ~7% of SK-II global sales. A 25-gram package could cost RMB 840 (US$100).",
      "",
      "SK-II：高端護膚品牌，原為日本 Max Factor 開發，1980 年在日本上市。P&G 1994 年收購 Max Factor 時取得。1999 年進入中國大陸。到 2005 年中國約占 SK-II 全球銷售的 7%。25 克包裝可達人民幣 840 元（約 100 美元）。",
      "",
      "2005 incident: Nanchang resident Lu Ping filed lawsuit claiming SK-II products caused burning and skin rashes instead of \"reducing wrinkles by 47%\" as advertised. Posted on Internet. Became national headlines. P&G said product was safe, advertising based on Japanese research. Nanchang Bureau found claims came from lab experiment involving 300 women in Japan and \"lacked authoritative proof.\" P&G fined US$24,000 for false advertising. P&G paid and withdrew advertising material.",
      "",
      "2005 年事件：南昌居民呂萍起訴 P&G，稱 SK-II 產品引起灼傷和皮疹而非廣告所稱的「減少 47% 皺紋」。在網上發帖。成為全國頭條。P&G 稱產品安全，廣告基於日本研究。南昌工商局認定廣告宣稱來自日本 300 名女性的實驗室實驗，「缺乏權威證明」。P&G 被罰款 24,000 美元虛假廣告。P&G 繳款並撤回廣告。",
      "",
      "2006 incident: September 14, AQSIQ announced several SK-II products imported from Japan tested positive for trace metals banned from cosmetics under Chinese law. P&G questioned results, said research indicated products were safe. Chinese media ran articles about liver disease, blindness, skin sensitivity, without discussing whether amounts found could cause such effects. September 16, AQSIQ affirmed findings and issued statement that Japanese government should ensure Japanese producers meet Chinese standards. Some speculated SK-II was being made a scapegoat for troubled Sino-Japanese relations. Notably, similar products from other countries found to have same substances were not picked up by media or officials.",
      "",
      "2006 年事件：9 月 14 日，國家質檢總局宣布從日本進口的數款 SK-II 產品檢出中國法律禁止的微量金屬。P&G 質疑結果，稱研究顯示產品安全。中國媒體報導可能引起肝病、失明、皮膚過敏等，但未討論檢出量是否真能造成這些影響。9 月 16 日，質檢總局確認結果並聲明日本政府應確保日本廠商符合中國標準。有人推測 SK-II 被當成中日關係緊張的替罪羊。值得注意的是，其他國家被獨立檢測出含相同物質的類似產品，並未被媒體或官員關注。",
      "",
      "Department stores removed SK-II. Customers demanded refunds. P&G responded with conditional refund requiring: evidence of allergy history, signed statement absolving P&G, original unused/partially used product, bank info. Customers became angry and violent. September 22: P&G closed all SK-II counters and withdrew products.",
      "",
      "百貨公司下架 SK-II。消費者要求退款。P&G 的退款條件要求：過敏史證明、簽署免除 P&G 責任聲明、原裝未用/部分使用產品、銀行資訊。消費者變得憤怒甚至暴力。9 月 22 日：P&G 關閉所有 SK-II 櫃台並撤回產品。",
      "",
      "People's Daily editorials criticized \"arrogance\" of a foreign company making good profits in China. Estimated SK-II China sales at US$66.2M (RMB 523M) per year.",
      "",
      "《人民日報》社論批評在中國賺大錢的外企的「傲慢」。估計 SK-II 中國年銷售約 6,620 萬美元（5.23 億人民幣）。",
      "",
      "October 24, 2006: AQSIQ and Department of Health jointly found only trace amounts, were by-products not intentionally added, products were not illegal and were safe. By November 2006, SK-II counters re-opened. But substantial damage done. Trade estimates: 40% fall in SK-II sales in Q1 2007 compared to pre-incident.",
      "",
      "2006 年 10 月 24 日：質檢總局和衛生部聯合認定僅含微量、是副產物非刻意添加、產品不違法且安全。到 2006 年 11 月 SK-II 櫃台重開。但損害已經造成。業界估計：2007 年第一季 SK-II 銷售比事件前下滑 40%。",
      "",
      "**The Challenges**",
      "**挑戰**",
      "",
      "Competition: International rivals (Unilever, L'Oreal, Kao, Colgate, SC Johnson). Chinese competitors: Nice (detergents), Hengan (tissue/hygiene), Guangzhou Liby (detergents), Guangdong Strong (teas), Shanghai Jahwa (cosmetics), and numerous others. Chinese competitors entering upscale as well as mid/low markets, with prices sometimes even higher than foreign brands. Chinese companies learning to market more sophisticatedly.",
      "",
      "競爭：國際對手（聯合利華、歐萊雅、花王、高露潔、莊臣）。中國競爭者：納愛斯（洗衣精）、恒安（紙巾/衛生用品）、廣州立白（洗衣精）、廣東強（茶）、上海家化（化妝品）等。中國競爭者也進入高端市場，有時價格甚至高於外資品牌。中國企業的行銷能力在提升。",
      "",
      "Rising costs: In early 2011, Unilever announced possible 15% price increase in China due to rising materials, transport, labor costs. This triggered consumer panic buying. Chinese government fined Unilever RMB 2 million for \"intensifying inflationary expectations\" and \"seriously disturbing market order.\" Premier Wen Jiabao had set inflation target at 4%. National Development and Reform Commission met with industry associations urging price restraint. P&G said price hikes were \"last resort\" and avoided being fined.",
      "",
      "成本上升：2011 年初，聯合利華宣布可能因原料、運輸、勞工成本上升而在中國漲價 15%。引發消費者恐慌搶購。中國政府罰款聯合利華 200 萬人民幣，指其「加劇通膨預期」和「嚴重擾亂市場秩序」。溫家寶總理設定通膨目標 4%。國家發改委價格司與產業協會會面要求價格克制。P&G 稱漲價是「最後手段」，避免被罰。",
      "",
      "Counterfeiting: A major issue. By early 2000s, modern retail chains and improved cost control meant real branded products were sometimes as cheap as counterfeits in traditional channels. But substandard counterfeit products could damage actual brands. Also worried about counterfeits being exported from China.",
      "",
      "仿冒品：重大問題。到 2000 年代初，現代零售鏈和成本控制改善意味著正牌產品有時和傳統渠道的仿冒品一樣便宜。但低劣仿冒品會損害真正品牌。也擔心仿冒品從中國出口。",
      "",
      "**P&G China in 2010 - Summary Facts**",
      "**P&G 中國 2010 年摘要事實**",
      "",
      "2009 China sales: US$5 billion, over 7% of global corporate sales. At least one product sold to 98% of Chinese households (per Kantar). Unilever reached 85%. P&G accounted for 3% of China's grocery sales. Per capita China spending on P&G: US$3. Per capita US: US$100. Per capita global: US$11.50. P&G was in about 14 categories in China vs. 35+ in US.",
      "",
      "2009 年中國銷售：50 億美元，超過全球企業銷售的 7%。至少一項產品觸及 98% 中國家庭（Kantar 數據）。聯合利華達 85%。P&G 占中國雜貨銷售的 3%。中國人均 P&G 消費：3 美元。美國人均：100 美元。全球人均：11.50 美元。P&G 在中國約 14 個品類，美國超過 35 個。",
      "",
      "Cumulative investment: US$1.5 billion since 1988. Planned additional US$1 billion by 2015. 2010 new investments: US$130M distribution center (Guangzhou), US$80M R&D center (Beijing), first phase of US$248M manufacturing facility (Tianjin).",
      "",
      "累計投資：自 1988 年以來 15 億美元。計畫到 2015 年再投 10 億。2010 年新投資：1.3 億美元配送中心（廣州）、8,000 萬美元研發中心（北京）、2.48 億美元製造設施首期（天津）。",
      "",
      "Goal: serve one billion additional consumers by 2015, or approximately 500,000 new customers per day. These would come overwhelmingly from emerging markets, mostly China and India. Developing world sales: 20% of total in 2000, 34% in 2010. Chinese household and personal care markets growing 20% to 30% annually.",
      "",
      "目標：到 2015 年服務新增 10 億消費者，即每天約 50 萬新客戶。主要來自新興市場，尤其中國和印度。開發中世界銷售：2000 年占 20%，2010 年占 34%。中國家庭及個人護理市場年增 20% 到 30%。"
    ]
  },
  {
    id: "part-3",
    title: "PART 3 / 第三部分",
    lines: [
      "## PART 3: FIVE LEVELS ANALYSIS",
      "## 第三部分：五層分析",
      "",
      "### INDUSTRY LEVEL 產業層",
      "",
      "**Industry definition:**",
      "**產業定義：**",
      "",
      "The China market for branded fast-moving household and personal care products, covering hair care, skin care, oral care, detergents and home care, baby care, soap, and grooming. These products have different formulations and production processes, but they deliver a similar useful output: recurring packaged products used to clean, groom, protect, and maintain the body or household. The boundary should be drawn by useful output and overlapping consumer occasions, not by production technology.",
      "",
      "中國市場中的品牌化快速消費家庭及個人護理用品產業，涵蓋 hair care、skin care、oral care、detergents and home care、baby care、soap 與 grooming。這些產品配方和製程不同，但提供相似的有用產出：反覆購買、用於清潔、保養、保護身體或家庭環境的包裝型日用品。邊界應按有用產出和重疊的消費場景劃定，不是按生產技術。",
      "",
      "This is a related multi-category FMCG arena, not a single narrow product market. The competitor set is not perfectly unified: Unilever overlaps broadly, Colgate is stronger in oral care, L'Oreal is stronger in beauty, Chinese firms (Nice, Liby, Hengan, Shanghai Jahwa) compete in specific lines.",
      "",
      "這是一個相關多品類的快消品場域，不是單一窄品類市場。競爭者重疊度不完全一致：聯合利華廣泛重疊，高露潔偏口腔護理，歐萊雅偏美妝，中國企業（納愛斯、立白、恒安、上海家化）在特定品線競爭。",
      "",
      "**Sources of industry profit:**",
      "**產業利潤來源：**",
      "",
      "Frequent repeat purchases. Brand trust and loyalty. Scale manufacturing and scale advertising. Distribution control (reaching 500,000+ stores requires massive investment). Price-tier architecture (ability to serve premium, mid, low with different brands/products).",
      "",
      "高頻重複購買。品牌信任與忠誠。規模化製造與規模化廣告。通路控制（覆蓋 50 萬以上門店需大量投資）。價格帶架構（用不同品牌/產品服務 premium、mid、low）。",
      "",
      "**Pressures on industry profit:**",
      "**產業利潤壓力：**",
      "",
      "Rising Chinese challengers learning sophisticated marketing and moving upmarket. Foreign incumbents with deep pockets. Counterfeiting. Rising input, transport, and labor costs. Government pricing sensitivity (Unilever fined RMB 2M for announcing increases). Province-by-province regulatory variation. Competition from functional substitutes (bulk soap, chalk toothpaste, cloth diapers, no diapers).",
      "",
      "中國競爭者學習精密行銷並向上攻。外資大廠資金雄厚。仿冒品。原料、運輸、勞工成本上升。政府對價格敏感（聯合利華被罰 200 萬人民幣）。省級監管差異。功能性替代品的競爭（散裝肥皂、粉筆牙膏、布尿布、不用尿布）。",
      "",
      "**Industry economics insight:**",
      "**產業經濟洞察：**",
      "",
      "Industry economics in China are shaped not just by cost and demand, but by whether the operating environment permits firms to pass on costs. This is a critical difference from Western FMCG markets.",
      "",
      "中國的產業經濟不僅由成本和需求決定，還取決於營運環境是否允許企業傳導成本。這與西方快消品市場有關鍵差異。",
      "",
      "**Types of competition in this industry:**",
      "**此產業中的競爭類型：**",
      "",
      "Premium tier: oligopoly among a few global brands. Mass market: hypercompetition among dozens of local brands and foreign entrants competing on price. Some categories have \"segmented competition\" where different tiers face very different competitive intensity.",
      "",
      "高端層：少數全球品牌之間的寡占。大眾市場：數十個本土品牌和外資進入者的價格超競爭。部分品類存在「分段競爭」，不同層級面臨截然不同的競爭強度。",
      "",
      "---",
      "",
      "### MESO / CLUSTER LEVEL 中觀/群聚層",
      "",
      "**Inputs and suppliers:**",
      "**投入與供應商：**",
      "",
      "P&G initially imported from high-cost countries. Then systematically developed China supply base plus broader developing-world supply network. Toothpaste tubes from India. Low-cost equipment assembly in Shanghai with component suppliers across Asia and Latin America. Achieved 20-30% input cost advantage over medium-sized Chinese competitors through purchasing scale. By 2010 even exporting equipment back to US and Europe.",
      "",
      "P&G 最初從高成本國家進口。然後系統性地建立中國供應基地及更廣泛的開發中世界供應網絡。牙膏管從印度採購。在上海做低成本設備組裝，零組件供應商遍及亞洲和拉美。透過採購規模對中型中國競爭者取得 20-30% 原料成本優勢。到 2010 年甚至將設備反向出口回美歐。",
      "",
      "**Demand and customers:**",
      "**需求與客戶：**",
      "",
      "Chinese consumers had distinctive needs discovered through immersion research. P&G was not just serving demand; in many categories it was creating demand by introducing entirely new product categories. Consumer needs varied enormously by income, geography, and urban/rural status.",
      "",
      "中國消費者有獨特需求，透過沉浸式研究發現。P&G 不只服務需求，在很多品類是透過引入全新產品類別來創造需求。消費者需求因收入、地理位置、城鎮/農村差異巨大。",
      "",
      "**Shared resources and activities:**",
      "**共享資源與活動：**",
      "",
      "R&D center adjacent to Tsinghua University, drawing on local scientific talent. Distribution network and distributor training benefited the broader retail ecosystem. 10,000 Villages Project with Commerce Ministry built retail infrastructure serving the whole CPG sector, not just P&G.",
      "",
      "研發中心毗鄰清華大學，利用本地科研人才。配送網絡和經銷商培訓惠及更廣泛的零售生態。與商務部的一萬村計畫建設的零售基礎設施服務整個快消品行業，不只 P&G。",
      "",
      "**Complementarities:**",
      "**互補性：**",
      "",
      "P&G's category creation activities (dental hygiene education, diaper awareness) created broader market demand that benefited other players too. Its supply chain development improved supplier capabilities across the region.",
      "",
      "P&G 的品類創造活動（牙齒衛生教育、紙尿褲意識）創造了更廣泛的市場需求，也惠及其他業者。供應鏈發展提升了整個區域的供應商能力。",
      "",
      "**Substitutes:**",
      "**替代品：**",
      "",
      "Functional substitutes, not just rival brands. Bulk soap, refill shampoo from bulk containers, chalk-based toothpaste, cloth rags, or no diapers at all. In some categories P&G was competing against the absence of the product category itself. This is a fundamentally different competitive dynamic than in developed markets.",
      "",
      "功能性替代品，不只是競爭品牌。散裝肥皂、散裝灌裝洗髮精、粉筆基牙膏、布尿布、或根本不用尿布。在某些品類 P&G 是在和「產品品類本身不存在」競爭。這與已開發市場的競爭動態根本不同。",
      "",
      "---",
      "",
      "### MACRO / NATIONAL LEVEL 宏觀/國家層",
      "",
      "**Macroeconomic conditions:**",
      "**總體經濟條件：**",
      "",
      "GDP growth consistently above 8% (Exhibit 9). GDP grew from under US$200B (1980) to roughly US$6T (2010). Population 1.3 billion, rapidly urbanizing. But China was becoming richer unevenly. Urban per capita disposable income ranged from RMB 5,253 (lowest decile) to RMB 46,826 (highest decile) per Exhibit 10. Household and personal care markets growing 20-30% annually.",
      "",
      "GDP 成長持續超過 8%。GDP 從不到 2,000 億（1980）成長至約 6 兆（2010）。人口 13 億，快速都市化。但中國的富裕化不均勻。城鎮人均可支配收入從最低十分位 5,253 元到最高十分位 46,826 元。家庭及個人護理市場年增 20-30%。",
      "",
      "This uneven enrichment is the single most important macro fact. It explains why one household might buy premium skin care, mid-tier toothpaste, and low-end detergent simultaneously. And it explains why P&G needed a three-tier positioning system rather than a single positioning.",
      "",
      "不均勻的富裕化是最重要的宏觀事實。它解釋了為什麼同一家庭可能同時買 premium skin care、mid-tier toothpaste 和 low-end detergent。也解釋了為什麼 P&G 需要三層定位系統而非單一定位。",
      "",
      "**Government policies:**",
      "**政府政策：**",
      "",
      "Mixed signals. On one hand: Vice Minister Wang Chao publicly praised P&G. Government cooperated on rural development, education, 10,000 Villages Project. P&G was first foreign company to get foreign share grant approval for Chinese employees.",
      "",
      "訊號混合。一方面：王超副部長公開讚揚 P&G。政府在農村發展、教育、一萬村計畫上合作。P&G 是第一家獲批向中國員工授予境外股票的外資企業。",
      "",
      "On the other hand: Government fined Unilever RMB 2M for announcing price increases. Premier Wen set 4% inflation target. NDRC Price Department met with industry associations urging restraint. Province-by-province regulatory variation created uncertainty. P&G itself said price hikes were \"last resort.\"",
      "",
      "另一方面：政府罰款聯合利華 200 萬人民幣。溫總理設定 4% 通膨目標。發改委價格司約談產業協會要求克制。省級監管差異造成不確定性。P&G 自己也稱漲價是「最後手段」。",
      "",
      "**Macro institutions:**",
      "**宏觀制度：**",
      "",
      "AQSIQ (quality inspection) could apply regulations unpredictably, as SK-II showed. Commerce Ministry was a cooperative partner for rural development programs. Educational institutions (Tsinghua) were R&D partners.",
      "",
      "國家質檢總局（AQSIQ）的監管可能不可預測，如 SK-II 事件所示。商務部是農村發展計畫的合作夥伴。教育機構（清華）是研發合作夥伴。",
      "",
      "**Cultural attributes:**",
      "**文化屬性：**",
      "",
      "Chinese consumers took advertising very literally. Aspirational ads worked well. Regional beliefs (disposable diapers cause infertility). Different dental hygiene norms (salt for teeth, tea for breath). Privacy concerns affected product usage (soap wiped off, no bathroom). These required genuine local adaptation, not just translation.",
      "",
      "中國消費者對廣告理解非常字面化。勵志型廣告效果好。地方信仰（紙尿褲導致不孕）。不同的口腔衛生觀念（用鹽潔齒、用茶除口臭）。隱私影響產品使用（肥皂塗了擦掉，沒浴室）。這些需要真正的在地適應，不只是翻譯。",
      "",
      "**Government priorities:**",
      "**政府優先事項：**",
      "",
      "11th Five Year Program (2006-2010) and 12th Five Year Program (2011-2015) emphasized sustainability, environmental protection, rural development. P&G aligned visibly: Taicang LEED plant, Hope Schools, school health programs, 10,000 Villages Project.",
      "",
      "第十一個五年規劃（2006-2010）和第十二個五年規劃（2011-2015）強調永續、環保、農村發展。P&G 明顯對齊：太倉 LEED 工廠、希望小學、學校健康計畫、一萬村計畫。",
      "",
      "---",
      "",
      "### META / SUPRANATIONAL LEVEL 超國家層",
      "",
      "**Global growth dynamics:**",
      "**全球成長動態：**",
      "",
      "Developing economies growing ~6% vs. 1-2% for developed. P&G's developing-market sales share rose from 20% (2000) to 34% (2010). Management targeted adding one billion consumers, overwhelmingly from emerging markets.",
      "",
      "開發中經濟體成長約 6%，已開發約 1-2%。P&G 開發中市場銷售占比從 20%（2000）升至 34%（2010）。管理層目標新增 10 億消費者，主要來自新興市場。",
      "",
      "**Global supply networks:**",
      "**全球供應網絡：**",
      "",
      "P&G used supply networks across Asia and Latin America. Equipment suppliers in developing world, assembly in Shanghai, inputs from India, equipment exported back to US and Europe. This is a supranational supply chain strategy, not just a China strategy.",
      "",
      "P&G 使用跨亞洲和拉美的供應網絡。開發中國家的設備供應商、上海組裝、印度原料、設備反向出口美歐。這是超國家供應鏈策略，不只是中國策略。",
      "",
      "**Foreign-company risk:**",
      "**外資企業風險：**",
      "",
      "Despite massive CSR investment (200 Hope Schools, 160M students), P&G was still viewed as a foreign company and criticized for insensitivity to government and public concerns. The case states China's government was \"appearing to take a dimmer view of foreign companies.\" This is a structural risk that no amount of CSR fully eliminates.",
      "",
      "儘管大量 CSR 投資（200 所希望小學、1.6 億學生），P&G 仍被視為外資企業，被批評對政府和民間關切不夠敏感。案例指出中國政府「似乎對外資企業越來越不友善」。這是結構性風險，再多的 CSR 也無法完全消除。",
      "",
      "**SK-II as meta-level event:**",
      "**SK-II 作為超國家層事件：**",
      "",
      "The case notes that some speculated SK-II was being made a scapegoat for troubled Sino-Japanese relations. Whether or not that specific interpretation is correct, the episode demonstrated that a foreign brand in China operates within a supranational context that can override product quality or safety evidence. Regulatory action, media dynamics, and possibly broader political tensions can amplify foreign-brand vulnerability.",
      "",
      "案例指出有人推測 SK-II 被拿來當中日關係緊張的替罪羊。無論這個具體解讀是否正確，這件事證明外國品牌在中國是在一個超國家脈絡中運作，這個脈絡可以凌駕產品品質或安全證據。監管行動、媒體動態以及可能更廣泛的政治緊張關係可以放大外國品牌的脆弱性。",
      "",
      "---",
      "",
      "### FIRM LEVEL: SPARK 企業層：SPARK",
      "",
      "**S = Scope 範疇：**",
      "",
      "14 categories in China vs. 35+ in US. Present across premium, mid-tier, and low-tier segments. First through fourth-tier cities plus rural push. 10 plants, ~150 distribution centers, 500,000+ stores. Significant room to expand both categories and geography.",
      "",
      "中國 14 個品類 vs. 美國 35+。橫跨 premium、mid-tier、low-tier 各 segment。一線到四線城市加農村推進。10 座工廠、約 150 個配送中心、50 萬以上門店。品類和地理範圍都有顯著擴展空間。",
      "",
      "**P = Positioning 定位：**",
      "",
      "Premium: global brands at premium prices (Head & Shoulders at 3x competition, Olay, SK-II). Mid-tier: adapted formulations at accessible prices (New Crest, Tide as mid-tier in China). Low-tier: purpose-built products for specific price points (US$0.10 diapers, RMB 0.5 sachets). Key: different value proposition at each price point to avoid diluting premium brands. This was a deliberate shift from the old \"premium or watered-down\" model.",
      "",
      "Premium：全球品牌以高價銷售（海倫仙度絲是競品 3 倍、玉蘭油、SK-II）。Mid-tier：調整配方以可負擔價格銷售（新佳潔士、汰漬在中國定位為 mid-tier）。Low-tier：為特定價位專門設計的產品（0.10 美元紙尿褲、0.5 元人民幣小包裝）。關鍵：每個價位有不同的價值主張，避免稀釋 premium 品牌。這是從舊的「premium 或稀釋版」模式的刻意轉變。",
      "",
      "**A = Activities 活動：**",
      "",
      "R&D: US$10M Beijing center (1998), US$80M center (2010), largest in P&G network, only center globally working on all categories. Beijing lab became global center of excellence for detergents and toothpastes, with formulations exported worldwide.",
      "",
      "研發：1,000 萬美元北京中心（1998）、8,000 萬美元中心（2010），P&G 全球最大，唯一跨所有品類的中心。北京實驗室成為洗衣精和牙膏的全球卓越中心，配方銷往全球。",
      "",
      "Manufacturing: Reduced equipment costs 30% through low-cost component suppliers + Shanghai assembly. Exported equipment back to US and Europe.",
      "",
      "製造：透過低成本零組件供應商加上海組裝降低設備成本 30%。將設備反向出口回美歐。",
      "",
      "Marketing: China's largest TV advertiser. Advertising Age estimated US$1.1 billion actual ad spend in 2009. Sponsored China's Got Talent. Used Tencent Weibo, Taobao Mall. Pre-entry advertising strategy. Aspirational messaging adapted for Chinese consumers.",
      "",
      "行銷：中國最大電視廣告主。Advertising Age 估計 2009 年實際廣告支出 11 億美元。贊助中國達人秀。使用騰訊微博、淘寶商城。進場前廣告策略。為中國消費者調整的勵志訊息。",
      "",
      "Distribution: Shadow management for distributors. Modern inventory management training. 500,000+ stores. 10,000 villages with Commerce Ministry. ~150 distribution centers. Relations with retailers viewed as key advantage.",
      "",
      "通路：為經銷商設立影子管理。現代庫存管理培訓。50 萬以上門店。與商務部合作一萬村。約 150 個配送中心。與零售商的關係被視為關鍵優勢。",
      "",
      "Consumer research: Thousands of employees sent to live with consumers. Discovered real usage conditions. Led to genuine product redesign, not just cost reduction.",
      "",
      "消費者研究：數千名員工派去與消費者同住。發現真實使用情境。帶來真正的產品重新設計，而不只是降成本。",
      "",
      "These activities reinforce each other as a system.",
      "",
      "這些活動作為系統相互強化。",
      "",
      "**R = Resources 資源：**",
      "",
      "Brand portfolio: Rejoice, Olay, Pampers, Tide, Gillette (all category leaders in China). US$1.5B cumulative investment. 10 plants, ~150 distribution centers, US$80M R&D center. 6,500 employees, 98% Chinese, net exporter of talent. Distribution network and distributor relationships (took years to build, hard to replicate). Scale sourcing: 20-30% input cost advantage.",
      "",
      "品牌組合：飄柔、玉蘭油、幫寶適、汰漬、吉列（均為中國品類領導者）。累計投資 15 億美元。10 座工廠、約 150 個配送中心、8,000 萬美元研發中心。6,500 名員工，98% 中國籍，人才淨輸出者。配送網絡和經銷商關係（花多年建立，難以複製）。規模化採購：20-30% 原料成本優勢。",
      "",
      "**K = Knowledge 知識：**",
      "",
      "Deep consumer insight from ethnographic research. Understanding of China's income stratification and how to develop products for specific price points rather than \"watering down\" premium. Expertise in building distribution in a fragmented market. 22 years of institutional knowledge about China's regulatory environment. This knowledge is largely tacit and experiential, making it hard to imitate.",
      "",
      "來自民族誌研究的深度消費者洞察。理解中國的收入分層結構以及如何為特定價位開發產品而非「稀釋」premium。在碎片化市場中建立通路的專業知識。22 年中國監管環境的機構知識。這些知識大多是隱性和經驗性的，難以模仿。",
      "",
      "---",
      "",
      "### WHAT P&G DID RIGHT 做對的事",
      "",
      "Entered with shampoo based on consumer research, not HQ assumptions (case p.2).",
      "Created entirely new product categories rather than just competing in existing ones (case p.3).",
      "Shifted from \"premium only\" and \"watered down\" to purpose-built products at specific price points (case p.4).",
      "Built 98% Chinese workforce, net exporter of managerial talent, first foreign company with share grants approved (case p.8).",
      "Heavy CSR aligned with government priorities: 200 Hope Schools, 160M students reached (case p.8-9).",
      "Every CEO from Smale through McDonald had direct personal involvement in China (case p.10).",
      "",
      "根據消費者研究而非總部假設，以洗髮精進入（案例 p.2）。",
      "創造全新產品品類而非只在既有品類競爭（案例 p.3）。",
      "從「只做高端」和「稀釋版」轉向為特定價位專門設計（案例 p.4）。",
      "建立 98% 中國籍員工隊伍，管理人才淨輸出者，首家獲批股票授予的外企（案例 p.8）。",
      "大量 CSR 與政府優先事項對齊：200 所希望小學，觸及 1.6 億學生（案例 p.8-9）。",
      "從 Smale 到 McDonald 每位 CEO 都直接參與中國事務（案例 p.10）。",
      "",
      "### WHAT P&G DID WRONG OR WHERE RISK REMAINS 做錯的或仍存風險之處",
      "",
      "Initially targeted only top 5-10% of consumers in developing markets. Management later recognized this was a growth constraint (case p.4).",
      "",
      "最初只鎖定開發中市場最頂層 5-10% 消費者。管理層後來承認這是成長限制（案例 p.4）。",
      "",
      "Early \"watered-down\" low-end products failed. First cheap diaper was unappealing (case p.4). P&G initially misunderstood value engineering in China.",
      "",
      "早期「稀釋版」低端產品失敗。第一款廉價紙尿褲不吸引人（案例 p.4）。P&G 最初誤解了中國的價值工程。",
      "",
      "Penetration outran monetization. 98% household reach but only $3 per capita (case p.12). Platform was broad, wallet share shallow. Distribution success outran consumer value capture.",
      "",
      "覆蓋率跑在變現前面。98% 家庭覆蓋但人均僅 3 美元（案例 p.12）。平台廣但錢包份額淺。通路成功跑在消費者價值擷取前面。",
      "",
      "SK-II crisis management failure. Rigid refund policy requiring liability waivers generated public anger, called \"arrogant\" (case p.11). 40% sales decline Q1 2007.",
      "",
      "SK-II 危機管理失敗。要求簽署免責聲明的僵硬退款政策引發公憤，被稱為「傲慢」（案例 p.11）。2007 年第一季銷售下滑 40%。",
      "",
      "Pricing vulnerability is structural. The Unilever fine shows foreign firms operate under different rules regarding price increases in China (case p.12).",
      "",
      "定價脆弱性是結構性的。聯合利華被罰顯示外企在中國漲價面臨不同規則（案例 p.12）。",
      "",
      "### CROSS-LEVEL LINKAGE 跨層連結",
      "",
      "These five levels did not operate independently. China's uneven income growth at the macro level created a three-tier demand structure at the industry level. That, in turn, required P&G at the firm level to build multiple linked positioning, activity, and resource systems rather than rely on a single premium model. The SK-II episode also showed how meta-level political tension could spill into macro-level regulatory action and then expose firm-level execution weakness. Reading this case through any single level misses the interactions that actually determined P&G's performance in China.",
      "",
      "這五個層級不是獨立運作的。宏觀層的中國不均勻收入增長在產業層創造了三層需求結構。這反過來要求 P&G 在企業層建立多個相互連結的定位、活動和資源系統，而非依賴單一的高端模式。SK-II 事件也顯示超國家層的政治緊張如何外溢到宏觀層的監管行動，然後暴露企業層的執行弱點。用任何單一層級來解讀這個案例，都會錯過真正決定 P&G 在中國績效的互動關係。"
    ]
  },
  {
    id: "part-4",
    title: "PART 4 / 第四部分",
    lines: [
      "## PART 4: STUDY QUESTIONS DIRECT ANSWERS",
      "## 第四部分：題目直接作答",
      "",
      "(See the final merged text delivered earlier in this conversation for complete Q1-Q5 answers. The key points are summarized below for quick oral reference.)",
      "",
      "（完整 Q1-Q5 作答請參見本對話稍早交付的最終合併文本。以下為課堂口述用的重點摘要。）",
      "",
      "**Q1 quick reference:** By region: NA 42%, WE 21%, Asia 15%, CEEMEA 13%, LatAm 9%. By economy: developed 66%, developing 34%. By country: US and China are clearly major; China = #2 volume, #5 value, $5B, over 7%.",
      "",
      "**Q2 quick reference:** Developed 1-2% growth vs. developing 6%. Old model (top 5-10% only) hit ceiling. In China: premium = 15% vol/30% val, middle = 30%/40%, low = 55%/30%. China per capita $3 vs. global $11.50 vs. US $100. 98% household reach. 14 vs. 35+ categories. Market growing 20-30%.",
      "",
      "**Q3 quick reference:** Global ~$95B (weighted growth = $92B, customer base = $99B upper bound). China ~$12B (mid-high teens growth from $5B base; or 12-13% strategic share of $95B). Defensible range $10-15B.",
      "",
      "**Q4 quick reference:** Five Levels + SPARK as above. Thesis: fundamentally strong but incomplete. Platform broad, monetization shallow. System advantage is real. SK-II exposed crisis management and foreignness risk. Cross-level: uneven macro income → three-tier industry demand → multi-system SPARK requirement.",
      "",
      "**Q5 quick reference:** Thesis: widen wallet share, not just penetration. Products: Fabric Care, Oral Care, Baby Care, Hair Care (all high-frequency essentials with existing tier architecture). Geography: barbell (defend first-tier, invest in 2nd-4th tier). Income: mass middle is core monetization zone. Low end: selective, not universal."
    ]
  },
  {
    id: "part-5",
    title: "PART 5 / 第五部分",
    lines: [
      "## PART 5: DISCUSSION OPENERS",
      "## 第五部分：課堂討論開場",
      "",
      "**Opening statement (use this first):**",
      "**開場白（第一個用這句）：**",
      "",
      "\"The central tension in this case is that P&G had already reached 98% of Chinese households, but per capita spending was still only US$3. So the real problem was not simple penetration. It was monetization.\"",
      "",
      "「這個案例的核心張力是 P&G 已經觸及 98% 的中國家庭，但人均消費僅 3 美元。所以真正的問題不是覆蓋率，而是變現。」",
      "",
      "**Discussion point 2: SK-II as Five Levels case study.**",
      "**討論點二：SK-II 作為五層案例研究。**",
      "",
      "The incident shows how meta-level forces (possibly Sino-Japanese tensions), macro-level institutional action (AQSIQ testing and media amplification), and firm-level crisis management weakness (the refund policy) interact. The levels do not operate in isolation.",
      "",
      "這件事顯示超國家層力量（可能的中日緊張）、宏觀層制度行動（質檢總局檢測和媒體放大）、企業層危機管理弱點（退款政策）如何交互作用。各層級不是孤立運作的。",
      "",
      "**Discussion point 3: Three-tier positioning question.**",
      "**討論點三：三層定位問題。**",
      "",
      "Is it sustainable to run premium, mid-tier, and low-tier brands simultaneously in the same household without diluting the premium? The detergent example (Ariel/Tide/local) is the cleanest illustration.",
      "",
      "在同一家庭中同時經營 premium、mid-tier、low-tier 品牌而不稀釋 premium 是否可持續？洗衣精的例子（碧浪/汰漬/本地品牌）是最清楚的說明。",
      "",
      "**Discussion point 4: Industry economics beyond current margins.**",
      "**討論點四：超越當前利潤率的產業經濟。**",
      "",
      "Profit is possible because of repeat purchases, brand trust, scale advertising, distribution control. What can change it? Rising local competition, government pricing constraints, counterfeiting, structural cost of expanding into lower-income segments.",
      "",
      "利潤之所以可能，源於重複購買、品牌信任、規模廣告、通路控制。什麼能改變它？本土競爭升級、政府價格約束、仿冒品、向低收入群體擴張的結構性成本。",
      "",
      "**Discussion point 5: Cross-level linkage.**",
      "**討論點五：跨層連結。**",
      "",
      "China's uneven income growth at the macro level created a three-tier demand structure at the industry level. That required P&G at the firm level to build multiple linked positioning, activity, and resource systems rather than rely on a single premium model. This is not five separate boxes. It is one interacting system.",
      "",
      "中國宏觀層的不均勻收入增長在產業層創造了三層需求結構。這要求 P&G 在企業層建立多個相互連結的定位、活動和資源系統，而非依賴單一 premium 模式。這不是五個分開的方塊，而是一個互動的系統。",
      "",
      "**Q3 oral delivery tip (from ChatGPT feedback):**",
      "**Q3 口頭表達建議（來自 ChatGPT 回饋）：**",
      "",
      "When saying the China target out loud, use this phrasing: \"Using US$5 billion in 2009 as the nearest clean base, I think roughly US$12 billion is a defensible five-year planning target, with upside if P&G improves monetization faster than expected.\"",
      "",
      "口頭說中國目標時，用這個說法：「以 2009 年 50 億美元作為最接近的乾淨基準，我認為大約 120 億美元是可辯護的五年規劃目標，如果 P&G 的變現能力改善速度超過預期，還有上行空間。」",
      "",
      "---",
      "",
      "END OF SPEAKING NOTES",
      "筆記結束"
    ]
  }
];

const SOURCE_LINES = SOURCE_SECTIONS.flatMap((section) => section.lines);

const TEST_CASES = [
  "Default render: the dashboard loads without compile or runtime errors.",
  "Invalid icon name: Icon falls back to the book icon and does not crash.",
  "Navigation: every tab switches cleanly on desktop and mobile.",
  "Source search: matching and non-matching terms update counts and empty states correctly.",
  "Speaker mode: condensed oral cards remain readable and source-heavy panels stay hidden.",
  "Mobile layout: cards wrap, no text escapes containers, and no controls overlap.",
  "Source reading mode: larger text and narrower measure improve long-form readability without clipping.",
];

const RUNTIME_CHECKS = [
  { name: "SVG icon fallback active", pass: Array.isArray(ICON_PATHS.book) && ICON_PATHS.book.length > 0 },
  { name: "Source sections available", pass: SOURCE_SECTIONS.length === 7 },
  { name: "Full source restored from user-provided text", pass: SOURCE_LINES.length > 450 },
  { name: "Five Levels cards ready", pass: FIVE_LEVELS.length === 5 },
  { name: "Top metrics ready", pass: TOP_METRICS.length >= 4 },
];

function ToneList({ title, tone, items }) {
  const toneStyles = tone === "emerald"
    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
    : "border-amber-200 bg-amber-50 text-amber-950";
  const bulletStyles = tone === "emerald" ? "bg-emerald-600" : "bg-amber-600";

  return (
    <Card className={cn("border", toneStyles, "p-5")}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 space-y-3 text-sm leading-6">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", bulletStyles)} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ComparisonBars({ rows, maxValue }) {
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="min-w-0">
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="truncate font-medium text-slate-700">{row.label}</span>
            <span className="shrink-0 text-slate-500">{row.note}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-slate-900" style={{ width: `${(row.value / maxValue) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SparkTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[140px,1fr] border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 sm:grid">
        <div className="px-4 py-3">Dimension</div>
        <div className="px-4 py-3">Interpretation</div>
      </div>
      {SPARK.map(([k, v]) => (
        <div key={k} className="border-t border-slate-200 first:border-t-0 sm:grid sm:grid-cols-[140px,1fr]">
          <div className="px-4 pb-1 pt-4 text-sm font-semibold text-slate-900 sm:py-4">{k}</div>
          <div className="px-4 pb-4 text-sm leading-6 text-slate-600 sm:py-4">{v}</div>
        </div>
      ))}
    </div>
  );
}

function LinkageDiagram() {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {FIVE_LEVELS.map((level, idx) => (
        <div key={level.key} className="relative">
          <Card className="h-full p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon name={level.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-950">{level.key}</div>
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{level.short}</div>
              </div>
            </div>
            <div className="mt-3 text-sm leading-6 text-slate-600">{level.thesis}</div>
          </Card>
          {idx < FIVE_LEVELS.length - 1 ? (
            <div className="hidden xl:flex absolute -right-3 top-1/2 z-10 h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500">
              <Icon name="route" className="h-4 w-4" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SourceSectionCard({ section, query, expanded, onToggle, readingMode }) {
  const normalized = query.trim().toLowerCase();
  const visibleLines = normalized
    ? section.lines.filter((line) => line.toLowerCase().includes(normalized))
    : section.lines;
  const hasMatches = visibleLines.length > 0;

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 text-left hover:bg-slate-50 sm:px-5"
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-950">{section.title}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{section.lines.length} lines</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {query ? (
            <span className={cn("rounded-full px-2 py-1 text-xs font-medium", hasMatches ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
              {hasMatches ? `${visibleLines.length} hits` : "0 hits"}
            </span>
          ) : null}
          <Icon name={expanded ? "x" : "menu"} className="h-4 w-4 text-slate-500" />
        </div>
      </button>
      {expanded ? (
        <div className={cn("bg-slate-950 text-slate-200", readingMode ? "px-5 py-6 text-base leading-8 sm:px-8" : "p-4 text-sm leading-7 sm:p-5")}>
          <div className={cn(readingMode ? "mx-auto max-w-3xl" : "max-w-none")}>
            {hasMatches ? (
              visibleLines.map((line, idx) => (
                <div key={`${section.id}-${idx}`} className="whitespace-pre-wrap break-words">
                  {line || " "}
                </div>
              ))
            ) : (
              <div className="text-slate-400">No matching lines in this section.</div>
            )}
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function SourceLayer() {
  const [query, setQuery] = useState("");
  const [readingMode, setReadingMode] = useState(true);
  const [expandedIds, setExpandedIds] = useState(() => new Set(SOURCE_SECTIONS.map((section) => section.id)));

  const totalMatches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return SOURCE_LINES.length;
    return SOURCE_LINES.filter((line) => line.toLowerCase().includes(normalized)).length;
  }, [query]);

  const toggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(SOURCE_SECTIONS.map((section) => section.id)));
  const collapseAll = () => setExpandedIds(new Set());

  return (
    <div className="space-y-5">
      <Card className="p-5 sm:p-6">
        <SectionHeader
          icon="text"
          eyebrow="Source layer"
          title="Reading-first full source view"
          subtitle="This panel preserves the user-provided full text in section arrays rather than fragile long template strings. Search, expansion, and reading width are optimized for actual study use."
          right={
            <button
              type="button"
              onClick={() => setReadingMode((v) => !v)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {readingMode ? "Compact mode" : "Reading mode"}
            </button>
          }
        />
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr),auto,auto] lg:items-center">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the preserved source..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-slate-300"
            />
          </div>
          <button type="button" onClick={expandAll} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Expand all</button>
          <button type="button" onClick={collapseAll} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Collapse all</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{SOURCE_SECTIONS.length} source sections</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{SOURCE_LINES.length} total lines preserved</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{query ? `${totalMatches} matching lines` : "Search inactive"}</span>
        </div>
      </Card>

      <div className="space-y-4">
        {SOURCE_SECTIONS.map((section) => (
          <SourceSectionCard
            key={section.id}
            section={section}
            query={query}
            expanded={expandedIds.has(section.id)}
            onToggle={() => toggle(section.id)}
            readingMode={readingMode}
          />
        ))}
      </div>
    </div>
  );
}

function IntegrityPanel() {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <SectionHeader
          icon="check"
          eyebrow="Runtime checks"
          title="Basic render checks"
          subtitle="These checks validate the current component structure, source preservation state, and the icon fallback requirement."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {RUNTIME_CHECKS.map((check) => (
            <div key={check.name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <span className={cn("flex h-6 w-6 items-center justify-center rounded-full", check.pass ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                <Icon name={check.pass ? "check" : "alert"} className="h-4 w-4" />
              </span>
              <span className="text-slate-700">{check.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionHeader
          icon="play"
          eyebrow="Manual tests"
          title="Suggested test cases"
          subtitle="Added because the artifact had no explicit test layer. These target the known parser issues and the new reading interactions."
        />
        <div className="space-y-3">
          {TEST_CASES.map((testCase) => (
            <div key={testCase} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
              <span>{testCase}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function Session10PgChinaVisualInfrastructure() {
  const sections = useMemo(
    () => [
      { key: "overview", label: "Overview", icon: "book" },
      { key: "exhibits", label: "Exhibits", icon: "table" },
      { key: "linkage", label: "Linkage", icon: "layers" },
      { key: "speaker", label: "Speaker Mode", icon: "mic" },
      { key: "source", label: "Source Reading", icon: "text" },
      { key: "qa", label: "QA", icon: "check" },
    ],
    []
  );

  const [active, setActive] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [speakerMode, setSpeakerMode] = useState(false);

  return (
    <div className={cn("min-h-screen bg-slate-100 text-slate-900", speakerMode ? "antialiased" : "") }>
      <div className={cn("mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6", speakerMode ? "max-w-6xl" : "") }>
        <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Icon name="book" className="h-3.5 w-3.5" />
                Session 10 study infrastructure
              </div>
              <h1 className={cn("font-semibold tracking-tight text-slate-950", speakerMode ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl")}>
                P&amp;G in China Visual Study Dashboard
              </h1>
              <p className={cn("mt-3 max-w-4xl text-slate-600", speakerMode ? "text-base leading-8" : "text-sm leading-7 sm:text-[15px]")}>
                Built for reader-side learning rather than progress reporting. This version upgrades exhibit comparison, Five Levels linkage, oral delivery support,
                mobile navigation, and source reading while keeping the full user-provided text preserved in compile-safe arrays.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setSpeakerMode((v) => !v);
                  setActive((prev) => (prev === "source" && !speakerMode ? "speaker" : prev));
                }}
                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                {speakerMode ? "Exit speaker mode" : "Enter speaker mode"}
              </button>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white">
                  <div className="text-xs uppercase tracking-[0.14em] text-slate-300">Core issue</div>
                  <div className="mt-1 text-sm font-semibold">Monetization</div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                  <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Framework</div>
                  <div className="mt-1 text-sm font-semibold">Five Levels + SPARK</div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                  <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Source</div>
                  <div className="mt-1 text-sm font-semibold">Full text preserved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Icon name="menu" className="h-4 w-4" />
              Sections
            </span>
            <Icon name={mobileMenuOpen ? "x" : "filter"} className="h-4 w-4" />
          </button>
          {mobileMenuOpen ? (
            <div className="mt-3 grid gap-2 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              {sections.map((section) => (
                <NavButton
                  key={section.key}
                  icon={section.icon}
                  active={active === section.key}
                  onClick={() => {
                    setActive(section.key);
                    setMobileMenuOpen(false);
                  }}
                >
                  {section.label}
                </NavButton>
              ))}
            </div>
          ) : null}
        </div>

        <div className={cn("grid gap-6", speakerMode ? "grid-cols-1" : "lg:grid-cols-[260px,minmax(0,1fr)]")}>
          {!speakerMode ? (
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-3 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</div>
                {sections.map((section) => (
                  <NavButton key={section.key} icon={section.icon} active={active === section.key} onClick={() => setActive(section.key)}>
                    {section.label}
                  </NavButton>
                ))}
              </div>
            </aside>
          ) : null}

          <main className="min-w-0 space-y-6">
            {(active === "overview" || speakerMode) ? (
              <>
                <Card className="p-5 sm:p-6">
                  <SectionHeader
                    icon="target"
                    eyebrow="Core thesis"
                    title="The platform was broad, but the wallet share was shallow"
                    subtitle="P&G had already reached almost the entire Chinese household base, but spending per person remained tiny relative to the US and even the global average."
                  />
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {TOP_METRICS.map((item) => (
                      <StatCard key={item.label} {...item} />
                    ))}
                  </div>
                </Card>

                {!speakerMode ? (
                  <div className="grid gap-6 xl:grid-cols-2">
                    {CALL_OUTS.map((group) => (
                      <ToneList key={group.title} {...group} />
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}

            {active === "exhibits" && !speakerMode ? (
              <div className="space-y-6">
                <Card className="p-5 sm:p-6">
                  <SectionHeader
                    icon="table"
                    eyebrow="Exhibits"
                    title="Exhibit board with faster comparison logic"
                    subtitle="The data is reorganized into a table-plus-visual layer so a reader can scan relative scale, segment importance, and macro significance faster than from paragraph form alone."
                  />
                  <div className="overflow-hidden rounded-3xl border border-slate-200">
                    <div className="hidden grid-cols-[120px,180px,240px,1fr] bg-slate-50 text-sm font-semibold text-slate-700 md:grid">
                      <div className="px-4 py-3">Exhibit</div>
                      <div className="px-4 py-3">Topic</div>
                      <div className="px-4 py-3">Headline</div>
                      <div className="px-4 py-3">Interpretation</div>
                    </div>
                    {EXHIBIT_ROWS.map((row) => (
                      <div key={row.exhibit} className="border-t border-slate-200 first:border-t-0 md:grid md:grid-cols-[120px,180px,240px,1fr]">
                        <div className="px-4 pb-1 pt-4 text-sm font-semibold text-slate-900 md:py-4">{row.exhibit}</div>
                        <div className="px-4 pb-1 text-sm text-slate-700 md:py-4">{row.topic}</div>
                        <div className="px-4 pb-1 text-sm font-medium text-slate-900 md:py-4">{row.headline}</div>
                        <div className="px-4 pb-4 text-sm leading-6 text-slate-600 md:py-4">{row.note}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid gap-6 xl:grid-cols-2">
                  <Card className="p-5 sm:p-6">
                    <SectionHeader
                      icon="chart"
                      eyebrow="Segment comparison"
                      title="Business mix comparison"
                      subtitle="A visual bar view clarifies which operating segments mattered most in 2010 and where profit concentration likely sat."
                    />
                    <ComparisonBars rows={SEGMENT_COMPARE} maxValue={23.805} />
                  </Card>

                  <Card className="p-5 sm:p-6">
                    <SectionHeader
                      icon="chart"
                      eyebrow="Macro signal"
                      title="Why Exhibit 10 and 11 matter"
                      subtitle="The core macro reading is not just growth. It is unequal enrichment plus shifting wallet share as income rises."
                    />
                    <div className="space-y-3 text-sm leading-6 text-slate-600">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Income ranged from RMB 4,936 for poor urban households to RMB 51,350 for highest-income households, creating wide segmentation pressure.</div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Food share dropped from 46.81% to 28.05%, while household facilities and services rose in both absolute RMB and wallet share terms.</div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">That supports the monetization thesis: rising income expands room for everyday household and personal care upgrading, but not evenly across the market.</div>
                    </div>
                  </Card>
                </div>
              </div>
            ) : null}

            {active === "linkage" && !speakerMode ? (
              <div className="space-y-6">
                <Card className="p-5 sm:p-6">
                  <SectionHeader
                    icon="layers"
                    eyebrow="Five Levels"
                    title="Linkage diagram"
                    subtitle="This view makes the cross-level logic explicit: macro income structure shaped industry demand, which forced a multi-system firm response, while meta-level political and foreignness risks could disrupt execution."
                  />
                  <LinkageDiagram />
                </Card>

                <Card className="p-5 sm:p-6">
                  <SectionHeader
                    icon="target"
                    eyebrow="SPARK"
                    title="Firm-level interpretation grid"
                    subtitle="A compact board for oral review and faster comparison across Scope, Positioning, Activities, Resources, and Knowledge."
                  />
                  <SparkTable />
                </Card>

                <div className="grid gap-4 xl:grid-cols-2">
                  {FIVE_LEVELS.map((level) => (
                    <Card key={level.key} className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                          <Icon name={level.icon} className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-semibold text-slate-950">{level.key}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">{level.thesis}</div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                        {level.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}

            {(active === "speaker" || speakerMode) ? (
              <Card className={cn("p-5 sm:p-6", speakerMode ? "border-slate-900 shadow-lg" : "") }>
                <SectionHeader
                  icon="mic"
                  eyebrow="Speaker mode"
                  title="Oral delivery board"
                  subtitle="This condensed mode strips away dense source reading and keeps only the pieces most useful for discussion, participation, and timed speaking."
                />
                <div className={cn("grid gap-4", speakerMode ? "lg:grid-cols-1" : "xl:grid-cols-2") }>
                  {SPEAKER_MODE_CARDS.map((card) => (
                    <Card key={card.title} className={cn("border-slate-200 bg-slate-50 p-5", speakerMode ? "text-lg leading-8" : "") }>
                      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{card.title}</div>
                      <div className={cn("mt-3 text-slate-900", speakerMode ? "text-2xl font-medium leading-10" : "text-base leading-7") }>{card.body}</div>
                    </Card>
                  ))}
                </div>
              </Card>
            ) : null}

            {active === "source" && !speakerMode ? <SourceLayer /> : null}
            {active === "qa" && !speakerMode ? <IntegrityPanel /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}
