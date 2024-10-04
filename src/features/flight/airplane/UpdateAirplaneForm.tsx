import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  type FormInstance,
} from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { AirplaneStatus } from "../../../common/enums";
import { IAirplane } from "../../../interfaces";
import { airplaneService } from "../../../services";

interface UpdateAirplaneFormProps {
  form: FormInstance<IAirplane>;
  airplaneToUpdate?: IAirplane;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateAirplaneArgs {
  airplaneId: number;
  updatedAirplane: IAirplane;
}

const statusOptions = Object.values(AirplaneStatus).map((status: string) => ({
  label: status,
  value: status,
}));

const UpdateAirplaneForm: React.FC<UpdateAirplaneFormProps> = ({
  form,
  airplaneToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["airplanes"],
    queryFn: airplaneService.getAllAirplanes,
  });

  useEffect(() => {
    if (airplaneToUpdate) {
      form.setFieldsValue({
        ...airplaneToUpdate,
      });
    }
  }, [airplaneToUpdate, form]);

  const { mutate: createAirplane, isPending: isCreating } = useMutation({
    mutationFn: airplaneService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("airplanes");
        },
      });
    },
  });

  const { mutate: updateAirplane, isPending: isUpdating } = useMutation({
    mutationFn: ({ airplaneId, updatedAirplane }: UpdateAirplaneArgs) => {
      return airplaneService.update(airplaneId, updatedAirplane);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("airplanes");
        },
      });
    },
  });

  function handleFinish(values: IAirplane) {
    if (airplaneToUpdate) {
      const updatedAirplane = {
        ...airplaneToUpdate,
        ...values,
        // Name: values.firstName.toUpperCase(),
      };
      updateAirplane(
        { airplaneId: airplaneToUpdate.airplaneId, updatedAirplane },
        {
          onSuccess: () => {
            toast.success("Cập nhật máy bay thành công");
            onCancel();
          },
          onError: () => {
            toast.error("Cập nhật máy bay thất bại");
          },
        },
      );
    } else {
      if (data?.payload) {
        const newAirplane = {
          ...values,

          // airplanes: form.getFieldValue("airplaneId"),
        };
        createAirplane(newAirplane, {
          onSuccess: () => {
            toast.success("Thêm mới máy bay thành công");
            onCancel();
          },
          onError: () => {
            toast.error("Thêm mới máy thất bại");
          },
        });
      }
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{ active: true }}
    >
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Mô hình máy bay"
          name="modelName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên mô hình máy bay",
            },
          ]}
        >
          <Input readOnly={viewOnly} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Nhà sản xuất"
          name="manufacturer"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhà sản xuất",
            },
          ]}
        >
          <Input readOnly={viewOnly} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Khoảng cách tối đa"
          name="maxDistance"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập khoảng cách tối đa",
            },
          ]}
        >
          <InputNumber readOnly={viewOnly} addonAfter="Km" />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Tốc độ bay"
          name="velocity"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tốc độ bay",
            },
          ]}
        >
          <InputNumber readOnly={viewOnly} addonAfter="Km/h" />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Chiều dài tổng thể"
          name="overallLength"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chiều dài tổng thể",
            },
          ]}
        >
          <InputNumber readOnly={viewOnly} addonAfter="m" stringMode />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Sải cánh"
          name="wingspan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập sải cánh",
            },
          ]}
        >
          <InputNumber readOnly={viewOnly} addonAfter="m" stringMode />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Trọng lượng"
          name="height"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập trọng lượng máy bay",
            },
          ]}
        >
          <InputNumber readOnly={viewOnly} addonAfter="tấn" stringMode />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Tổng số ghế"
          name="numberOfSeats"
          rules={[
            {
              required: true,
              message: "Vui lòng tổng số ghế ngồi",
            },
          ]}
        >
          <InputNumber readOnly={viewOnly} />
        </Form.Item>
      </div>
      {/* <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Tình trạng sử dụng"
          name="inUse"
          valuePropName="checked"
        >
          <Switch
            disabled={viewOnly}
            checkedChildren="IN USE"
            unCheckedChildren="NOT IN USE"
          />
        </Form.Item>
      </div> */}
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Trạng thái"
          name="status"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trạng thái",
            },
          ]}
        >
          <Radio.Group
            disabled={viewOnly}
            //className="space-x-4"
            options={statusOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>

      {!viewOnly && (
        <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
            >
              {airplaneToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateAirplaneForm;
