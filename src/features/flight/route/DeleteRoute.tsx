import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { routeService } from "../../../services";
import toast from "react-hot-toast";

interface DeleteRouteProps {
  routeId: number;
}

const DeleteRoute: React.FC<DeleteRouteProps> = ({ routeId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteRoute, isPending: isDeleting } = useMutation({
    mutationFn: routeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("airports"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteRoute(routeId, {
      onSuccess: () => {
        toast.success("Xóa tuyến bay thành công");
      },
      onError: () => {
        toast.error("Xóa tuyến bay thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa tuyến bay"
      description="Bạn có chắc muốn xóa tuyến bay này không?"
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

export default DeleteRoute;
