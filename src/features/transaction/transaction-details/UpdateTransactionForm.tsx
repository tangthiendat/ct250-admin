import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IPaymentMethod, ITransaction } from "../../../interfaces";
import {
  TransactionStatus,
  TransactionType,
} from "../../../interfaces/common/enums";
import { paymentMethodService, transactionService } from "../../../services";
import { parseCurrency } from "../../../utils";

interface UpdateTransactionFormProps {
  transactionToUpdate?: ITransaction;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateTransactionArgs {
  transactionId: number;
  updatedTransaction: ITransaction;
}

const statusOptions = Object.values(TransactionStatus).map(
  (status: string) => ({
    label: status,
    value: status,
  }),
);

const transactionTypeOptions = Object.values(TransactionType).map(
  (type: string) => ({
    label: type,
    value: type,
  }),
);

const UpdateTransactionForm: React.FC<UpdateTransactionFormProps> = ({
  transactionToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<ITransaction>();
  const isUpdateSession: boolean = !!transactionToUpdate;
  const queryClient = useQueryClient();

  const { data: paymentMethodData } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: paymentMethodService.getAllPaymentMethods,
  });

  const paymentMethodOptions = paymentMethodData?.payload?.map(
    (paymentMethod: IPaymentMethod) => ({
      label: paymentMethod.paymentMethodName,
      value: paymentMethod.paymentMethodId,
    }),
  );

  useEffect(() => {
    if (transactionToUpdate) {
      form.setFieldsValue({
        ...transactionToUpdate,
      });
    }
  }, [transactionToUpdate, form]);

  const { mutate: updateTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({
      transactionId,
      updatedTransaction,
    }: UpdateTransactionArgs) => {
      return transactionService.update(transactionId, updatedTransaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("transactions");
        },
      });
    },
  });

  function handleFinish(values: ITransaction) {
    if (transactionToUpdate) {
      const updatedTransaction = {
        ...transactionToUpdate,
        ...values,
      };
      updateTransaction(
        {
          transactionId: transactionToUpdate.transactionId,
          updatedTransaction,
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
        <Form.Item className="flex-1" label="Mã giao dịch" name="txnRef">
          <Input readOnly={viewOnly || isUpdateSession} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Loại giao dịch"
          name="transactionType"
        >
          <Radio.Group
            disabled={viewOnly || !isUpdateSession}
            options={transactionTypeOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Phương thức thanh toán"
          name={["paymentMethod", "paymentMethodId"]}
        >
          <Select
            disabled={viewOnly || isUpdateSession}
            options={paymentMethodOptions || []}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
              </>
            )}
          />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item className="flex-1" label="Mã đặt vé" name="bookingCode">
          <Input readOnly={viewOnly || isUpdateSession} min={0} />
        </Form.Item>
        <Form.Item className="flex-1" label="Thành tiền" name="amount">
          <InputNumber
            readOnly={viewOnly || isUpdateSession}
            min={0}
            addonAfter="VND"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => parseCurrency(value) as unknown as 0}
          />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item className="flex-1" label="Trạng thái" name="status">
          <Radio.Group
            disabled={viewOnly || isUpdateSession}
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
              {transactionToUpdate ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateTransactionForm;
