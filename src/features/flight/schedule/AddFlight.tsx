import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import UploadFlightForm from "./UploadFlightForm";

const AddFlight: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm chuyến bay
      </Button>
      <Modal
        open={isOpenModal}
        width="35%"
        title={<span className="text-lg">Thêm chuyến bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UploadFlightForm onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AddFlight;
