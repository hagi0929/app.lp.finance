import React, { memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getDate, DataFormatter } from "helper";

const Chart = ({ treasuryChart, TreasuryChartList }) => {
  return (
    <div style={{ width: "100%", height: 260 }} className="NormalChart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={treasuryChart}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="totalSupply" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0c0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0c0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="totalBorrowed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={getDate}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: "0.92rem" }}
            tickLine={{ stroke: "#d1d1d1" }}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: "0.92rem" }}
            tickLine={{ stroke: "#d1d1d1" }}
            tickFormatter={DataFormatter}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(val) => DataFormatter(val)}
            labelFormatter={(label) => getDate(label)}
            itemSorter={(p) => -p.value}
            labelStyle={{ color: "black", fontWeight: "500" }}
            contentStyle={{
              padding: "10px 14px",
              borderRadius: 10,
              borderColor: "white",
              color: "black",
              fontSize: "0.95rem",
            }}
          />
          {TreasuryChartList.map((list) => {
            return (
              <Area
                type="monotone"
                strokeWidth={3}
                key={list.dataKey}
                dataKey={list.dataKey}
                stroke={list.stroke}
                fill={list.fill}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(Chart);
