import { NextRequest, NextResponse } from 'next/server';
import { purgeTags } from '@wpengine/edge-cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '';
  if (path == '') {
    return NextResponse.json({
      purged: false,
      now: Date.now(),
      cache: 'no-store',
    });
  }

  await purgeTags([path]);

  return NextResponse.json({
    purged: true,
    now: Date.now(),
    cache: 'no-store',
  });
}
