import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { UploadProps } from "antd/lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileType, IMeal } from "../../../interfaces";
import { mealService } from "../../../services/booking/meal-service";
import { getBase64 } from "../../../utils";

interface UpdateMealFormProps {
  mealToUpdate?: IMeal;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateMealArgs {
  mealId: number;
  updatedMeal: FormData;
}

interface UpdateMealFormValues extends IMeal {
  mealImg?: UploadFile[];
}

const UpdateMealForm: React.FC<UpdateMealFormProps> = ({
  mealToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<UpdateMealFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mealToUpdate) {
      form.setFieldsValue({
        ...mealToUpdate,
      });
      setPreviewImage(mealToUpdate.imgUrl ?? "");
      setFileList(
        mealToUpdate.imgUrl
          ? [
              {
                uid: "-1",
                name: mealToUpdate.mealName,
                status: "done",
                url: mealToUpdate.imgUrl,
              },
            ]
          : [],
      );
    }
  }, [mealToUpdate, form]);

  const { mutate: createMeal, isPending: isCreating } = useMutation({
    mutationFn: mealService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("meals");
        },
      });
    },
  });

  const { mutate: updateMeal, isPending: isUpdating } = useMutation({
    mutationFn: ({ mealId, updatedMeal }: UpdateMealArgs) => {
      return mealService.update(mealId, updatedMeal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("meals");
        },
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

  function handleFinish(values: UpdateMealFormValues) {
    if (mealToUpdate) {
      const updatedMeal = {
        ...mealToUpdate,
        ...values,
      };
      const formData = new FormData();

      Object.keys(updatedMeal).forEach((key: string) => {
        const value = updatedMeal[
          key as keyof UpdateMealFormValues
        ] as UpdateMealFormValues[keyof UpdateMealFormValues];

        formData.append(key, value as string);
      });
      if (fileList.length > 0) {
        formData.append("mealImg", fileList[0].originFileObj as File);
      }

      updateMeal(
        { mealId: mealToUpdate.mealId, updatedMeal: formData },
        {
          onSuccess: () => {
            toast.success("Cập nhật món ăn thành công");
            onCancel();
            form.resetFields();
            setFileList([]);
          },
          onError: () => {
            toast.error("Cập nhật món ăn thất bại");
          },
        },
      );
    } else {
      const formData = new FormData();
      const newMeal = {
        ...values,
      };
      Object.keys(newMeal)
        .filter((key: string) => !["createdAt"].includes(key))
        .forEach((key: string) => {
          const value = newMeal[
            key as keyof UpdateMealFormValues
          ] as UpdateMealFormValues[keyof UpdateMealFormValues];
          if (typeof value === "object") {
            if (key === "mealImg") {
              formData.append(
                "mealImg",
                (value as UploadFile[])[0].originFileObj as File,
              );
            }
          } else {
            formData.append(key, value as string);
          }
        });

      createMeal(formData, {
        onSuccess: () => {
          toast.success("Thêm mới món ăn thành công");
          onCancel();
          form.resetFields();
          setFileList([]);
        },
        onError: () => {
          toast.error("Thêm mới món ăn thất bại");
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
            label="Tên món ăn"
            name="mealName"
            rules={[{ required: true, message: "Vui lòng nhập tên món ăn" }]}
          >
            <Input readOnly={viewOnly} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Giá món ăn"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá món ăn" }]}
          >
            <Input readOnly={viewOnly} addonAfter="VND" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="mealImg"
            label="Ảnh món ăn"
            valuePropName="fileList"
            rules={[
              {
                validator: () => {
                  if (fileList && fileList.length < 1) {
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
              {mealToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateMealForm;
