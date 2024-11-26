import Stats from "../features/dashboard/Stats";
import { useDynamicTitle } from "../utils";

const Home: React.FC = () => {
  useDynamicTitle("Trang chủ - DaViKa Airways");

  return (
    <div className="px-2 pt-2">
      <Stats />
    </div>
  );
};

export default Home;
