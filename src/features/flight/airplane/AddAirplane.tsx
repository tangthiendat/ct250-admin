import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { IAirplane } from "../../../interfaces";
import UpdateAirplaneForm from "./UpdateAirplaneForm";

const AddAirplane: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addAirplaneForm] = Form.useForm<IAirplane>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addAirplaneForm.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Thêm máy bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateAirplaneForm
          form={addAirplaneForm}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};
export default AddAirplane;
