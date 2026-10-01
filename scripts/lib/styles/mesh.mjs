// mesh：多层柔光色斑 + 颗粒噪点，类似 Stripe / Linear 官网 hero 背景
export function render(ctx) {
  const { w, h, rng, colors, dark, uid } = ctx;
  const bg1 = dark ? '#0a0f1e' : '#f7f8fc';
  const bg2 = dark ? '#131c33' : '#eceffa';

  let defs = `<linearGradient id="base${uid}" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
</linearGradient>`;

  const blobCount = rng.int(5, 7);
  let body = `<rect width="${w}" height="${h}" fill="url(#base${uid})"/>`;
  for (let i = 0; i < blobCount; i++) {
    const c = colors[i % colors.length];
    const cx = rng.range(-0.1, 1.1) * w;
    const cy = rng.range(-0.1, 1.1) * h;
    const r = rng.range(0.28, 0.62) * Math.max(w, h);
    const op = rng.range(0.35, 0.6) * (dark ? 0.85 : 1);
    defs += `<radialGradient id="blob${uid}_${i}">
  <stop offset="0" stop-color="${c}" stop-opacity="${op.toFixed(2)}"/>
  <stop offset="1" stop-color="${c}" stop-opacity="0"/>
</radialGradient>`;
    body += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="url(#blob${uid}_${i})"/>`;
  }

  // 颗粒：feTurbulence 噪声薄纱，压住色带的塑料感
  defs += `<filter id="grain${uid}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 ${dark ? '0.05' : '0.07'} 0"/></filter>`;
  body += `<rect width="${w}" height="${h}" filter="url(#grain${uid})"/>`;

  return { defs, body };
}
