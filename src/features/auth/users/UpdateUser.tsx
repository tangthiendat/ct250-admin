import { EditOutlined } from "@ant-design/icons";
import { IUser } from "../../../interfaces";
import { useState } from "react";
import { Form, Modal, Tooltip } from "antd";
import UpdateUserForm from "./UpdateUserForm";

interface UpdateUserProps {
  user: IUser;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateUserForm] = Form.useForm<IUser>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    updateUserForm.resetFields();
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
        width="50%"
        title={<span className="text-lg">Cập nhật thông tin</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateUserForm
          form={updateUserForm}
          userToUpdate={user}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateUser;
