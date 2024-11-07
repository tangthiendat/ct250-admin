import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import {
  IFee,
  IFeePricing,
  PASSENGER_TYPE_TRANSLATION,
  PassengerType,
  ROUTE_TYPE_TRANSLATION,
  RouteType,
} from "../../../interfaces";
import { feeService } from "../../../services";
import { formatCurrency, parseCurrency } from "../../../utils";
import { useEffect } from "react";

interface UpdateFeePricingFormProps {
  feePricingToUpdate?: IFeePricing;
  fee: IFee;
  onCancel: () => void;
}

interface UpdateFeeArgs {
  feeId: number;
  updatedFee: IFee;
}

const UpdateFeePricingForm: React.FC<UpdateFeePricingFormProps> = ({
  feePricingToUpdate,
  fee,
  onCancel,
}) => {
  const [form] = Form.useForm<IFeePricing>();
  const isUpdateSession: boolean = !!feePricingToUpdate;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (feePricingToUpdate) {
      form.setFieldsValue(feePricingToUpdate);
    }
  }, [form, feePricingToUpdate]);

  const passengerTypeOptions = Object.keys(PASSENGER_TYPE_TRANSLATION).map(
    (key) => ({
      label: PASSENGER_TYPE_TRANSLATION[key as PassengerType],
      value: key,
    }),
  );
  const routeTypeOptions = Object.keys(ROUTE_TYPE_TRANSLATION).map((key) => ({
    label: ROUTE_TYPE_TRANSLATION[key as RouteType],
    value: key,
  }));
  const unitOptions = [
    { label: "%", value: true },
    { label: "VND", value: false },
  ];

  const handleValidFromChange = (date: Dayjs) => {
    const currentValidTo = form.getFieldValue("validTo");
    if (dayjs(date).isAfter(dayjs(currentValidTo))) {
      form.setFieldsValue({ validTo: date.tz().format("YYYY-MM-DD") });
    }
  };

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

  function handleFinish(values: IFeePricing) {
    if (isUpdateSession) {
      const updatedFee = {
        ...fee,
        feePricing: fee.feePricing.map((feePricing) => {
          if (feePricing.feePricingId === feePricingToUpdate!.feePricingId) {
            return { ...feePricing, ...values };
          }
          return feePricing;
        }),
      };
      console.log(updatedFee);
      updateFee(
        { feeId: fee.feeId, updatedFee },
        {
          onSuccess: () => {
            toast.success("Cập nhật chi tiết phí thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật chi tiết phí thất bại");
          },
        },
      );
    } else {
      const updatedFee = { ...fee, feePricing: [...fee.feePricing, values] };
      updateFee(
        { feeId: fee.feeId, updatedFee },
        {
          onSuccess: () => {
            toast.success("Thêm chi tiết phí thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Thêm chi tiết phí thất bại");
          },
        },
      );
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row>
        <Col span={11}>
          <Form.Item
            label="Loại hành khách"
            name="passengerType"
            initialValue={feePricingToUpdate?.passengerType}
            rules={[
              { required: true, message: "Vui lòng chọn loại hành khách" },
            ]}
          >
            <Select options={passengerTypeOptions} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            label="Loại tuyến bay"
            name="routeType"
            rules={[
              { required: true, message: "Vui lòng chọn loại tuyến bay" },
            ]}
          >
            <Select options={routeTypeOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            label="Giá trị"
            name="feeAmount"
            rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) => formatCurrency(value)}
              parser={(value) => parseCurrency(value) as unknown as 0}
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            label="Đơn vị"
            name="isPercentage"
            rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
          >
            <Select options={unitOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
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
              className="w-full"
              format="DD/MM/YYYY"
              placeholder="Ngày bắt đầu"
              onChange={(date) => handleValidFromChange(date)}
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
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
      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel} loading={isUpdating}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            {isUpdateSession ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateFeePricingForm;
