import { EyeOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { ICoupons } from "../../../interfaces";
import UpdateCouponForm from "./UpdateCouponForm";

interface ViewCouponProps {
  coupon: ICoupons;
}

const ViewCoupon: React.FC<ViewCouponProps> = ({ coupon }) => {
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
        title={<span className="text-lg">Xem thông tin mã giảm giá</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateCouponForm
          couponToUpdate={coupon}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewCoupon;
