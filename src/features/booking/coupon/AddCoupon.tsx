import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import UpdateCouponForm from "./UpdateCouponForm";
const AddCoupon: React.FC = () => {
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
        width="40%"
        title={<span className="text-lg">Thêm mã giảm giá</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateCouponForm onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};
export default AddCoupon;
