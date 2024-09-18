import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
  Switch,
} from "antd";
import { endOfDay, isAfter } from "date-fns";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/Loading";
import { IUser } from "../../../interfaces";
import { countryService } from "../../../services/country-service";
import { roleService } from "../../../services/role-service";
import { userService } from "../../../services/user-service";
import { formatISODate } from "../../../utils";

interface UpdateUserFormProps {
  form: FormInstance<IUser>;
  userToUpdate?: IUser;
  onCancel: () => void;
}

const genderOptions = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  form,
  userToUpdate,
  onCancel,
}) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (userToUpdate) {
      form.setFieldsValue(userToUpdate);
    }
  }, [form, userToUpdate]);

  const { data: countriesData, isLoading: isCountriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: countryService.getAllCountries,
  });

  const { data: rolesData, isLoading: isRolesLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAllRoles,
  });

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("users");
        },
      });
    },
  });

  const countryOptions = countriesData?.payload?.map((country) => ({
    value: country.countryId,
    label: country.countryName,
  }));
  const roleOptions = rolesData?.payload?.map((role) => ({
    value: role.roleId,
    label: role.roleName,
  }));

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    return current && isAfter(current.toDate(), endOfDay(new Date()));
  };

  function handleFinish(values: IUser) {
    const newUser = {
      ...values,
      dateOfBirth: formatISODate(values.dateOfBirth),
    };
    createUser(newUser, {
      onSuccess: () => {
        toast.success("Thêm mới người dùng thành công");
        onCancel();
      },
    });
    console.log(newUser);
  }

  if (isCountriesLoading || isRolesLoading) {
    return <Loading />;
  }

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
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
        >
          <DatePicker
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
          <Radio.Group className="space-x-4" options={genderOptions} />
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
          <Input placeholder="Số điện thoại" />
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
          <Select placeholder="Chọn quốc gia" options={countryOptions} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Vai trò"
          name={["role", "roleId"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn vai trò",
            },
          ]}
        >
          <Select placeholder="Chọn vai trò" options={roleOptions} />
        </Form.Item>
        <Form.Item
          className="flex-1"
          label="Trạng thái"
          name="active"
          valuePropName="checked"
        >
          <Switch checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Hộ chiếu/CCCD"
          name="identityNumber"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số hộ chiếu/CCCD",
            },
            {
              pattern: /^[0-9]{9,12}$/,
              message: "Số hộ chiếu/CCCD không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Hộ chiếu/CCCD" />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 6,
              message: "Mật khẩu phải chứa ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!"),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" />
        </Form.Item>
      </div>

      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>

          <Button type="primary" htmlType="submit" loading={isCreating}>
            {userToUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserForm;
