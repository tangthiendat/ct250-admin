import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { mealService } from "../../../services/booking/meal-service";

interface DeleteMealProps {
  mealId: number;
}

const DeleteMeal: React.FC<DeleteMealProps> = ({ mealId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMeal, isPending: isDeleting } = useMutation({
    mutationFn: mealService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("meals"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteMeal(mealId, {
      onSuccess: () => {
        toast.success("Xóa món ăn thành công");
      },
      onError: () => {
        toast.error("Xóa món ăn thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa món ăn này?"
      description="Bạn có chắc muốn xóa món ăn này không?"
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

export default DeleteMeal;
