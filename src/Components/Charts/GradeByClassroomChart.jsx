import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const GradeByClassroomChart = ({ color, graphData }) => {
    return (
        <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="pv" stroke={color} strokeWidth={4} fill="url(#colorPv)" dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    )
};

export default GradeByClassroomChart;
