import Spinner from "Components/Spinner/CustomSpinner";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

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
                        {entry.name}: {entry.value} %
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default function TestPerformanceChart({data, loading}) {
    return (
        <div className="position-relative h-100">
            {
                loading.includes("classroom_chart_data")
                ?
                    <div className="start-50 top-50 position-absolute translate-middle">
                        <Spinner />
                    </div>
                :
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            barCategoryGap={20}
                            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 9 }} />
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

            }
        </div>
    );
}
