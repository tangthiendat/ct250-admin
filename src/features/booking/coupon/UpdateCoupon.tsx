import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { ICoupons } from "../../../interfaces";
import UpdateCouponForm from "./UpdateCouponForm";

interface UpdateCouponProps {
  coupon: ICoupons;
}

const UpdateCoupon: React.FC<UpdateCouponProps> = ({ coupon }) => {
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
        width="40%"
        title={<span className="text-lg">Chỉnh sửa mã giảm giá</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateCouponForm couponToUpdate={coupon} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UpdateCoupon;
