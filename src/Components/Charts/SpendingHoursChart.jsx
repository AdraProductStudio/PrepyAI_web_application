import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const data = [
    { name: "Chapter1", uv: 8, pv: 8 },
    { name: "Chapter2", uv: 5, pv: 5 },
    { name: "Chapter3", uv: 15, pv: 3 },
    { name: "Chapter4", uv: 8, pv: 4 },
    { name: "Chapter5", uv: 3, pv: 2 },
    { name: "Chapter6", uv: 8, pv: 2 },
    { name: "Chapter7", uv: 8, pv: 2 },
    { name: "Chapter8", uv: 8, pv: 2 },
    { name: "Chapter9", uv: 8, pv: 2 },
];

const colors = {
    uv: "#ff5f84", // dark pink
    pv: "#ffa3b4", // light pink
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
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
                {payload.map((entry, index) => (
                    <div key={index} style={{ marginBottom: 4 }}>
                        <span
                            style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: entry.color,
                                marginRight: 6,
                            }}
                        ></span>
                        {entry.value} Hr
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default function SpendingHoursChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                barCategoryGap={20}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis tickFormatter={(v) => `${v} Hr`} tick={{ fontSize: 14 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }}/>
                <Bar
                    dataKey="uv"
                    stackId="a"
                    fill={colors.uv}
                />
                <Bar
                    dataKey="pv"
                    stackId="a"
                    fill={colors.pv}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
