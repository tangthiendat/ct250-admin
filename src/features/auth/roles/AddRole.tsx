import { Button, Form, Modal, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UpdateRoleForm from "./UpdateRoleForm";
import { useState } from "react";
import { IRole } from "../../../interfaces";

const AddRole: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addRoleForm] = Form.useForm<IRole>();
  const [notificationApi, contextHolder] = notification.useNotification();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addRoleForm.resetFields();
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Thêm vai trò</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateRoleForm
          form={addRoleForm}
          onCancel={handleCloseModal}
          notificationApi={notificationApi}
        />
      </Modal>
    </>
  );
};

export default AddRole;
