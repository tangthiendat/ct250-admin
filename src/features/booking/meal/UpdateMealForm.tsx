import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { UploadProps } from "antd/lib";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileType, IMeal, IMealPricing } from "../../../interfaces";
import { mealService } from "../../../services/booking/meal-service";
import { formatCurrency, getBase64, parseCurrency } from "../../../utils";

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
  const isUpdateSession: boolean = Boolean(mealToUpdate?.mealId) && !viewOnly;

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

  const handleValidFromChange = (date: Dayjs, formListItemIndex: number) => {
    const currentValidTo = form.getFieldValue([
      "mealPricing",
      formListItemIndex,
      "validTo",
    ]);

    // If validFrom is after validTo, set validTo to validFrom
    if (dayjs(date).isAfter(dayjs(currentValidTo))) {
      form.setFieldsValue({
        mealPricing: form
          .getFieldValue("mealPricing")
          .map((pricing: IMealPricing, index: number) => {
            if (index === formListItemIndex) {
              return {
                ...pricing,
                validTo: date.tz().format("YYYY-MM-DD"),
              };
            }
            return pricing;
          }),
      });
    }
  };

  function handleFinish(values: UpdateMealFormValues) {
    if (mealToUpdate) {
      const updatedMeal = {
        ...mealToUpdate,
        ...values,
      };
      const formData = new FormData();

      Object.keys(updatedMeal)
        .filter((key: string) => !["mealImg"].includes(key))
        .forEach((key: string) => {
          const value = updatedMeal[
            key as keyof UpdateMealFormValues
          ] as UpdateMealFormValues[keyof UpdateMealFormValues];
          if (key === "mealPricing" && value && Array.isArray(value)) {
            value.forEach((pricing, index) => {
              Object.keys(pricing).forEach((subKey: string) => {
                formData.append(
                  `mealPricing[${index}].${subKey}`,
                  `${pricing[subKey as keyof typeof pricing]}`,
                );
              });
            });
          } else {
            formData.append(key, value as string);
          }
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
      const newMeal = form.getFieldsValue();

      Object.keys(newMeal)
        .filter((key: string) => !["createdAt", "mealImg"].includes(key))
        .forEach((key: string) => {
          const value = newMeal[
            key as keyof UpdateMealFormValues
          ] as UpdateMealFormValues[keyof UpdateMealFormValues];
          if (typeof value === "object") {
            if (key === "mealPricing" && value && Array.isArray(value)) {
              value.forEach((pricing, index) => {
                Object.keys(pricing).forEach((subKey: string) => {
                  formData.append(
                    `mealPricing[${index}].${subKey}`,
                    `${pricing[subKey as keyof typeof pricing]}`,
                  );
                });
              });
            }
          } else {
            formData.append(key, value as string);
          }
        });

      if (fileList.length > 0) {
        formData.append("mealImg", fileList[0].originFileObj as File);
      }

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
            name="mealImg"
            label="Ảnh món ăn"
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

      <Row className="mt-3">
        <Col span={24}>
          <Collapse
            size="small"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Chi tiết giá món ăn",
                children: (
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Form.List
                      name="mealPricing"
                      rules={[
                        {
                          validator: (_, value: IMealPricing[]) => {
                            if (!value || value.length === 0) {
                              toast.error("Phải có ít nhất một giá món ăn");
                              return Promise.reject();
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      {(
                        pricingFields,
                        { add: addPricing, remove: removePricing },
                      ) => {
                        return (
                          <>
                            <div className="flex flex-col">
                              {pricingFields.length > 0 && (
                                <div className="mb-2 flex items-center justify-between font-semibold">
                                  <div className="basis-[25%]">Giá</div>
                                  <div className="basis-[25%]">
                                    Ngày bắt đầu
                                  </div>
                                  <div className="basis-[25%]">
                                    Ngày kết thúc
                                  </div>

                                  <div className="basis-[2%]"></div>
                                </div>
                              )}
                              {pricingFields.map((pricingField) => {
                                return (
                                  <div
                                    className="flex items-center justify-between"
                                    key={pricingField.key}
                                  >
                                    <Form.Item
                                      className="basis-[25%]"
                                      name={[pricingField.name, "price"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Vui lòng nhập giá món ăn",
                                        },
                                      ]}
                                    >
                                      <InputNumber
                                        className="w-full"
                                        readOnly={viewOnly}
                                        min={0}
                                        addonAfter="VND"
                                        formatter={(value) =>
                                          formatCurrency(value)
                                        }
                                        parser={(value) =>
                                          parseCurrency(value) as unknown as 0
                                        }
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      className="basis-[25%]"
                                      name={[pricingField.name, "validFrom"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Hãy chọn ngày bắt đầu",
                                        },
                                      ]}
                                      getValueProps={(value: string) => ({
                                        value: value && dayjs(value),
                                      })}
                                      normalize={(value: Dayjs) =>
                                        value && value.tz().format("YYYY-MM-DD")
                                      }
                                    >
                                      <DatePicker
                                        disabled={viewOnly}
                                        className="w-full"
                                        format="DD/MM/YYYY"
                                        placeholder="Ngày bắt đầu"
                                        onChange={(date) =>
                                          handleValidFromChange(
                                            date,
                                            pricingField.name,
                                          )
                                        }
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      className="basis-[25%]"
                                      name={[pricingField.name, "validTo"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Hãy chọn ngày kết thúc",
                                        },
                                      ]}
                                      getValueProps={(value: string) => ({
                                        value: value && dayjs(value),
                                      })}
                                      normalize={(value: Dayjs) =>
                                        value && value.tz().format("YYYY-MM-DD")
                                      }
                                    >
                                      <DatePicker
                                        disabled={viewOnly}
                                        className="w-full"
                                        format="DD/MM/YYYY"
                                        placeholder="Ngày kết thúc"
                                        disabledDate={(current) =>
                                          current.isBefore(
                                            dayjs(
                                              form.getFieldValue([
                                                "mealPricing",
                                                pricingField.name,
                                                "validFrom",
                                              ]),
                                            ),
                                          )
                                        }
                                      />
                                    </Form.Item>

                                    <Form.Item className="basis-[2%]">
                                      {!viewOnly &&
                                        (!isUpdateSession ||
                                          pricingField.name + 1 >
                                            (mealToUpdate?.mealPricing.length ||
                                              0)) && (
                                          <CloseOutlined
                                            onClick={(
                                              event: React.MouseEvent<
                                                HTMLSpanElement,
                                                MouseEvent
                                              >,
                                            ) => {
                                              event.stopPropagation();
                                              removePricing(pricingField.name);
                                            }}
                                          />
                                        )}
                                    </Form.Item>
                                  </div>
                                );
                              })}

                              {!viewOnly && (
                                <Button
                                  className="w-[150px]"
                                  onClick={() => addPricing()}
                                >
                                  + Thêm giá món ăn
                                </Button>
                              )}
                            </div>
                          </>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                ),
              },
            ]}
          ></Collapse>
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
              {mealToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateMealForm;
