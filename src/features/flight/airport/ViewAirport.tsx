import { Form, Modal, Tooltip } from "antd";
import { IAirport } from "../../../interfaces";
import { EyeOutlined } from "@ant-design/icons";
import UpdateAirportForm from "./UpdateAirportForm";
import { useState } from "react";

interface ViewAirportProps {
  airport: IAirport;
}

const ViewAirport: React.FC<ViewAirportProps> = ({ airport }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [viewAirportForm] = Form.useForm<IAirport>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    viewAirportForm.resetFields();
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
        width="40%"
        title={<span className="text-lg">Xem thông tin sân bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateAirportForm
          form={viewAirportForm}
          airportToUpdate={airport}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewAirport;
