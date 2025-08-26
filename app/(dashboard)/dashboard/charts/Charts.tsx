"use client";
import { useEffect, useRef } from 'react';

// Tiny vanilla charts (no external dep) using canvas
export function PieChart({ values, labels, colors }: { values: number[]; labels: string[]; colors: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0,0,c.width,c.height);
    const total = values.reduce((a,b)=>a+b,0) || 1;
    let start = -Math.PI/2;
    values.forEach((v, i) => {
      const angle = (v/total) * Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(150,90);
      ctx.arc(150,90,80,start,start+angle);
      ctx.closePath();
      ctx.fillStyle = colors[i] || '#0ea5e9';
      ctx.fill();
      start += angle;
    });
  }, [values, labels, colors]);
  return <canvas ref={ref} width={300} height={180} />;
}

export function BarChart({ values, labels, color = '#0ea5e9' }: { values: number[]; labels: string[]; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0,0,c.width,c.height);
    const max = Math.max(...values, 1);
    const w = 280; const h = 160; const pad = 20; const barW = w / values.length - 10;
    values.forEach((v, i) => {
      const x = pad + i * (barW + 10);
      const bh = (v / max) * (h - pad*2);
      const y = h - pad - bh;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barW, bh);
    });
  }, [values, labels, color]);
  return <canvas ref={ref} width={300} height={180} />;
}