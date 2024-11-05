import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IMeal } from "../../../interfaces";
import UpdateMealForm from "./UpdateMealForm";

interface UpdateMealProps {
  meal: IMeal;
}

const UpdateMeal: React.FC<UpdateMealProps> = ({ meal }) => {
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
        title={<span className="text-lg">Chỉnh sửa món ăn</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateMealForm mealToUpdate={meal} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UpdateMeal;
