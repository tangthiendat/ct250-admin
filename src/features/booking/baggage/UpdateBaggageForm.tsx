import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Row,
  Space,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IBaggagePricing, IBaggages } from "../../../interfaces";
import { RouteType } from "../../../interfaces/common/enums";
import { baggageService } from "../../../services/booking/baggage-service";
import { formatCurrency, parseCurrency } from "../../../utils";

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
  const isUpdateSession: boolean =
    Boolean(baggageToUpdate?.baggageId) && !viewOnly;
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

  const handleValidFromChange = (date: Dayjs, formListItemIndex: number) => {
    const currentValidTo = form.getFieldValue([
      "baggagePricing",
      formListItemIndex,
      "validTo",
    ]);

    // If validFrom is after validTo, set validTo to validFrom
    if (dayjs(date).isAfter(dayjs(currentValidTo))) {
      form.setFieldsValue({
        baggagePricing: form
          .getFieldValue("baggagePricing")
          .map((pricing: IBaggagePricing, index: number) => {
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
      const newBaggage = form.getFieldsValue();

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
      <Row>
        <Col span={11}>
          <Form.Item
            label="Cân nặng hành lý"
            name="baggageWeight"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập cân nặng hành lý",
              },
            ]}
          >
            <InputNumber
              readOnly={viewOnly}
              min={0}
              addonAfter="Kg"
              className="w-[70%]"
            />
          </Form.Item>
        </Col>
        <Col offset={2} span={11}>
          <Form.Item
            label="Loại chuyến bay"
            name="routeType"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại chuyến bay",
              },
            ]}
            tooltip={
              <div>
                <p>Loại chuyến bay</p>
                <p>- DOMESTIC: các chuyến bay nội địa</p>
                <p>- INTERNATIONAL: các chuyến bay quốc tế</p>
              </div>
            }
          >
            <Radio.Group
              disabled={viewOnly}
              options={routeTypeOptions}
              optionType="button"
              buttonStyle="solid"
              className="w-full"
            />
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
                label: "Chi tiết giá hành lý",
                children: (
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Form.List
                      name="baggagePricing"
                      rules={[
                        {
                          validator: (_, value: IBaggagePricing[]) => {
                            if (!value || value.length === 0) {
                              toast.error("Phải có ít nhất một giá hành lý");
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
                                          message: "Vui lòng nhập giá hành lý",
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
                                                "baggagePricing",
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
                                            (baggageToUpdate?.baggagePricing
                                              .length || 0)) && (
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
                                  + Thêm giá hành lý
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
              {baggageToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateBaggageForm;
