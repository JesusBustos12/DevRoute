import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const MAX_REQUESTS = 20;

    const rateLimit = await prisma.userRateLimit.findUnique({
      where: { ip }
    });

    if (!rateLimit) {
      return NextResponse.json({ remaining: MAX_REQUESTS });
    }

    // Check if 24 hours have passed since the last update
    const now = new Date();
    const lastUpdate = new Date(rateLimit.updatedAt);
    const hoursDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

    if (hoursDiff >= 24) {
      return NextResponse.json({ remaining: MAX_REQUESTS });
    }

    const remaining = Math.max(0, MAX_REQUESTS - rateLimit.requestCount);
    return NextResponse.json({ remaining });
  } catch (error) {
    console.error('Error fetching rate limit:', error);
    return NextResponse.json({ remaining: 0 }, { status: 500 });
  }
}
