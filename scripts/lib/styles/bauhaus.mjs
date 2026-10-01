// bauhaus：包豪斯平面构成——圆、半圆弧、三角、色条在松网格上的碰撞
export function render(ctx) {
  const { w, h, rng, colors, dark, uid, f2 } = ctx;
  const bg = dark ? '#0d1322' : '#f6f4ef';
  const ink = dark ? '#e8ecf5' : '#1c2130';

  let body = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  let defs = '';

  const S = Math.min(w, h);
  const cell = S / rng.int(3, 4);
  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 1;
  const slots = rng.shuffle(
    Array.from({ length: cols * rows }, (_, i) => [i % cols, Math.floor(i / cols)])
  );
  const count = Math.floor(cols * rows * rng.range(0.55, 0.75));
  const pal = rng.shuffle([...colors, ink]);

  let pi = 0;
  for (let i = 0; i < count; i++) {
    const [cx, cy] = slots[i];
    const x = cx * cell, y = cy * cell;
    const c = pal[pi++ % pal.length];
    const kind = rng.int(0, 4);
    const r = cell * rng.range(0.32, 0.46);
    if (kind === 0) {
      body += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(r)}" fill="${c}"/>`;
    } else if (kind === 1) {
      // 半圆（随机朝向）
      const rot = rng.int(0, 3) * 90;
      body += `<path d="M ${f2(x - r)} ${f2(y)} A ${f2(r)} ${f2(r)} 0 0 1 ${f2(x + r)} ${f2(y)} Z" fill="${c}" transform="rotate(${rot} ${f2(x)} ${f2(y)})"/>`;
    } else if (kind === 2) {
      // 四分之一弧（粗描边）
      const rot = rng.int(0, 3) * 90;
      body += `<path d="M ${f2(x - r)} ${f2(y)} A ${f2(r)} ${f2(r)} 0 0 1 ${f2(x)} ${f2(y - r)}" fill="none" stroke="${c}" stroke-width="${f2(r * 0.28)}" transform="rotate(${rot} ${f2(x)} ${f2(y)})"/>`;
    } else if (kind === 3) {
      // 三角形（随机翻转）
      const flip = rng.chance(0.5) ? 1 : -1;
      body += `<polygon points="${f2(x - r)},${f2(y + r * flip)} ${f2(x + r)},${f2(y + r * flip)} ${f2(x)},${f2(y - r * flip)}" fill="${c}" opacity="0.92"/>`;
    } else {
      // 细色条
      const vertical = rng.chance(0.5);
      const bw = r * 0.3;
      body += vertical
        ? `<rect x="${f2(x - bw / 2)}" y="${f2(y - r * 1.1)}" width="${f2(bw)}" height="${f2(r * 2.2)}" fill="${c}"/>`
        : `<rect x="${f2(x - r * 1.1)}" y="${f2(y - bw / 2)}" width="${f2(r * 2.2)}" height="${f2(bw)}" fill="${c}"/>`;
    }
  }

  return { defs, body };
}
