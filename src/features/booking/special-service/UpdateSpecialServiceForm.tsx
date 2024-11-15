import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Upload,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Image, UploadFile } from "antd/lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileType, ISpecialServices } from "../../../interfaces";
import { specialService } from "../../../services/booking/special-service";
import { getBase64 } from "../../../utils";

interface UpdateSpecialServiceFormProps {
  specialServiceToUpdate?: ISpecialServices;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateSpecialServiceArgs {
  specialServiceId: number;
  updatedSpecialService: FormData;
}

const SpecialServiceStatusOptions = [
  { label: "Đang hoạt động", value: true },
  { label: "Ngừng hoạt động", value: false },
];

const YesNoOptions = [
  { label: "Có", value: true },
  { label: "Không", value: false },
];

interface UpdateSpecialServiceFormValues extends ISpecialServices {
  specialServiceImg?: UploadFile[];
}

const UpdateSpecialServiceForm: React.FC<UpdateSpecialServiceFormProps> = ({
  specialServiceToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<UpdateSpecialServiceFormValues>();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  useEffect(() => {
    if (specialServiceToUpdate) {
      form.setFieldsValue({ ...specialServiceToUpdate });
      setPreviewImage(specialServiceToUpdate.imgUrl ?? "");
      setFileList(
        specialServiceToUpdate.imgUrl
          ? [
              {
                uid: "-1",
                name: specialServiceToUpdate.imgUrl,
                status: "done",
                url: specialServiceToUpdate.imgUrl,
              },
            ]
          : [],
      );
    } else {
      form.setFieldsValue({ status: true }); // Set default status to "Đang hoạt động"
    }
  }, [specialServiceToUpdate, form]);

  const { mutate: createSpecialService, isPending: isCreating } = useMutation({
    mutationFn: specialService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("special-services"),
      });
    },
  });

  async function handlePreview(file: UploadFile) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || file.preview || "");
    setPreviewOpen(true);
  }

  const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const { mutate: updateSpecialService, isPending: isUpdating } = useMutation({
    mutationFn: ({
      specialServiceId,
      updatedSpecialService,
    }: UpdateSpecialServiceArgs) =>
      specialService.update(specialServiceId, updatedSpecialService),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("special-services"),
      });
    },
  });

  function handleFinish(values: UpdateSpecialServiceFormValues) {
    if (specialServiceToUpdate) {
      const updatedSpecialService = {
        ...specialServiceToUpdate,
        ...values,
      };
      const formData = new FormData();

      Object.keys(updatedSpecialService)
        .filter((key: string) => !["specialServiceImg"].includes(key))
        .forEach((key: string) => {
          const value = updatedSpecialService[
            key as keyof UpdateSpecialServiceFormValues
          ] as UpdateSpecialServiceFormValues[keyof UpdateSpecialServiceFormValues];
          formData.append(key, value as string);
        });
      if (fileList.length > 0) {
        formData.append("specialServiceImg", fileList[0].originFileObj as File);
      }

      updateSpecialService(
        {
          specialServiceId: specialServiceToUpdate.specialServiceId,
          updatedSpecialService: formData,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật dịch vụ đặc biệt thành công");
            onCancel();
            form.resetFields();
            setFileList([]);
          },
          onError: () => {
            toast.error("Cập nhật dịch vụ đặc biệt thất bại");
          },
        },
      );
    } else {
      const formData = new FormData();
      const newSpecialService = form.getFieldsValue();

      Object.keys(newSpecialService)
        .filter(
          (key: string) => !["createdAt", "specialServiceImg"].includes(key),
        )
        .forEach((key: string) => {
          const value = newSpecialService[
            key as keyof UpdateSpecialServiceFormValues
          ] as UpdateSpecialServiceFormValues[keyof UpdateSpecialServiceFormValues];
          formData.append(key, value as string);
        });

      if (fileList.length > 0) {
        formData.append("specialServiceImg", fileList[0].originFileObj as File);
      }

      createSpecialService(formData, {
        onSuccess: () => {
          toast.success("Thêm mới dịch vụ đặc biệt thành công");
          onCancel();
          form.resetFields();
          setFileList([]);
        },
        onError: () => {
          toast.error("Thêm mới dịch vụ đặc biệt thất bại");
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
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Tên dịch vụ đặc biệt"
            name="serviceName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dịch vụ đặc biệt",
              },
            ]}
          >
            <Input readOnly={viewOnly} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Mô tả chi tiết"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng mô tả chi tiết dịch vụ đặc biệt",
              },
            ]}
          >
            <TextArea readOnly={viewOnly} rows={2} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Điều kiện"
            name="conditions"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập điều kiện dịch vụ đặc biệt",
              },
            ]}
          >
            <TextArea readOnly={viewOnly} rows={2} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Số lượng hành khách tối đa"
            name="maxPassengers"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng hành khách tối đa",
              },
            ]}
          >
            <InputNumber readOnly={viewOnly} min={1} className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Thời gian đặt trước (ngày)"
            name="bookingLeadTime"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thời gian đặt trước",
              },
            ]}
          >
            <InputNumber readOnly={viewOnly} min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Người đi cùng"
            name="requiredSupport"
            rules={[
              {
                required: true,
                message: "Hãy chọn người đi cùng",
              },
            ]}
          >
            <Radio.Group
              disabled={viewOnly}
              options={YesNoOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Xác nhận sức khỏe"
            name="healthVerification"
            rules={[
              {
                required: true,
                message: "Hãy chọn xác nhận sức khỏe",
              },
            ]}
          >
            <Radio.Group
              disabled={viewOnly}
              options={YesNoOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Hướng dẫn đặc biệt"
            name="specialInstructions"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập hướng dẫn đặc biệt",
              },
            ]}
          >
            <TextArea readOnly={viewOnly} rows={2} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[
              {
                required: true,
                message: "Hãy chọn trạng thái",
              },
            ]}
          >
            <Radio.Group
              disabled={viewOnly}
              options={SpecialServiceStatusOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="specialServiceImg"
            label="Ảnh dịch vụ đặc biệt"
            valuePropName="fileList"
            rules={[
              {
                validator: () => {
                  if (fileList && fileList.length < 1 && !viewOnly) {
                    return Promise.reject(new Error("Vui lòng tải ảnh lên"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              maxCount={1}
              disabled={viewOnly}
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onPreview={handlePreview}
              onChange={handleUploadChange}
              showUploadList={{
                showRemoveIcon: !viewOnly,
              }}
            >
              {fileList.length < 1 && (
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      {!viewOnly && (
        <Form.Item className="mt-5 text-right" wrapperCol={{ span: 24 }}>
          <Space>
            <Button onClick={onCancel} loading={isCreating || isUpdating}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
            >
              {specialServiceToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateSpecialServiceForm;
