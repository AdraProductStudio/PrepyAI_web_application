import Img from "Components/Img/Img"
// import SpinnerComponent from "Components/Spinner/Spinner"
import Image from "Utils/Image"

const COLORS = { exemplar: '#EC008C', developing: '#08D110', emergent: '#3E00C2', not_attempted: '#AAAAAA' }

const BookPerformanceChart = ({ data = [], size = 150, strokeWidth = 10, gap = 10 }) => {

    if (data.length > 0) {
        data = data.map((item) => {
            let fill = COLORS.not_attempted
            let name = "Not Attempted"

            const value = parseFloat(item.value) || 0

            if (value >= 0 && value < 40) {
                fill = COLORS.emergent
                name = "Emergent"
            } else if (value >= 40 && value < 80) {
                fill = COLORS.developing
                name = "Developing"
            } else if (value >= 80 && value <= 100) {
                fill = COLORS.exemplar
                name = "Exemplar"
            } else {
                fill = COLORS.not_attempted
                name = "Not Attempted"
            }

            return {
                ...item,
                name,
                value,
                fill
            }
        })


    }

    const totalWidth = size + data.length * (strokeWidth + gap)

    // else {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
    //             <SpinnerComponent />
    //         </div>
    //     )
    // }
    return (
        <>
            {
                data.length > 0 ? (
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
                                      <title >{`${item.name} : ${item.value}%`}</title> 
                                    {
                                        item.value > 0 && (

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
                                                <title >{`${item.name} : ${item.value}%`}</title> 
                                            </circle>
                                        )
                                    }
                                </g>
                            )
                        })}
                    </svg>
                ) : (
                    <div className="text-center mt-5">
                        <span>
                            <Img src={Image.no_data_found} width={100} />
                        </span>
                        <p>No data</p>
                    </div>
                )
            }
        </>
    )
}

export default BookPerformanceChart
