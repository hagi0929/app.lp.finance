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

const GlobalChart = ({ list, filterList }) => {
  return (
    <div style={{ width: "100%", height: 260 }} className="NormalChart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={list} stackOffset="off">
          <defs>
            {filterList.map((list) => {
              return (
                <linearGradient
                  id={list.dataKey}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={list.id}
                >
                  <stop offset="0%" stopColor={list.stroke} stopOpacity={1} />
                  <stop offset="100%" stopColor={list.stroke} stopOpacity={1} />
                </linearGradient>
              );
            })}
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
          {filterList.map((list) => {
            return (
              <Area
                type="monotone"
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

export default memo(GlobalChart);
