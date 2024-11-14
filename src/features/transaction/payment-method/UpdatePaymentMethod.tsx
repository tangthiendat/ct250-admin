import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IPaymentMethod } from "../../../interfaces";
import UpdatePaymentMethodForm from "./UpdatePaymentMethodForm";

interface UpdatePaymentMethodProps {
  paymentMethod: IPaymentMethod;
}

const UpdatePaymentMethod: React.FC<UpdatePaymentMethodProps> = ({ paymentMethod }) => {
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
        width="30%"
        title={
          <span className="text-lg">Chỉnh sửa phương thức thanh toán</span>
        }
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdatePaymentMethodForm paymentMethodToUpdate={paymentMethod} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UpdatePaymentMethod;
