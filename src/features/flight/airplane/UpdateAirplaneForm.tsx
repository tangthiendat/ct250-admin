import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Radio,
  Select,
  Space,
  type FormInstance,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { AirplaneStatus } from "../../../interfaces/common/enums";
import { IAirplane, IModel } from "../../../interfaces";
import { airplaneService, modelService } from "../../../services";

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
  const [newModelName, setNewModelName] = useState<string>("");
  const inputRef = useRef<InputRef>(null);
  const isUpdateSession: boolean = !!airplaneToUpdate;
  const queryClient = useQueryClient();

  const { data: modelData, isLoading: isModelLoading } = useQuery({
    queryKey: ["models"],
    queryFn: modelService.getAll,
  });

  const modelOptions = modelData?.payload?.map((model: IModel) => ({
    label: model.modelName,
    value: model.modelId,
  }));

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

  const { mutate: createModel, isPending: isCreatingModel } = useMutation({
    mutationFn: modelService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("models");
        },
      });
      //setIsModelModalVisible(false);
      toast.success("Thêm mới mô hình thành công");
    },
    onError: () => {
      toast.error("Thêm mới mô hình thất bại");
    },
  });

  function handleFinish(values: IAirplane) {
    if (airplaneToUpdate) {
      const updatedAirplane = {
        ...airplaneToUpdate,
        ...values,
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
      const newAirplane = {
        ...values,
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

  // function handleModelFinish(values: IModel) {
  //   console.log("TRIGGER create");
  //   createModel(values);
  // }

  const onNewModelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewModelName(event.target.value);
  };

  const addNewModel = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    createModel({ modelName: newModelName });
    setNewModelName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  if (isModelLoading) {
    return <Loading />;
  }

  return (
    <>
      <Form
        onFinish={handleFinish}
        form={form}
        layout="vertical"
        initialValues={{ active: true }}
      >
        <div className="flex gap-8">
          <Form.Item
            className="flex-1"
            label="Số hiệu đăng ký"
            name="registrationNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số hiệu đăng ký",
              },
            ]}
          >
            <Input readOnly={viewOnly || isUpdateSession} />
          </Form.Item>
        </div>
        <div className="flex gap-8">
          <Form.Item
            className="flex-1"
            label="Mô hình máy bay"
            name={["model", "modelId"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên mô hình máy bay",
              },
            ]}
          >
            <Select
              disabled={viewOnly || isUpdateSession}
              options={modelOptions || []}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Vui lòng nhập mô hình"
                      ref={inputRef}
                      value={newModelName}
                      onChange={onNewModelNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addNewModel}
                    >
                      Thêm mới mô hình
                    </Button>
                  </Space>
                </>
              )}
            />
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
            <Input readOnly={viewOnly || isUpdateSession} />
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
            <Input readOnly={viewOnly || isUpdateSession} addonAfter="Km" />
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
            <Input readOnly={viewOnly || isUpdateSession} addonAfter="Km/h" />
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
            <InputNumber
              readOnly={viewOnly || isUpdateSession}
              addonAfter="m"
              stringMode
            />
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
            <InputNumber
              readOnly={viewOnly || isUpdateSession}
              addonAfter="m"
              stringMode
            />
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
            <InputNumber
              readOnly={viewOnly || isUpdateSession}
              addonAfter="tấn"
              stringMode
            />
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
            <InputNumber readOnly={viewOnly || isUpdateSession} />
          </Form.Item>
        </div>
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
    </>
  );
};

export default UpdateAirplaneForm;
