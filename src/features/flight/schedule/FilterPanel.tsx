import { Button, Divider } from "antd";

const FilterPanel: React.FC = () => {
  return (
    <div className="h-full basis-[25%] rounded-lg bg-white">
      <div className="px-2 py-2">
        <div className="flex items-center justify-between">
          <Button type="primary">Lọc</Button>
          <Button type="text" className="font-semibold text-blue-500">
            Bỏ lọc
          </Button>
        </div>
        <Divider className="my-4" />
      </div>
    </div>
  );
};

export default FilterPanel;
