import { useState } from "react";
import { Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { IFee } from "../../../interfaces";
import UpdateFeeForm from "./UpdateFeeForm";

interface UpdateFeeProps {
  fee: IFee;
}

const UpdateFee: React.FC<UpdateFeeProps> = ({ fee }) => {
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
        title={<span className="text-lg">Chỉnh sửa phí</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateFeeForm feeToUpdate={fee} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UpdateFee;
