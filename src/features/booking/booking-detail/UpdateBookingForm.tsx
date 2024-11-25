import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Radio, Space } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IBooking } from "../../../interfaces";
import { BookingStatus } from "../../../interfaces/common/enums";
import { bookingService } from "../../../services/booking/booking-service";

interface UpdateBookingFormProps {
  bookingToUpdate?: IBooking;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateBookingArgs {
  bookingId: number;
  updatedBooking: IBooking;
}

const statusOptions = Object.values(BookingStatus).map((status: string) => ({
  label: status,
  value: status,
}));

const UpdateBookingForm: React.FC<UpdateBookingFormProps> = ({
  bookingToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<IBooking>();
  //   const isUpdateSession: boolean = !!bookingToUpdate;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (bookingToUpdate) {
      form.setFieldsValue({
        ...bookingToUpdate,
      });
    }
  }, [bookingToUpdate, form]);

  const { mutate: updateBooking, isPending: isUpdating } = useMutation({
    mutationFn: ({ bookingId, updatedBooking }: UpdateBookingArgs) => {
      return bookingService.update(bookingId, updatedBooking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("bookings");
        },
      });
    },
  });

  function handleFinish(values: IBooking) {
    if (bookingToUpdate) {
      const updatedBooking = {
        ...bookingToUpdate,
        ...values,
      };
      updateBooking(
        {
          bookingId: bookingToUpdate.bookingId,
          updatedBooking,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật trạng thái đặt chỗ thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật trạng thái đặt chỗ thất bại");
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
        <Form.Item className="flex-1" label="Trạng thái" name="bookingStatus">
          <Radio.Group
            // disabled={viewOnly || isUpdateSession}
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
              {bookingToUpdate ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateBookingForm;
