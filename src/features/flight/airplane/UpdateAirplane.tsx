import { EditOutlined } from "@ant-design/icons";
import { Form, Modal, Tooltip } from "antd";
import { useState } from "react";
import { IAirplane } from "../../../interfaces";
import UpdateAirplaneForm from "./UpdateAirplaneForm";

interface UpdateAirplaneProps {
  airplane: IAirplane;
}

const UpdateAirplane: React.FC<UpdateAirplaneProps> = ({ airplane }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateAirplaneForm] = Form.useForm<IAirplane>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    updateAirplaneForm.resetFields();
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
        title={<span className="text-lg">Chỉnh sửa máy bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateAirplaneForm
          form={updateAirplaneForm}
          airplaneToUpdate={airplane}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateAirplane;
