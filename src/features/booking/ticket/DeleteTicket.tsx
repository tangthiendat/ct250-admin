import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { ticketService } from "../../../services/booking/ticket-service";

interface DeleteTicketProps {
  ticketId: number;
}

const DeleteTicket: React.FC<DeleteTicketProps> = ({ ticketId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTicket, isPending: isDeleting } = useMutation({
    mutationFn: ticketService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("tickets"),
      });
    },
  });

  function handleConfirmDelete(): void {
    deleteTicket(ticketId, {
      onSuccess: () => {
        toast.success("Xóa vé thành công");
      },
      onError: () => {
        toast.error("Xóa vé thất bại");
      },
    });
  }

  return (
    <Popconfirm
      title="Xóa vé này?"
      description="Bạn có chắc muốn xóa vé này không?"
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

export default DeleteTicket;
