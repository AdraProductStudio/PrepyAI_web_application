import {
    Line, LineChart, ResponsiveContainer,
    XAxis, ReferenceArea,
} from "recharts"

const TestPerformanceChartStudent = ({ data }) => {
    const performanceColor = {
        schedule_test: "#EC008C", // Exemplar (pink)
        self_test: "#4B3CFA",     // Emergent (blue)
    };

    const scheduleTest = data?.schedule_test ?? []
    const selfTest = data?.self_test ?? []

    const allMonths = [
        ...new Set([
            ...scheduleTest.map(d => d.test_month),
            ...selfTest.map(d => d.test_month),
        ]),
    ]

    const mergedData = allMonths.map(month => {
        const scheduleItem = scheduleTest.find(d => d.test_month === month);
        const selfItem = selfTest.find(d => d.test_month === month);

        return {
            name: month,
            schedule_test: scheduleItem?.avg_score || 0,
            self_test: selfItem?.avg_score || 0,
        }
    })

    const performanceList = [
        { key: "schedule_test", label: "Schedule Test", color: performanceColor.schedule_test },
        { key: "self_test", label: "Self Test", color: performanceColor.self_test },
    ];


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
                    width: 8, height: 8, borderRadius: '50%',
                    backgroundColor: color, marginRight: 8,
                }} />
                {value}
            </div>
        )
    }

    return (
        <div className="w-100 h-100">
            {/* Legend */}
            <div className="d-flex justify-content-end gap-4 col">
                {performanceList.map(({ key, label, color }) => (
                    <LegendPayload key={key} color={color} value={label} />
                ))}
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

                        {performanceList.map(({ key, color }) => (
                            <Line
                                key={key}
                                type="basis"
                                dataKey={key}
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
    )
}

export default TestPerformanceChartStudent