import { NextRequest, NextResponse } from 'next/server';
import * as shp from 'shapefile';
import path from 'node:path';
import { promises as fs } from 'node:fs';

export const runtime = 'nodejs'; // ensure Node FS access

const LAYERS: Record<string, { folder: string; file: string }> = {
  administrative: { folder: 'madhya_pradesh_administrative', file: 'madhya_pradesh_administrative' },
  natural: { folder: 'madhya_pradesh_natural', file: 'madhya_pradesh_natural' },
  water: { folder: 'madhya_pradesh_water', file: 'madhya_pradesh_water' },
  highway: { folder: 'madhya_pradesh_highway', file: 'madhya_pradesh_highway' },
};

export async function GET(_req: NextRequest, { params }: { params: { layer: string } }) {
  const def = LAYERS[params.layer];
  if (!def) return NextResponse.json({ error: 'Unknown layer' }, { status: 404 });

  // Resolve absolute file paths
  const root = process.cwd();
  const base = path.join(root, def.folder, def.file);

  const shpPath = base + '.shp';
  const dbfPath = base + '.dbf';
  const shxPath = base + '.shx';

  // Ensure files exist
  try {
    await fs.access(shpPath);
    await fs.access(dbfPath);
    await fs.access(shxPath);
  } catch {
    return NextResponse.json({ error: 'Shapefile components not found' }, { status: 404 });
  }

  // Stream shapefile -> GeoJSON FeatureCollection
  const source = await shp.open(shpPath, dbfPath, { encoding: 'utf8' });
  const features: any[] = [];
  while (true) {
    const result = await source.read();
    if (result.done) break;
    // Optionally clip/simplify/limit here; for demo, push as-is
    features.push({ type: 'Feature', geometry: result.value.geometry, properties: result.value.properties });
    if (features.length > 5000) break; // safety cap for demo performance
  }
  const collection = { type: 'FeatureCollection', features };
  return NextResponse.json(collection);
}