import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { airportService } from "../../../services";

interface DeleteAirportProps {
  airportId: number;
}

const DeleteAirport: React.FC<DeleteAirportProps> = ({ airportId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteAirport, isPending: isDeleting } = useMutation({
    mutationFn: airportService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("airports"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteAirport(airportId, {
      onSuccess: () => {
        toast.success("Xóa sân bay thành công");
      },
      onError: () => {
        toast.error("Xóa sân bay thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa sân bay này?"
      description="Bạn có chắc muốn xóa sân bay này không?"
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

export default DeleteAirport;
