import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { airplaneService } from "../../../services/airplane-service";

interface DeleteAirplaneProps {
  airplaneId: number;
}

const DeleteAirplane: React.FC<DeleteAirplaneProps> = ({ airplaneId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteAirplane, isPending: isDeleting } = useMutation({
    mutationFn: airplaneService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("airplanes"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteAirplane(airplaneId, {
      onSuccess: () => {
        toast.success("Xóa máy bay thành công");
      },
      onError: () => {
        toast.error("Xóa máy bay thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa sân bay này?"
      description="Bạn có chắc muốn xóa máy bay này không?"
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

export default DeleteAirplane;
