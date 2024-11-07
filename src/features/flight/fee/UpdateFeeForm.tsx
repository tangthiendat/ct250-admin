import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect } from "react";
import Loading from "../../../common/components/Loading";
import { IFee } from "../../../interfaces";
import { feeGroupService, feeService } from "../../../services";
import toast from "react-hot-toast";

interface UpdateFeeFormProps {
  feeToUpdate?: IFee;
  onCancel: () => void;
}

interface UpdateFeeArgs {
  feeId: number;
  updatedFee: IFee;
}

const UpdateFeeForm: React.FC<UpdateFeeFormProps> = ({
  feeToUpdate,
  onCancel,
}) => {
  const [form] = Form.useForm<IFee>();
  const isUpdateSession: boolean = !!feeToUpdate;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (feeToUpdate) {
      form.setFieldsValue(feeToUpdate);
    }
  }, [form, feeToUpdate]);

  const { data: feeGroupsData, isLoading: isFeeGroupsLoading } = useQuery({
    queryKey: ["feeGroups"],
    queryFn: feeGroupService.getAll,
  });

  const feeGroupOptions = feeGroupsData?.payload?.map((feeGroup) => ({
    label: feeGroup.feeGroupName,
    value: feeGroup.feeGroupId,
  }));

  const { mutate: createFee, isPending: isCreating } = useMutation({
    mutationFn: feeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("fees");
        },
      });
    },
  });

  const { mutate: updateFee, isPending: isUpdating } = useMutation({
    mutationFn: ({ feeId, updatedFee }: UpdateFeeArgs) =>
      feeService.update(feeId, updatedFee),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("fees");
        },
      });
    },
  });

  function handleFinish(values: IFee) {
    if (isUpdateSession) {
      const newFeeGroup = feeGroupsData!.payload!.find(
        (feeGroup) => feeGroup.feeGroupId === values.feeGroup.feeGroupId,
      );
      const updatedFee = {
        ...feeToUpdate,
        ...values,
        feeGroup: newFeeGroup!,
      };
      updateFee(
        { feeId: feeToUpdate!.feeId, updatedFee },
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
      createFee(values, {
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

  if (isFeeGroupsLoading) {
    <Loading />;
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Tên phí"
        name="feeName"
        rules={[
          {
            required: true,
            message: "Tên phí không được để trống",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nhóm phí"
        name={["feeGroup", "feeGroupId"]}
        rules={[{ required: true, message: "Vui lòng chọn nhóm phí" }]}
      >
        <Select allowClear options={feeGroupOptions} />
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

export default UpdateFeeForm;
