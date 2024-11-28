import { useSearchParams } from "react-router-dom";
import FilterTimeWithoutDate from "../common/components/FilterTimeWithoutDate";
import Stats from "../features/dashboard/Stats";
import { useDynamicTitle } from "../utils";
import SalesStatsChart from "../features/dashboard/SalesStatsChart";

const Home: React.FC = () => {
  useDynamicTitle("Trang chủ - DaViKa Airways");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDateChange = (
    startDate: string | null,
    endDate: string | null,
    type: string | null,
  ) => {
    if (startDate) {
      searchParams.set("startDate", startDate);
    } else {
      searchParams.delete("startDate");
    }

    if (endDate) {
      searchParams.set("endDate", endDate);
    } else {
      searchParams.delete("endDate");
    }

    if (type) {
      searchParams.set("type", type);
    } else {
      searchParams.delete("type");
    }

    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="px-2 pt-2">
        <Stats />
      </div>
      <div className="mx-2 mt-3 rounded-lg bg-white px-2 py-3">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-semibold">Biểu đồ</h2>
          <FilterTimeWithoutDate onDateChange={handleDateChange} />
        </div>
        <div>
          <SalesStatsChart />
        </div>
      </div>
    </>
  );
};

export default Home;
