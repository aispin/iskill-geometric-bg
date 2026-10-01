// waves：层叠波浪山峦，自底向上渐隐
export function render(ctx) {
  const { w, h, rng, colors, dark, uid, f2 } = ctx;
  const bg1 = dark ? '#0a0f1e' : '#f7f8fc';
  const bg2 = dark ? '#0e1628' : '#eef2fb';

  let defs = `<linearGradient id="base${uid}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
</linearGradient>`;

  let body = `<rect width="${w}" height="${h}" fill="url(#base${uid})"/>`;

  const layers = rng.int(5, 7);
  const baseY = h * rng.range(0.42, 0.55);
  for (let i = 0; i < layers; i++) {
    const c = colors[i % colors.length];
    const t = i / (layers - 1);
    const amp = h * rng.range(0.05, 0.1) * (1 - t * 0.55);
    const k = (Math.PI * 2 / w) * rng.int(1, 3);
    const phase = rng.range(0, Math.PI * 2);
    const y0 = baseY + t * h * rng.range(0.07, 0.11);
    // 波形：两个不同频率正弦叠加，末端各留出随机漂移
    const k2 = k * rng.range(1.7, 2.6);
    const a2 = amp * rng.range(0.25, 0.45);
    const pts = [];
    const steps = 36;
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * w;
      const y = y0 + Math.sin(k * x + phase) * amp + Math.sin(k2 * x + phase * 1.7) * a2;
      pts.push([x, y]);
    }
    let d = `M ${f2(pts[0][0])} ${f2(pts[0][1])}`;
    for (const [x, y] of pts.slice(1)) d += ` L ${f2(x)} ${f2(y)}`;
    d += ` L ${w} ${h} L 0 ${h} Z`;

    const gid = `wave${uid}_${i}`;
    defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${c}" stop-opacity="${(0.75 - t * 0.45).toFixed(2)}"/>
  <stop offset="1" stop-color="${c}" stop-opacity="${(0.28 - t * 0.16).toFixed(2)}"/>
</linearGradient>`;
    body += `<path d="${d}" fill="url(#${gid})"/>`;
  }

  return { defs, body };
}
