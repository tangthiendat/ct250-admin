import { Input } from "antd";
import { ALL_PERMISSIONS } from "../constants";
import Access from "../features/auth/Access";
import AddAirport from "../features/flight/airport/AddAirport";
import AirportTable from "../features/flight/airport/AirportTable";

const Airport: React.FC = () => {
  return (
    <Access permission={ALL_PERMISSIONS.AIRPORTS.GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sân bay</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên hoặc mã của Sân bay & Thành phố để tìm kiếm..."
                enterButton
                allowClear
              />
            </div>
          </div>
          <Access permission={ALL_PERMISSIONS.AIRPORTS.CREATE} hideChildren>
            <AddAirport />
          </Access>
        </div>
        <AirportTable />
      </div>
    </Access>
  );
};
export default Airport;
