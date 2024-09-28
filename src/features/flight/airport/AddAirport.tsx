import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { IAirport } from "../../../interfaces";

const AddAirport: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addPermissionForm] = Form.useForm<IAirport>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addPermissionForm.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="30%"
        title={<span className="text-lg">Thêm sân bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        {/* <UpdatePermissionForm
          form={addPermissionForm}
          onCancel={handleCloseModal}
        /> */}
      </Modal>
    </>
  );
};
export default AddAirport;
