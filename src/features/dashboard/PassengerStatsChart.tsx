import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { passengerService } from "../../services/booking/passenger-service";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Loading from "../../common/components/Loading";

ChartJS.register({
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels,
});
const PassengerStatsChart: React.FC = () => {
  const { data: passengerShareStats, isLoading } = useQuery({
    queryKey: ["passengers", "passenger-stats"],
    queryFn: () => passengerService.getShareStats(),
    select: (data) => data.payload,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    passengerShareStats && (
      <Pie
        data={{
          labels: Object.keys(passengerShareStats),
          datasets: [
            {
              label: "Số lượng",
              data: Object.values(passengerShareStats),
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Thống kê hành khách",
              font: {
                size: 20,
              },
            },
            datalabels: {
              formatter: (value, context) => {
                let sum = 0;
                (context.chart.data.datasets[0].data as number[]).forEach(
                  (data) => {
                    sum += data;
                  },
                );
                const percentage = ((value / sum) * 100).toFixed(2) + "%";
                return percentage;
              },
              color: "#333",
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
        }}
      />
    )
  );
};

export default PassengerStatsChart;
