import { NextRequest, NextResponse } from 'next/server';
import { updateActionStatus } from '@/lib/store';
import { ActionStatus } from '@/types/business';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  updateActionStatus(params.id, body.status as ActionStatus);
  return NextResponse.json({ ok: true });
}
