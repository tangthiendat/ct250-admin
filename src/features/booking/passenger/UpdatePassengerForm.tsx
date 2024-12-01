import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Radio, Select, Space } from "antd";
import { DatePickerProps } from "antd/lib";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { ICountry, IPassenger } from "../../../interfaces";
import { Gender, PassengerType } from "../../../interfaces/common/enums";
import { countryService } from "../../../services";
import { passengerService } from "../../../services/booking/passenger-service";

interface UpdatePassengerFormProps {
  passengerToUpdate?: IPassenger;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdatePassengerArgs {
  passengerId: number;
  updatedPassenger: IPassenger;
}

const passengerTypeOptions = Object.values(PassengerType).map(
  (status: string) => ({
    label: status,
    value: status,
  }),
);

const genderOptions = Object.values(Gender).map((type: string) => ({
  label: type,
  value: type,
}));

const UpdatePassengerForm: React.FC<UpdatePassengerFormProps> = ({
  passengerToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<IPassenger>();
  const queryClient = useQueryClient();

  const { data: countryData } = useQuery({
    queryKey: ["countries"],
    queryFn: countryService.getAll,
  });

  const countryOptions = countryData?.payload?.map((country: ICountry) => ({
    label: country.countryName,
    value: country.countryId,
  }));

  useEffect(() => {
    if (passengerToUpdate) {
      form.setFieldsValue({
        ...passengerToUpdate,
      });
    }
  }, [passengerToUpdate, form]);

  const { mutate: updatePassenger, isPending: isUpdating } = useMutation({
    mutationFn: ({ passengerId, updatedPassenger }: UpdatePassengerArgs) => {
      return passengerService.update(passengerId, updatedPassenger);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("passengers");
        },
      });
    },
  });

  function handleFinish(values: IPassenger) {
    if (passengerToUpdate) {
      const updatedPassenger = {
        ...passengerToUpdate,
        ...values,
      };
      updatePassenger(
        {
          passengerId: passengerToUpdate.passengerId,
          updatedPassenger,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật thông tin khách hàng thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật thông tin khách hàng thất bại");
          },
        },
      );
    }
  }

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    return current && dayjs(current).isAfter(dayjs().endOf("day"));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      initialValues={{ active: true }}
    >
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Họ"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ",
            },
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: "Họ không chứa ký tự đặc biệt",
            },
          ]}
        >
          <Input
            readOnly={viewOnly}
            placeholder="Họ, ví dụ PHAM"
            style={{ textTransform: "uppercase" }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Tên đệm & tên"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đệm & tên",
            },
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: "Tên đệm & tên không chứa ký tự đặc biệt",
            },
          ]}
        >
          <Input
            readOnly={viewOnly}
            placeholder="Tên đệm & tên, ví dụ VAN A"
            style={{ textTransform: "uppercase" }}
          />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Ngày sinh không hợp lệ",
            },
          ]}
          getValueProps={(value: string) => ({
            value: value && dayjs(value),
          })}
          normalize={(value: Dayjs) => value && value.tz().format("YYYY-MM-DD")}
        >
          <DatePicker
            disabled={viewOnly}
            className="w-full"
            format="DD/MM/YYYY"
            disabledDate={disabledDate}
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính",
            },
          ]}
        >
          <Radio.Group
            disabled={viewOnly}
            className="space-x-4"
            options={genderOptions}
          />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input readOnly={viewOnly} placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Quốc gia"
          name={["country", "countryId"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn quốc gia",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Vui lòng chọn quốc tịch"
            options={countryOptions}
            optionFilterProp="label"
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase()) ?? false
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Loại khách hàng"
          name="passengerType"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại khách hàng",
            },
          ]}
        >
          <Radio.Group
            options={passengerTypeOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>

      {!viewOnly && (
        <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
          <Space>
            <Button onClick={onCancel} loading={isUpdating}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              {passengerToUpdate ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdatePassengerForm;
