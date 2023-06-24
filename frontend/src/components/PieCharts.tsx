import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, PieChart, Pie } from 'recharts';

interface PointValue {
  name: string,
  value: number
}

interface PointValueList {
  data: PointValue[]
}

const COLORS = ['#0088FF', '#00C49F', '#FFBB28', '#FF8042', '#0088FA', '#00C49B', '#FFBC28', '#FD8042'];

const RADIAN: number = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: {
  cx: number,
  cy: number,
  midAngle: number,
  innerRadius: number,
  outerRadius: number,
  percent: number,
  index: number
}): JSX.Element => {
  const radius: number = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x: number = cx + radius * Math.cos(-midAngle * RADIAN);
  const y: number = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" fontSize="10px" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieCharts: React.FC<PointValueList> = (props) => {

  return (
    <div className="chart-list-item">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


export default PieCharts;
