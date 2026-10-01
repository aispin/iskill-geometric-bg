// dots：噪声调制的点阵，少量主色大点做视觉锚
export function render(ctx) {
  const { w, h, rng, colors, dark, uid, fbm } = ctx;
  const bg = dark ? '#0a0f1e' : '#f7f8fc';
  const ink = dark ? '#5b6b85' : '#8a94a8';

  let body = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  let defs = '';

  const gap = Math.min(w, h) / rng.int(26, 34);
  const seed = rng.int(0, 65535);
  const acc = rng.shuffle(colors);
  let ai = 0;
  const dots = [];
  for (let y = gap * 0.7; y < h; y += gap) {
    for (let x = gap * 0.7; x < w; x += gap) {
      const n = fbm((x / w) * 3.2, (y / h) * 3.2, seed, 4);
      const r = gap * (0.08 + n * 0.3);
      // 噪声高值区放主色大点
      if (n > 0.7 && ai < acc.length * 4) {
        dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(gap * 0.46).toFixed(1)}" fill="${acc[ai++ % acc.length]}"/>`);
      } else {
        dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${ink}" opacity="${(0.35 + n * 0.4).toFixed(2)}"/>`);
      }
    }
  }
  body += `<g>${dots.join('')}</g>`;

  return { defs, body };
}
