import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IChart } from '../../types/types';

const DynamicChart: React.FC<IChart> = ({ data, dataKey, nameKey }) => {
  return (
    <ResponsiveContainer width={'50%'} height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Line type='monotone' dataKey={nameKey} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DynamicChart;