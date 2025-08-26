import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { q } = await req.json();
  // Very basic stubbed rules
  let a = 'I can help with project analytics and GIS queries. For now this is a demo stub.';
  if (typeof q === 'string') {
    const x = q.toLowerCase();
    if (x.includes('smart')) a = 'Smart City has 12 active projects with avg progress 81%.';
    else if (x.includes('budget')) a = 'Total allocated budget is approximately ₹8,720 Cr across sectors.';
    else if (x.includes('layer') || x.includes('gis')) a = 'GIS tools available: Basemap, Layers, Measure, Draw, Buffer, Search.';
  }
  return NextResponse.json({ a });
}