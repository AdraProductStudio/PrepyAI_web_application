import {
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    Tooltip,
    CartesianGrid, 
} from 'recharts';


// Custom Tooltip with rounded bubble like the screenshot
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const value = payload[0]?.value ?? 0;
        return (
            <div style={{
                background: '#000',
                color: '#fff',
                borderRadius: 16,
                padding: '6px 12px',
                fontSize: 12,
                textAlign: 'center',
            }}>
                {value}%
            </div>
        );
    }
    return null;
};

function LegendPayload({ color, value }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
            <div style={{
                width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginRight: 8,
            }} />
            {value}
        </div>
    );
}

const StudentsPerformanceChart = ({data}) => {

    const normalizedData = data?.map(item => ({
        ...item,
        developing: Number(item.developing),
        emergent: Number(item.emergent),
        exemplar: Number(item.exemplar),
    }));

    return (
        <div className="d-flex flex-column h-100 justify-content-between">
            <div className='row row-cols-1 row-cols-md-2 row-cols-xxl-3'>
                <LegendPayload color="#4B3CFA" value="Emergent" />
                <LegendPayload color="#45D655" value="Developing" />
                <LegendPayload color="#EC008C" value="Exemplar" />
            </div>

            {/* Chart */}
            <div className="col">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={normalizedData}>
                        {/* Grid */}
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />

                        {/* X-axis for months */}
                        <XAxis
                            dataKey="month"
                            padding={{ left: 10, right: 10 }}
                            tick={{ fontSize: 12, fill: '#000' }}
                            tickMargin={12}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: 'rgba(38, 177, 141, 0.1)',
                                strokeWidth: 30,
                            }}
                        />

                        <Line
                            type="basis"
                            dataKey="emergent"
                            stroke="#4B3CFA"
                            strokeWidth={4}
                            dot={false}
                            strokeLinecap="round"
                        />
                        <Line
                            type="basis"
                            dataKey="developing"
                            stroke="#45D655"
                            strokeWidth={4}
                            dot={false}
                            strokeLinecap="round"
                        />
                        <Line
                            type="basis"
                            dataKey="exemplar"
                            stroke="#EC008C"
                            strokeWidth={4}
                            dot={false}
                            strokeLinecap="round"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StudentsPerformanceChart;
