import { EditOutlined } from "@ant-design/icons";
import { IUser } from "../../../interfaces";
import { useState } from "react";
import { Form, Modal, Tooltip } from "antd";
import UpdateUserForm from "./UpdateUserForm";

interface UpdateUserProps {
  user: IUser;
  updateUser: (user: IUser) => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, updateUser }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateUserForm] = Form.useForm<IUser>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    updateUserForm.resetFields();
  };

  const handleFinish = (values: IUser) => {
    const updatedUser: IUser = {
      ...user,
      ...values,
      updated_at: new Date().toISOString(),
    };
    updateUser(updatedUser);
    handleCloseModal();
  };

  return (
    <>
      <Tooltip title="Chỉnh sửa">
        <EditOutlined
          className="table-icon text-xl text-[#ffa500]"
          onClick={handleOpenModal}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        width="30%"
        title={<span className="text-lg">Thêm quyền hạn</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateUserForm
          form={updateUserForm}
          userToUpdate={user}
          onCancel={handleCloseModal}
          onFinish={handleFinish}
        />
      </Modal>
    </>
  );
};

export default UpdateUser;
