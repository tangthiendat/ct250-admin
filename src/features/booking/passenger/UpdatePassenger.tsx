import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IPassenger } from "../../../interfaces";
import UpdateFormWrapper from "./UpdateFormWrapper";

interface UpdatePassengerProps {
  passenger: IPassenger;
}

const UpdatePassenger: React.FC<UpdatePassengerProps> = ({ passenger }) => {
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
        title={<span className="text-lg">Chỉnh sửa thông tin khách hàng</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateFormWrapper
          passengerToUpdate={passenger}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdatePassenger;
