import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { baggageService } from "../../../services";

interface DeleteBaggageProps {
  baggageId: number;
}

const DeleteBaggage: React.FC<DeleteBaggageProps> = ({ baggageId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteBaggage, isPending: isDeleting } = useMutation({
    mutationFn: baggageService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("baggages"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteBaggage(baggageId, {
      onSuccess: () => {
        toast.success("Xóa hành lý thành công");
      },
      onError: () => {
        toast.error("Xóa hành lý thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa hành lý này?"
      description="Bạn có chắc muốn xóa hành lý này không?"
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

export default DeleteBaggage;
