// topo：fbm 噪声位移的等高线山脊线
export function render(ctx) {
  const { w, h, rng, colors, dark, uid, fbm, mixHex, f2 } = ctx;
  const bg1 = dark ? '#0a0f1e' : '#f7f8fc';
  const bg2 = dark ? '#0f1729' : '#edf1f9';

  let defs = `<linearGradient id="base${uid}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
</linearGradient>`;

  let body = `<rect width="${w}" height="${h}" fill="url(#base${uid})"/>`;

  const c1 = colors[0], c2 = colors[1 % colors.length];
  const dim = dark ? '#0a0f1e' : '#f7f8fc';
  const rows = rng.int(34, 44);
  const scale = rng.range(1.6, 2.6) / Math.max(w, h); // 噪声频率
  const amp = h * rng.range(0.16, 0.26);
  const step = Math.max(14, w / 90);
  const seed = rng.int(0, 65535);

  const paths = [];
  for (let i = 0; i <= rows; i++) {
    const rowY = (i / rows) * h * 1.06 - h * 0.03;
    const nOff = i * 0.28;
    const pts = [];
    for (let x = -step; x <= w + step; x += step) {
      const n = fbm(x * scale, nOff, seed, 4);
      pts.push(`${f2(x)} ${f2(rowY + (n - 0.5) * amp)}`);
    }
    const t = i / rows;
    const stroke = mixHex(c1, c2, t);
    const op = (0.62 - Math.abs(t - 0.5) * 0.3).toFixed(2);
    const sw = i % rng.int(7, 10) === 0 ? 1.8 : 0.9;
    paths.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linejoin="round"/>`);
  }
  body += `<g>${paths.join('')}</g>`;

  return { defs, body };
}
