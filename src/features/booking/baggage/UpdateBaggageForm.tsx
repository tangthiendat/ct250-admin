import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, InputNumber, Radio, Space } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IBaggages } from "../../../interfaces";
import { RouteType } from "../../../interfaces/common/enums";
import { baggageService } from "../../../services/booking/baggage-service";

interface UpdateBaggageFormProps {
  baggageToUpdate?: IBaggages;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateBaggageArgs {
  baggageId: number;
  updatedBaggage: IBaggages;
}

const routeTypeOptions = Object.values(RouteType).map((status: string) => ({
  label: status,
  value: status,
}));

const UpdateBaggageForm: React.FC<UpdateBaggageFormProps> = ({
  baggageToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<IBaggages>();
  // const isUpdateSession: boolean = !!baggageToUpdate;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (baggageToUpdate) {
      form.setFieldsValue({
        ...baggageToUpdate,
      });
    }
  }, [baggageToUpdate, form]);

  const { mutate: createBaggage, isPending: isCreating } = useMutation({
    mutationFn: baggageService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("baggages");
        },
      });
    },
  });

  const { mutate: updateBaggage, isPending: isUpdating } = useMutation({
    mutationFn: ({ baggageId, updatedBaggage }: UpdateBaggageArgs) => {
      return baggageService.update(baggageId, updatedBaggage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("baggages");
        },
      });
    },
  });

  function handleFinish(values: IBaggages) {
    if (baggageToUpdate) {
      const updatedBaggage = {
        ...baggageToUpdate,
        ...values,
      };
      updateBaggage(
        { baggageId: baggageToUpdate.baggageId, updatedBaggage },
        {
          onSuccess: () => {
            toast.success("Cập nhật hành lý thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật hành lý thất bại");
          },
        },
      );
    } else {
      const newBaggage = {
        ...values,
      };
      createBaggage(newBaggage, {
        onSuccess: () => {
          toast.success("Thêm mới hành lý thành công");
          onCancel();
          form.resetFields();
        },
        onError: () => {
          toast.error("Thêm mới hành lý thất bại");
        },
      });
    }
  }

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{ active: true }}
    >
      <Form.Item
        label="Cân nặng hành lý"
        name="baggageWeight"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số ký hành lý",
          },
        ]}
      >
        <InputNumber
          //readOnly={viewOnly || isUpdateSession}
          min={0}
          addonAfter="Kg"
          className="w-full"
        />
      </Form.Item>

      <Form.Item
        label="Giá hành lý"
        name="price"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập giá hành lý",
          },
        ]}
      >
        <InputNumber
          //readOnly={viewOnly || isUpdateSession}
          min={0}
          addonAfter="VNĐ"
          className="w-full"
        />
      </Form.Item>

      <Form.Item
        label="Loại chuyến bay"
        name="routeType"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn loại chuyến bay",
          },
        ]}
      >
        <Radio.Group
          disabled={viewOnly}
          options={routeTypeOptions}
          optionType="button"
          buttonStyle="solid"
          className="w-full"
        />
      </Form.Item>

      {!viewOnly && (
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
              {baggageToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateBaggageForm;
