import { EyeOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IPassenger } from "../../../interfaces";
import UpdateFormWrapper from "./UpdateFormWrapper";

interface ViewPassengerProps {
  passenger: IPassenger;
}

const ViewPassenger: React.FC<ViewPassengerProps> = ({ passenger }) => {
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
        width="50%"
        title={<span className="text-lg">Xem thông tin khách hàng</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateFormWrapper
          passengerToUpdate={passenger}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewPassenger;
