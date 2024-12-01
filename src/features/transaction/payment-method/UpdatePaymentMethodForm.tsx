import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Space } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IPaymentMethod } from "../../../interfaces";
import { paymentMethodService } from "../../../services/transaction/payment-method-service";

interface UpdatePaymentMethodFormProps {
  paymentMethodToUpdate?: IPaymentMethod;
  onCancel: () => void;
}

interface UpdatePaymentMethodArgs {
  paymentMethodId: number;
  updatedPaymentMethod: IPaymentMethod;
}

const UpdatePaymentMethodForm: React.FC<UpdatePaymentMethodFormProps> = ({
  paymentMethodToUpdate,
  onCancel,
}) => {
  const [form] = Form.useForm<IPaymentMethod>();
  const isUpdateSession: boolean = !!paymentMethodToUpdate;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (paymentMethodToUpdate) {
      form.setFieldsValue(paymentMethodToUpdate);
    }
  }, [form, paymentMethodToUpdate]);

  const { mutate: createPaymentMethod, isPending: isCreating } = useMutation({
    mutationFn: paymentMethodService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("payment-methods");
        },
      });
    },
  });

  const { mutate: updatePaymentMethod, isPending: isUpdating } = useMutation({
    mutationFn: ({
      paymentMethodId,
      updatedPaymentMethod,
    }: UpdatePaymentMethodArgs) =>
      paymentMethodService.update(paymentMethodId, updatedPaymentMethod),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("fees");
        },
      });
    },
  });

  function handleFinish(values: IPaymentMethod) {
    if (isUpdateSession) {
      const updatedPaymentMethod = {
        ...paymentMethodToUpdate,
        ...values,
      };
      updatePaymentMethod(
        {
          paymentMethodId: paymentMethodToUpdate!.paymentMethodId,
          updatedPaymentMethod,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật phí thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật phí thất bại");
          },
        },
      );
    } else {
      createPaymentMethod(values, {
        onSuccess: () => {
          toast.success("Thêm phí thành công");
          onCancel();
          form.resetFields();
        },
        onError: () => {
          toast.error("Thêm phí thất bại");
        },
      });
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Tên phương thức thanh toán"
        name="paymentMethodName"
        rules={[
          {
            required: true,
            message: "Tên phương thức thanh toán không được để trống",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel} loading={isCreating || isUpdating}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {isUpdateSession ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdatePaymentMethodForm;
