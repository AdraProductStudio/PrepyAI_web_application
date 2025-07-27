import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';

const StudentsPerformanceChart = () => {
    const chartData = [
        { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 2000, pv: 3800, amt: 2290 },
        { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
        { name: 'Aug', uv: 2200, pv: 3100, amt: 1800 },
        { name: 'Sep', uv: 2700, pv: 3600, amt: 1900 },
        { name: 'Oct', uv: 2600, pv: 3400, amt: 2000 },
        { name: 'Nov', uv: 3000, pv: 4000, amt: 2100 },
        { name: 'Dec', uv: 3200, pv: 4200, amt: 2300 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <Line type="monotone" dataKey="pv" stroke="#26B18D" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="uv" stroke="#EC008C" strokeWidth={3} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default StudentsPerformanceChart;
