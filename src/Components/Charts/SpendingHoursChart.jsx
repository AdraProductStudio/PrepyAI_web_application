import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const colors = {
    long_answer_hrs: "#ff5f84", // dark pink
    multiple_ques_ans_hrs: "#ffa3b4", // light pink
};

// Convert "HH:MM" to decimal hours for chart plotting
const convertToHours = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return h + m / 60;
};

// Custom Tooltip (keeps HH:MM display)
const CustomTooltip = ({ active, payload, originalData }) => {
    if (active && payload && payload.length) {
        const chapter = payload[0]?.payload?.chapter_name;
        const original = originalData.find(d => d.chapter_name === chapter);

        return (
            <div
                style={{
                    background: "#1e1e3f",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: 6,
                    fontSize: 12,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginBottom: 6,
                        fontSize: 13,
                        borderBottom: "1px solid #444",
                        paddingBottom: 4,
                    }}
                >
                    {chapter.replace(/[_]/g, " ")}
                </div>

                {Object.keys(colors).map((key, idx) => (
                    <div key={idx} style={{ marginBottom: 4 }}>
                        <span
                            style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: colors[key],
                                marginRight: 6,
                            }}
                        ></span>
                        {original[key]} Hr
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


export default function SpendingHoursChart({ data }) {
    console.log(data)
    // Convert times for chart plotting
    const processedData = data?.map(item => ({
        chapter_name: item.chapter_name,
        long_answer_hrs: convertToHours(item.long_answer_hrs),
        multiple_ques_ans_hrs: convertToHours(item.multiple_ques_ans_hrs),
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={processedData}
                barCategoryGap={20}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="chapter_name"
                    tick={{ fontSize: 12 }}
                    textAnchor="end"
                    tickFormatter={(name) =>
                        name
                            .replace(/[_]/g, " ")
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase())
                            .join(" ")
                    }
                />
                <YAxis tickFormatter={(v) => `${v} Hr`} tick={{ fontSize: 14 }} />
                <Tooltip
                    content={<CustomTooltip originalData={data} />}
                    cursor={{ fill: "transparent" }}
                />
                <Bar
                    dataKey="long_answer_hrs"
                    stackId="a"
                    fill={colors.long_answer_hrs}
                />
                <Bar
                    dataKey="multiple_ques_ans_hrs"
                    stackId="a"
                    fill={colors.multiple_ques_ans_hrs}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
