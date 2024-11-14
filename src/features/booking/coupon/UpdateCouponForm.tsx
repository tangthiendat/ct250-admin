import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CouponType, ICoupons } from "../../../interfaces";
import { couponService } from "../../../services";
import { formatCurrency, parseCurrency } from "../../../utils";

interface UpdateCouponFormProps {
  couponToUpdate?: ICoupons;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateCouponArgs {
  couponId: number;
  updatedCoupon: ICoupons;
}

const couponTypeOptions = [
  { label: "VND", value: CouponType.AMOUNT },
  { label: "%", value: CouponType.PERCENTAGE },
];

const UpdateCouponForm: React.FC<UpdateCouponFormProps> = ({
  couponToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<ICoupons>();
  const [addonAfter, setAddonAfter] = useState<string>("VND");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (couponToUpdate) {
      form.setFieldsValue({ ...couponToUpdate });
      setAddonAfter(
        couponToUpdate.couponType === CouponType.PERCENTAGE ? "%" : "VND",
      );
    }
  }, [couponToUpdate, form]);

  const { mutate: createCoupon, isPending: isCreating } = useMutation({
    mutationFn: couponService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("coupons"),
      });
    },
  });

  const { mutate: updateCoupon, isPending: isUpdating } = useMutation({
    mutationFn: ({ couponId, updatedCoupon }: UpdateCouponArgs) =>
      couponService.update(couponId, updatedCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("coupons"),
      });
    },
  });

  const handleValidFromChange = (date: Dayjs) => {
    const currentValidTo = form.getFieldValue("validTo");

    if (dayjs(date).isAfter(dayjs(currentValidTo))) {
      form.setFieldsValue({
        validTo: date.tz().format("YYYY-MM-DD"),
      });
    }
  };

  const handleFinish = (values: ICoupons) => {
    const updatedValues = {
      ...values,
      couponType:
        addonAfter === "%" ? CouponType.PERCENTAGE : CouponType.AMOUNT,
    };

    if (couponToUpdate) {
      const updatedCoupon = {
        ...couponToUpdate,
        ...updatedValues,
      };
      updateCoupon(
        { couponId: couponToUpdate.couponId, updatedCoupon },
        {
          onSuccess: () => {
            toast.success("Cập nhật mã giảm giá thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật mã giảm giá thất bại");
          },
        },
      );
    } else {
      createCoupon(updatedValues, {
        onSuccess: () => {
          toast.success("Thêm mới mã giảm giá thành công");
          onCancel();
          form.resetFields();
        },
        onError: () => {
          toast.error("Thêm mới mã giảm giá thất bại");
        },
      });
    }
  };

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
            label="Mã giảm giá"
            name="couponCode"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã giảm giá",
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
            label="Giá trị mã giảm giá"
            name="discountValue"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá trị mã giảm giá",
              },
            ]}
          >
            <InputNumber
              readOnly={viewOnly}
              min={0}
              addonAfter={
                <Select
                  value={addonAfter}
                  onChange={(value) => {
                    setAddonAfter(
                      value === CouponType.PERCENTAGE ? "%" : "VND",
                    );
                    form.setFieldsValue({ couponType: value as CouponType });
                  }}
                  style={{ width: 80 }}
                >
                  {couponTypeOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              }
              formatter={(value) => formatCurrency(value)}
              parser={(value) => parseCurrency(value) as unknown as 0}
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Ngày bắt đầu"
            name="validFrom"
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
              onChange={handleValidFromChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Ngày kết thúc"
            name="validTo"
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
                current.isBefore(dayjs(form.getFieldValue("validFrom")))
              }
            />
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
              {couponToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateCouponForm;
