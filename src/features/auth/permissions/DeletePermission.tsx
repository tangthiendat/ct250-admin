import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";

interface DeletePermissionProps {
  permissionId: number;
}

const DeletePermission: React.FC<DeletePermissionProps> = ({
  permissionId,
}) => {
  return (
    <Popconfirm
      title="Xóa quyền hạn này?"
      description="Bạn có chắc muốn xóa quyền hạn này không?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
      onConfirm={() =>
        console.log(`Delete permission with ID: ${permissionId}`)
      }
    >
      <Tooltip title="Xóa">
        <DeleteOutlined className="text-xl text-[#ff4d4f]" />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeletePermission;
