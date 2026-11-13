import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

const MonthlyBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className='chart-empty'>
        <p>No monthly data yet</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width='100%' height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' vertical={false} />
        <XAxis dataKey='month' tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} tickLine={false} />
        <Tooltip
          formatter={(value) => `₹${value}`}
          contentStyle={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
            fontSize: '13px',
          }}
        />
        <Bar dataKey='amount' fill='#1A56DB' radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
