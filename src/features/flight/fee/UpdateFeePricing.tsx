import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { IFee, IFeePricing } from "../../../interfaces";
import UpdateFeePricingForm from "./UpdateFeePricingForm";

interface UpdateFeePricingProps {
  fee: IFee;
  feePricing: IFeePricing;
}

const UpdateFeePricing: React.FC<UpdateFeePricingProps> = ({
  fee,
  feePricing,
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
        width="50%"
        title={<span className="text-lg">Thêm chi tiết phí</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateFeePricingForm
          fee={fee}
          feePricingToUpdate={feePricing}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateFeePricing;
