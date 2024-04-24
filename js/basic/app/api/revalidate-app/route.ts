import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '';
  const type = request.nextUrl.searchParams.get('type') || '';
  if (path != '') {
    if (type == 'page') {
      revalidatePath(path, 'page');
      console.log('revalidated path page', path);
    } else if (type == 'layout') {
      revalidatePath(path, 'layout');
      console.log('revalidated path layout', path);
    } else {
      revalidatePath(path);
      console.log('revalidated path', path);
    }
  }
  const collection =
    request.nextUrl.searchParams.get('collection') || '';
  if (collection != '') {
    revalidateTag(collection);
    console.log('revalidated collection', collection);
  }
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    cache: 'no-store',
  });
}
