import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { passengerService } from "../../../services/booking/passenger-service";

interface DeletePassengerProps {
  passengerId: number;
}

const DeletePassenger: React.FC<DeletePassengerProps> = ({ passengerId }) => {
  const queryClient = useQueryClient();
  const { mutate: deletePassenger, isPending: isDeleting } = useMutation({
    mutationFn: passengerService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("pasengers"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deletePassenger(passengerId, {
      onSuccess: () => {
        toast.success("Xóa khách hàng thành công");
      },
      onError: () => {
        toast.error("Xóa khách hàng thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa món ăn này?"
      description="Bạn có chắc muốn xóa khách hàng này không?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true, loading: isDeleting }}
      onConfirm={handleConfirmDelete}
    >
      <Tooltip title="Xóa">
        <DeleteOutlined className="text-xl text-[#ff4d4f]" />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeletePassenger;
