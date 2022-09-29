import React, { memo } from "react";
import { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { CalcFiveDigit, calc } from "../../../helper";

const GlobalPieChart = ({ List, TotalValue }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="GlobalPieChart" style={{ height: "270px", width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={(props) => renderActiveShape(props, TotalValue)}
            data={List}
            cx="50%"
            cy="47%"
            innerRadius={"60%"}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {List.map((entry, index) => {
              return <Cell key={`cell-${index}`} fill={entry.fill} />;
            })}
            ;
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(GlobalPieChart);

const renderActiveShape = (props, TotalValue) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
  } = props;
  const fill = payload.fill;

  const sector1 = (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
  const sector2 = (
    <Sector
      cx={cx}
      cy={cy}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={outerRadius + 6}
      outerRadius={outerRadius + 10}
      fill={fill}
    />
  );
  if (outerRadius < 180) {
    return (
      <>
        {sector1}
        {sector2}
        <text x={cx} y={cy} dy={-8} textAnchor="middle" fill="#fff">
          {payload.symbol}
        </text>
        <text
          x={cx}
          y={cy}
          dy={-8 + 18}
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.8)"
        >
          {`${CalcFiveDigit(payload.amount)}`}
        </text>
        <text
          x={cx}
          y={cy}
          dy={-8 + 18 * 2}
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.8)"
        >
          {`(${calc((payload.value / TotalValue) * 100)}%)`}
        </text>
      </>
    );
  }
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff">
        {payload.symbol}
      </text>
      {sector1}
      {sector2}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="rgba(255, 255, 255, 0.8)"
      >
        {`${CalcFiveDigit(payload.amount)}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="rgba(255, 255, 255, 0.8)"
      >
        {`(${calc((payload.value / TotalValue) * 100)}%)`}
      </text>
    </g>
  );
};
