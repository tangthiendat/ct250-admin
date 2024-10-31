import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IBaggages } from "../../../interfaces";
import UpdateBaggageForm from "./UpdateBaggageForm";

interface ViewBaggageProps {
  baggage: IBaggages;
}

const ViewBaggage: React.FC<ViewBaggageProps> = ({ baggage }) => {
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
        title={<span className="text-lg">Xem thông tin hành lý</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateBaggageForm
          baggageToUpdate={baggage}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewBaggage;
