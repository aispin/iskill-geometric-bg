// rings：guilloché 同心细环（源自 iskill-generate-sponsors 外链卡底纹），圆心甩出画外一角
export function render(ctx) {
  const { w, h, rng, colors, dark, uid, mixHex, f2 } = ctx;
  const diag = Math.hypot(w, h);
  const bg1 = dark ? '#0a0f1e' : '#f7f8fc';
  const bg2 = dark ? '#10182c' : '#edf1fa';

  let defs = `<linearGradient id="base${uid}" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
</linearGradient>`;

  let body = `<rect width="${w}" height="${h}" fill="url(#base${uid})"/>`;

  // 1-2 组同心环
  const groups = rng.chance(0.55) ? 2 : 1;
  const corners = rng.shuffle([[-0.06, -0.1], [1.06, -0.08], [-0.05, 1.1], [1.05, 1.12]]);
  for (let g = 0; g < groups; g++) {
    const [cx, cy] = corners[g];
    const c1 = colors[g % colors.length];
    const c2 = colors[(g + 1) % colors.length];
    const cxp = cx * w, cyp = cy * h;
    const gap = rng.range(diag / 100, diag / 52);
    const count = Math.ceil((diag * 1.25) / gap);
    const stroke1 = mixHex(c1, dark ? '#0a0f1e' : '#f7f8fc', 0.08);
    const stroke2 = mixHex(c2, dark ? '#0a0f1e' : '#f7f8fc', 0.08);
    const path = [];
    for (let i = 1; i <= count; i++) {
      const r = i * gap;
      const sw = i % rng.int(6, 9) === 0 ? 2.2 : 1.2;
      const op = (0.7 - (i / count) * 0.36).toFixed(2);
      path.push(`<circle cx="${f2(cxp)}" cy="${f2(cyp)}" r="${f2(r)}" fill="none" stroke="${i % 3 ? stroke1 : stroke2}" stroke-width="${sw}" opacity="${op}"/>`);
    }
    body += `<g>${path.join('')}</g>`;
  }

  // 一团主色柔光压在环心附近，增加空气感
  const c = colors[0];
  defs += `<radialGradient id="glow${uid}">
  <stop offset="0" stop-color="${c}" stop-opacity="${dark ? 0.22 : 0.18}"/>
  <stop offset="1" stop-color="${c}" stop-opacity="0"/>
</radialGradient>`;
  const gx = corners[0][0] > 0.5 ? w * 0.82 : w * 0.18;
  const gy = corners[0][1] > 0.5 ? h * 0.8 : h * 0.2;
  body += `<ellipse cx="${gx}" cy="${gy}" rx="${w * 0.45}" ry="${h * 0.5}" fill="url(#glow${uid})"/>`;

  return { defs, body };
}
