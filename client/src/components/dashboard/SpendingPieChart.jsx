import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#1A56DB', '#00A99D', '#0284C7', '#4F46E5', '#0D9488', '#64748B'];

const SpendingPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className='chart-empty'>
        <p>No spending data yet</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width='100%' height={260}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={65}
          outerRadius={95}
          paddingAngle={3}
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpendingPieChart;
