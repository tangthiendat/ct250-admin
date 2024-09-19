import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { IUser } from "../../../interfaces";
import UpdateUserForm from "./UpdateUserForm";

const AddUser: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addUserForm] = Form.useForm<IUser>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addUserForm.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Thêm người dùng</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateUserForm form={addUserForm} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AddUser;
