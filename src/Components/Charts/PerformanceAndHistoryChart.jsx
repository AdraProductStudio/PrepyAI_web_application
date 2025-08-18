import { useCommonState } from "Components/CustomHooks"
import SpinnerComponent from "Components/Spinner/Spinner"

const COLORS = { exemplar: '#EC008C', developing: '#08D110', emergent: '#3E00C2', not_attempted: '#AAAAAA' }

const PerformanceAndHistoryChart = ({ data = [], size = 150, strokeWidth = 10, gap = 10 }) => {
    const totalWidth = size + data.length * (strokeWidth + gap)
    const { studentState } = useCommonState()

    let chartData = []

    if (
        Array.isArray(studentState?.overall_performance) &&
        studentState.overall_performance.length > 0
    ) {
        chartData = Object.entries(studentState.overall_performance[0]).map(([key, value]) => ({
            name: key
                .split('_')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' '),
            value: parseFloat(value) || 0, // convert to number
            fill: COLORS[key] || '#000000'
        }))

        chartData.pop()
        data = data.length > 0 ? data : chartData
    } 
    // else {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
    //             <SpinnerComponent />
    //         </div>
    //     )
    // }
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
