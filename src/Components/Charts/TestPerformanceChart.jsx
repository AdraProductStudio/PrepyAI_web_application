import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const data = [
    { name: "Jan", Emergent: 8, Developing: 8, Exemplar: 8 },
    { name: "Feb", Emergent: 5, Developing: 5, Exemplar: 5 },
    { name: "Mar", Emergent: 15, Developing: 3, Exemplar: 3 },
    { name: "Apr", Emergent: 8, Developing: 4, Exemplar: 4 },
    { name: "May", Emergent: 3, Developing: 2, Exemplar: 2 },
    { name: "Jun", Emergent: 8, Developing: 2, Exemplar: 2 },
    { name: "Jul", Emergent: 8, Developing: 2, Exemplar: 2 },
    { name: "Aug", Emergent: 8, Developing: 2, Exemplar: 2 },
    { name: "Sep", Emergent: 8, Developing: 2, Exemplar: 2 },
    { name: "Oct", Emergent: 4, Developing: 2, Exemplar: 1 },
    { name: "Nov", Emergent: 6, Developing: 3, Exemplar: 2 },
    { name: "Dec", Emergent: 7, Developing: 2, Exemplar: 1 },
];

const colors = {
    Emergent: "#FD5081",
    Developing: "#FFACC4",
    Exemplar: "#FFE3EB"
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
                        {entry.name}: {entry.value} Hr
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default function TestPerformanceChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                barCategoryGap={20}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                <Bar
                    dataKey="Developing"
                    stackId="a"
                    fill={colors.Developing}

                />
                <Bar
                    dataKey="Exemplar"
                    stackId="a"
                    fill={colors.Exemplar}
                />
                <Bar
                    dataKey="Emergent"
                    stackId="a"
                    fill={colors.Emergent}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
