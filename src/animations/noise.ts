/**
 * Lightweight value-noise + fbm — a self-contained, dependency-free
 * stand-in for Perlin/Simplex. Good enough to drive an organic flow field.
 * Deterministic per seed via a small hash.
 */

function hash2(ix: number, iy: number, seed: number): number {
  let h = ix * 374761393 + iy * 668265263 + seed * 2147483647;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return (h >>> 0) / 4294967295; // 0..1
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

/** 2D value noise in the range 0..1. */
export function valueNoise(x: number, y: number, seed = 1): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const v00 = hash2(ix, iy, seed);
  const v10 = hash2(ix + 1, iy, seed);
  const v01 = hash2(ix, iy + 1, seed);
  const v11 = hash2(ix + 1, iy + 1, seed);

  const sx = smooth(fx);
  const sy = smooth(fy);

  const a = v00 + (v10 - v00) * sx;
  const b = v01 + (v11 - v01) * sx;
  return a + (b - a) * sy;
}

/** Fractal Brownian motion — layered octaves of value noise. */
export function fbm(x: number, y: number, octaves = 4, seed = 1): number {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    value += amp * valueNoise(x * freq, y * freq, seed + i * 17);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return value / norm; // 0..1
}
