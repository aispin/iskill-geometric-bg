---
name: iskill-geometric-bg
summary: 几何背景图生成 CLI——种子随机、确定性复现，输出轻量 SVG。六种风格（mesh 柔光 / rings 同心环 / waves 波浪 / topo 等高线 / bauhaus 构成 / dots 点阵）× 预置调色板 × 深浅色，零三方依赖，适合 hero 背景、OG 图、PPT 底图、网页纹理。
description: 当用户要生成背景图、几何背景、纹理底图、hero 背景、banner 背景、装饰图案，问「来一张背景图」「生成几何背景」「做个 OG 配图底」时使用。触发词：几何背景、背景图、geometric bg、底纹、纹理背景、hero 背景、mesh gradient、bauhaus。基于种子随机（mulberry32）+ value noise/fbm，同参数同图可复现；--count 批量出变体；纯 Node ≥ 24 标准库实现。
agent_created: true
---

# iskill-geometric-bg

种子随机的几何背景图生成器 → 轻量 SVG（文本格式、任意缩放不糊、单文件几十 KB）。

## 什么时候用

- 落地页 / 博客 / PPT 需要「高级感」底图，不想放照片
- OG 分享图（1200x630）、hero 区背景、卡片底纹
- 要一批风格统一但构图不同的背景变体

## 用法

```bash
# 随机来一张 1600x900
node scripts/gen-bg.mjs

# 指定风格 + 深色 + 调色板
node scripts/gen-bg.mjs --style topo --seed 42 --palette ocean --dark

# OG 图尺寸
node scripts/gen-bg.mjs --style mesh --palette sunset --size 1200x630 --out og.svg

# 批量 6 张变体到目录
node scripts/gen-bg.mjs --count 6 --out ./bg
```

全部选项：

| 选项 | 说明 |
| --- | --- |
| `--style <名\|random>` | `mesh` `rings` `waves` `topo` `bauhaus` `dots`（默认 random） |
| `--seed <n>` | 随机种子，同种子同图（默认随机） |
| `--size WxH` | 画布尺寸（默认 `1600x900`） |
| `--palette <预设\|#hex,...>` | 预设：`aurora` `sunset` `ocean` `forest` `candy` `ember` `berry` `mono`；或逗号分隔 hex（≥2 个） |
| `--dark` / `--light` | 深色 / 浅色底（默认随机偏浅） |
| `--count <n>` | 批量出 n 张（种子步进，风格/构图各异） |
| `--out <目录\|文件.svg>` | 输出目标（默认 `./geometric-bg/`） |

## 六种风格

| 风格 | 观感 | 适合 |
| --- | --- | --- |
| `mesh` | 多层柔光色斑 + 颗粒噪点（Stripe/Linear 风） | hero 背景、OG 图 |
| `rings` | 同心细环 guilloché（来自外链卡底纹） | 卡片底纹、证书质感 |
| `waves` | 层叠波浪山峦、自底向上渐隐 | banner、页脚装饰 |
| `topo` | fbm 噪声等高线山脊 | 科技感背景、封面 |
| `bauhaus` | 包豪斯平面构成（圆/弧/三角/色条） | 海报、插画感页面 |
| `dots` | 噪声调制的半调点阵 + 主色锚点 | 极简背景、侧边栏 |

## 行为与说明

- **确定性**：`--seed` 固定后，风格、构图、颜色选择全部可复现（调色板未指定时也由种子决定）。
- **输出 SVG**：零依赖纯文本产物；需要 PNG 时用浏览器打开后截图，或 `agent-browser screenshot`，或任意转换工具（如 `rsvg-convert`）。
- **深浅色**：`--dark` 换深空底色系，所有风格自适应；不指定则随机偏浅。
- **体积**：典型 20–80 KB；`--size` 增大只影响点阵/等高线采样数，体积近似线性。

## 参数调优经验

- 背景要「存在但不抢戏」：优先 `topo` / `rings` 浅色 + `mono` / 同色系深浅调色板。
- 种子扫盲：`--count 12` 一次出 12 张挑最好的，记下文件名里的 seed 回头精修。
- 风格模块在 `scripts/lib/styles/*.mjs`，统一签名 `render(ctx)` → `{ defs, body }`；ctx 提供 `w,h,rng,colors,dark,uid,fbm,mixHex,f2`，加新风格照抄一个文件并在 `gen-bg.mjs` 注册即可。

## 来源

同心环底纹思路源自 [iskill-generate-sponsors](https://github.com/aispin/iskill-generate-sponsors) 外链卡的 CSS 生成式底纹，本 skill 将其泛化为独立的多风格 SVG 生成器。

## 依赖同步

本仓库 `promo-page/assets/{app.js,style.css,icons.js}` 是 [iskill-promo-page](https://github.com/aispin/iskill-promo-page)
模板引擎的 vendored 副本（锁定版本见 `package.json` 的 `iskillDeps`），**不要手改**——
去真源仓库改并升 `@iskill-version`，再用 iskill-dep-sync 同步回来。本机未装该工具时，先安装：对 agent 说「请帮我安装 Skill：aispin/iskill-dep-sync」，或按下方自举命令现场拉取：

```bash
T="$HOME/.workbuddy/skills/iskill-dep-sync/scripts/skill-deps.mjs"
[ -f "$T" ] || { TMP="$(mktemp -d)"; curl -fsSL "https://raw.githubusercontent.com/aispin/iskill-dep-sync/HEAD/scripts/skill-deps.mjs" -o "$TMP/skill-deps.mjs"; T="$TMP/skill-deps.mjs"; }
node "$T" check "$(pwd)"     # 漂移检测；node "$T" sync "$(pwd)" 恢复/升级；node "$T" env "$(pwd)" 冷启动自检
```
