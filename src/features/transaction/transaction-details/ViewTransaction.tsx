import { EyeOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { ITransaction } from "../../../interfaces";
import UpdateTransactionForm from "./UpdateTransactionForm";

interface ViewTransactionProps {
  transaction: ITransaction;
}

const ViewTransaction: React.FC<ViewTransactionProps> = ({ transaction }) => {
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
        width="40%"
        title={
          <span className="text-lg">Xem thông tin chi tiết giao dịch</span>
        }
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateTransactionForm
          transactionToUpdate={transaction}
          onCancel={handleCloseModal}
          viewOnly
        />
      </Modal>
    </>
  );
};

export default ViewTransaction;
