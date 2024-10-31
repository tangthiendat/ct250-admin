import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import UpdateBaggageForm from "./UpdateBaggageForm";
const AddBaggage: React.FC = () => {
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
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="60%"
        title={<span className="text-lg">Thêm hành lý</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateBaggageForm onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};
export default AddBaggage;
