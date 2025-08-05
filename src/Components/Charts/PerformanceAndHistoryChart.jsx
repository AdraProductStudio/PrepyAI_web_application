const PerformanceAndHistoryChart = ({ data = [], size = 150, strokeWidth = 10, gap = 10 }) => {
    const totalWidth = size + data.length * (strokeWidth + gap)

    return (
        <svg width={totalWidth} height={totalWidth} style={{ display: 'block', margin: 'auto' }}>
            {data.map((item, i) => {
                const radius = (size / 2) - (i * (strokeWidth + gap))
                const circumference = 2 * Math.PI * radius
                const progressOffset = circumference - (item.value / 100) * circumference

                return (
                    <g key={i}>
                        <circle
                            cx={totalWidth / 2}
                            cy={totalWidth / 2}
                            r={radius}
                            stroke="#eee"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />

                        <circle
                            cx={totalWidth / 2}
                            cy={totalWidth / 2}
                            r={radius}
                            stroke={item.fill}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference}
                            strokeLinecap="round"
                            fill="none"
                            transform={`rotate(-90 ${totalWidth / 2} ${totalWidth / 2})`}
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from={circumference}
                                to={progressOffset}
                                dur=".5s"
                                fill="freeze"
                                begin="0s"
                            />
                        </circle>
                    </g>
                )
            })}
        </svg>
    )
}

export default PerformanceAndHistoryChart
