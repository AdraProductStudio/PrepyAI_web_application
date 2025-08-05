import {
    Line, LineChart, ResponsiveContainer,
    XAxis, ReferenceArea,
} from "recharts";

const TestPerformanceChartStudent = () => {
    const sourceData = {
        individual: {
            label: "Individual",
            performance: "emergent",
            data: [
                { name: "JAN", value: 10 },
                { name: "FEB", value: 15 },
                { name: "MAR", value: 20 },
                { name: "APR", value: 40 },
                { name: "MAY", value: 25 },
                { name: "JUN", value: 30 },
            ],
        },
        schedule_test: {
            label: "Schedule Test",
            performance: "exemplar",
            data: [
                { name: "JAN", value: 70 },
                { name: "FEB", value: 72 },
                { name: "MAR", value: 75 },
                { name: "APR", value: 60 },
                { name: "MAY", value: 68 },
                { name: "JUN", value: 65 },
            ],
        },
    };

    const performanceColor = {
        emergent: "#4B3CFA",
        developing: "#45D655",
        exemplar: "#EC008C",
    };

    const performanceList = Object.entries(sourceData).map(
        ([key, { label, performance, data }]) => ({
            key,
            label,
            performance,
            dataKey: `${performance}_${key}`,
            color: performanceColor[performance] || "#000",
            data,
        })
    );

    const mergedData = sourceData.individual.data.map((_, idx) => {
        const point = { name: sourceData.individual.data[idx].name };
        performanceList.forEach(({ dataKey, data }) => {
            point[dataKey] = data[idx]?.value;
        });
        return point;
    });

    const referenceBands = mergedData.map((_, i) =>
        i % 2 === 0 && i < mergedData.length - 1 ? (
            <ReferenceArea
                key={i}
                x1={mergedData[i].name}
                x2={mergedData[i + 1].name}
                strokeOpacity={0}
                fill="rgba(0, 0, 0, 0.04)"
            />
        ) : null
    );

    function LegendPayload({ color, value }) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                <div style={{
                    width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginRight: 8,
                }} />
                {value}
            </div>
        );
    };

    return (
        <div className="w-100 h-100">
            <div className="d-flex justify-content-end gap-4 col">
                <LegendPayload color="#4B3CFA" value="Emergent" />
                <LegendPayload color="#45D655" value="Developing" />
                <LegendPayload color="#EC008C" value="Exemplar" />
            </div>

            <div className="d-flex align-items-stretch w-100">
                {/* Colored Labels on Left */}
                <div
                    style={{
                        marginRight: 10,
                        fontSize: 12,
                        color: "#6B6B6B",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}
                >
                    {performanceList.map(({ label }, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: "50%",
                                display: "flex",
                                alignItems: "center",
                                color: "#AEB9E1",
                                fontWeight: 500,
                            }}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={mergedData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        {referenceBands}
                        <XAxis
                            dataKey="name"
                            padding={{ left: 10, right: 10 }}
                            tick={{ fontSize: 12, fill: "#888" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Lines */}
                        {performanceList.map(({ dataKey, color }) => (
                            <Line
                                key={dataKey}
                                type="basis"
                                dataKey={dataKey}
                                stroke={color}
                                strokeWidth={5}
                                dot={false}
                                strokeLinecap="round"
                                isAnimationActive={false}
                                activeDot={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TestPerformanceChartStudent;