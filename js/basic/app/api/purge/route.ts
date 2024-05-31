import { NextRequest, NextResponse } from 'next/server';
import { EdgeCache } from '@wpengine/atlas-next/api';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '';
  if (path == '') {
    return NextResponse.json({
      purged: false,
      now: Date.now(),
      cache: 'no-store',
    });
  }

  const edgeCache = new EdgeCache();

  await edgeCache.purgeByPath(path);

  return NextResponse.json({
    purged: true,
    now: Date.now(),
    cache: 'no-store',
  });
}
