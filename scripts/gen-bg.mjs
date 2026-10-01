#!/usr/bin/env node
// iskill-geometric-bg — 几何背景图生成 CLI（零依赖，Node >= 18，输出 SVG）
import { makeRng, mixHex, f2 } from './lib/rand.mjs';
import { fbm } from './lib/noise.mjs';
import { PALETTES, STYLE_NAMES } from './lib/palettes.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join, basename, extname } from 'node:path';

// ---------- 参数解析 ----------
function usage() {
  console.log(`iskill-geometric-bg — 生成几何风格背景图（SVG）

用法:
  node gen-bg.mjs [--style <名|random>] [--seed <n>] [--size WxH]
                  [--palette <预设|#hex,...>] [--dark] [--light]
                  [--count <n>] [--out <目录|文件.svg>]

风格: ${STYLE_NAMES.join(' | ')} (默认 random)
调色板预设: ${Object.keys(PALETTES).join(' | ')}，或逗号分隔 hex

示例:
  node gen-bg.mjs                                    # 随机来一张 1600x900
  node gen-bg.mjs --style topo --seed 42 --dark
  node gen-bg.mjs --style mesh --palette sunset --size 1920x1080
  node gen-bg.mjs --count 6 --out ./bg               # 6 张不同风格/种子
`);
  process.exit(0);
}

function parseArgs(argv) {
  const o = { style: 'random', seed: null, size: '1600x900', palette: null, dark: null, count: 1, out: './geometric-bg' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') usage();
    else if (a === '--style') o.style = argv[++i];
    else if (a === '--seed') o.seed = parseInt(argv[++i], 10);
    else if (a === '--size') o.size = argv[++i];
    else if (a === '--palette') o.palette = argv[++i];
    else if (a === '--dark') o.dark = true;
    else if (a === '--light') o.dark = false;
    else if (a === '--count') o.count = Math.max(1, parseInt(argv[++i], 10));
    else if (a === '--out') o.out = argv[++i];
    else if (!a.startsWith('--')) o.out = a; // 位置参数视作输出
    else { console.error(`未知选项: ${a}`); process.exit(1); }
  }
  return o;
}

// ---------- 生成 ----------
function renderSvg({ style, seed, w, h, colors, dark }) {
  const rng = makeRng(seed);
  const uid = (seed % 100000).toString(36);
  const ctx = { w, h, rng, colors, dark, uid, fbm, mixHex, f2 };
  const modName = style === 'random' ? rng.pick(STYLE_NAMES) : style;
  // 动态 import 对应风格模块
  const { render } = styleModules[modName];
  const { defs, body } = render(ctx);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n<defs>${defs}</defs>\n${body}\n</svg>\n`;
  return { svg, modName };
}

import * as mesh from './lib/styles/mesh.mjs';
import * as rings from './lib/styles/rings.mjs';
import * as waves from './lib/styles/waves.mjs';
import * as topo from './lib/styles/topo.mjs';
import * as bauhaus from './lib/styles/bauhaus.mjs';
import * as dots from './lib/styles/dots.mjs';
const styleModules = { mesh, rings, waves, topo, bauhaus, dots };

// ---------- 主流程 ----------
const opts = parseArgs(process.argv.slice(2));

const m = opts.size.match(/^(\d+)[xX](\d+)$/);
if (!m) { console.error(`--size 格式应为 WxH，如 1920x1080`); process.exit(1); }
const w = parseInt(m[1], 10), h = parseInt(m[2], 10);

// 调色板
let colors;
if (opts.palette) {
  if (PALETTES[opts.palette]) colors = PALETTES[opts.palette];
  else {
    colors = opts.palette.split(',').map((s) => s.trim()).filter(Boolean);
    if (colors.length < 2) { console.error('自定义调色板至少给 2 个颜色'); process.exit(1); }
  }
} else {
  colors = PALETTES[makeRng(Date.now() % 100000).pick(Object.keys(PALETTES))];
}
const dark = opts.dark === true ? true : opts.dark === false ? false : makeRng(opts.seed ?? 1).chance(0.4);

// 输出目标
let outIsFile = extname(opts.out) === '.svg';
const outDir = outIsFile ? dirname(resolve(opts.out)) : resolve(opts.out);
mkdirSync(outDir, { recursive: true });

let seed = Number.isInteger(opts.seed) ? opts.seed : Math.floor(Math.random() * 1e6);
const written = [];
for (let i = 0; i < opts.count; i++) {
  const s = (seed + i * 7919) % 1e6; // count > 1 时步进种子保证每张不同
  const { svg, modName } = renderSvg({
    style: opts.style, seed: s, w, h, colors, dark,
  });
  const file = outIsFile && opts.count === 1
    ? resolve(opts.out)
    : join(outDir, `geo-${modName}-${s}.svg`);
  writeFileSync(file, svg);
  written.push(file);
  console.log(`✓ ${file}  (${modName}, seed=${s}, ${w}x${h}, ${dark ? 'dark' : 'light'})`);
  if (outIsFile && opts.count > 1) {
    console.error('提示：--out 指定了具体文件名，多张输出将忽略文件名、按 geo-<style>-<seed>.svg 落盘到同目录');
    outIsFile = false;
  }
}
console.log(`\n共 ${written.length} 张 · 预览: open ${outIsFile ? written[0] : outDir}`);
