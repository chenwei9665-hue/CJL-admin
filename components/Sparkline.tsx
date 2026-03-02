'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { MetricPoint } from '@/types/business';

export function Sparkline({ data }: { data: MetricPoint[] }) {
  return (
    <div className="h-32 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
