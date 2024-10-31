import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IMeal } from "../../../interfaces";
import { Modal, Tooltip } from "antd";
import UpdateMealForm from "./UpdateMealForm";

interface ViewMealProps {
  meal: IMeal;
}

const ViewMeal: React.FC<ViewMealProps> = ({ meal }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
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
        width="60%"
        title={<span className="text-lg">Xem thông tin món ăn</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateMealForm
          mealToUpdate={meal}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewMeal;
