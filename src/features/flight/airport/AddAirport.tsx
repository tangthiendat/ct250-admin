import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { IAirport } from "../../../interfaces";
import UpdateAirportForm from "./UpdateAirportForm";

const AddAirport: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addAirportForm] = Form.useForm<IAirport>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addAirportForm.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="40%"
        title={<span className="text-lg">Thêm sân bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateAirportForm form={addAirportForm} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};
export default AddAirport;
