import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";

interface DeleteUserProps {
  userID: number;
  deleteUser: (userId: number) => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ userID, deleteUser }) => {
  return (
    <Popconfirm
      title="Xóa user này?"
      description="Bạn có chắc muốn xóa user này không?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
      onConfirm={() => deleteUser(userID)}
    >
      <Tooltip title="Xóa">
        <DeleteOutlined className="text-xl text-[#ff4d4f]" />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteUser;
