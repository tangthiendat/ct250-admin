import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IRoute } from "../../../interfaces";
import { Button, Form, Modal } from "antd";
import UpdateRouteForm from "./UpdateRouteForm";

const AddRoute: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addRouteForm] = Form.useForm<IRoute>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    addRouteForm.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm mới
      </Button>
      <Modal
        open={isOpenModal}
        width="30%"
        title={<span className="text-lg">Thêm tuyến bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateRouteForm form={addRouteForm} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AddRoute;
