import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { StatisticFilterCriteria } from "../../interfaces";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../../services/booking/booking-service";
import Loading from "../../common/components/Loading";
import { Bar } from "react-chartjs-2";

ChartJS.register({
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
});

const TopDestinationsChart: React.FC = () => {
  const [searchParams] = useSearchParams();

  const filter: StatisticFilterCriteria = {
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    type: searchParams.get("endDate")
      ? "date"
      : searchParams.get("type") || "month",
  };

  const { data: top10DestinationsData, isLoading } = useQuery({
    queryKey: ["booking", "top-10-destinations", filter].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => bookingService.getTop10Destinations(filter),
    select: (data) => data.payload,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    top10DestinationsData && (
      <Bar
        data={{
          labels: Object.keys(top10DestinationsData),
          datasets: [
            {
              label: "Số lần đặt",
              data: Object.values(top10DestinationsData),
              backgroundColor: "#1E67BA",
              borderColor: "#1E67BA",
              barThickness: 30,
              maxBarThickness: 40,
            },
          ],
        }}
        options={{
          responsive: true,
          indexAxis: "y",
          plugins: {
            title: {
              display: true,
              text: "Top 10 điểm đến phổ biến",
              font: {
                size: 20,
              },
            },
            datalabels: {
              color: "#333",
              font: {
                weight: "bold",
                size: 14,
              },
              anchor: "end",
              align: "end",
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                callback: function (value) {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                  return null;
                },
              },
            },
            y: {},
          },
          layout: {
            padding: {
              top: 20,
              right: 40,
              bottom: 20,
              left: 40,
            },
          },
        }}
      />
    )
  );
};

export default TopDestinationsChart;
