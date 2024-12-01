import { EyeOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { ISpecialServices } from "../../../interfaces";
import UpdateSpecialServiceForm from "./UpdateSpecialServiceForm";

interface ViewSpecialServiceProps {
  specialService: ISpecialServices;
}

const ViewSpecialService: React.FC<ViewSpecialServiceProps> = ({
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
      <Tooltip title="Xem chi tiết">
        <EyeOutlined
          className="table-icon text-xl text-[#1677FF]"
          onClick={handleOpenModal}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        width="60%"
        title={<span className="text-lg">Xem thông tin dịch vụ đặc biệt</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateSpecialServiceForm
          specialServiceToUpdate={specialService}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewSpecialService;
