import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') || '';
  let path = request.nextUrl.searchParams.get('path') || '';

  const questionMarkIndex = path.indexOf("?");
  if (questionMarkIndex !== -1) {
    path = path.substring(0, questionMarkIndex);
  }
  path = path.replace(/\/+$/g, "");
  if (path != '') {
    console.log(`APP ROUTER: revalidate path ${path} for type ${type}`);
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
