import { EyeOutlined } from "@ant-design/icons";
import { IUser } from "../../../interfaces";
import { useState } from "react";
import { Form, Modal, Tooltip } from "antd";
import UpdateUserForm from "./UpdateUserForm";

interface ViewUserProps {
  user: IUser;
}

const ViewUser: React.FC<ViewUserProps> = ({ user }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [viewUserForm] = Form.useForm<IUser>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Tooltip title="Xem chi tiết">
        <EyeOutlined
          className="table-icon text-xl text-[#1677FF]"
          onClick={handleOpenModal}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Cập nhật thông tin</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateUserForm
          form={viewUserForm}
          userToUpdate={user}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewUser;
