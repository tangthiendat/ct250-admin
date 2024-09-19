import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { IRole } from "../../../interfaces";
import UpdateRoleForm from "./UpdateRoleForm";

const AddRole: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addRoleForm] = Form.useForm<IRole>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addRoleForm.resetFields();
  };
  return (
    <>
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
        <UpdateRoleForm form={addRoleForm} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AddRole;
