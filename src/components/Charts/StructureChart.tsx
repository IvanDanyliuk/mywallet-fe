import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { IChart } from '../../types/types';

const StructureChart: React.FC<IChart> = ({data, dataKey, nameKey}) => {
  return (
    <ResponsiveContainer width={'95%'} height={300}>
      <PieChart>
        <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={80} fill='#1ad37c' label>
          {data.map((item: any, i: number) => (
            <Cell key={i} fill={item.badgeColor} />
          ))}
        </Pie>
        <Legend layout='vertical' align='right' verticalAlign='middle' />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StructureChart;