import { EditOutlined } from "@ant-design/icons";
import { Form, Modal, Tooltip } from "antd";
import { IRoute } from "../../../interfaces";
import { useState } from "react";
import UpdateRouteForm from "./UpdateRouteForm";

interface UpdateRouteProps {
  route: IRoute;
}

const UpdateRoute: React.FC<UpdateRouteProps> = ({ route }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateAirportForm] = Form.useForm<IRoute>();

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
        width="30%"
        title={<span className="text-lg">Chỉnh sửa sân bay</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateRouteForm
          form={updateAirportForm}
          routeToUpdate={route}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdateRoute;
