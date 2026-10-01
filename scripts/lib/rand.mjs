// 种子随机数：mulberry32（快、统计够用、同种子同序列）
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const r = mulberry32(seed);
  return {
    seed,
    next: r,
    range: (a, b) => a + (b - a) * r(),
    int: (a, b) => Math.floor(a + (b - a + 1) * r()),
    pick: (arr) => arr[Math.floor(r() * arr.length) % arr.length],
    chance: (p) => r() < p,
    shuffle: (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

// 十六进制色 → { r,g,b }
export function hex2rgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// 颜色间插值（用于描边渐变色阶）
export function mixHex(h1, h2, t) {
  const a = hex2rgb(h1), b = hex2rgb(h2);
  const c = (x, y) => Math.round(x + (y - x) * t);
  return `rgb(${c(a.r, b.r)},${c(a.g, b.g)},${c(a.b, b.b)})`;
}

// f2：浮点格式化（去掉多余小数，压缩 SVG 体积）
export const f2 = (n) => Math.round(n * 100) / 100;
