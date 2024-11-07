import { Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IFee } from "../../../interfaces";
import { useNavigate } from "react-router";

interface ViewFeeProps {
  fee: IFee;
}

const ViewFee: React.FC<ViewFeeProps> = ({ fee }) => {
  const navigate = useNavigate();

  const handleViewFee = () => {
    navigate(`${fee.feeId}`);
  };

  return (
    <Tooltip title="Xem chi tiết">
      <EyeOutlined
        className="table-icon text-xl text-[#1677FF]"
        onClick={handleViewFee}
      />
    </Tooltip>
  );
};

export default ViewFee;
