import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IPermission } from "../../../interfaces";
import UpdatePermissionForm from "./UpdatePermissionForm";

interface UpdatePermissionProps {
  permission: IPermission;
}

const UpdatePermission: React.FC<UpdatePermissionProps> = ({ permission }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
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
        title={<span className="text-lg">Chỉnh sửa quyền hạn</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdatePermissionForm
          permissionToUpdate={permission}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdatePermission;
