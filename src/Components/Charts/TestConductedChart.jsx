import { useCommonState } from "Components/CustomHooks";
import SpinnerComponent from "Components/Spinner/Spinner";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    Cell,
    CartesianGrid,
} from "recharts";

// const data = [
//     { name: "Jan", uv: 4 },
//     { name: "Feb", uv: 8 },
//     { name: "Mar", uv: 7 },
//     { name: "Apr", uv: 9 },
//     { name: "May", uv: 7 },
//     { name: "Jun", uv: 20 },
//     { name: "Jul", uv: 6 },
//     { name: "Aug", uv: 10 },
//     { name: "Sep", uv: 5 },
//     { name: "Oct", uv: 9 },
//     { name: "Nov", uv: 6 },
//     { name: "Dec", uv: 8 },
// ];

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
                        {entry.value} Tests
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default function TestConductedChart({data}) {
    const maxVal = Math.max(...data.map((d) => d.uv));
    const gradientId = "barGradient";
    const { adminState } = useCommonState()

    return (
        <div className="position-relative h-100">
            {
                adminState?.overall_loading.includes("dashboard_chart_data")
                ?
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <SpinnerComponent />
                    </div>
                :
                <ResponsiveContainer width="100%" height={340}>
                    <BarChart
                        data={data}
                        barCategoryGap={20}
                        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />

                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }}/> 
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EC008C" />
                                <stop offset="100%" stopColor="#FC6767" />
                            </linearGradient>
                        </defs>

                        <Bar dataKey="uv" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.uv === maxVal
                                            ? `url(#${gradientId})`
                                            : "rgba(255, 95, 132, 0.2)"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

            }
        </div>
        // <ResponsiveContainer width="100%" height={340}>
        //     {
        //         adminState?.overall_loading.includes["dashboard_chart_data"]
        //         ?
        //             <span>Hi</span>
        //         :
        //         <BarChart
        //             data={data}
        //             barCategoryGap={20}
        //             margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        //         >
        //             <CartesianGrid strokeDasharray="3 3" vertical={false} />

        //             <XAxis dataKey="name" tick={{ fontSize: 12 }} />

        //             <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }}/> 
        //             <defs>
        //                 <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        //                     <stop offset="0%" stopColor="#EC008C" />
        //                     <stop offset="100%" stopColor="#FC6767" />
        //                 </linearGradient>
        //             </defs>

        //             <Bar dataKey="uv" radius={[8, 8, 0, 0]}>
        //                 {data.map((entry, index) => (
        //                     <Cell
        //                         key={`cell-${index}`}
        //                         fill={
        //                             entry.uv === maxVal
        //                                 ? `url(#${gradientId})`
        //                                 : "rgba(255, 95, 132, 0.2)"
        //                         }
        //                     />
        //                 ))}
        //             </Bar>
        //         </BarChart>
        //     }
        // </ResponsiveContainer>
    );
}
