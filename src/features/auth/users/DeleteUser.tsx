import { DeleteOutlined } from "@ant-design/icons";

interface deleteUserProps {}

const DeleteUser: React.FC<deleteUserProps> = ({}) => {
  return (
    <div>
      <DeleteOutlined className="text-xl text-[#ff4d4f]" />
    </div>
  );
};

export default DeleteUser;
