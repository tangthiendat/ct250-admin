import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { specialService } from "../../../services/booking/special-service";

interface DeleteSpecialServiceProps {
  specialServiceId: number;
}

const DeleteSpecialService: React.FC<DeleteSpecialServiceProps> = ({
  specialServiceId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteSpecialService, isPending: isDeleting } = useMutation({
    mutationFn: specialService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("special-services"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteSpecialService(specialServiceId, {
      onSuccess: () => {
        toast.success("Xóa dịch vụ thành công");
      },
      onError: () => {
        toast.error("Xóa dịch vụ thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa dịch vụ này?"
      description="Bạn có chắc muốn xóa dịch vụ này không?"
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

export default DeleteSpecialService;
