/**
 * Colorizes text for terminal based on absolute time of day.
 * Usage: console.log(timecolor(new Date(), "log"))
 */
export function timecolor(text: string, date = new Date()): string {
  const s = (15 + 24 - date.getHours()) * 3600 + (60 - date.getMinutes()) * 60 + date.getSeconds();
  let hue = (s / 86400) * 360;
  // Modulate lightness for intra-hour variance: ±0.08 based on minute+second
  const minsec = date.getMinutes() * 60 + date.getSeconds();
  const baseL = 0.35;
  const l = baseL + (.3 * (date.getMinutes() / 60))
  // hue += Math.sin((minsec / 3600) * 5 * Math.PI) * 20;
  const rgb = hslToRgb(hue, 1.9, l);
  return `\x1b[38;2;${rgb.join(";")}m${text}\x1b[0m`;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else[r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

if (import.meta.main) {
  for (let h = 0; h < 24; ++h) {
    for (let m = 0; m < 60; m += 5) {
      const d = new Date(2000, 0, 1, h, m, 0, 0);
      const label = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      // eslint-disable-next-line no-console
      console.log(timecolor(label, d));
    }
  }
}
