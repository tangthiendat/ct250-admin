import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, notification } from "antd";
import { useState } from "react";
import UpdatePermissionForm from "./UpdatePermissionForm";
import { IPermission } from "../../../interfaces";

const AddPermission: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addPermissionForm] = Form.useForm<IPermission>();
  const [notificationApi, contextHolder] = notification.useNotification();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addPermissionForm.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="30%"
        title={<span className="text-lg">Thêm quyền hạn</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdatePermissionForm
          form={addPermissionForm}
          onCancel={handleCloseModal}
          notificationApi={notificationApi}
        />
      </Modal>
    </>
  );
};

export default AddPermission;
