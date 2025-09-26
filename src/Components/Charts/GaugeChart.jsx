import React from "react";
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;

const GaugeNeedle = ({ value, data, cx, cy, iR, oR, color }) => {
const total = data.reduce((sum, entry) => sum + entry.value, 0);
const ang = 180.0 * (1 - value / total);
const r = 6;
const length = iR + (oR - iR) * 0.8;
const sin = Math.sin(-RADIAN * ang);
const cos = Math.cos(-RADIAN * ang);

const x0 = cx;
const y0 = cy;
const xba = x0 + r * sin;
const yba = y0 - r * cos;
const xbb = x0 - r * sin;
const ybb = y0 + r * cos;
const xp = x0 + length * cos;
const yp = y0 + length * sin;

return [
<circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="white" strokeWidth={2} />,
<path key="needle" d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} Z`} fill="url(#needleGradient)" />
];
};

const GaugeChart = ({
width = 300,
height = 180,
value = 50,
data = [],
label = '',
labelColor = '',
needleColor = '#FF914D'
}) => {
const cx = width / 2;
const cy = height * 0.9;
const iR = 70; // thinner by increasing innerRadius
const oR = 85; // smaller outerRadius

return (
<div style={{ width, height: height + 40, overflow: 'visible' }}>
<PieChart width={width} height={height}>
<defs>
<linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stopColor="#ffffff" stopOpacity={0.2} />
<stop offset="100%" stopColor={needleColor} />
</linearGradient>
</defs>

<Pie
dataKey="value"
startAngle={180}
endAngle={0}
data={data}
cx={cx}
cy={cy}
innerRadius={iR}
outerRadius={oR}
cornerRadius={10} // ✅ Rounded edge
stroke="none"
>
{data.map((entry) => (
<Cell key={`cell-${entry.name}`} fill={entry.color} />
))}
</Pie>

<GaugeNeedle
value={value}
data={data}
cx={cx}
cy={cy}
iR={iR}
oR={oR}
color={needleColor}
/>
</PieChart>

<div
style={{
marginTop: 10,
display: 'flex',
alignItems: 'center',
justifyContent: 'center'
}}
>
<div
style={{
width: 16,
height: 16,
background: data[0]?.color,
borderRadius: 4,
marginRight: 6
}}
/>
<span
style={{
fontSize: 14,
fontWeight: 500,
color: labelColor
}}
>
{label}
</span>
</div>
</div>
);
};

export default GaugeChart;