import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { IUser } from "../../../interfaces";
import UpdateUserForm from "./UpdateUserForm";

interface AddUserProps {
  addUser: (user: IUser) => void;
  IDForNewUser: number;
}

const AddUser: React.FC<AddUserProps> = ({ addUser, IDForNewUser }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addUserForm] = Form.useForm<IUser>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addUserForm.resetFields();
  };

  const handleFinish = (values: IUser) => {
    const newUser: IUser = {
      ...values,
      id: IDForNewUser,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addUser(newUser);
    handleCloseModal();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="30%"
        title={<span className="text-lg">Thêm user</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateUserForm
          form={addUserForm}
          onCancel={handleCloseModal}
          onFinish={handleFinish}
        />
      </Modal>
    </>
  );
};

export default AddUser;
