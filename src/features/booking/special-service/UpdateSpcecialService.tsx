import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { ISpecialServices } from "../../../interfaces";
import UpdateSpecialServiceForm from "./UpdateSpecialServiceForm";

interface UpdateSpecialServiceProps {
  specialService: ISpecialServices;
}

const UpdateSpecialService: React.FC<UpdateSpecialServiceProps> = ({
  specialService,
}) => {
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
        width="60%"
        title={<span className="text-lg">Chỉnh sửa dịch vụ đặc biệt</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateSpecialServiceForm
          specialServiceToUpdate={specialService}
          onCancel={handleCloseModal}
          // viewOnly
        />
      </Modal>
    </>
  );
};

export default UpdateSpecialService;
