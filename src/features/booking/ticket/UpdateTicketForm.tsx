import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Radio, Space } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { ITicket } from "../../../interfaces";
import { TicketStatus } from "../../../interfaces/common/enums";
import { ticketService } from "../../../services/booking/ticket-service";

interface UpdateTicketFormProps {
  ticketToUpdate?: ITicket;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateTicketArgs {
  ticketId: number;
  updatedTicket: ITicket;
}

const statusOptions = Object.values(TicketStatus).map((status: string) => ({
  label: status,
  value: status,
}));

// const ticketTypeOptions = Object.values(TicketClassName).map(
//   (type: string) => ({
//     label: type,
//     value: type,
//   }),
// );

const UpdateTicketForm: React.FC<UpdateTicketFormProps> = ({
  ticketToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<ITicket>();
  const isUpdateSession: boolean = !!ticketToUpdate;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (ticketToUpdate) {
      form.setFieldsValue({
        ...ticketToUpdate,
      });
    }
  }, [ticketToUpdate, form]);

  const { mutate: updateTicket, isPending: isUpdating } = useMutation({
    mutationFn: ({ ticketId, updatedTicket }: UpdateTicketArgs) => {
      return ticketService.update(ticketId, updatedTicket);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("tickets");
        },
      });
    },
  });

  function handleFinish(values: ITicket) {
    if (ticketToUpdate) {
      const updatedTicket = {
        ...ticketToUpdate,
        ...values,
      };
      updateTicket(
        {
          ticketId: ticketToUpdate.ticketId,
          updatedTicket,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật giao dịch thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật giao dịch thất bại");
          },
        },
      );
    }
  }

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{ active: true }}
    >
      <div className="flex gap-8">
        <Form.Item className="flex-1" label="Mã vé" name="ticketNumber">
          <Input readOnly={viewOnly || isUpdateSession} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item className="flex-1" label="Mã đặt chỗ" name="bookingCode">
          <Input readOnly={viewOnly || isUpdateSession} min={0} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item className="flex-1" label="Trạng thái" name="status">
          <Radio.Group
            // disabled={!viewOnly || !isUpdateSession}
            options={statusOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>

      {!viewOnly && (
        <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
          <Space>
            <Button onClick={onCancel} loading={isUpdating}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              {ticketToUpdate ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateTicketForm;
