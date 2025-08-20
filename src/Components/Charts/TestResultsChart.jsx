import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TestResultsChart = ({ correct, wrong, unanswered }) => {
  const total = correct + wrong + unanswered;

  const data = {
    labels: ["Correct", "Wrong", "Unanswered"],
    datasets: [
      {
        data: [correct, wrong, unanswered],
        backgroundColor: ["#28a745", "#dc3545", "#6c757d"], // green, red, grey
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%", // makes it a donut instead of pie
    plugins: {
      legend: { display: false }, // hide default legend
    },
  }

  return (
    <div style={{ width: "200px", height: "200px", margin: "auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default TestResultsChart
