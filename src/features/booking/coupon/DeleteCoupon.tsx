import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { couponService } from "../../../services/booking/coupon-service";

interface DeleteCouponProps {
  couponId: number;
}

const DeleteCoupon: React.FC<DeleteCouponProps> = ({ couponId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCoupon, isPending: isDeleting } = useMutation({
    mutationFn: couponService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("coupons"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteCoupon(couponId, {
      onSuccess: () => {
        toast.success("Xóa mã giảm giá thành công");
      },
      onError: () => {
        toast.error("Xóa mã giảm giá thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa mã giảm giá này?"
      description="Bạn có chắc muốn xóa mã giảm giá này không?"
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

export default DeleteCoupon;
