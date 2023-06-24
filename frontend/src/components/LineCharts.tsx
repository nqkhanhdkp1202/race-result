import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

interface PointValue{
  name: string,
  points: number
}

interface PointValueList{
  data: PointValue[]
}

const LineCharts: React.FC<PointValueList> = (props) => {

  return (
    <div className="chart-list-item">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={props.data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="points" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}


export default LineCharts;