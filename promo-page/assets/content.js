/* ============================================================================
 * iskill-geometric-bg · 落地页内容
 * 事实来源：SKILL.md / README.md / scripts/gen-bg.mjs / scripts/lib/palettes.mjs
 * showcase 用的是仓库 examples/ 里的真实示例 SVG（已拷入 assets/）
 * ==========================================================================*/
window.PROMO = {
  name: "ISKILL-GEOMETRIC-BG",
  brand: "#ef4444",
  brand2: "#f59e0b",
  repo: "https://github.com/aispin/iskill-geometric-bg",
  repoLabel: "aispin/iskill-geometric-bg",

  platform: "all",
  license: "许可见仓库",

  lang: {
    zh: {
      meta: {
        title: "ISKILL-GEOMETRIC-BG · 一行命令，画一张几何背景图",
        description: "种子随机的几何背景图生成器：六种风格 × 八套调色板 × 深浅色，同 seed 同图可复现，输出几十 KB 的轻量 SVG，零三方依赖。"
      },
      a11y: { skip: "跳到主要内容" },
      ui: { copy: "复制", copied: "已复制", failed: "复制失败" },
      nav: { features: "能力", shots: "示例", how: "上手", faq: "问答" },

      hero: {
        badge: "AI 技能",
        titlePre: "底图不用找，",
        titleAccent: "用种子现场画一张",
        titlePost: "",
        sub: "六种风格 × 八套调色板 × 深浅色，mulberry32 种子随机让同参数同图可复现。纯 Node ≥ 18 标准库，输出几十 KB 的 SVG。",
        ctaPrimary: "复制安装提示词",
        ctaSecondary: "看源码",
        meta1: "零三方依赖",
        meta2: "确定性复现",
        meta3: "SVG 矢量"
      },
      terminal: {
        title: "zsh — iskill-geometric-bg",
        lines: [
          [{ t: "$ ", c: "p" }, { t: "node scripts/gen-bg.mjs --style topo --seed 42 --palette ocean --dark", c: "k" }],
          [{ t: "✓ ", c: "p" }, { t: "geo-topo-42.svg  (topo, seed=42, 1600x900, dark)", c: "s" }],
          [{ t: "$ ", c: "p" }, { t: "node scripts/gen-bg.mjs", c: "k" }, { t: "            # 随机来一张 1600x900", c: "c" }],
          [{ t: "✓ ", c: "p" }, { t: "geo-bauhaus-518273.svg  (bauhaus, seed=518273, 1600x900, light)", c: "s" }]
        ]
      },

      stats: [
        { value: "6", label: "种几何风格", note: "mesh / rings / waves / topo / bauhaus / dots" },
        { value: "8", label: "套预置调色板", note: "aurora…mono，也可给逗号分隔 hex" },
        { value: "20–80 KB", label: "单张 SVG 体积", note: "纯文本、任意缩放不糊" },
        { value: "0", label: "第三方依赖", note: "Node ≥ 18 标准库" }
      ],

      compare: {
        eyebrow: "对比",
        title: "找图 vs 生成",
        sub: "",
        before: {
          title: "图库 / 照片那套",
          items: [
            "图库里翻半天，还不一定对味",
            "照片做底图要么太重、要么抢戏",
            "换个尺寸就糊，OG 图还得单独裁"
          ]
        },
        after: {
          title: "一行命令那套",
          items: [
            "指定风格 / 调色板 / 尺寸，一次到位",
            "矢量 SVG，任意缩放不糊",
            "seed 固定就能复现同一张"
          ]
        }
      },

      features: {
        eyebrow: "能力",
        title: "它能做什么",
        sub: "",
        items: [
          { icon: "grid", title: "六种几何风格", desc: "mesh 柔光色斑 / rings 同心环 / waves 层叠波浪 / topo 等高线山脊 / bauhaus 平面构成 / dots 半调点阵。" },
          { icon: "refresh", title: "种子随机，可复现", desc: "mulberry32 驱动，--seed 固定后风格、构图、配色全部可复现；--count 批量出变体时种子步进。" },
          { icon: "layers", title: "八套预置调色板", desc: "aurora / sunset / ocean / forest / candy / ember / berry / mono，也可直接给逗号分隔的 hex。" },
          { icon: "crop", title: "任意尺寸", desc: "--size WxH 设定画布，默认 1600×900；OG 图用 1200×630、hero 用 1920×1080 都行。" },
          { icon: "shield", title: "零三方依赖", desc: "纯 Node ≥ 18 标准库（fs/path + 自写的 rand / noise），不拉任何 npm 包。" },
          { icon: "bolt", title: "轻量纯文本产物", desc: "输出是 SVG 文本，单张典型 20–80 KB；要 PNG 时用浏览器截图或 rsvg-convert 转换即可。" }
        ]
      },

      showcase: {
        eyebrow: "示例",
        title: "六种风格的真图",
        sub: "下面是仓库 examples/ 里的真实产物（seed=42，aurora 调色板为主）",
        items: [
          { src: "assets/geo-mesh-42.svg", alt: "mesh 风格示例", caption: "mesh · seed=42" },
          { src: "assets/geo-rings-42.svg", alt: "rings 风格示例", caption: "rings · seed=42" },
          { src: "assets/geo-waves-42.svg", alt: "waves 风格示例", caption: "waves · seed=42" },
          { src: "assets/geo-topo-42.svg", alt: "topo 风格示例", caption: "topo · seed=42" },
          { src: "assets/geo-bauhaus-42.svg", alt: "bauhaus 风格示例", caption: "bauhaus · seed=42" },
          { src: "assets/geo-dots-42.svg", alt: "dots 风格示例", caption: "dots · seed=42" },
          { src: "assets/geo-topo-ocean-dark.svg", alt: "深色 ocean 调色板示例", caption: "topo · ocean · dark" },
          { src: "assets/geo-waves-sunset-hero.svg", alt: "1920x1080 hero 尺寸示例", caption: "waves · sunset · 1920×1080" }
        ]
      },

      steps: {
        eyebrow: "上手",
        title: "三步跑起来",
        sub: "命令由 agent 跑，你只说要什么、看结果。",
        items: [
          { title: "交给 AI 装", desc: "把这句话粘进对话框，agent 会自己拉代码、读文档，再告诉你用法。", codeKey: "install" },
          { title: "说要什么底图", desc: "风格、种子、调色板可以不说，让它给建议；同参数永远同一张图。", codeName: "prompt", code: "来一张深色几何背景，1600x900，做官网 hero 底图，多出几张我挑。" },
          { title: "挑一张，记下 seed", desc: "看中的那张把文件名里的 seed 报给它，就能照原样精修尺寸或配色。" }
        ]
      },


      faq: {
        eyebrow: "问答",
        title: "常见问题",
        items: [
          { q: "同参数为什么能复现同一张图？", a: "构图与配色全部由 <code>--seed</code> 经 mulberry32 派生。不指定 seed 时随机；一旦指定，风格、构图、颜色选择都固定。" },
          { q: "怎么把 SVG 变成 PNG？", a: "SVG 是纯文本产物。用浏览器打开截图、<code>agent-browser screenshot</code>，或任意转换工具（如 <code>rsvg-convert</code>）都行——技能本身不内置位图导出。" },
          { q: "要装什么依赖？", a: "零第三方依赖，Node ≥ 18 即可，只用标准库，不需要 <code>npm install</code>。" },
          { q: "能加自己的风格吗？", a: "可以。在 <code>scripts/lib/styles/</code> 照抄一个文件（统一签名 <code>render(ctx) → { defs, body }</code>，ctx 提供 w,h,rng,colors,dark,uid,fbm,mixHex,f2），再到 <code>gen-bg.mjs</code> 注册。" },
          { q: "背景图会不会文件很大？", a: "典型 20–80 KB。<code>--size</code> 只影响点阵 / 等高线的采样数，体积近似线性增长。" },
          { q: "必须联网调用 AI 吗？", a: "不用。核心是本地 Node 脚本，纯确定性计算；让 agent 装只是省得自己 clone。" }
        ]
      },

      cta: { title: "给页面铺一张不抢戏的底", desc: "粘一下安装提示词，马上生成你的第一张几何背景。", primary: "去 GitHub 看看", secondary: "复制安装提示词" },
      footer: { license: "许可见仓库", madeWith: "由 iskill-promo-page 生成" }
    },

    en: {
      meta: {
        title: "ISKILL-GEOMETRIC-BG · One command, one geometric background",
        description: "A seeded geometric background generator: six styles × eight palettes × light/dark, reproducible per seed, output as lightweight SVG with zero third-party deps."
      },
      a11y: { skip: "Skip to content" },
      ui: { copy: "Copy", copied: "Copied", failed: "Copy failed" },
      nav: { features: "Features", shots: "Samples", how: "Get started", faq: "FAQ" },

      hero: {
        badge: "AI skill",
        titlePre: "Stop hunting for backgrounds — ",
        titleAccent: "draw one from a seed",
        titlePost: "",
        sub: "Six styles × eight palettes × light/dark. mulberry32 seeding makes every parameter set reproducible, and it runs on plain Node ≥ 18 stdlib, emitting a few-dozen-KB SVG.",
        ctaPrimary: "Copy install prompt",
        ctaSecondary: "View source",
        meta1: "Zero third-party deps",
        meta2: "Reproducible",
        meta3: "Vector SVG"
      },
      terminal: {
        title: "zsh — iskill-geometric-bg",
        lines: [
          [{ t: "$ ", c: "p" }, { t: "node scripts/gen-bg.mjs --style topo --seed 42 --palette ocean --dark", c: "k" }],
          [{ t: "✓ ", c: "p" }, { t: "geo-topo-42.svg  (topo, seed=42, 1600x900, dark)", c: "s" }],
          [{ t: "$ ", c: "p" }, { t: "node scripts/gen-bg.mjs", c: "k" }, { t: "            # a random 1600x900", c: "c" }],
          [{ t: "✓ ", c: "p" }, { t: "geo-bauhaus-518273.svg  (bauhaus, seed=518273, 1600x900, light)", c: "s" }]
        ]
      },

      stats: [
        { value: "6", label: "geometric styles", note: "mesh / rings / waves / topo / bauhaus / dots" },
        { value: "8", label: "built-in palettes", note: "aurora…mono, or comma-separated hex" },
        { value: "20–80 KB", label: "per SVG", note: "plain text, scales without blur" },
        { value: "0", label: "third-party deps", note: "Node ≥ 18 stdlib only" }
      ],

      compare: {
        eyebrow: "Comparison",
        title: "Stock images vs generated",
        sub: "",
        before: {
          title: "Stock / photo route",
          items: [
            "Scrolling a library for ages and still not finding the right mood",
            "Photos as backgrounds are either too heavy or steal the show",
            "Resizing blurs it; OG images need a separate crop"
          ]
        },
        after: {
          title: "One-command route",
          items: [
            "Pick style / palette / size and you are done",
            "Vector SVG that scales without blur",
            "Fix the seed and you get the exact same image back"
          ]
        }
      },

      features: {
        eyebrow: "Features",
        title: "What it does",
        sub: "",
        items: [
          { icon: "grid", title: "Six geometric styles", desc: "mesh soft light blobs / rings concentric guilloché / waves layered ridges / topo fbm contours / bauhaus flat composition / dots halftone grid." },
          { icon: "refresh", title: "Seeded and reproducible", desc: "Driven by mulberry32 — fix --seed and the style, composition and colours all come back identically. --count steps the seed for batch variants." },
          { icon: "layers", title: "Eight palettes", desc: "aurora / sunset / ocean / forest / candy / ember / berry / mono, or pass your own comma-separated hex values." },
          { icon: "crop", title: "Any canvas size", desc: "--size WxH sets the canvas (default 1600×900); 1200×630 for OG images, 1920×1080 for hero sections." },
          { icon: "shield", title: "Zero third-party deps", desc: "Plain Node ≥ 18 stdlib (fs/path plus its own rand / noise modules) — no npm packages to install." },
          { icon: "bolt", title: "Lightweight text output", desc: "Output is SVG text, typically 20–80 KB per file. For PNG, screenshot it in a browser or convert with rsvg-convert." }
        ]
      },

      showcase: {
        eyebrow: "Samples",
        title: "Real output, six styles",
        sub: "Actual artefacts from the repo's examples/ (mostly seed=42, aurora palette)",
        items: [
          { src: "assets/geo-mesh-42.svg", alt: "mesh style sample", caption: "mesh · seed=42" },
          { src: "assets/geo-rings-42.svg", alt: "rings style sample", caption: "rings · seed=42" },
          { src: "assets/geo-waves-42.svg", alt: "waves style sample", caption: "waves · seed=42" },
          { src: "assets/geo-topo-42.svg", alt: "topo style sample", caption: "topo · seed=42" },
          { src: "assets/geo-bauhaus-42.svg", alt: "bauhaus style sample", caption: "bauhaus · seed=42" },
          { src: "assets/geo-dots-42.svg", alt: "dots style sample", caption: "dots · seed=42" },
          { src: "assets/geo-topo-ocean-dark.svg", alt: "dark ocean palette sample", caption: "topo · ocean · dark" },
          { src: "assets/geo-waves-sunset-hero.svg", alt: "1920x1080 hero sample", caption: "waves · sunset · 1920×1080" }
        ]
      },

      steps: {
        eyebrow: "Get started",
        title: "Up and running in three steps",
        sub: "The agent runs the commands. You say what you want and check the result.",
        items: [
          { title: "Let your agent install it", desc: "Paste the line into the chat — it clones the repo, reads the docs, and tells you how to use it.", codeKey: "install" },
          { title: "Say what background you want", desc: "Style, seed and palette are optional — it will suggest. Same params always give the same image.", codeName: "prompt", code: "Give me a dark geometric background, 1600x900, as the hero image for our site — a few variants so I can pick one." },
          { title: "Pick one, note the seed", desc: "Tell it the seed from the filename of the one you like, and it re-renders that exact look at any size." }
        ]
      },


      faq: {
        eyebrow: "FAQ",
        title: "Frequently asked",
        items: [
          { q: "Why is the same seed reproducible?", a: "Composition and colours all derive from <code>--seed</code> through mulberry32. Without a seed it is random; with one, style, composition and colour choices are fixed." },
          { q: "How do I turn the SVG into a PNG?", a: "SVG is plain text. Screenshot it in a browser, use <code>agent-browser screenshot</code>, or convert with any tool (e.g. <code>rsvg-convert</code>) — the skill itself ships no raster export." },
          { q: "What do I need to install?", a: "Nothing third-party. Node ≥ 18 and the standard library are enough — no <code>npm install</code>." },
          { q: "Can I add my own style?", a: "Yes. Copy a file in <code>scripts/lib/styles/</code> (uniform signature <code>render(ctx) → { defs, body }</code>, ctx exposes w,h,rng,colors,dark,uid,fbm,mixHex,f2) and register it in <code>gen-bg.mjs</code>." },
          { q: "Will the background be a huge file?", a: "Typically 20–80 KB. <code>--size</code> only affects dot/contour sampling, so size grows roughly linearly." },
          { q: "Does it need an AI or a network call?", a: "No. The core is a local Node script doing deterministic maths; letting your agent install it just saves you a clone." }
        ]
      },

      cta: { title: "Give your page a background that behaves", desc: "Paste the install prompt and generate your first geometric background.", primary: "Open on GitHub", secondary: "Copy install prompt" },
      footer: { license: "License: see repo", madeWith: "Built with iskill-promo-page" }
    }
  }
};
