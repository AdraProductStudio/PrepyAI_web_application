import {
    Line, LineChart, ResponsiveContainer,
    XAxis, ReferenceArea, Tooltip
} from "recharts"

const TestPerformanceChartStudent = ({ data }) => {
    const performanceColor = {
        schedule_test: "#EC008C", // Exemplar (pink)
        individual: "#4B3CFA",     // Emergent (blue)
    };

    const scheduleTest = data?.schedule_test ?? []
    const selfTest = data?.individual ?? []

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
            individual: selfItem?.avg_score || 0,
        }
    })

    const performanceList = [
        { key: "schedule_test", label: "Schedule Test", color: performanceColor.schedule_test },
        { key: "individual", label: "Self Test", color: performanceColor.individual },
    ]

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

                        <Tooltip
                            contentStyle={{ backgroundColor: "#fff", borderRadius: 4, border: "1px solid #ccc"}}
                            labelStyle={{ color: "#333", fontWeight: 500 }}
                            cursor={{ stroke: "#8884d8", strokeWidth: 2, strokeDasharray: "3 3", pointerEvents: "none" }}
                            formatter={(value, name) => {
                                // Map the dataKey to a nicer label
                                const nameMap = {
                                    schedule_test: "Schedule test",
                                    individual: "Self test"
                                }
                                return [value, nameMap[name] || name]
                            }}
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