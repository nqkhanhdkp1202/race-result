import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

interface PointValue{
  name: string,
  value: number
}

interface PointValueList{
  data: PointValue[]
}

const PieCharts: React.FC<PointValueList> = (props) => {

  return (
    <div className="chart-list-item">
    </div>
  );
}


export default PieCharts;
