import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
const AddPermission: React.FC = () => {
  return (
    <>
      <Button type="primary" icon={<PlusOutlined />}>
        Thêm mới
      </Button>
    </>
  );
};

export default AddPermission;
