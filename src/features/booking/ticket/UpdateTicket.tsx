import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { ITicket } from "../../../interfaces";
import UpdateTicketForm from "./UpdateTicketForm";

interface UpdateTicketProps {
  ticket: ITicket;
}

const UpdateTicket: React.FC<UpdateTicketProps> = ({ ticket }) => {
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
        width="60%"
        title={<span className="text-lg">Chỉnh sửa vé điện tử</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateTicketForm ticketToUpdate={ticket} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UpdateTicket;
