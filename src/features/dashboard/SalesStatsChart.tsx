import { useSearchParams } from "react-router-dom";
import { StatisticFilterCriteria } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../../services/booking/booking-service";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Loading from "../../common/components/Loading";
import dayjs from "dayjs";

ChartJS.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
});

const SalesStatsChart: React.FC = () => {
  const [searchParams] = useSearchParams();

  const filter: StatisticFilterCriteria = {
    startDate: searchParams.get("startDate") || dayjs().format("YYYY-MM"),
    endDate: searchParams.get("endDate") || undefined,
    type: searchParams.get("endDate")
      ? "date"
      : searchParams.get("type") || "month",
  };

  const { data: salesStatsData, isLoading } = useQuery({
    queryKey: ["booking", "sales-stats", filter].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => bookingService.getSalesStats(filter),
    select: (data) => data.payload,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    salesStatsData && (
      <Line
        data={{
          labels: Object.keys(salesStatsData),
          datasets: [
            {
              label: "Doanh thu",
              data: Object.values(salesStatsData),
              fill: false,
              backgroundColor: "#1E67BA",
              borderColor: "#1E67BA",
              tension: 0.1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Doanh thu",
                font: {
                  size: 16,
                  family: "Arial",
                  weight: "normal",
                },
                color: "#333",
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Thống kê doanh thu",
              font: {
                size: 20,
              },
            },
            datalabels: {
              display: searchParams.get("type") !== "quarter",
              align: "top",
              color: "black",
              clip: false,
              formatter: (value: number) => {
                return value.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                });
              },
            },
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
        height={125}
      />
    )
  );
};

export default SalesStatsChart;
