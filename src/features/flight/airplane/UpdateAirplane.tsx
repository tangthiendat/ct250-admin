import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IAirplane } from "../../../interfaces";
import UpdateAirplaneForm from "./UpdateAirplaneForm";

interface UpdateAirplaneProps {
  airplane: IAirplane;
}

const UpdateAirplane: React.FC<UpdateAirplaneProps> = ({ airplane }) => {
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
        title={<span className="text-lg">Chỉnh sửa máy bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateAirplaneForm
          airplaneToUpdate={airplane}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateAirplane;
