import { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IFee } from "../../../interfaces";
import UpdateFeePricingForm from "./UpdateFeePricingForm";

interface AddFeePricingProps {
  fee: IFee;
}

const AddFeePricing: React.FC<AddFeePricingProps> = ({ fee }) => {
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
        width="50%"
        title={<span className="text-lg">Thêm chi tiết phí</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateFeePricingForm fee={fee} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AddFeePricing;
