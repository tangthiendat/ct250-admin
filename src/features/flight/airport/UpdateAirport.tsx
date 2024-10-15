import { EditOutlined } from "@ant-design/icons";
import { Form, Modal, Tooltip } from "antd";
import { useState } from "react";
import { IAirport } from "../../../interfaces";
import UpdateAirportForm from "./UpdateAirportForm";

interface UpdateAirportProps {
  airport: IAirport;
}

const UpdateAirport: React.FC<UpdateAirportProps> = ({ airport }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateAirportForm] = Form.useForm<IAirport>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    updateAirportForm.resetFields();
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
        title={<span className="text-lg">Chỉnh sửa sân bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateAirportForm
          form={updateAirportForm}
          airportToUpdate={airport}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateAirport;
