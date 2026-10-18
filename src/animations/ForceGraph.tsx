"use client";

import { useEffect, useRef } from "react";
import { useCanvas } from "./useCanvas";

type Node = { id: string; group: number; x: number; y: number; vx: number; vy: number; r: number };

const GROUP_COLORS = ["#00E5FF", "#7C3AED", "#22c55e", "#f59e0b"];

/**
 * Skills as a force-directed graph: nodes repel (Coulomb), linked nodes are
 * pulled together by springs (Hooke), everything is gently centered and damped.
 * Drag any node; hover highlights its connected sub-graph.
 */
export default function ForceGraph({
  nodes: seed,
  edges,
}: {
  nodes: { id: string; group: number }[];
  edges: [number, number][];
}) {
  const nodes = useRef<Node[]>([]);
  const hover = useRef<number>(-1);
  const drag = useRef<number>(-1);
  const pointer = useRef({ x: 0, y: 0 });

  const canvasRef = useCanvas(({ ctx, width, height, dt, mouse }) => {
    if (nodes.current.length === 0) {
      nodes.current = seed.map((n, i) => ({
        ...n,
        x: width / 2 + Math.cos((i / seed.length) * Math.PI * 2) * (width * 0.28),
        y: height / 2 + Math.sin((i / seed.length) * Math.PI * 2) * (height * 0.28),
        vx: 0,
        vy: 0,
        r: 16 + n.id.length * 1.4,
      }));
    }

    const ns = nodes.current;
    pointer.current = { x: mouse.x, y: mouse.y };

    // hover detection
    if (drag.current === -1) {
      hover.current = -1;
      ns.forEach((n, i) => {
        if ((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2 < n.r * n.r) hover.current = i;
      });
    }

    // dragging node follows pointer
    if (drag.current !== -1) {
      const n = ns[drag.current];
      n.x = mouse.x;
      n.y = mouse.y;
      n.vx = 0;
      n.vy = 0;
    }

    const REPULSE = 9000;
    const SPRING = 0.015;
    const LINK_LEN = 110;

    // repulsion
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        const a = ns[i];
        const b = ns[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let d2 = dx * dx + dy * dy || 0.01;
        const d = Math.sqrt(d2);
        const f = REPULSE / d2;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx * dt;
        a.vy += fy * dt;
        b.vx -= fx * dt;
        b.vy -= fy * dt;
      }
    }

    // springs
    for (const [a, b] of edges) {
      const na = ns[a];
      const nb = ns[b];
      const dx = nb.x - na.x;
      const dy = nb.y - na.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const diff = d - LINK_LEN;
      const fx = (dx / d) * diff * SPRING;
      const fy = (dy / d) * diff * SPRING;
      na.vx += fx;
      na.vy += fy;
      nb.vx -= fx;
      nb.vy -= fy;
    }

    // centering + integrate
    const cx = width / 2;
    const cy = height / 2;
    ns.forEach((n, i) => {
      n.vx += (cx - n.x) * 0.0009;
      n.vy += (cy - n.y) * 0.0009;
      n.vx *= 0.9;
      n.vy *= 0.9;
      if (i !== drag.current) {
        n.x += n.vx;
        n.y += n.vy;
      }
      n.x = Math.max(n.r, Math.min(width - n.r, n.x));
      n.y = Math.max(n.r, Math.min(height - n.r, n.y));
    });

    // ---- render ----
    ctx.clearRect(0, 0, width, height);

    const neighbors = new Set<number>();
    if (hover.current !== -1) {
      for (const [a, b] of edges) {
        if (a === hover.current) neighbors.add(b);
        if (b === hover.current) neighbors.add(a);
      }
    }

    ctx.lineWidth = 1;
    edges.forEach(([a, b]) => {
      const na = ns[a];
      const nb = ns[b];
      const active =
        hover.current === -1 || a === hover.current || b === hover.current;
      ctx.strokeStyle = active ? "rgba(0,229,255,0.35)" : "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.stroke();
    });

    ns.forEach((n, i) => {
      const active =
        hover.current === -1 || i === hover.current || neighbors.has(i);
      const color = GROUP_COLORS[n.group % GROUP_COLORS.length];
      ctx.globalAlpha = active ? 1 : 0.28;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(11,11,15,0.9)";
      ctx.fill();
      ctx.lineWidth = i === hover.current ? 2.5 : 1.4;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fillStyle = "#e8e8ea";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(n.id, n.x, n.y);
      ctx.globalAlpha = 1;
    });
  });

  // pointer handlers for dragging
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const down = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      nodes.current.forEach((n, i) => {
        if ((n.x - x) ** 2 + (n.y - y) ** 2 < n.r * n.r) drag.current = i;
      });
    };
    const up = () => (drag.current = -1);
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="h-full w-full touch-none" />;
}
