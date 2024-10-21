import { useQuery } from "@tanstack/react-query";
import { SearchProps } from "antd/es/input";
import { Input } from "antd/lib";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddMeal from "../features/booking/meal/AddMeal";
import MealTable from "../features/booking/meal/MealTable";
import { Module, PERMISSIONS, SortParams } from "../interfaces";
import { mealService } from "../services/booking/meal-service";

const Meals: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["meals", pagination, query, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => mealService.getMeals(pagination, query, sort),
  });

  const handleSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  return (
    <Access permission={PERMISSIONS[Module.MEALS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Món ăn</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên món ăn để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access permission={PERMISSIONS[Module.MEALS].CREATE} hideChildren>
            <AddMeal />
          </Access>
        </div>
        <MealTable mealPage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};
export default Meals;
