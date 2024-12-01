import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { paymentMethodService } from "../../../services";

interface DeletePaymentMethodProps {
  paymentMethodId: number;
}

const DeletePaymentMethod: React.FC<DeletePaymentMethodProps> = ({
  paymentMethodId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: deletePaymentMethod, isPending: isDeleting } = useMutation({
    mutationFn: paymentMethodService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("payment-methods"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deletePaymentMethod(paymentMethodId, {
      onSuccess: () => {
        toast.success("Xóa phương thức thanh toán thành công");
      },
      onError: () => {
        toast.error("Xóa phương thức thanh toán thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa phương thức thanh toán này?"
      description="Bạn có chắc muốn xóa phương thức thanh toán này không?"
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

export default DeletePaymentMethod;
