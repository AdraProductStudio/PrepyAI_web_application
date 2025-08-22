import { useCommonState } from "Components/CustomHooks";
import React from "react";


export default function ClassroomOverviewChart() {
    const { adminState } = useCommonState()
    const data = [
        {
            name: "Teacher",
            value: adminState?.classroom_overview.teachers,
            color: "#F28AD8",
            gradient: "url(#grad-teacher)",
            cx: 160,
            cy: 80,
            r: 75,
        },
        {
            name: "Students",
            value: adminState?.classroom_overview.students,
            color: "#ff9a9e",
            gradient: "url(#grad-students)",
            cx: 100,
            cy: 135,
            r: 45,
        },
        {
            name: "Tests",
            value: adminState?.classroom_overview.tests,
            color: "#ff4ecd",
            gradient: "url(#grad-tests)",
            cx: 210,
            cy: 150,
            r: 40,
        },
    ];
    
    return (
        <div style={{ textAlign: "center" }}>
            <svg width="300" height="220">
                <defs>
                    <linearGradient id="grad-teacher" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d68bff" />
                        <stop offset="100%" stopColor="#b76df3" />
                    </linearGradient>
                    <linearGradient id="grad-students" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff9a9e" />
                        <stop offset="100%" stopColor="#fad0c4" />
                    </linearGradient>
                    <linearGradient id="grad-tests" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff4ecd" />
                        <stop offset="100%" stopColor="#f7797d" />
                    </linearGradient>
                </defs>

                {data.map((d, idx) => (
                    <g key={idx}>
                        <circle cx={d.cx} cy={d.cy} r={d.r} fill={d.gradient} />
                        <text
                            x={d.cx}
                            y={d.cy + 5}
                            textAnchor="middle"
                            fill="white"
                            fontSize={14}
                            fontWeight="bold"
                        >
                            {d.value}
                        </text>
                    </g>
                ))}
            </svg>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 20,
                    marginTop: 10,
                }}
            >
                {data.map((d, idx) => (
                    <div
                        key={idx}
                        style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                        <span
                            style={{
                                width: 14,
                                height: 14,
                                backgroundColor: d.color,
                                borderRadius: "50%",
                                display: "inline-block",
                            }}
                        />
                        <span style={{ fontSize: 13 }}>{d.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
