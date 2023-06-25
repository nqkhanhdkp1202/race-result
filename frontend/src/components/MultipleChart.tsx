import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line, Area } from 'recharts';

interface PointValue {
  name: string,
  laps: number,
  time: number
}

interface PointValueList {
  data: PointValue[]
}

const MultipleChart: React.FC<PointValueList> = (props) => {

  return (
    <div className="chart-list-item" style={{ width: '80%', height: 400 }}>
      <ResponsiveContainer>
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
          <Tooltip />
          <Legend />
          <Bar dataKey="laps" barSize={70} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}


export default MultipleChart;