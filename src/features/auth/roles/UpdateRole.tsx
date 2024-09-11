import { useState } from "react";
import { type IRole } from "../../../interfaces";
import { Form, Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdateRoleForm from "./UpdateRoleForm";

interface UpdateRoleProps {
  role: IRole;
}

const UpdateRole: React.FC<UpdateRoleProps> = ({ role }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateRoleForm] = Form.useForm<IRole>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    updateRoleForm.resetFields();
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
        title={<span className="text-lg">Chỉnh sửa vai trò</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateRoleForm
          form={updateRoleForm}
          roleToUpdate={role}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateRole;
