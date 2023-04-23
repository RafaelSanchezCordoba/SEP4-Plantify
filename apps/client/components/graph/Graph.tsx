import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, ReferenceLine } from 'recharts'
import { IGraphData } from '@sep4/types'
import { getPlantEnvironmentHistory } from '../../services/PlantService'

interface Props {
  id: number
  type: string
}
export const Graph: React.FC<Props> = ({ id, type }) => {
  const [data, setData] = useState<IGraphData>()

  useEffect(() => {
    getPlantEnvironmentHistory(id, type).then((res) => {
      setData(res)
    })
  }, [type])

  if(!data) return <div>Loading</div>
  return (
    <ResponsiveContainer width={'100%'} height={180}>
      <AreaChart data={data.data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4D99FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4D99FF" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <ReferenceLine y={2} isFront={false} stroke={'#B3B3B3'} />
        <Area dataKey={'value'} stroke={'#4D99FF'} fill={'url(#color)'} />
        <XAxis dataKey={'date'} axisLine={false} tickLine={false} />
        <YAxis dataKey={'value'} axisLine={false} tickLine={false} />

        {/*<Tooltip/>*/}
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
