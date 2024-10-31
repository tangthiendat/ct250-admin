import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IBaggages } from "../../../interfaces";
import UpdateBaggageForm from "./UpdateBaggageForm";

interface UpdateBaggageProps {
  baggage: IBaggages;
}

const UpdateBaggage: React.FC<UpdateBaggageProps> = ({ baggage }) => {
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
        title={<span className="text-lg">Chỉnh sửa hành lý</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateBaggageForm
          baggageToUpdate={baggage}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateBaggage;
